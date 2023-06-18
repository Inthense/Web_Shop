import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { COMMENTS_URL, COMMENT_ADD_URL } from '../urls';
import { Comment } from 'src/app/models/comment.model';
import { InterfaceCommentAdd } from '../interfaces/InterfaceCommentAdd';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) {
  }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(COMMENTS_URL);
  }

  addComment(commentAdd:InterfaceCommentAdd): Observable<Comment> {
    return this.http.post<Comment>(COMMENT_ADD_URL, commentAdd).pipe(
      tap({
        next: (com) => {
          console.log("Kommentar hinzugefügt")
        },
        error: (errorResponse) => {
          console.log("Hinzufügen fehlgeschlagen")
        }
      })
    )
  }
}
