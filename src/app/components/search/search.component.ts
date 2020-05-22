import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText:string;
  showsearchFlag:boolean = false;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  updateSearch(){
    this.sharedService.searchTextObs.next(this.searchText);
  }


}
