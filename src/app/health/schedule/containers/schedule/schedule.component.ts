import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">

      <app-schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </app-schedule-calendar>

    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
