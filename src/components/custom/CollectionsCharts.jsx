import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getChartData } from "@/database/collectionsDatabase";
import { Spinner } from "../ui/spinner";

const chartConfig = {
  anime: {
    label: "Anime",
  },
  movies: {
    label: "Movies",
  },
  tv: {
    label: "TV",
  },
};

export default function CollectionsCharts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chartData"],
    queryFn: getChartData,
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-50 w-full">
        <BarChart accessibilityLayer data={data}>
          <Bar dataKey="anime" fill="var(--color-chart-1)" radius={4} />
          <Bar dataKey="movies" fill="var(--color-chart-2)" radius={4} />
          <Bar dataKey="tv" fill="var(--color-chart-3)" radius={4} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
