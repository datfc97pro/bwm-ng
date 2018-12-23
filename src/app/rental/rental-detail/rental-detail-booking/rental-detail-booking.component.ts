import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { AuthService } from "src/app/auth/shared/auth.service";
import { Rental } from "../../shared/rental.model";
import { Booking } from "src/app/booking/shared/booking.model";
import { HelperService } from "src/app/common/service/helper.service";
import * as moment from "moment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BookingService } from "src/app/booking/shared/booking.service";
import { DaterangePickerComponent } from "ng2-daterangepicker";
import { ToastrService } from "ngx-toastr";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"]
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: "left",
    autoUpdateInput: true,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(
    private helper: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private toastr: ToastrService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return (
      this.bookedOutDates.includes(this.helper.formatBookingDate(date)) ||
      date.diff(moment(), "days") < 0
    );
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(
      bookingData.startAt,
      bookingData.endAt
    );
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val("");
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  onPaymentConfirmed(paymentToken: any) {
    this.newBooking.paymentToken = paymentToken;
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success(
          "Booking has been succesfuly created, check your booking detail in manage section",
          "Success!"
        );
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -value.start.diff(value.end, "days");
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}