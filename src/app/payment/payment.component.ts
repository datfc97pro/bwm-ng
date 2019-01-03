import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from "ngx-stripe";
import { AuthService } from "../auth/shared/auth.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit, OnDestroy {
  elements: Elements;
  card: StripeElement;

  @Output() paymentConfirmed = new EventEmitter();

  isValidatingCard: boolean = false;
  error: string = "";
  token: any;

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: "auto"
  };

  constructor(
    private stripeService: StripeService,
    private authSerive: AuthService
  ) {}

  ngOnInit() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create("card", { style });
        this.card.mount("#card-element");
        this.card.addEventListener("change", this.onChange);
      }
    });
  }

  ngOnDestroy() {
    this.card.removeEventListener("change", this.onChange);
    this.card.destroy();
  }

  onChange = event => {
    const { error } = event;

    if (error) {
      this.error = error.message;
    } else {
      this.error = "";
    }
  };

  async onSubmit() {
    this.isValidatingCard = true;

    const name = await this.authSerive.getUsername();

    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        this.token = result.token;
        console.log(result.token);
        this.paymentConfirmed.next(result.token);

        this.isValidatingCard = false;
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });
  }

  isCardValid = (): boolean => {
    if (this.card) {
      return this.card._complete;
    }
  };
}

const style = {
  base: {
    iconColor: "#666EE8",
    color: "#31325F",
    lineHeight: "40px",
    fontWeight: 300,
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "18px",
    "::placeholder": {
      color: "#CFD7E0"
    }
  }
};
