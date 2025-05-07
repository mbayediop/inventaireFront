export interface EquipementCounts {
    ordinateur: number;
    laptop: number;
    imprimante: number;
    pda: number;
    caisse: number;
    accessoire: number;
    ecran: number;
    [key: string]: number; // Index signature pour permettre l'accès dynamique
  }