import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { DataService } from "../../services/data.service";
import { BehaviorSubject } from "rxjs";
import { SharedService } from "src/app/services/shared.service";
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit{
  items: any = [];
  cartItems: any = [];
  minPrice:number = 100;
  maxPrice:number = 100000;
  itemsTemp: any = [];
  searchText:string;

  constructor(
    private dataService: DataService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    console.log("home");
    this.sharedService.cartItemsObs.subscribe((res) => {
      this.cartItems = res;
    });
    this.sharedService.searchTextObs.subscribe((res:string) => {
      this.searchText = res;
      // console.log(res);
      
    });
    this.getProducts();
  }


  addToCart(item) {
    let index = this.cartItems.findIndex((x) => x.name == item.name);
    if (index == -1) {
      item.count = 1;
      this.cartItems.push(item);
    } else {
      this.cartItems[index].count += 1;
    }
    this.sharedService.cartItemsObs.next(this.cartItems);
  }

  sortByType(type) {
    console.log(type);
    if (type == "low-high") {
      this.items.sort((a, b) => {
        return a.price.actual - b.price.actual;
      });
    } else if (type == "high-low") {
      this.items.sort((a, b) => {
        return b.price.actual - a.price.actual;
      });
    } else if (type == "discount") {
      this.items.sort((a, b) => {
        return a.discount - b.discount;
      });
    }
  }

  applyFilter(args){
    let [minPrice, maxPrice] = [...args]
      if (minPrice) {
        this.items = this.itemsTemp.filter(_item => {
          return _item.price.actual >= +minPrice;
        });
      } 
      
      if (maxPrice) {
        this.items = this.itemsTemp.filter(_item => {
          return _item.price.actual <= +maxPrice;
        });
      }
  }

  getProducts() {
    this.dataService.getProducts().subscribe((res: any) => {
      this.items = res.items;
      this.itemsTemp = res.items;
    });
  }
}
