export type Locale = 'pt' | 'en' | 'fr';

export interface Translations {
  common: {
    search: string;
    filter: string;
    price: string;
    location: string;
    all: string;
    any: string;
    apply: string;
    cancel: string;
    back: string;
    save: string;
    loading: string;
  };
  search: {
    title: string;
    list: string;
    map: string;
    island: string;
    listingType: string;
    buy: string;
    rent: string;
    priceMin: string;
    priceMax: string;
    priceRange: string;
    area: string;
    areaMin: string;
    areaMax: string;
    bedrooms: string;
    results: string;
    noResults: string;
    searchButton: string;
  };
  property: {
    bedrooms: string;
    bathrooms: string;
    area: string;
    type: Record<string, string>;
  };
  nav: {
    home: string;
    search: string;
    agentArea: string;
    login: string;
    register: string;
    dashboard: string;
    properties: string;
    leads: string;
    settings: string;
  };
}
