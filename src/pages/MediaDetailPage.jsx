import AnimeDetailCard from "@/components/custom/AnimeDetailCard";
import { Spinner } from "@/components/ui/spinner";
import { getMediaDetail } from "@/services/simkl";
import { useEffect, useState } from "react";
import { MediaDetailComponent } from "@/components/custom/MediaDetailComponent";
import { useParams } from "react-router";

export default function MediaDetailPage() {
  const { mediaType, simklId } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getMediaDetail(mediaType, simklId)
      .then((value) => setData(value))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [simklId, mediaType]);

  if (loading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (data && mediaType === "anime") {
    return <div>{data && <AnimeDetailCard data={data} />}</div>;
  }

  return <div>{data && <MediaDetailComponent media={data} />}</div>;
}
