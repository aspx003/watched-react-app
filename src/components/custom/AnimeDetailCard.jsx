import StatBox from "@/components/custom/StatBox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  addToCollection,
  isPresentInCollection,
  removeFromCollection,
} from "@/database/collectionsDatabase";
import { imageBuilder } from "@/utils/imageBuilder";
import {
  Calendar,
  Clock,
  ExternalLink,
  Info,
  PlayCircle,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import RecommendationList from "./RecommendationList";

const AnimeDetailCard = ({ data }) => {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    isPresentInCollection(data.ids.simkl).then(setPresent);
    console.log(data);
  }, [data]);

  const onClick = async () => {
    if (!present) {
      await addToCollection(data.ids.simkl, data.year, data.type);
      setPresent(true);
    } else {
      await removeFromCollection(data.ids.simkl);
      setPresent(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        <div className="group relative flex aspect-2/3 flex-col items-center justify-center overflow-hidden rounded-xl">
          <img
            src={imageBuilder(data.poster)}
            alt={data.title}
            className="rounded-xl object-cover"
          />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {data.status.toUpperCase()}
          </Badge>
        </div>

        {/* Essential Info */}
        <div className="space-y-4 md:col-span-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span>{data.season_name_year}</span>
              <span>•</span>
              <span>{data.studios[0].name}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {data.en_title}
            </h1>
            <p className="text-lg text-muted-foreground italic">{data.title}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="px-3 py-1">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4">
            <StatBox
              icon={
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              }
              label="MAL Rating"
              value={data.ratings.mal.rating}
            />
            <StatBox
              icon={<Clock className="h-4 w-4 text-blue-500" />}
              label="Runtime"
              value={`${data.runtime}m`}
            />
            <StatBox
              icon={<Calendar className="h-4 w-4 text-green-500" />}
              label="Episodes"
              value={data.total_episodes}
            />
            <StatBox
              icon={<Info className="h-4 w-4 text-purple-500" />}
              label="Rank"
              value={`#${data.rank}`}
            />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {data.overview}
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
              {data.airs && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Airs on</span>
                  <span className="text-right font-medium">
                    {data.airs.day}s at {data.airs.time} <br />{" "}
                    <small className="text-xs opacity-70">
                      ({data.airs.timezone})
                    </small>
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Aired</span>
                <span className="font-medium">
                  {new Date(data.first_aired).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium uppercase">{data.anime_type}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Relations & Recommendations */}
        {data.users_recommendations ? (
          <RecommendationList data={data.users_recommendations} />
        ) : (
          <p>No Reccomendations Yet</p>
        )}
      </div>
    </div>
  );
};

export default AnimeDetailCard;
