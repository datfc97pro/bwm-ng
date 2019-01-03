import { HttpModule } from "@angular/http";
import { ImageUploadComponent } from "./image-upload.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [CommonModule, HttpModule, ImageCropperModule],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule {}
