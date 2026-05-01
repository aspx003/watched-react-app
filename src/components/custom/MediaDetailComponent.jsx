import { Badge } from "@/components/ui/badge";
import StatBox from "@/components/custom/StatBox";
import { imageBuilder } from "@/utils/imageBuilder";

import {
  Star,
  Clock,
  Calendar,
  Info,
  PlayCircle,
  ExternalLink,
  Link,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function MediaDetailComponent({ media }) {
  const [present, setPresent] = useState(false);

  const onClick = () => {};

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        <div className="group relative flex aspect-2/3 flex-col items-center justify-center overflow-hidden rounded-xl">
          <Image
            loading="eager"
            src={imageBuilder(media.poster)}
            alt={media.title}
            height={500}
            width={400}
            className="rounded-xl object-cover"
          />
          {/*<Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {media.status.toUpperCase()}
          </Badge>*/}
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
            <p className="text-lg text-muted-foreground italic">
              {media.title}
            </p>
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
            {/*<StatBox
              icon={<Calendar className="h-4 w-4 text-green-500" />}
              label="Episodes"
              value={media.total_episodes}
            />*/}
            {/*<StatBox
              icon={<Info className="h-4 w-4 text-purple-500" />}
              label="Rank"
              value={`#${media.rank}`}
            />*/}
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Aired</span>
                <span className="font-medium">
                  {/*{new Date(media.first_aired).toLocaleDateString()}*/}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium uppercase">
                  {/*{media.anime_type}*/}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Relations & Recommendations */}
        <div className="space-y-6 lg:col-span-2">
          {media.users_recommendations.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                You Might Also Like
              </h3>
              <div className="flex items-start gap-4 overflow-x-auto pb-2">
                {media.users_recommendations.map((rec) => (
                  <div
                    key={rec.ids.simkl}
                    className="group w-24 space-y-2 text-center"
                  >
                    <Link href={"/media/" + rec.ids.simkl} key={rec.ids.simkl}>
                      <Image
                        height={100}
                        width={200}
                        src={imageBuilder(rec.poster)}
                        alt={rec.title}
                        className="rounded-md"
                      />
                    </Link>
                    <p className="mt-2 line-clamp-2 text-[10px] leading-tight font-medium">
                      {rec.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
