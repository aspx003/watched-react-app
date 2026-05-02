import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchSimkl } from "@/services/simkl";
import { Search } from "lucide-react";
import { useState } from "react";
import { imageBuilder } from "@/utils/imageBuilder";
import { Spinner } from "@/components/ui/spinner";
import { NavLink } from "react-router";
import { useMutation } from "@tanstack/react-query";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState("anime");

  const { data, mutate, isPending, error } = useMutation({
    mutationKey: ["search"],
    mutationFn: (search) => searchSimkl(mediaType, search),
    onSuccess: () => {
      setSearch("");
    },
  });

  return (
    <div className="p-4">
      <Field orientation={"horizontal"} className="mt-10">
        <Select
          defaultValue="anime"
          value={mediaType}
          onValueChange={(text) => setMediaType(text)}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Media" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">Tv Shows</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search something..."
        />
        <Button onClick={() => mutate(search)} disabled={isPending}>
          <Search />
          Search
        </Button>
      </Field>
      {isPending && (
        <div className="flex h-dvh items-center justify-center">
          <Spinner />
        </div>
      )}
      {data && (
        <div className="mt-5 flex flex-wrap items-start gap-3">
          {data.map((data) => {
            return (
              <div key={data.id} className="group w-30 space-y-2 text-center">
                <NavLink to={"/media/" + mediaType + "/" + data.ids.simkl_id}>
                  <div className="w-full aspect-2/3">
                    <img
                      src={imageBuilder(data.poster)}
                      alt={data.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </NavLink>
                <p className="mt-2 line-clamp-2 text-xs leading-tight font-medium">
                  {data.title} ({data.year})
                </p>
              </div>
            );
          })}
        </div>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
