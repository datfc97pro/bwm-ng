import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(userId: string): Observable<any> {
    return this.http.get(`/api/v1/users/${userId}`);
  }

  public uploadImage(image: File): Observable<string | any> {
    const formData = new FormData();

    formData.append("image", image);

    return this.http.post("/api/v1/image-upload", formData).pipe(
      map((json: any) => {
        return json.imageUrl;
      })
    );
  }

  public updateUser(userData: any): Observable<any> {
    return this.http.put("/api/v1/users", userData);
  }
}
