import { NavLink } from "react-router";
import { imageBuilder } from "@/utils/imageBuilder";

export default function RecommendationList({ data }) {
  return (
    <div className="space-y-6 lg:col-span-2">
      {data.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">You Might Also Like</h3>
          <div className="flex items-start gap-4 overflow-x-auto pb-2">
            {data.map((rec) => (
              <div className="w-28 shrink-0">
                <NavLink to={"/media/" + "anime" + "/" + rec.ids.simkl}>
                  <div className="w-full aspect-[2/3]">
                    <img
                      src={imageBuilder(rec.poster)}
                      alt={rec.title}
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                </NavLink>
                <p className="mt-2 line-clamp-2 text-[10px] leading-tight font-medium">
                  {rec.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
