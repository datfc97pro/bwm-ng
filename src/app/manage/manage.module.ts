import { ManageRoutingModule } from "./mange-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageComponent } from "./manage.component";
import { ManageRentalComponent } from "./manage-rental/manage-rental.component";
import { ManageBookingComponent } from "./manage-booking/manage-booking.component";
import { NgPipesModule } from "ngx-pipes";
import { FormatDatePipe } from "../common/pipes/format-date.pipe";
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

@NgModule({
  declarations: [
    ManageComponent,
    ManageRentalComponent,
    ManageBookingComponent,
    FormatDatePipe,
    ManageRentalBookingComponent
  ],
  imports: [CommonModule, ManageRoutingModule, NgPipesModule]
})
export class ManageModule {}
