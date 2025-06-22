import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart";

const chartData = [
  { month: "January", desktop: 2.4 },
  { month: "February", desktop: 3.1 },
  { month: "March", desktop: 2.8 },
  { month: "April", desktop: 1.9 },
  { month: "May", desktop: 3.5 },
  { month: "June", desktop: 4.2 },
];

const chartConfig = {
  desktop: {
    label: "CTR %",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function CTRChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CTR %</CardTitle>
        <CardDescription>
          Showing click-through rate for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => [`${value}%`]}
                />
              }
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
