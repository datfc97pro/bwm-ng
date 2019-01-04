import { of as observableOf, Observable } from "rxjs";

import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { RentalService } from "./rental.service";
import { Location } from "@angular/common";

@Injectable()
export class RentalGuard implements CanActivate {
  constructor(
    private rentalService: RentalService,
    private router: Router,
    private _location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const rentalId: string = route.params.rentalId;

    return this.rentalService.verifyRentalUser(rentalId).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        // this.router.navigate(["/rentals"]);
        this._location.back();
        return observableOf(false);
      })
    );
  }
}