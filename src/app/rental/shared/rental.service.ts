import { HttpClient } from "@angular/common/http";
import { Rental } from "./rental.model";
import { Observable, observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentalById(rentalId: string): Observable<any> {
    return this.http.get("/api/v1/rentals/" + rentalId);
  }

  getRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals");
  }

  getRentalsByCity(city: string): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }

  createRental(rental: Rental): Observable<any> {
    return this.http.post("/api/v1/rentals", rental);
  }

  getUserRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals/manage");
  }

  deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`);
  }

  updateDental(rentalId: string, rentalData: any): Observable<any> {
    return this.http.patch(`/api/v1/rentals/${rentalId}`, rentalData);
  }

  verifyRentalUser(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}/verify-user`);
  }
}
