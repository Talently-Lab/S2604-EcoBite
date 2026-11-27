/** Restaurant as shown in the explore list. */
export interface Restaurant {
  id: string;
  imageUrl: string;
  name: string;
  day: string;
  openingTime: string;
  closingTime: string;
  metadata: {
    cuisine: string;
    sustainabilityBadge: string;
    co2Saved: string;
    rating: number;
    packagingType: string;
  };
}

/** Full restaurant detail (not wired yet). */
export interface RestaurantDetail {
  id: string;
  imageUrl: string;
  name: string;
  day: string;
  openingTime: string;
  closingTime: string;
  sustainabilityBadge: string;
  co2Saved: string;
  rating: number;
  description: string;
  latitude: number;
  longitude: number;
}

export type SortOption = "name" | "open" | "rating";
