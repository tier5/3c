import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../../../shared/spinner';
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  selector: 'app-subaccount',
  templateUrl: './subaccount.component.html',
  styleUrls: ['./subaccount.component.css']
})
export class SubaccountComponent implements OnInit {
  subaccountList: any;
  term: any;
  constructor(private spinnerService: SpinnerService, private httpClient: HttpClient,
              private _swal: SweetAlertService) { }

  ngOnInit() {
      this.subaccountList = [];
      this.fetchTwillioAccount();
  }

    deleteSubAccount(userId, sid, token) {
        const formData: FormData = new FormData();
        formData.append('userId', userId);
        formData.append('twilioSid', sid);
        formData.append('twilioToken', token);
        const that = this;
        this._swal.warning({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result) {
                const apiUrl = environment.API_BASE_URL + 'close-twilio-account';
                const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest').set('enctype', 'multipart/form-data');
                const config = {
                    headers: headers
                };
                that.spinnerService.show();
                that.httpClient.post(apiUrl, formData, config)
                    .subscribe((res: any) => {
                        that.spinnerService.hide();
                        if (res.status) {
                            that.fetchTwillioAccount();
                        } else {
                            console.log(res);
                        }
                    });
            }
        }, (dismiss) => {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                console.log('cancel');
            }
        });
    }
    fetchTwillioAccount() {
        const apiUrl = environment.API_BASE_URL + 'list-all-twilio-accounts';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest').set('enctype', 'multipart/form-data');
        const config = {
            headers: headers
        };
        this.spinnerService.show();
        this.httpClient.post(apiUrl, config)
            .subscribe((res: any) => {
                this.spinnerService.hide();
                if (res.status) {
                    this.subaccountList = res.response;
                } else {
                    this.subaccountList = [];
                }
            });
    }
}
