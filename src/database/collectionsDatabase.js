import { imageBuilder } from "@/utils/imageBuilder";
import { db } from "./db";

const collectionsTable = db.table("collections")

export const addToCollection = async (id, title, year, type, poster) => {
  await collectionsTable.add({
    id, title, year, type, dateAdded: new Date(), posterUrl: imageBuilder(poster)
  })
}

export const removeFromCollection = async (id) => {
  await collectionsTable.where("id").equals(id).delete();
}

export const isPresentInCollection = async (id) => {
  const data = await collectionsTable.where("id").equals(id).count()
  return data > 0
}

export const getGroupedData = async () => {
  const anime = await collectionsTable.where("type").equals("anime").toArray()
  const movies = await collectionsTable.where("type").equals("movie").toArray()
  const tv = await collectionsTable.where("type").equals("tv").or("type").equals("show").toArray()

  return {
    anime,
    movies,
    tv,
  }
}

export const getChartData = async () => {
  const data = [];

  const years = await collectionsTable.orderBy("year").uniqueKeys()

  for (const year of years) {
    const animeCount = await collectionsTable.where("year").equals(year).and((collection) => collection.type === "anime").count()
    const movieCount = await collectionsTable.where("year").equals(year).and((collection) => collection.type === "movie").count()
    const tvCount = await collectionsTable.where("year").equals(year).and((collection) => collection.type === "tv" || collection.type === "show").count()

    data.push({
      year,
      anime: animeCount,
      movies: movieCount,
      tv: tvCount,
    })
  }

  return data
}