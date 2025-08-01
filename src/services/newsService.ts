interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: 'tech' | 'real-estate' | 'commodities' | 'general';
  aiSummary?: string;
  marketImpact?: 'positive' | 'negative' | 'neutral';
  confidence?: number;
}

interface OpenAISummaryResponse {
  summary: string;
  marketImpact: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

class NewsService {
  private newsApiKey: string;
  private openAiApiKey: string;

  constructor(newsApiKey: string, openAiApiKey: string) {
    this.newsApiKey = newsApiKey;
    this.openAiApiKey = openAiApiKey;
  }

  // Fetch news from NewsAPI
  async fetchFinancialNews(category?: string): Promise<NewsArticle[]> {
    try {
      const query = category 
        ? `finance ${category}` 
        : 'finance OR stocks OR markets OR economy OR investing';
      
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${this.newsApiKey}`
      );

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`);
      }

      const data: NewsAPIResponse = await response.json();
      
      return data.articles.map((article, index) => ({
        id: `article-${index}`,
        title: article.title,
        description: article.description || 'No description available',
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        category: this.categorizeArticle(article.title, article.description || ''),
        aiSummary: undefined, // Will be generated on demand
        marketImpact: undefined,
        confidence: undefined
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  // Categorize articles based on keywords
  private categorizeArticle(title: string, description: string): 'tech' | 'real-estate' | 'commodities' | 'general' {
    const text = `${title} ${description}`.toLowerCase();
    
    const techKeywords = ['tech', 'technology', 'ai', 'artificial intelligence', 'software', 'nvidia', 'apple', 'microsoft', 'google', 'amazon', 'tesla'];
    const realEstateKeywords = ['real estate', 'housing', 'property', 'mortgage', 'home', 'realty', 'reit', 'construction'];
    const commodityKeywords = ['gold', 'silver', 'oil', 'commodity', 'commodities', 'precious metals', 'crude', 'copper', 'aluminum'];
    
    if (techKeywords.some(keyword => text.includes(keyword))) {
      return 'tech';
    }
    if (realEstateKeywords.some(keyword => text.includes(keyword))) {
      return 'real-estate';
    }
    if (commodityKeywords.some(keyword => text.includes(keyword))) {
      return 'commodities';
    }
    
    return 'general';
  }

  // Generate AI summary using OpenAI
  async generateAISummary(article: NewsArticle): Promise<OpenAISummaryResponse> {
    try {
      const prompt = `
        Analyze this financial news article and provide:
        1. A concise summary (2-3 sentences)
        2. Market impact assessment (positive/negative/neutral)
        3. Confidence level (0-100)
        
        Article: ${article.title}
        Description: ${article.description}
        
        Respond in JSON format:
        {
          "summary": "your summary here",
          "marketImpact": "positive|negative|neutral",
          "confidence": 85
        }
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openAiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a financial analyst. Provide concise, accurate analysis of financial news.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const parsed = JSON.parse(content);
        return {
          summary: parsed.summary,
          marketImpact: parsed.marketImpact,
          confidence: parsed.confidence
        };
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          summary: content,
          marketImpact: 'neutral',
          confidence: 70
        };
      }
    } catch (error) {
      console.error('Error generating AI summary:', error);
      throw error;
    }
  }

  // Get news with AI summaries (batch processing)
  async getNewsWithSummaries(category?: string): Promise<NewsArticle[]> {
    const articles = await this.fetchFinancialNews(category);
    
    // Generate summaries for first 5 articles
    const articlesWithSummaries = await Promise.all(
      articles.slice(0, 5).map(async (article) => {
        try {
          const summary = await this.generateAISummary(article);
          return {
            ...article,
            aiSummary: summary.summary,
            marketImpact: summary.marketImpact,
            confidence: summary.confidence
          };
        } catch (error) {
          console.error(`Error generating summary for article ${article.id}:`, error);
          return article;
        }
      })
    );

    return articlesWithSummaries;
  }
}

// Export singleton instance
export const newsService = new NewsService(
  process.env.VITE_NEWS_API_KEY || '',
  process.env.VITE_OPENAI_API_KEY || ''
);

export type { NewsArticle, OpenAISummaryResponse }; 