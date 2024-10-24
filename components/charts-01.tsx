"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Charts() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
      
        <Card className="lg:max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              12,584{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                steps
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              margin={{
                left: -4,
                right: -4,
              }}
              data={[
                { date: "2024-01-01", steps: 2000 },
                { date: "2024-01-02", steps: 2100 },
                { date: "2024-01-03", steps: 2200 },
                { date: "2024-01-04", steps: 1300 },
                { date: "2024-01-05", steps: 1400 },
                { date: "2024-01-06", steps: 2500 },
                { date: "2024-01-07", steps: 1600 },
              ]}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { weekday: "short" })}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="var(--color-steps)" radius={5} />
            </BarChart>
          </CardContent>
        </Card>

        <Card className="lg:max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Resting HR</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              62{" "}
              <span className="text-sm font-normal tracking-normal text-muted-foreground">
                bpm
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              margin={{ left: 14, right: 14, top: 10 }}
              data={[
                { date: "2024-01-01", resting: 62 },
                { date: "2024-01-02", resting: 72 },
                { date: "2024-01-03", resting: 35 },
                { date: "2024-01-04", resting: 62 },
                { date: "2024-01-05", resting: 52 },
                { date: "2024-01-06", resting: 62 },
                { date: "2024-01-07", resting: 70 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="resting" stroke="var(--color-resting)" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
