import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = 'https://o-killer.herokuapp.com/';

  constructor(private http: HttpClient) { }

  /**
   *  Retrieve all Tags
   *  return a table of tags
   */
  getTags(): Observable<any>
  {
    return this.http.get<any>(this.url + 'tags').pipe(tap(data => {
        data
      }),
      catchError(this.handleError('getTags', [])))
  }

  /**
   *  Read all Tags and look for one tag
   *  return a tag
   */
  getTag(key: string): Observable<any>
  {
    return this.http.get<any>(this.url + 'tag/' + key);
  }

  /**
   *  Add a new Tag to the table
   *  @param Tag
   *  @return Observable
   */
  postTag(tag: any): Observable<any>
  {
    return this.http.post<any>(this.url + 'tag', tag, {responseType: 'json'}).pipe(
        tap((tag: any) => console.log('Tag Added')),
        catchError(this.handleError<any>('addTag')),
      );
  }

  deleteTag(key: string): Observable<any>
  {
    return this.http.delete<any>(this.url + 'tag/' + key).pipe(
      tap((tag: any) => console.log('Tag deleted')),
      catchError(this.handleError<any>('deleteTag')),
    );
  }

  updateTag(key: string, tag: any): Observable<any>
  {
    return this.http.patch<any>(this.url + 'tag/' + key, tag).pipe(
      tap((tag: any) => console.log('Tag updated')),
      catchError(this.handleError<any>('updateTag')),
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

      // TODO: better job of transforming error for tag consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
