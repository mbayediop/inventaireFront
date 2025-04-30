import { Component } from '@angular/core';
import { EquipementsService } from '../../services/equipements.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipement } from '../../../models/equipement.model';
declare var bootstrap: any;

@Component({
  selector: 'app-equipements',
  imports: [CommonModule, FormsModule ],
  templateUrl: './equipements.component.html',
  styleUrl: './equipements.component.css'
})
export class EquipementsComponent {
  
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

  constructor(private equipementService: EquipementsService) {}

  ngOnInit() {
  this.loadEquipements();
  console.log(this.equipements)
}

loadEquipements() {
  this.equipementService.getEquipements().subscribe((data: any) => {
    this.equipements = data;
    this.filteredEquipements = this.equipements.slice(0, this.pageSize);
  });
}

  filterEquipements() {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.equipements.filter(equipement =>
      (equipement.type && equipement.type.toLowerCase().includes(term)) ||
      (equipement.status && equipement.status.toLowerCase().includes(term))
    );
    
    // Après filtre, remettre la pagination à la première page
    this.currentPage = 1;
    this.filteredEquipements = filtered.slice(0, this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    const term = this.searchTerm.toLowerCase();
    const filtered = this.equipements.filter(equipement =>
      (equipement.assignment && equipement.assignment.toLowerCase().includes(term)) ||
      (equipement.status && equipement.status.toLowerCase().includes(term)) 
    );
  
    this.filteredEquipements = filtered.slice(startIndex, endIndex);
  } 

  get totalFilteredEquipements(): number {
    const term = this.searchTerm.toLowerCase();
    return this.equipements.filter(equipement =>
      (equipement.assignment && equipement.assignment.toLowerCase().includes(term)) ||
      (equipement.status && equipement.status.toLowerCase().includes(term))
    ).length;
  }

  getTotalMontantHT(): number {
    return this.filteredEquipements.reduce((total, equipement) => {
      return total + parseFloat(equipement.total_amount_ht || 0);
    }, 0);
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
        this.loadEquipements(); // Recharge la liste après suppression
      });
    }
  }
  
}