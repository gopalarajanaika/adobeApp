import { Component, OnInit, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  
  @Output() filterRange = new EventEmitter<any>();
  value: any = [100, 100000];
  enabled: true;
  disableApplyBtn: boolean = true;
  constructor() {}

  ngOnInit() {
  }

  applyFilter() {
    this.filterRange.emit([this.value[0], this.value[1]])
    this.disableApplyBtn = true;
  }

  change() {
    this.disableApplyBtn = false;
  }
}
