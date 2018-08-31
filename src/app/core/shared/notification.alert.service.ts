
import { Injectable} from '@angular/core';

@Injectable()
export class NotificationAlertService {
  isNotification: boolean = true;
  getIsNotification() {
    return this.isNotification;
  }
  setIsNotification(data: boolean) {
    this.isNotification = data;
  }
}
