import { Site } from "./site.model";
import { Supplier } from "./supplier.model";

export interface Equipement {
    id: number;
    service: string;
    description: string;
    quantity: number;
    marque_modele: string;
    amount_ht: number;
    acquisition_date: string;
    supplier: number | Supplier;
    assignment: string;
    status: 'en_service' | 'hors_service' | 'sphere';
    type: 'ordinateur' | 'laptop' | 'imprimante' | 'pda' | 'caisse' | 'accessoire' | 'ecran';
    type_depense: 'capex' | 'opex';
    site: number | Site | null;
    qr_code?: string | null;
    total_amount_ht?: number;
    facture_numero?: string | null;
    bon_commande?: string | null;
    bon_livraison?: string | null;
    lien_bon_commande?: string | null;
    lien_bon_livraison?: string | null;
  }
  