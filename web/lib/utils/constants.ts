export const ISLANDS = [
  'Santiago',
  'São Vicente',
  'Santo Antão',
  'São Nicolau',
  'Sal',
  'Boa Vista',
  'Maio',
  'Fogo',
  'Brava',
] as const;

export const LISTING_TYPES = [
  { value: 'sale', label: 'Venda' },
  { value: 'rent', label: 'Arrendamento' },
  { value: 'vacation', label: 'Férias' },
  { value: 'new_construction', label: 'Obras Novas' },
] as const;

/** Limites para sliders de pesquisa (CVE) */
export const PRICE_SLIDER = { min: 0, max: 5_000_000, step: 50_000 };
/** Limites para área (m²) */
export const AREA_SLIDER = { min: 0, max: 1000, step: 10 };

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Moradia' },
  { value: 'land', label: 'Terreno' },
  { value: 'villa', label: 'Vila' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'other', label: 'Outro' },
] as const;

/** Tipos para o grid "Registar imóvel" (mapeiam para backend: APARTAMENTO, MORADIA, TERRENO, COMERCIAL) */
export const REGISTER_PROPERTY_TYPES = [
  { id: 'APARTAMENTO', label: 'Edifício', icon: 'Building' },
  { id: 'COMERCIAL', label: 'Loja', icon: 'Store' },
  { id: 'MORADIA', label: 'Moradia', icon: 'House' },
  { id: 'COMERCIAL', label: 'Escritório', icon: 'Office' },
  { id: 'APARTAMENTO', label: 'Apartamento', icon: 'Apartment' },
  { id: 'APARTAMENTO', label: 'Quarto', icon: 'Room' },
  { id: 'COMERCIAL', label: 'Garagem', icon: 'Garage' },
  { id: 'TERRENO', label: 'Terreno', icon: 'Terrain' },
] as const;
