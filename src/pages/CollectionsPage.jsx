import CollectionsCharts from "@/components/custom/CollectionsCharts";
import ListDisplay from "@/components/custom/ListDisplay";
import { Spinner } from "@/components/ui/spinner";
import { getGroupedData } from "@/database/collectionsDatabase";
import { useQuery } from "@tanstack/react-query";

export default function CollectionsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["collections"],
    queryFn: getGroupedData,
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-5 flex flex-col items-start gap-3">
      <CollectionsCharts />

      <div>
        <h3 className="text-xl mb-2">Anime</h3>
        <ListDisplay items={data.anime} />
      </div>
      <div>
        <h3 className="text-xl mb-2">Movies</h3>
        <ListDisplay items={data.movies} />
      </div>
      <div>
        <h3 className="text-xl mb-2">TV</h3>
        <ListDisplay items={data.tv} />
      </div>
    </div>
  );
}
