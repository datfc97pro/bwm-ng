import { MapComponent } from "./map.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { CamelizePipe } from "ngx-pipes";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM"
    })
  ],
  providers: [
    CamelizePipe
  ]
})
export class MapModule {}
