import * as React from "react"

// Simple chart utilities without complex type issues
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, any>
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      {...props}
    />
  )
})
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"