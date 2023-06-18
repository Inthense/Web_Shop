import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InterfaceCommentAdd } from 'src/app/interfaces/InterfaceCommentAdd';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment!:Comment;
  user!:User;
  isSubmitted = false;
  commentForm!: FormGroup;


  constructor(private commentsService:CommentsService, activatedRoute:ActivatedRoute, private userService:UserService, private formBuilder:FormBuilder) {
  userService.userObservable.subscribe((newUser) => {
    this.user = newUser;
  })
}



ngOnInit():void {
  this.commentForm = this.formBuilder.group({
    comment: ['', [Validators.required]]
  });
}

get fc() {
  return this.commentForm.controls;
}

submit() {
  this.isSubmitted = true;
  if(this,this.commentForm.invalid)
  return;
  const fv = this.commentForm.value;
  const comment:InterfaceCommentAdd = {
    name: this.user.name,
    comment: fv.comment
  };
  this.commentsService.addComment(comment).subscribe(_ => {
  })
  location.reload();
}
}
