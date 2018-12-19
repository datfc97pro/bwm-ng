import { Rental } from "./rental.model";
import { Observable, observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  private rentals: Rental[] = [
    {
      id: "1",
      title: "Central Apartment",
      city: "New York",
      street: "Times Square",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createAt: "24/12/2017"
    },
    {
      id: "2",
      title: "Central Apartment 2",
      city: "New York 3",
      street: "Times Square 4",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createAt: "24/12/2017"
    }
  ];

  constructor() {}

  getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>(observable => {
      observable.next(this.rentals);
    });
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>(observable => {
      const foundRental = this.rentals.find(rental => {
        return rental.id === rentalId;
      });
      observable.next(foundRental);
    });
  }
}
