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
    placeholderLocation?: string;
  };
  home?: {
    heroTitle: string;
    heroSubtitle: string;
    viewListings: string;
    searchOnMap: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    featuredTitle: string;
    viewAll: string;
    ctaAgentTitle: string;
    ctaAgentDesc: string;
    ctaAgentButton: string;
    listProperty: string;
  };
  solutions?: {
    badge: string;
    title: string;
    subtitle: string;
    footer: string;
    crm: Record<string, string>;
    condo: Record<string, string>;
    mi: Record<string, string>;
  };
  footer?: {
    searchProperties: string;
    about: string;
    contact: string;
    blog: string;
    tagline: string;
    copyright: string;
    agentArea: string;
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
    buy?: string;
    rent?: string;
    vacation?: string;
    newConstruction?: string;
    agents?: string;
    agentArea: string;
    listProperty?: string;
    login: string;
    register: string;
    dashboard: string;
    properties: string;
    leads: string;
    settings: string;
  };
}
