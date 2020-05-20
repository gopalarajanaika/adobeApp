import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-cart-icon",
  templateUrl: "./cart-icon.component.html",
  styleUrls: ["./cart-icon.component.scss"],
})
export class CartIconComponent implements OnInit {
  @Input() cartItems: any = [];
  count: number;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.cartItemsObs.subscribe((res) => {
      this.cartItems = res;
      this.count = this.cartItems.reduce((total, item) => {
        return (total += item.count);
      },0);
    });
  }
}
