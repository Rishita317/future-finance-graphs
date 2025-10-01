import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Cpu,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { newsService, type NewsArticle } from "@/services/newsService";

interface NewsFeedProps {
  apiKey?: string;
}

const NewsFeed = ({ apiKey }: NewsFeedProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "tech" | "real-estate" | "commodities"
  >("all");
  const [summarizing, setSummarizing] = useState<string | null>(null);

  // Mock data for development (replace with actual API calls)
  const mockArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Nvidia's Q4 Earnings Beat Expectations, Stock Surges 15%",
      description:
        "Nvidia reported quarterly earnings that exceeded analyst expectations, driven by strong demand for AI chips and data center solutions.",
      url: "https://example.com/nvidia-earnings",
      publishedAt: new Date().toISOString(),
      source: "Financial Times",
      category: "tech",
      aiSummary:
        "Nvidia's exceptional Q4 performance, with 15% stock surge, reinforces our bullish tech sector forecast. Strong AI chip demand indicates continued growth in semiconductor industry.",
      marketImpact: "positive",
      confidence: 85,
    },
    {
      id: "2",
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      description:
        "The Federal Reserve indicated it may consider interest rate reductions this year, citing improved inflation data and economic stability.",
      url: "https://example.com/fed-rate-cuts",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: "Reuters",
      category: "general",
      aiSummary:
        "Fed's dovish stance on interest rates could boost real estate markets and commodity prices. This aligns with our prediction of increased investment in property markets.",
      marketImpact: "positive",
      confidence: 78,
    },
    {
      id: "3",
      title: "Housing Market Shows Signs of Recovery in Major Cities",
      description:
        "Recent data shows increased home sales and rising prices in major metropolitan areas, indicating a potential recovery in the real estate market.",
      url: "https://example.com/housing-recovery",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: "Bloomberg",
      category: "real-estate",
      aiSummary:
        "Housing market recovery in major cities supports our real estate investment predictions. Increased demand suggests continued growth in property values.",
      marketImpact: "positive",
      confidence: 72,
    },
    {
      id: "4",
      title: "Gold Prices Hit 3-Month High Amid Economic Uncertainty",
      description:
        "Gold prices reached their highest level in three months as investors seek safe-haven assets amid global economic uncertainty.",
      url: "https://example.com/gold-prices",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: "MarketWatch",
      category: "commodities",
      aiSummary:
        "Gold's surge to 3-month high validates our commodity investment strategy. Economic uncertainty driving safe-haven demand supports precious metals outlook.",
      marketImpact: "positive",
      confidence: 81,
    },
    {
      id: "5",
      title: "Tech Layoffs Continue as Companies Optimize Operations",
      description:
        "Major technology companies announce additional layoffs as they focus on efficiency and AI-driven automation.",
      url: "https://example.com/tech-layoffs",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: "TechCrunch",
      category: "tech",
      aiSummary:
        "Continued tech layoffs suggest industry consolidation and AI adoption acceleration. This may impact short-term tech sector performance but supports long-term AI growth thesis.",
      marketImpact: "neutral",
      confidence: 65,
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Use real NewsAPI
        const articles = await newsService.fetchFinancialNews();
        setArticles(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to mock data if API fails
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tech":
        return Cpu;
      case "real-estate":
        return Building2;
      case "commodities":
        return DollarSign;
      default:
        return BarChart3;
    }
  };

  const getMarketImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200";
      case "negative":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getMarketImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return TrendingUp;
      case "negative":
        return TrendingDown;
      default:
        return BarChart3;
    }
  };

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const generateAISummary = async (articleId: string) => {
    setSummarizing(articleId);
    try {
      const article = articles.find((a) => a.id === articleId);
      if (!article) return;

      // Use real OpenAI API
      const summary = await newsService.generateAISummary(article);

      // Update article with AI summary
      setArticles((prev) =>
        prev.map((a) =>
          a.id === articleId
            ? {
                ...a,
                aiSummary: summary.summary,
                marketImpact: summary.marketImpact,
                confidence: summary.confidence,
              }
            : a
        )
      );
    } catch (error) {
      console.error("Error generating AI summary:", error);
    } finally {
      setSummarizing(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <section id="news" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Financial News & AI Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest financial news and get AI-powered
            insights on market impact
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {[
              { key: "all", label: "All News", icon: BarChart3 },
              { key: "tech", label: "Tech", icon: Cpu },
              { key: "real-estate", label: "Real Estate", icon: Building2 },
              { key: "commodities", label: "Commodities", icon: DollarSign },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(key as any)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="min-h-[400px]">
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : filteredArticles.map((article) => {
                const CategoryIcon = getCategoryIcon(article.category);
                const ImpactIcon = getMarketImpactIcon(
                  article.marketImpact || "neutral"
                );

                return (
                  <Card
                    key={article.id}
                    className="min-h-[400px] flex flex-col hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">
                            {article.category.replace("-", " ")}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight mb-2">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {article.title}
                        </a>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {article.source}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {article.description}
                      </p>

                      {article.aiSummary ? (
                        <div className="mt-auto space-y-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              AI Insight
                            </span>
                          </div>
                          <div
                            className={`p-3 rounded-lg border ${getMarketImpactColor(
                              article.marketImpact || "neutral"
                            )}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <ImpactIcon className="h-4 w-4" />
                              <span className="text-sm font-medium capitalize">
                                {article.marketImpact} Impact
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {article.aiSummary}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-auto space-y-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateAISummary(article.id)}
                            disabled={summarizing === article.id}
                            className="w-full"
                          >
                            {summarizing === article.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate AI Insight
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="w-full"
                          >
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <span>Read Full Article</span>
                              <span className="text-xs">↗</span>
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
