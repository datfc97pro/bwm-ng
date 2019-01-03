import { ManageModule } from "./manage/manage.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "./auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { RentalModule } from "./rental/rental.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { NgxStripeModule } from "ngx-stripe";

import { EditableModule } from "./common/components/editable/editable.module";
import { UserModule } from "./user/user.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ManageModule,
    EditableModule,
    NgxStripeModule.forRoot("pk_test_fm3f1nL7BFBmXMuLC5OawOPz"),
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
