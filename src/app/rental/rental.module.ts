import { MapModule } from "./../common/map/map.module";
import { UppercasePipe } from "./../common/pipes/uppercase.pipe";
import { HttpClientModule } from "@angular/common/http";
import { RentalRoutingModule } from "./rental-routing.module";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgPipesModule } from "ngx-pipes";
import { Daterangepicker } from "ng2-daterangepicker";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";
import { FormsModule } from "@angular/forms";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";

@NgModule({
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ]
})
export class RentalModule {}
