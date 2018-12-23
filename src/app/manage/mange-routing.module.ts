import { ManageComponent } from "./manage.component";
import { ManageBookingComponent } from "./manage-booking/manage-booking.component";
import { AuthGuard } from "./../auth/shared/auth.guard";
import { ManageRentalComponent } from "./manage-rental/manage-rental.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      {
        path: "rentals",
        component: ManageRentalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "bookings",
        component: ManageBookingComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule {}
