import { Component, OnInit } from '@angular/core';
import { EquipementsService } from '../../services/equipements.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipement } from '../../../models/equipement.model';
import { SitesService } from '../../services/sites.service';
import { FournisseursService } from '../../services/fournisseurs.service';
declare var bootstrap: any;

@Component({
  selector: 'app-equipements',
  imports: [CommonModule, FormsModule],
  templateUrl: './equipements.component.html',
  styleUrl: './equipements.component.css'
})
export class EquipementsComponent implements OnInit {
   // Propriétés pour exposer l'objet Math dans le template
   Math = Math;
   sites: any[] = []; 
   fournisseurs: any[] = [];
   equipements: Equipement[] = [];
   selectedEquipement: any = null;
   filteredEquipements: any[] = [];
   currentPage: number = 1;
   pageSize: number = 10;
   searchTerm: string = '';
   filterType: string = '';
   filterStatus: string = '';
   filterSite: string = '';
   filterSupplier: string = '';
   filterMagasin: string = '';
    filterUtilisateur: string = '';
    filterNomEquipement: string = '';
    filterFournisseur: string = '';

   
   // Filtres avancés
   filtresAvancesVisibles: boolean = false;
   
   
   // Import/Export
   importFile: File | null = null;
   importPreview: any[] = [];
   importPreviewHeaders: string[] = [];
 
   // Modèle pour le nouveau équipement
   newEquipement: any = {
     service: '',
     description: '',
     quantity: 1,
     marque_modele: '',
     amount_ht: 0,
     acquisition_date: '',
     supplier: null,
     assignment: '',
     status: 'en_service',
     type: 'ordinateur',
     type_depense: 'capex',
     site: null,
     // Champs de facture inclus dans l'objet principal
     bon_commande: '',
     bon_livraison: '',
     date_facture: '',
     facture: {
       bon_commande: '',
       bon_livraison: '',
       date_facture: ''
     }
   }
   // Variables pour les fichiers
   fichierBonCommande: File | null = null;
   fichierBonLivraison: File | null = null;

  constructor(
    private equipementService: EquipementsService,
    private sitesService: SitesService,
    private fournisseursService: FournisseursService
  ) {}

  ngOnInit() {
    this.loadEquipements();
    this.loadSites();
    this.loadFournisseurs();
    console.log(this.equipements);
  }

  loadSites() {
    this.sitesService.getSites().subscribe(data => {
      this.sites = data;
    });
  }

  loadFournisseurs() {
    this.fournisseursService.getFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    });
  }

  loadEquipements() {
    this.equipementService.getEquipements().subscribe((data: any) => {
      this.equipements = data;
      this.filterEquipements();
    });
  }

  filterEquipements() {
    const term = this.searchTerm.toLowerCase();
  
    const filtered = this.equipements.filter(equipement => {
      const matchesSearch =
        (!term || 
          (equipement.type && equipement.type.toLowerCase().includes(term)) ||
          (equipement.status && equipement.status.toLowerCase().includes(term)) ||
          (equipement.description && equipement.description.toLowerCase().includes(term)) ||
          (equipement.assignment && equipement.assignment.toLowerCase().includes(term)));
  
      const matchesType = !this.filterType || equipement.type === this.filterType;
      const matchesStatus = !this.filterStatus || equipement.status === this.filterStatus;
      const matchesSite = !this.filterSite || equipement.site?.nom == this.filterSite;
      const matchesSupplier = !this.filterSupplier || equipement.supplier?.name == this.filterSupplier;

  
      const matchesMagasin = !this.filterMagasin || equipement.site?.nom?.toLowerCase().includes(this.filterMagasin.toLowerCase());
      const matchesUtilisateur = !this.filterUtilisateur || equipement.assignment?.toLowerCase().includes(this.filterUtilisateur.toLowerCase());
      const matchesNomEquipement = !this.filterNomEquipement || equipement.description?.toLowerCase().includes(this.filterNomEquipement.toLowerCase());
      const matchesFournisseur = !this.filterFournisseur || equipement.supplier?.name?.toLowerCase().includes(this.filterFournisseur.toLowerCase());
  
      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesSite &&
        matchesSupplier &&
        matchesMagasin &&
        matchesUtilisateur &&
        matchesNomEquipement &&
        matchesFournisseur
      );
    });
  
    this.currentPage = 1;
    this.filteredEquipements = filtered.slice(0, this.pageSize);
  }
  
  

resetFilters() {
    this.searchTerm = '';
    this.filterType = '';
    this.filterStatus = '';
    this.filterSite = '';
    this.filterSupplier = '';
    this.filterMagasin = '';
    this.filterUtilisateur = '';
    this.filterNomEquipement = '';
    this.filterFournisseur = '';
    this.filterEquipements();
  }
  


changePage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    const term = this.searchTerm.toLowerCase();
    const filtered = this.equipements.filter(equipement =>
      (equipement.assignment && equipement.assignment.toLowerCase().includes(term)) ||
      (equipement.status && equipement.status.toLowerCase().includes(term)) ||
      (equipement.description && equipement.description.toLowerCase().includes(term))
    );
  
    this.filteredEquipements = filtered.slice(startIndex, endIndex);
  } 

  get totalFilteredEquipements(): number {
    const term = this.searchTerm.toLowerCase();
    return this.equipements.filter(equipement =>
      (equipement.assignment && equipement.assignment.toLowerCase().includes(term)) ||
      (equipement.status && equipement.status.toLowerCase().includes(term)) ||
      (equipement.description && equipement.description.toLowerCase().includes(term))
    ).length;
  }

  getTotalMontantHT(): number {
    return this.filteredEquipements.reduce((total, equipement) => {
      return total + parseFloat(equipement.total_amount_ht || 0);
    }, 0);
  }


  toggleFiltresAvances() {
    this.filtresAvancesVisibles = !this.filtresAvancesVisibles;
  }

  voirPlus(equipement: any) {
    this.selectedEquipement = equipement;
    const modalElement = document.getElementById('equipementDetailModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  supprimerEquipement(equipement: Equipement) {
    if (confirm('Voulez-vous vraiment supprimer cet équipement ?')) {
      this.equipementService.delete(equipement.id).subscribe(() => {
        this.loadEquipements();
      });
    }
  }

  onFileChange(event: any, field: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (field === 'fichier_bon_commande') {
        this.fichierBonCommande = file;
      } else if (field === 'fichier_bon_livraison') {
        this.fichierBonLivraison = file;
      }
    }
  }

  ouvrirModalAjout() {
    const modalElement = document.getElementById('addEquipementModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  ajouterEquipement() {
    // Création de FormData
    const formData = new FormData();
    
    // Ajout des champs simples
    formData.append('service', this.newEquipement.service);
    formData.append('description', this.newEquipement.description);
    formData.append('quantity', this.newEquipement.quantity.toString());
    formData.append('marque_modele', this.newEquipement.marque_modele);
    formData.append('amount_ht', this.newEquipement.amount_ht.toString());
    formData.append('acquisition_date', this.newEquipement.acquisition_date);
    formData.append('assignment', this.newEquipement.assignment);
    formData.append('status', this.newEquipement.status);
    formData.append('type', this.newEquipement.type);
    formData.append('type_depense', this.newEquipement.type_depense);
    
    // Ajout des IDs - partie critique
    if (this.newEquipement.supplier) {
      formData.append('supplier', this.newEquipement.supplier.toString());
    }
    
    if (this.newEquipement.site) {
      formData.append('site', this.newEquipement.site.toString());
    }
    
    // Ajout des champs de facture
    if (this.newEquipement.facture.bon_commande) {
      formData.append('bon_commande', this.newEquipement.facture.bon_commande);
    }
    
    if (this.newEquipement.facture.bon_livraison) {
      formData.append('bon_livraison', this.newEquipement.facture.bon_livraison);
    }
    
    if (this.newEquipement.facture.date_facture) {
      formData.append('date_facture', this.newEquipement.facture.date_facture);
    }
    
    // Ajout des fichiers
    if (this.fichierBonCommande) {
      formData.append('fichier_bon_commande', this.fichierBonCommande, this.fichierBonCommande.name);
    }
    
    if (this.fichierBonLivraison) {
      formData.append('fichier_bon_livraison', this.fichierBonLivraison, this.fichierBonLivraison.name);
    }
    
    // Pour déboguer - afficher tous les champs du FormData
    console.log("FormData:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    // Envoi des données
    this.equipementService.create(formData).subscribe({
      next: (response) => {
        console.log('Équipement ajouté avec succès:', response);
        this.resetForm();
        this.loadEquipements();
        
        // Fermer le modal
        const modalElement = document.getElementById('addEquipementModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'équipement:', error);
        // Afficher les détails de l'erreur pour le débogage
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
        alert('Une erreur s\'est produite lors de l\'ajout de l\'équipement.');
      }
    });
    
  }
  
  resetForm() {
    this.newEquipement = {
      service: '',
      description: '',
      quantity: 1,
      marque_modele: '',
      amount_ht: 0,
      acquisition_date: '',
      supplier: null,
      assignment: '',
      status: 'en_service',
      type: 'ordinateur',
      type_depense: 'opex',
      site: null,
      bon_commande: '',
      bon_livraison: '',
      date_facture: '',
      facture: {
        bon_commande: '',
        bon_livraison: '',
        date_facture: ''
      }
    };
    
    this.fichierBonCommande = null;
    this.fichierBonLivraison = null;
  }
}


