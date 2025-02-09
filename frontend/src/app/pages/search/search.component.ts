import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  items:Items[] = [];
  searchTerm = '';
  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.searchTerm = params.searchTerm;
    })
  }

  search(term:string):void {
    if(term)
    this.router.navigateByUrl('/search/'+term)
  }
}
