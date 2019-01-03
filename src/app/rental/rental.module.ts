import { ImageUploadModule } from "./../common/components/image-upload/image-upload.module";
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
import { NgPipesModule, UcWordsPipe } from "ngx-pipes";
import { Daterangepicker } from "ng2-daterangepicker";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";
import { FormsModule } from "@angular/forms";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";
import { RentalUpdateComponent } from "./rental-update/rental-update.component";
import { EditableModule } from "../common/components/editable/editable.module";
import { RentalGuard } from "./shared/rental.guard";
import { PaymentModule } from "../payment/payment.module";

@NgModule({
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalUpdateComponent
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    EditableModule,
    ImageUploadModule,
    PaymentModule
  ],
  providers: [UcWordsPipe, RentalGuard]
})
export class RentalModule {}
