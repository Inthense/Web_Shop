import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments:Comment[] = [];
  user!:User;

  constructor(private commentsService:CommentsService, activatedRoute:ActivatedRoute, private userService:UserService) {
      let commentsObservable:Observable<Comment[]>;
      let commentObservable:Observable<Comment>;
      activatedRoute.params.subscribe((params) => {
      commentsObservable=commentsService.getAll();

      commentsObservable.subscribe((serverComments) => {
        this.comments = serverComments;
      })
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }


}

