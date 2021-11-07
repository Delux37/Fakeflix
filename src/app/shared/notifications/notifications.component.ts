import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationToggleService } from './services/notification-toggle.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  notificationText$: Observable<string> =
    this.notificationToggle.$notificationText.asObservable();
  textColor$: Observable<string> =
    this.notificationToggle.$textColor.asObservable();
  backgroundColor$: Observable<string> =
    this.notificationToggle.$backgroundColor.asObservable();
  visibleStatus$ = this.notificationToggle.$notificationVisible.asObservable();

  constructor(private notificationToggle: NotificationToggleService) {}

  closeNotification() {
    this.notificationToggle.closeNotification();
  }

  ngOnInit(): void {}
}
