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
