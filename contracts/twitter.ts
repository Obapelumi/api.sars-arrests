interface TwitterUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  profile_location: string | null;
  description: string;
  url: string;
  entities: {
    url: {
      urls: {
        url: string;
        expanded_url: string;
        display_url: string;
        indices: number[];
      }[];
    };
    description: {
      urls: string[];
    };
  };
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: string | null;
  time_zone: string | null;
  geo_enabled: string | null;
  verified: boolean;
  statuses_count: number;
  lang: string | null;
  contributors_enabled: string | null;
  is_translator: string | null;
  is_translation_enabled: string | null;
  profile_background_color: string | null;
  profile_background_image_url: string | null;
  profile_background_image_url_https: string | null;
  profile_background_tile: string | null;
  profile_image_url: string | null;
  profile_image_url_https: string;
  profile_banner_url: string | null;
  profile_link_color: string | null;
  profile_sidebar_border_color: string | null;
  profile_sidebar_fill_color: string | null;
  profile_text_color: string | null;
  profile_use_background_image: string | null;
  has_extended_profile: string | null;
  default_profile: boolean;
  default_profile_image: boolean;
  following: string | null;
  follow_request_sent: string | null;
  notifications: string | null;
  translator_type: string | null;
}

interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: string | null;
  in_reply_to_user_id: string | null;
  in_reply_to_user_id_str: string | null;
  in_reply_to_screen_name: string | null;
  user: TwitterUser;
  geo: string | null;
  coordinates: string | null;
  place: string | null;
  contributors: string | null;
  retweeted_status?: {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    source: string;
    truncated: boolean;
    in_reply_to_status_id: number | null;
    in_reply_to_status_id_str: string | null;
    in_reply_to_user_id: number | null;
    in_reply_to_user_id_str: number | null;
    in_reply_to_screen_name: number | null;
    user: TwitterUser;
    geo: string | null;
    coordinates: string | null;
    place: string | null;
    contributors: string | null;
    is_quote_status: boolean;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    favorite_count: number;
    entities: {
      hashtags: string[];
      urls: string[];
      user_mentions: number[];
      symbols: number[];
    };
    favorited: boolean;
    retweeted: boolean;
    filter_level: string;
    lang: string;
  };
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: {
    hashtags: any[];
    urls: any[];
    user_mentions: any[];
    symbols: any[];
  };
  favorited: boolean;
  retweeted: boolean;
  filter_level: string;
  lang: string;
  timestamp_ms: string;
}
