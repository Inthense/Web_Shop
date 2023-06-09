import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-page',
  templateUrl: './current-page.component.html',
  styleUrls: ['./current-page.component.css']
})
export class CurrentPageComponent {


  @Input()
  title!:string;

  // style cahnges
  @Input()
  margin? = '1rem 0 1rem 0.2rem';

  @Input()
  fontSize? = '1.7rem';

}
