import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserRoutingModule } from "./user-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ImageUploadModule } from "../common/components/image-upload/image-upload.module";
import { EditableModule } from "../common/components/editable/editable.module";

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ImageUploadModule,
    EditableModule
  ]
})
export class UserModule {}
