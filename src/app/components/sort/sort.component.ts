import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Output() sortByType = new EventEmitter<string>();
  sortByVal: string;

  constructor() { }

  ngOnInit() {
  }

  sortBy(type){
    this.sortByVal = type;
    this.sortByType.emit(type);
  }

}
