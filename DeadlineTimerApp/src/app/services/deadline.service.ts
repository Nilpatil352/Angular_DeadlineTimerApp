import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      shareReplay(1)
    );
  }
}
