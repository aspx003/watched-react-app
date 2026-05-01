import { db } from "./db";

const collectionsTable = db.table("collections")

export const addToCollection = async (id, year, type) => {
  await collectionsTable.add({
    id, year, type, dateAdded: new Date()
  })
}

export const removeFromCollection = async (id) => {
  await collectionsTable.where("id").equals(id).delete();
}

export const getAllData = async () => {
  await collectionsTable.toArray()
}

export const isPresentInCollection = async (id) => {
  const data = await collectionsTable.where("id").equals(id).count()
  return data > 0
}
