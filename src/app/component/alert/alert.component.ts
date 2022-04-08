import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
private subscription: Subscription;
    alertmessage: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(alertmessage => {
                switch (alertmessage && alertmessage.type ) {
                    case 'success':
                        alertmessage.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        alertmessage.cssClass = 'alert alert-danger';
                        break;
                }

                this.alertmessage = alertmessage;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
