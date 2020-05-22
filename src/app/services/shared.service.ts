import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {

  cartItemsObs = new BehaviorSubject([]);
  searchTextObs = new Subject();

  constructor() {}
}
