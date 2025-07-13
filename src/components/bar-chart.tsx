"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Top 5 Vendor Risks"

const riskData = [
  { risk: "Data Breach", score: 95, fill: "oklch(0.577 0.245 27.325)" },
  { risk: "System Failure", score: 87, fill: "oklch(0.704 0.191 22.216)" },
  { risk: "Compliance Gap", score: 72, fill: "oklch(0.769 0.188 70.08)" },
  { risk: "Access Control", score: 58, fill: "oklch(0.828 0.189 84.429)" },
  { risk: "Documentation", score: 45, fill: "oklch(0.646 0.222 41.116)" },
]

const chartConfig = {
  score: {
    label: "Risk Score",
  },
  "Data Breach": {
    label: "Data Breach",
    color: "oklch(0.577 0.245 27.325)",
  },
  "System Failure": {
    label: "System Failure",
    color: "oklch(0.704 0.191 22.216)",
  },
  "Compliance Gap": {
    label: "Compliance Gap",
    color: "oklch(0.769 0.188 70.08)",
  },
  "Access Control": {
    label: "Access Control",
    color: "oklch(0.828 0.189 84.429)",
  },
  "Documentation": {
    label: "Documentation",
    color: "oklch(0.646 0.222 41.116)",
  },
} satisfies ChartConfig

export function ChartBarMixed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Vendor Risks</CardTitle>
        <CardDescription>Risk assessment scores by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={riskData}
            layout="vertical"
            margin={{
              left: 40,
              right: 10,
              top: 10,
              bottom: 10,
            }}
          >
            <YAxis
              dataKey="risk"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="score" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          High risk areas identified <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 5 risk categories by severity score
        </div>
      </CardFooter>
    </Card>
  )
}
