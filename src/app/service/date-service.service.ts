import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {


  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  constructor() { }

  getWeekStart(timestamp?:any) {
    let date:any = timestamp ? moment(timestamp) : moment();
    date = date.startOf('week');
    date = moment.tz(date.toISOString().split('.')[0], this.timeZone).toDate();
    return date;
  }
  
  getWeekEnd(timestamp?:any) {
    let date:any = timestamp ? moment(timestamp) : moment();
    date = date.endOf('week');
    date = moment.tz(date.toISOString().split('.')[0], this.timeZone).toDate();
    return date;
  }
  
  getStartOf(timestamp?:any, type?:any) {
    if ('week' === type) {
      return this.getWeekStart(timestamp);
    }
    let date = timestamp ? DateTime.fromJSDate(new Date(timestamp)) : DateTime.local();
    date = date.setZone(this.timeZone).startOf(type);
    return date.toJSDate();
  }
  
  getEndOf(timestamp?:any, type?:any) {
    if ('week' === type) {
      return this.getWeekEnd(timestamp);
    }
    let date = timestamp ? DateTime.fromJSDate(new Date(timestamp)) : DateTime.local();
    date = date.setZone(this.timeZone).endOf(type);
    return date.toJSDate();
  }
}
