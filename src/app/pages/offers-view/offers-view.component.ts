import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { OffersApiService } from '../../services/offers-api.service'
import { Offer } from '../../../models/offer';
import { Router } from '@angular/router';
import * as _ from "lodash"

@Component({
  selector: 'app-offers-view',
  templateUrl: './offers-view.component.html',
  styleUrls: ['./offers-view.component.scss']
})
export class OffersViewComponent implements OnInit, AfterViewInit {

  offerData!: Offer;
  dataSource = new MatTableDataSource();
  editMode = false;
  isFiltering = false;

  displayedColumns: string[] = ['id','title','description','points','businessId', "actions"];

  @ViewChild("offerForm", { static: false }) offerForm!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serviceOffer: OffersApiService, private router: Router) {
    this.offerData = {} as Offer
  }



  ngOnInit(): void {
    this.getAllOffers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Del hijo le estamos pasando al padre
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getAllOffers(): void {
    this.serviceOffer.getAll().subscribe((response: any) => { this.dataSource.data = response })
  }

  editItem(element: any): void {
    console.log(element);
    this.offerData = _.cloneDeep(element);
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.offerForm.resetForm();
  }

  deleteOffer(id: number): void {
    this.serviceOffer.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((item: any) => item.id != id)
    });
    console.log(this.dataSource.data)
  }

  addOffer(): void {
    const newOffer = {
      title: this.offerData.title,
      description: this.offerData.title,
      points: this.offerData.description,
      businessId: this.offerData.businessId
    }
    this.serviceOffer.create(newOffer).subscribe((newItem: any) => {
      this.dataSource.data.push({...newItem})
      this.dataSource.data = this.dataSource.data.map((item)=>item)
    });
  }

  updateOffer() {
    this.serviceOffer.update(this.offerData.id, this.offerData).subscribe((toUpdatedItem: any) => {
      this.dataSource.data = this.dataSource.data.map((item: any) => {
        if (item.id == toUpdatedItem.id)
          item = toUpdatedItem
        return item;
      })
    });
    this.cancelEdit();
  }

  onSubmit() {
    if(this.offerForm.form.valid) {
      if(this.editMode) {
        this.updateOffer();
      }
      else {
        this.addOffer()
      }
    }else {
      console.log("Invalid data!")
    }
  }

  // navigateToAddOffer(): void {
  //   this.router.navigate(['/admin/Offer/new']).then(()=> console.log("Navigate to add Offer"))
  // }

  // navigateToEditOffer(OfferId: number): void {
  //   this.router.navigate([`/admin/Offer/${OfferId}`]).then(()=> console.log("Navigate to edit Offer"))
  // }

  refresh(): void {
    console.log("Reloaded");
    this.getAllOffers();
  }

}
