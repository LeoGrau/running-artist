import { Component, OnInit } from '@angular/core';
import { size } from 'lodash';
import { Offer } from 'src/models/offer';
import { OffersApiService } from "../../services/offers-api.service"

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  numberOffer: number = 0;
  collection: Array<Offer> = [];
  constructor(private serviceOffer: OffersApiService) { }

  ngOnInit(): void {
    this.getQuantity();
  }

  getQuantity() {
    this.serviceOffer.getAll().subscribe((response: any) => {
      this.numberOffer =  size(response);
    })
  }
}
