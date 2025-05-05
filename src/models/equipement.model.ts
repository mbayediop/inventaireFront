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
    supplier: Supplier;
    assignment: string;
    status: 'en_service' | 'hors_service' | 'sphere';
    type: 'ordinateur' | 'laptop' | 'imprimante' | 'pda' | 'caisse' | 'accessoire' | 'ecran';
    type_depense: 'capex' | 'opex';
    site: Site;
    total_amount_ht?: number;
    qr_code?: string;
    
    // Champs de facture (structure plate comme dans la réponse API)
    bon_commande?: string;
    fichier_bon_commande?: string;
    bon_livraison?: string;
    fichier_bon_livraison?: string;
    date_facture?: string;
}