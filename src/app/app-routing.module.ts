import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from "./pages/home-view/home-view.component"
import { OffersViewComponent } from "./pages/offers-view/offers-view.component"

const routes: Routes = [
  { path: "" , component: HomeViewComponent },
  { path: "home" , component: HomeViewComponent },
  { path: "business/offers" , component: OffersViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
