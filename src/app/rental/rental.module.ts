import { RentalRoutingModule } from "./rental-routing.module";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [CommonModule, RentalRoutingModule]
})
export class RentalModule {}
