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
