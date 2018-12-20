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

@NgModule({
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    HttpClientModule,
    NgPipesModule,
    MapModule
  ]
})
export class RentalModule {}
