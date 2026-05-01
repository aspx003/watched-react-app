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

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState("anime");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);

  function searchMedia() {
    if (!mediaType || !search) {
      return;
    }

    setLoading(true);

    searchSimkl(mediaType, search)
      .then(setSearchData)
      .catch((e) => {
        setLoading(false);
        setSearchData(null);
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

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
        <Button onClick={searchMedia}>
          <Search />
          Search
        </Button>
      </Field>
      {loading && (
        <div className="flex h-dvh items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {searchData &&
          searchData.map((data) => {
            return (
              <NavLink
                href={"/media/" + mediaType + "/" + data.ids.simkl_id}
                key={data.ids.simkl_id}
              >
                <img src={imageBuilder(data.poster)} alt={data.title} />
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}
