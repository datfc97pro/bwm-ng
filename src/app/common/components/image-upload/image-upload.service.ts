import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<string | any> {
    const formData = new FormData();

    formData.append("image", image);

    return this.http.post("/api/v1/image-upload", formData).pipe(
      map((json: any) => {
        return json.imageUrl;
      })
    );
  }
}
