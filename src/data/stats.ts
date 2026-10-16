import { cities, districts } from "./cities";
import { galleryPhotos } from "./gallery";
import { services } from "./services";

export const coverage = {
  services: services.length,
  cities: cities.length,
  areas: cities.reduce((sum, city) => sum + city.areas.length, 0),
  districts: districts.length,
  photos: galleryPhotos.length,
};

export const statItems = [
  { value: String(coverage.photos), label: "Installation photos" },
  { value: String(coverage.services), label: "Safety systems" },
  { value: String(coverage.cities), label: "Hyderabad localities" },
  { value: String(coverage.areas), label: "Neighbourhoods" },
  { value: String(coverage.districts), label: "City zones" },
];
