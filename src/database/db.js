import { Dexie } from "dexie"

const db = new Dexie("CollectionsDatabase")

db.version(1).stores({
  collections: "id, year, type, dateAdded",
})

export { db }

