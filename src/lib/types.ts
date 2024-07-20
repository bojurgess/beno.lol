export interface Link {
    id: number;
    icon: string;
    href: string;
    color: HexColor;
}

type HexColor = `#${string}`;

export interface NowPlaying {
    device: Device
    repeat_state: string
    shuffle_state: boolean
    context: Context
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: Item
    currently_playing_type: string
    actions: Actions
  }
  
  export interface Device {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
    supports_volume: boolean
  }
  
  export interface Context {
    type: string
    href: string
    external_urls: ExternalUrls
    uri: string
  }
  
  export interface ExternalUrls {
    spotify: string
  }
  
  export interface Item {
    album: Album
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds
    external_urls: ExternalUrls
    href: string
    id: string
    is_playable: boolean
    linked_from: LinkedFrom
    restrictions: Restrictions2
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
  }
  
  export interface Album {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions
    type: string
    uri: string
    artists: Artist[]
  }
  
  export interface Restrictions {
    reason: string
  }
  
  export interface Artist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
  }
  
  export interface Followers {
    href: string
    total: number
  }
  
  export interface Image {
    url: string
    height: number
    width: number
  }
  
  export interface ExternalIds {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface LinkedFrom {}
  
  export interface Restrictions2 {
    reason: string
  }
  
  export interface Actions {
    interrupting_playback: boolean
    pausing: boolean
    resuming: boolean
    seeking: boolean
    skipping_next: boolean
    skipping_prev: boolean
    toggling_repeat_context: boolean
    toggling_shuffle: boolean
    toggling_repeat_track: boolean
    transferring_playback: boolean
  }