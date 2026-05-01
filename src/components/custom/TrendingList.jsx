import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { NavLink } from "react-router";

export default function TrendingList({ label, data }) {
  return (
    <div>
      <h3 className="my-2 text-xl">Trending {label}</h3>
      <div className="flex flex-row items-center gap-2">
        {data.map((item) => (
          <HoverCard key={item.simklId}>
            <HoverCardTrigger asChild className="flex flex-row">
              <NavLink
                to={"/media/" + label.toLowerCase() + "/" + item.simklId}
                key={item.simklId}
              >
                <img src={item.poster} alt={item.title} />
              </NavLink>
            </HoverCardTrigger>
            <HoverCardContent side="right">
              <p className="text-xl font-bold">{item.title}</p>
              <p>{item.overview ? item.overview.slice(0, 50) + "..." : "NA"}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
