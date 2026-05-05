import { searchSimkl } from "@/services/simkl";
import { imageBuilder } from "@/utils/imageBuilder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState("anime");

  const { data, mutate, isPending, error } = useMutation({
    mutationKey: ["search"],
    mutationFn: () => searchSimkl(mediaType, search),
    onSuccess: () => {
      setSearch("");
    },
  });

  return (
    <div className="p-4">
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        <FormControl sx={{ minWidth: 150, flex: 1 }}>
          <InputLabel id="select-media">Media Type</InputLabel>
          <Select
            labelId="select-media"
            id="select-media"
            value={mediaType}
            label="Media Type"
            onChange={(e) => setMediaType(e.target.value)}
          >
            <MenuItem value={"anime"}>Anime</MenuItem>
            <MenuItem value={"movie"}>Movies</MenuItem>
            <MenuItem value={"tv"}>Tv</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="search-text"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 4 }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={() => mutate(search)}
          loading={isPending}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
      {data && (
        <Box
          mt={5}
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"start"}
          gap={3}
        >
          {data.map((data) => {
            return (
              <Box key={data.id} className="group w-30 space-y-2 text-center">
                <NavLink to={"/media/" + mediaType + "/" + data.ids.simkl_id}>
                  <Box width={"full"} className="w-full aspect-2/3">
                    <img
                      src={imageBuilder(data.poster)}
                      alt={data.title}
                      className="w-full h-full object-cover"
                    />
                  </Box>
                </NavLink>
                <p className="mt-2 line-clamp-2 text-xs leading-tight font-medium">
                  {data.title} ({data.year})
                </p>
              </Box>
            );
          })}
        </Box>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
