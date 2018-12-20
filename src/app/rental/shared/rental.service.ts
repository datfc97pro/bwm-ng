import { HttpClient } from "@angular/common/http";
import { Rental } from "./rental.model";
import { Observable, observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals");
  }

  getRentalById(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}`);
  }
}
