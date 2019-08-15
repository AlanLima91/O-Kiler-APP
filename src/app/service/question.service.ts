import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'https://o-killer.herokuapp.com/';

  constructor(private http: HttpClient) { }

  /**
   *  Retrieve all Questions
   *  return a table of question
   */
  getQuestions(): Observable<any>
  {
    return this.http.get<any>(this.url + 'questions').pipe(tap(data =>
      {
        data
      }),
      catchError(this.handleError('getQuestions', [])))
  }

  /**
   *  Read all Questions and look for one question
   *  return a question
   */
  getQuestion(key: string): Observable<any>
  {
    return this.http.get<any>(this.url + 'question/' + key);
  }

  /**
   *  Add a new Question to the table
   *  @param Question
   *  @return Observable
   */
  postQuestion(question: any): Observable<any>
  {
    return this.http.post<any>(this.url + 'question', question, {responseType: 'json'}).pipe(
        tap((question: any) => console.log('Question Added')),
        catchError(this.handleError<any>('addQuestion')),
      );
  }

  deleteQuestion(key: string): Observable<any>
  {
    return this.http.delete<any>(this.url + 'question/' + key).pipe(
      tap((question: any) => console.log('Question deleted')),
      catchError(this.handleError<any>('deleteQuestion')),
    );
  }

  updateQuestion(key: string, question: any): Observable<any>
  {
    return this.http.patch<any>(this.url + 'question/' + key, question).pipe(
      tap((question: any) => console.log('Question updated')),
      catchError(this.handleError<any>('updateQuestion')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for question consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
