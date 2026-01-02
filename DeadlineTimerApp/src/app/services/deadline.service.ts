import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface DeadlineResponse {
  secondsLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private readonly apiUrl = '/api/deadline';

  constructor(private http: HttpClient) {}

  getInitialSecondsLeft(): Observable<number> {
    return this.http.get<DeadlineResponse>(this.apiUrl).pipe(
      map(res => res.secondsLeft),
      catchError(error => {
        console.warn('Deadline API failed, using mock data', error);
        return of(25); 
      }),
      shareReplay(1)
    );
  }
}
