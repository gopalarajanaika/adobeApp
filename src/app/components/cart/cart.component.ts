import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  @Input() cartItems: any = [];
  count: number = 0;
  discount: number = 0;
  actual: number = 0;
  display: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.cartItemsObs.subscribe((res) => {
      this.cartItems = res;
      this.calculateSummary();
    });
  }

  incDec(index, type) {
    if (type == "+") {
      this.cartItems[index].count += 1;
    } else if (type == "-") {
      if (this.cartItems[index].count > 0) {
        this.cartItems[index].count -= 1;
        if (this.cartItems[index].count == 0) this.cartItems.splice(index, 1);
      }
    }
    this.calculateSummary();
    this.sharedService.cartItemsObs.next(this.cartItems);
  }

  removeItem(index) {
    this.cartItems.splice(index, 1);
    this.calculateSummary();
    this.sharedService.cartItemsObs.next(this.cartItems);
  }

  updateCount() {
    this.calculateSummary();
    this.sharedService.cartItemsObs.next(this.cartItems);
  }

  calculateSummary() {
    this.count = 0;
    this.discount = 0;
    this.actual = 0;
    this.display = 0;
    this.cartItems.forEach((item) => {
      this.count += item.count;
      this.discount += (item.price.display - item.price.actual) * this.count;
      this.actual += item.price.actual * this.count;
      this.display += item.price.display * this.count;
    });
  }
}
