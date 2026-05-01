import { Spinner } from "@/components/ui/spinner";
import { db } from "@/database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { NavLink } from "react-router";

export default function CollectionsPage() {
  const items = useLiveQuery(() => db.table("collections").toArray(), []);

  if (!items) return <Spinner />;

  if (items.length === 0) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-2xl font-bold">Such Emptiness</p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap items-start gap-3">
      {/* 3 Tabs, For movies, shows and animes */}
      {items.length > 0 &&
        items.map((item) => (
          <div key={item.id} className="group w-30 space-y-2 text-center">
            <NavLink to={"/media/" + item.type + "/" + item.id} key={item.id}>
              <div className="w-full aspect-2/3">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </NavLink>
            <p className="mt-2 line-clamp-2 text-xs leading-tight font-medium">
              {item.title}
            </p>
          </div>
        ))}
    </div>
  );
}
