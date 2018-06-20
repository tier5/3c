import { ActivatedRoute, Data } from '@angular/router'
import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Moment } from 'moment'
import * as AdminActions from '../../../store/admin/admin.actions'
import * as DepartmentActions from '../../../store/department/department.actions'
import * as WidgetActions from '../../../store/widget/widget.actions'
import * as fromAuth from '../../../../store/auth/auth.reducers'
import * as fromAfterLogin from '../../../store/after-login.reducers'
import 'rxjs/add/operator/distinctUntilChanged'
import {AmazingTimePickerService} from "amazing-time-picker";

interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-create-widget',
  templateUrl: './create-widget.component.html',
  styleUrls: ['./create-widget.component.css']
})
export class CreateWidgetComponent implements OnInit, AfterViewChecked, OnDestroy {

  /** Variable Declaration */
  @ViewChild('form') form: NgForm;
  authState: Observable<fromAuth.State>;
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  afterLoginSubscription: Subscription;
  authSubscription: Subscription;
  editMode: boolean = false;
  widgetId: number;
  id: number;
  updateWidget: any;
  // startTime:any;
  widget = {
    id: 0,
    userId: 0,
    parentId: 0,
    departmentIdArray: [],
    website: '',
    scheduleTimezone: 0,
    details: '',
    areaCode: '',
    daysArray: '',
    startTime: '',
    endTime: '',
    image: ''
  };


  // config: IDatePickerConfig = {
  //   firstDayOfWeek: 'su',
  //   monthFormat: 'MMM, YYYY',
  //   disableKeypress: true,
  //   allowMultiSelect: false,
  //   closeOnSelect: undefined,
  //   closeOnSelectDelay: 100,
  //   onOpenDelay: 0,
  //   weekDayFormat: 'ddd',
  //   appendTo: document.body,
  //   drops: 'down',
  //   opens: 'right',
  //   showNearMonthDays: false,
  //   showWeekNumbers: false,
  //   enableMonthSelector: true,
  //   yearFormat: 'YYYY',
  //   showGoToCurrent: true,
  //   dayBtnFormat: 'DD',
  //   monthBtnFormat: 'MMM',
  //   hours12Format: 'hh',
  //   hours24Format: 'HH',
  //   meridiemFormat: 'A',
  //   minutesFormat: 'mm',
  //   minutesInterval: 1,
  //   secondsFormat: 'ss',
  //   secondsInterval: 1,
  //   showSeconds: false,
  //   showTwentyFourHours: false,
  //   timeSeparator: ':',
  //   multipleYearsNavigateBy: 10,
  //   showMultipleYearsNavigation: false,
  //   locale: 'en'
  // };
  validationMinTime: Moment;
  loggedInAdminId: number;

  imgSrc: any;
  departments: any;
  loader: boolean = false;
  /** Initializing variables */
  postedImage: File
  hideUploadedImage: boolean = true
  validationMaxTime: Moment;
  timePikerError:boolean = false;

  /** Service injection */
  constructor (private store: Store<fromAfterLogin.AfterLoginFeatureState>,
               private activatedRoute: ActivatedRoute,
               private cdr: ChangeDetectorRef,
               private element: ElementRef, private atp: AmazingTimePickerService) {
  }

  /** Function call when component initializes */
  ngOnInit () {
    this.store.dispatch(new AdminActions.GetAdminListAttempt())
    this.store.dispatch(new WidgetActions.GetTimeZoneListAttempt())
    this.authState = this.store.select('auth')
    this.afterLoginState = this.store.select('afterLogin')

    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if(data.isAdmin) {
            this.widget.userId = data.userId;
            this.loggedInAdminId = data.userId;
            this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: data.userId}));
          }
        }
      );

    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.editMode = data['editMode'];
        /** Perform operation is present mode is edit mode */
        if (this.editMode) {
          this.widgetId = this.activatedRoute.snapshot.params['id']
          this.store.dispatch(new WidgetActions.GetWidgetToEditAttempt({ widgetId: this.widgetId }));

          this.updateWidget = this.store.select('afterLogin')
            .map(data => data.widget.toEdit)
            .distinctUntilChanged()
            .subscribe(
              (widget) => {
                if(widget) {
                  this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId:  widget.user_id}))
                  this.widget.id = widget.id;
                  this.widget.userId = widget.user_id;
                  this.widget.website = widget.website;
                  this.widget.details = widget.details;
                  this.widget.scheduleTimezone = widget.schedule_timezone;
                  this.widget.areaCode = widget.area_code;
                  this.widget.startTime = widget.widget_schedule ? widget.widget_schedule.start_time : '';
                  this.widget.endTime = widget.widget_schedule ? widget.widget_schedule.end_time : '';
                  this.widget.daysArray = widget.widget_schedule ? (widget.widget_schedule.day).split(',') : '';
                  this.widget.departmentIdArray = widget.departments;
                  this.hideUploadedImage = false;
                  this.imgSrc = widget.image;
                //  const image = this.element.nativeElement.querySelector('.uploaded-image');
                //  image.src = widget.image;
                }
              }
            );
        }
      }
    )
    this.afterLoginSubscription = this.store.select('afterLogin')
      .map(data => data.widget.resetWidgetForm)
      .subscribe(
        (data) => {
          if (data) {
            this.form.reset();
            this.store.dispatch(new WidgetActions.ResetWidgetForm());
            if(!!this.loggedInAdminId) {
              this.form.form.patchValue({ userId: this.loggedInAdminId });
            }
          }
        }
      );
  }

  /** Function to detect changes */
  ngAfterViewChecked (): void {
    this.cdr.detectChanges();
  }

  /** Function call to create or edit a admin */
  onSubmit (form: NgForm) {
      this.loader = true;
    if (this.editMode) {
      const formDataEdit = new FormData();
      formDataEdit.append('id', <string><any>this.widget.id);
      formDataEdit.append('image', this.postedImage);
      formDataEdit.append('userId', <string><any>this.widget.userId);
      formDataEdit.append('departmentIdArray', form.value.departmentIdArray);
      formDataEdit.append('website', form.value.website);
      formDataEdit.append('details', form.value.details);
      formDataEdit.append('scheduleTimezone', form.value.scheduleTimezone);
      formDataEdit.append('areaCode', form.value.areaCode);
      formDataEdit.append('daysArray', form.value.daysArray);
      formDataEdit.append('startTime', form.value.startTime);
      formDataEdit.append('endTime', form.value.endTime);
      this.store.dispatch(new WidgetActions.EditWidgetAttempt(formDataEdit));
        setTimeout(() => {
                this.loader = false;
            }
            , 400);
    } else {
      const formData = new FormData();
      formData.append('image', this.postedImage);
      formData.append('userId', form.value.userId);
      formData.append('departmentIdArray', form.value.departmentIdArray);
      formData.append('website', form.value.website);
      formData.append('details', form.value.details);
      formData.append('scheduleTimezone', form.value.scheduleTimezone);
      formData.append('areaCode', form.value.areaCode);
      formData.append('daysArray', form.value.daysArray);
      formData.append('startTime', form.value.startTime);
      formData.append('endTime', form.value.endTime);
      this.store.dispatch(new WidgetActions.AddWidgetAttempt(formData));
        setTimeout(() => {
                this.loader = false;
            }
            , 800);
    }
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy () {
    this.afterLoginSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  /** Function call to upload image or video */
  fileUploaded (event) {

    if (event.target.files.length > 0) {
      this.hideUploadedImage = false
      this.postedImage = event.target.files[0]
    //  const image = this.element.nativeElement.querySelector('.uploaded-image')
      const reader = new FileReader()

      reader.onload = (fre: FileReaderEvent) => {
        this.imgSrc = fre.target.result
    //    image.src = src
      }

      reader.readAsDataURL(event.target.files[0])
    } else {
      this.hideUploadedImage = true
      this.postedImage = undefined
    }

  }

  /** Function to fetch department list with respect to adminId/userId */
  adminChanged (id: number) {
    if (!!id) {
      this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: id}))
    }
  }

  /** Function to remove uploaded image */
  removeUploadedImage() {
    this.hideUploadedImage = true;
    this.postedImage = undefined;
    this.imgSrc = '';
  }

  // /** Function call on change of 'from' date */
  // log1(event) {
  //     console.log('current'+event);
  //   if(event) {
  //     this.validationMinTime = event;
  //     // console.log(this.validationMinTime);
  //     // this.cdr.detectChanges();
  //     // const date = new Date(event);
  //     // console.log(date);
  //   }else{
  //       this.validationMinTime = this.form.value.startTime;
  //   }
  // }
  //   ngOnChanges(event) {
  //     console.log('this');
  //       this.log2(event)
  //   }

  /** Function call on change of 'to' date */
  log2(event) {
      this.timePikerError = false;
    if(event) {
        this.validationMinTime = this.form.value.startTime;
        this.validationMaxTime = event;
        console.log(this.validationMaxTime);
        if(this.validationMinTime > this.validationMaxTime) {
            this.timePikerError = true;
            this.form.controls['endTime'].setErrors({'incorrect': true});
        }
    }
  }


    openTimer() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.widget.startTime = time;
        });
    }

    // openEndTimer() {
    //     const amazingTimePicker = this.atp.open();
    //     amazingTimePicker.afterClose().subscribe(time => {
    //         this.widget.endTime = time;
    //        //  this.validationMaxTime = time;
    //        // this.validationMaxTime = this.widget.endTime;
    //     });
    //     this.validationMinTime = this.form.value.startTime;
    //     // this.validationMaxTime = this.widget.endTime;
    //     console.log(this.validationMaxTime);
    //     if(this.validationMinTime > this.validationMaxTime) {
    //         this.timePikerError = true;
    //         this.form.controls['endTime'].setErrors({'incorrect': true});
    //     }
    //     // this.log2(event);
    // }


}
