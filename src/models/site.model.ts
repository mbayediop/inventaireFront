export interface Site {
    id: number;
    nom: string;
    type: 'siege' | 'entrepot' | 'carrefour_market' | 'supeco';
  }