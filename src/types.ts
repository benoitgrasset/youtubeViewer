
export type Order = "date" | "rating" | "viewCount" | "relevance" | "title" | "videoCount"

export type Type = "video" | "playlist" | "channel"

export type VideoDefinition = "any" | "high" | "standard"

export type VideoDuration = "any" | "long" | "medium" | "short"

export type VideoType = "any" | "episode" | "movie"

export type Parameter = {
    part: "snippet"
    q: string
    order: Order
    type: Type
    videoDefinition: VideoDefinition
    videoDuration: VideoDuration
    videoType: VideoType
    maxResults: number
    regionCode: "FR" | "EN" | "US" | "GB" | "DE"
    safeSearch: "none" | "moderate" | "strict"
    eventType: "completed" | "live" | "upcoming"
    channelType?: "any" | "show"
    publishedBefore?: string
    publishedAfter?: string
}

export type Items = any
