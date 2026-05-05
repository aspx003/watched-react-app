import { NavLink } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function TrendingList({ label, data }) {
  return (
    <Box marginY={5}>
      <Typography variant="h4">Trending {label}</Typography>
      <Grid container spacing={2} mt={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={2.4} key={item.simklId}>
            <NavLink
              to={"/media/" + label.toLowerCase() + "/" + item.simklId}
              key={item.simklId}
            >
              <Card sx={{ width: 345 }}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={item.poster}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </NavLink>
          </Grid>
          // <HoverCard key={item.simklId}>
          //   <HoverCardTrigger asChild className="flex flex-row">
          //     <NavLink
          //       to={"/media/" + label.toLowerCase() + "/" + item.simklId}
          //       key={item.simklId}
          //     >
          //       <img src={item.poster} alt={item.title} />
          //     </NavLink>
          //   </HoverCardTrigger>
          //   <HoverCardContent side="right">
          //     <p className="text-xl font-bold">{item.title}</p>
          //     <p>{item.overview ? item.overview.slice(0, 50) + "..." : "NA"}</p>
          //   </HoverCardContent>
          // </HoverCard>
        ))}
      </Grid>
    </Box>
  );
}
