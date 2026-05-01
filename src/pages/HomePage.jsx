import TrendingList from "@/components/custom/TrendingList";
import { getTrending } from "@/services/simkl";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending("today"),
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return (
    <div className="mt-5">
      {trendingData && (
        <>
          <TrendingList label="Anime" data={trendingData?.anime} />
          <TrendingList label="Movies" data={trendingData?.movies} />
          <TrendingList label="Tv" data={trendingData?.tv} />
        </>
      )}
    </div>
  );
}
