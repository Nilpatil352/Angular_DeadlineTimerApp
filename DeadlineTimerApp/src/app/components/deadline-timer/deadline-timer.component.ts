import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, switchMap, takeWhile } from 'rxjs/operators';
import { DeadlineService } from '../../services/deadline.service';


@Component({
  selector: 'app-deadline-timer',
  templateUrl: './deadline-timer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineTimerComponent implements OnInit {
  secondsLeft$!: Observable<number>;

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.secondsLeft$ = this.deadlineService.getInitialSecondsLeft().pipe(
      switchMap(initialSeconds =>
        interval(1000).pipe(
          map(elapsed => initialSeconds - elapsed),
          takeWhile(secondsLeft => secondsLeft >= 0)
        )
      )
    );
  }
}
