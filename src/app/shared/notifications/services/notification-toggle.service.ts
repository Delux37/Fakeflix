import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationToggleService {
  $notificationText: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Default Notification Message'
  ); // text
  $textColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    'light-content'
  ); // text color = 'dark-content' | 'light-content'
  $backgroundColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    'primary'
  ); // colors from palette
  $notificationVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  notificationTimer: any;

  toggleNotification(
    text?: string | null,
    color?: string | null,
    background?: string | null
  ) {
    console.log('here')
    // tslint:disable:no-unused-expression
    text && this.$notificationText.next(text);
    color && this.$textColor.next(color);
    background && this.$backgroundColor.next(background);
    this.$notificationVisible.next(true);
    this.notificationTimer = setTimeout(() => {
      this.$notificationVisible.next(false);
    }, 2000);
  }

  closeNotification() {
    this.$notificationVisible.next(false);
    clearTimeout(this.notificationTimer);
  }

  constructor() {}
}