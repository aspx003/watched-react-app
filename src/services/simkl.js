import { imageBuilder } from "@/utils/imageBuilder"

export const getTrending = async (timeFrame) => {
  const response = await fetch(
    `https://data.simkl.in/discover/trending/${timeFrame}_100.json`
  )

  if (!response.ok) {
    return null
  }
  const rawData = await response.json()

  const clean = (data) => {
    return data.slice(0, 10).map((item) => ({
      title: item.title + "",
      poster: imageBuilder(item.poster),
      simklId: item.ids.simkl_id + "",
      overview: item.overview ? item.overview + "" : null,
    }))
  }

  return {
    anime: clean(rawData.anime),
    movies: clean(rawData.movies),
    tv: clean(rawData.tv),
  }
}

const CLIENT_ID = import.meta.env.VITE_SIMKL_CLIENT_ID
const BASE_URL = "https://api.simkl.com/"

export const searchSimkl = async (type, searchText) => {
  const url = new URL(BASE_URL + `search/${type}`)

  url.searchParams.append("client_id", CLIENT_ID)
  url.searchParams.append("q", searchText)

  const response = await fetch(url.toString())
  const data = await response.json()

  return data
}

export const getMediaDetail = async (mediaType, id) => {
  if (mediaType === "movie") {
    mediaType = "movies"
  }

  if (mediaType === "show") {
    mediaType = "tv"
  }

  const response = await fetch(
    `${BASE_URL}${mediaType}/${id}?extended=full&client_id=${CLIENT_ID}`
  )
  const data = await response.json()

  return data
}
