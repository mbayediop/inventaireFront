import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Equipement } from '../../../models/equipement.model';
import { Site } from '../../../models/site.model';
import { EquipementsService } from '../../services/equipements.service';
import { SitesService } from '../../services/sites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  equipements: Equipement[] = [];
  sites: Site[]= [];
  filteredSites: Site[]= [];
  searchTerm='';
  selectedType='all';

  constructor(
      private equipementService: EquipementsService,
      private sitesService: SitesService,)
      {}

ngOnInit() {
  this.loadEquipements();
  this.loadSites();
}

loadEquipements() {
  this.equipementService.getEquipements().subscribe((data: any) => {
    this.equipements = data;
    console.log(this.equipements)
  });
}

loadSites(){
  this.sitesService.getSites().subscribe((data: any) =>{
    this.sites = data;

    console.log(this.sites)
  })
}


filterSites(): void {
  this.filteredSites = this.sites.filter(site => {
    const typeMatch = this.selectedType === 'all' || site.type === this.selectedType;
    const searchMatch = site.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });
 
}

}
