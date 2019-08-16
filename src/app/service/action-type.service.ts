import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionTypeService {
  url = 'https://o-killer.herokuapp.com/';

  constructor(private http: HttpClient) { }
}
