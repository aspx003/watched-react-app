import { NavLink } from "react-router";

export default function ListDisplay({ items }) {
  if (items.length === 0) {
    return (
      <div className="w-full h-xl flex items-center justify-center">
        <p>No Items Added Yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4">
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
