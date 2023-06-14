import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  user:User[] = [];
  searchTerm = '';
  constructor(private userService:UserService, activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.searchTerm = params.searchTerm;
    })
      let itemsObservable:Observable<User[]>;
      activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      itemsObservable = this.userService.getAllUserSearchTerm(params.searchTerm)
      else
      itemsObservable=userService.getAll();

      itemsObservable.subscribe((serverItems) => {
        this.user = serverItems;
      })
    })
  }

  search(term:string):void {
    if(term)
    this.router.navigateByUrl('/admin-page/user-search/'+term)
  }


  deleteUser(userName: string): void {
    this.userService.deleteUser(userName).subscribe({
      next: () => {
        console.log('Nutzer erfolgreich gelöscht.');
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Nutzers:', error);
      },
      complete: () => {
      }
    });
    location.reload();
  }
}
