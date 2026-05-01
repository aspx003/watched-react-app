import AnimeDetailCard from "@/components/custom/AnimeDetailCard";
import { Spinner } from "@/components/ui/spinner";
import { getMediaDetail } from "@/services/simkl";
import { MediaDetailComponent } from "@/components/custom/MediaDetailComponent";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function MediaDetailPage() {
  const { mediaType, simklId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["media", mediaType, simklId],
    queryFn: () => getMediaDetail(mediaType, simklId),
  });

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data && mediaType === "anime") {
    return <div>{data && <AnimeDetailCard data={data} />}</div>;
  }

  return <div>{data && <MediaDetailComponent media={data} />}</div>;
}
