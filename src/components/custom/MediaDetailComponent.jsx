import StatBox from "@/components/custom/StatBox";
import { Badge } from "@/components/ui/badge";
import {
  addToCollection,
  isPresentInCollection,
  removeFromCollection,
} from "@/database/collectionsDatabase";
import { imageBuilder } from "@/utils/imageBuilder";
import { Calendar, Clock, ExternalLink, Info, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import RecommendationList from "./RecommendationList";

export function MediaDetailComponent({ media }) {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    isPresentInCollection(media.ids.simkl).then(setPresent);
  }, [media]);

  const onClick = () => {
    if (!present) {
      addToCollection(
        media.ids.simkl,
        media.title,
        media.year,
        media.type,
        media.poster,
      );
      setPresent(true);
    } else {
      removeFromCollection(media.ids.simkl);
      setPresent(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        <div className="group relative flex aspect-2/3 flex-col items-center justify-center overflow-hidden">
          <img
            src={imageBuilder(media.poster)}
            alt={media.title}
            className="object-cover"
          />
          {media.type != "movie" && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {media.status.toUpperCase()}
            </Badge>
          )}
        </div>

        {/* Essential Info */}
        <div className="space-y-4 md:col-span-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span>{media.year}</span>
              <span>•</span>
              <span>{media.director}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{media.title}</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="px-3 py-1">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4">
            <StatBox
              icon={<Clock className="h-4 w-4 text-blue-500" />}
              label="Runtime"
              value={`${media.runtime}m`}
            />
            {media.type != "movie" && (
              <StatBox
                icon={<Calendar className="h-4 w-4 text-green-500" />}
                label="Episodes"
                value={media.total_episodes}
              />
            )}
            <StatBox
              icon={<Info className="h-4 w-4 text-purple-500" />}
              label="Rank"
              value={`#${media.rank}`}
            />
          </div>

          <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
            {media.overview}
          </p>

          <div className="flex gap-3 pt-2">
            <Button className="gap-2">
              <PlayCircle className="h-4 w-4" /> Watch Trailer
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={onClick} className="w-full">
            {present ? "Remove from collection" : "Add to collection"}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Broadcast & Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Broadcast Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {media.type === "movie" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Released</span>
                  <span className="font-medium">
                    {new Date(media.released).toLocaleDateString()}
                  </span>
                </div>
              )}
              {media.type === "show" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Aired</span>
                  <span className="font-medium">
                    {new Date(media.first_aired).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Recommendations */}
        {media.users_recommendations ? (
          <RecommendationList
            type={media.type}
            data={media.users_recommendations}
          />
        ) : (
          <p>No Reccomendations Yet</p>
        )}
      </div>
    </div>
  );
}
