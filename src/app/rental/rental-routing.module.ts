import { RentalUpdateComponent } from "./rental-update/rental-update.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalComponent } from "./rental.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/shared/auth.guard";
import { RentalGuard } from "./shared/rental.guard";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: "new",
        component: RentalCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":rentalId/edit",
        component: RentalUpdateComponent,
        canActivate: [AuthGuard, RentalGuard]
      },
      {
        path: ":rentalId",
        component: RentalDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":city/homes",
        component: RentalSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule {}
