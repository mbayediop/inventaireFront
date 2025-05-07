import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Equipement } from '../../../models/equipement.model';
import { Site } from '../../../models/site.model';
import { EquipementsService } from '../../services/equipements.service';
import { SitesService } from '../../services/sites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteWithCounts } from '../../../models/siteWithCounts.model';
import { EquipementCounts } from '../../../models/equipementCounts.model';


@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  equipements: Equipement[] = [];
    sites: SiteWithCounts[] = [];
    filteredSites: SiteWithCounts[] = [];
    searchTerm = '';
    selectedType = 'all';
  
    constructor(
      private equipementService: EquipementsService,
      private sitesService: SitesService,
    ) {}
  
    ngOnInit() {
      this.loadSites();
      this.loadEquipements();
    }
  
    loadEquipements() {
      this.equipementService.getEquipements().subscribe((data: Equipement[]) => {
        this.equipements = data;
        console.log('Équipements chargés:', this.equipements);
        this.updateEquipementCounts();
      });
    }
  
    loadSites() {
      this.sitesService.getSites().subscribe((data: Site[]) => {
        this.sites = data as SiteWithCounts[];
        this.filteredSites = [...this.sites];
        console.log('Sites chargés:', this.sites);
        this.updateEquipementCounts();
      });
    }
  
    filterSites(): void {
      this.filteredSites = this.sites.filter(site => {
        const typeMatch = this.selectedType === 'all' || site.type === this.selectedType;
        const searchMatch = site.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
        return typeMatch && searchMatch;
      });
    }
  
    // Méthode pour compter les équipements par type et par site
    updateEquipementCounts(): void {
      // Vérifie que les deux listes sont chargées
      if (this.sites.length === 0 || this.equipements.length === 0) return;
  
      // Pour chaque site, compter les équipements par type
      this.sites.forEach(site => {
        // Initialiser ou réinitialiser les compteurs
        site.equipementCounts = {
          ordinateur: 0,
          laptop: 0,
          imprimante: 0,
          pda: 0,
          caisse: 0,
          accessoire: 0,
          ecran: 0
        };
  
        // Compter les équipements pour ce site
        this.equipements.forEach(equipement => {
          // Vérifier si l'équipement appartient à ce site
          if (equipement.site && equipement.site.id === site.id) {
            // S'assurer que le type existe et incrémenter le compteur approprié
            if (equipement.type) {
              // Utiliser type assertion pour s'assurer que TypeScript comprend que c'est une clé valide
              const equipType = equipement.type as keyof EquipementCounts;
              site.equipementCounts[equipType]++;
            }
          }
        });
      });
  
      // Mise à jour des sites filtrés également
      this.filteredSites = [...this.sites];
    }
  
    // Méthode pour obtenir le nombre total d'équipements pour un site
    getTotalEquipements(site: SiteWithCounts): number {
      return Object.values(site.equipementCounts).reduce((total, count) => total + count, 0);
    }
  
    // Méthode pour vérifier si un type d'équipement a un compteur supérieur à zéro
    hasEquipement(site: SiteWithCounts, type: string): boolean {
      return site.equipementCounts[type as keyof EquipementCounts] > 0;
    }

}
