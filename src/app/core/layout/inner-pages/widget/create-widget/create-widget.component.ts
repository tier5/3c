import {ActivatedRoute, Data, Router} from '@angular/router';
import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Moment} from 'moment';
import * as AdminActions from '../../../store/admin/admin.actions';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as WidgetActions from '../../../store/widget/widget.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import 'rxjs/add/operator/distinctUntilChanged';
import {AmazingTimePickerService} from 'amazing-time-picker';

interface FileReaderEventTarget extends EventTarget {
  result: string;
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
  adminList: Subscription;
  editMode = false;
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
    contains: '',
    daysArray: [],
    startTime: '',
    endTime: '',
    image: '',
    script_url: '',
  };

  validationMinTime: Moment;
  loggedInAdminId: number;
  endTime: any;
  imgSrc: any;
  departments: any;
  loader = false;
  /** Initializing variables */
  postedImage: File;
  hideUploadedImage = true;
  validationMaxTime: Moment;
  timePikerError = false;

  listOfAdmins = [];
  updatedlistOfAdmins = [];
  adminName: any;
  showThis = true;
  dropdownSettings = {};
  limitArray = [];
  departmentArrayId = [];
  departmentIdList = '';
  numberError = false;
  numberErrorMessage = '';
  isBuyNumber = false;
  availableNumbers = [];
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private element: ElementRef, private atp: AmazingTimePickerService, private router: Router) {
  }

  /** Function call when component initializes */
  ngOnInit() {
    this.store.dispatch(new AdminActions.GetAdminListAttempt());
    this.store.dispatch(new WidgetActions.GetTimeZoneListAttempt());
    this.authState = this.store.select('auth');
    this.afterLoginState = this.store.select('afterLogin');

    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.isAdmin) {
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
          this.widgetId = this.activatedRoute.snapshot.params['id'];
          this.store.dispatch(new WidgetActions.GetWidgetToEditAttempt({widgetId: this.widgetId}));

          this.updateWidget = this.store.select('afterLogin')
            .map(data => data.widget.toEdit)
            .distinctUntilChanged()
            .subscribe(
              (widget) => {
                if (widget) {
                  this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: widget.user_id}));
                  this.widget.id = widget.id;
                  this.widget.userId = widget.user_id;
                  this.widget.website = widget.website;
                  this.widget.details = widget.details;
                  this.widget.scheduleTimezone = widget.schedule_timezone;
                  this.widget.areaCode = widget.area_code;
                  this.widget.script_url = widget.script_url;
                  this.widget.startTime = widget.widget_schedule ? widget.widget_schedule.start_time : '';
                  this.widget.endTime = widget.widget_schedule ? widget.widget_schedule.end_time : '';
                  this.widget.daysArray = widget.widget_schedule ? (widget.widget_schedule.day).split(',') : '';
                  this.widget.departmentIdArray = widget.departments;
                  this.hideUploadedImage = false;
                  this.imgSrc = widget.image;
                  this.adminName = widget.first_name + ' ' + widget.last_name;
                  //  const image = this.element.nativeElement.querySelector('.uploaded-image');
                  //  image.src = widget.image;
                }
              }
            );
        }
      }
    );
    this.afterLoginSubscription = this.store.select('afterLogin')
      .map(data => data.widget.resetWidgetForm)
      .subscribe(
        (data) => {
          if (data) {
            this.form.reset();
            this.store.dispatch(new WidgetActions.ResetWidgetForm());
            if (!!this.loggedInAdminId) {
              this.form.form.patchValue({userId: this.loggedInAdminId});
            }
          }
        }
      );

    this.adminList = this.store.select('afterLogin').map(data => data)
      .subscribe(
        (data) => {
          if (data.admin.list) {
            this.listOfAdmins = data.admin.list;
          }
        }
      );
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Department',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'department_name'
    };
    this.limitArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  onChangeDaysArray(data: string, checked: boolean) {
    if (checked) {
      this.widget.daysArray.push(data);
    } else {
      this.removeDaysArray(data);
    }
  }

  removeDaysArray(data) {
    this.widget.daysArray = this.widget.daysArray.filter(function (item) {
      return item !== data;
    });
  }

  /** Function to detect changes */
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  /** Function call to create or edit a admin */
  onSubmit(form: NgForm) {
    this.loader = true;
    for (let departmentId in form.value.departmentIdArray) {
      this.departmentArrayId.push(form.value.departmentIdArray[departmentId].id);
    }
    if (this.editMode) {
      const formDataEdit = new FormData();
      formDataEdit.append('id', <string><any>this.widget.id);
      formDataEdit.append('image', this.postedImage);
      formDataEdit.append('userId', <string><any>this.widget.userId);
      formDataEdit.append('departmentIdArray', <any>this.departmentArrayId);
      formDataEdit.append('website', form.value.website);
      formDataEdit.append('details', form.value.details);
      formDataEdit.append('scheduleTimezone', form.value.scheduleTimezone);
      formDataEdit.append('areaCode', form.value.areaCode);
      formDataEdit.append('daysArray', <any>this.widget.daysArray);
      formDataEdit.append('startTime', form.value.startTime);
      formDataEdit.append('endTime', form.value.endTime);
      this.store.dispatch(new WidgetActions.EditWidgetAttempt(formDataEdit));
      /** Loader Show/Hide */
      this.store.select('alert')
        .map(data => data)
        .subscribe(
          (data) => {
            if (data.show && data.type === 'danger') {
              this.loader = false;
            }
            if (data.show && data.type === 'success') {
              this.loader = false;
              this.router.navigate(['/widget/edit', this.widget.id]);
            }
          }, (error) => {
            console.error(error);
            this.loader = false;
          }, () => {
            this.loader = false;
          });
    } else {
      const formData = new FormData();
      formData.append('image', this.postedImage);
      formData.append('userId', form.value.userId);
      formData.append('departmentIdArray', <any>this.departmentArrayId);
      formData.append('website', form.value.website);
      formData.append('details', form.value.details);
      formData.append('scheduleTimezone', form.value.scheduleTimezone);
      formData.append('areaCode', form.value.areaCode);
      formData.append('daysArray', <any>this.widget.daysArray);
      formData.append('startTime', form.value.startTime);
      formData.append('endTime', form.value.endTime);
      this.store.dispatch(new WidgetActions.AddWidgetAttempt(formData));
      /** Loader Show/Hide */
      this.store.select('alert')
        .map(data => data)
        .subscribe(
          (data) => {
            if (data.show && data.type === 'danger') {
              this.loader = false;
            }
            if (data.show && data.type === 'success') {
              this.loader = false;
              this.router.navigate(['widget/create']);
            }
          }, (error) => {
            console.error(error);
            this.loader = false;
          }, () => {
            this.loader = false;
          });
    }
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy() {
    this.afterLoginSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  /** Function call to upload image or video */
  fileUploaded(event) {
    // console.log(event);
    if (event.target.files.length > 0) {
      this.hideUploadedImage = false;
      this.postedImage = event.target.files[0];
      // const ImageSize = size
      if (this.postedImage.size > 2000000) {
        alert('The specified file could not be uploaded.The file is exceeding the maximum file upload size of 2MB.');
        return false;
      }
      //  const image = this.element.nativeElement.querySelector('.uploaded-image')
      const reader = new FileReader();
      reader.onload = (fre: FileReaderEvent) => {
        this.imgSrc = fre.target.result;
        //    image.src = src
        // if(event.target.files[0] > 2000000)
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.hideUploadedImage = true;
      this.postedImage = undefined;
    }

  }

  /** Function to fetch department list with respect to adminId/userId */
  adminChanged(id: number) {
    if (!!id) {
      this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: id}));
    }
  }

  /** Function to remove uploaded image */
  removeUploadedImage() {
    this.hideUploadedImage = true;
    this.postedImage = undefined;
    this.imgSrc = '';
  }

  /** Function call on change of 'to' date */
  log2(event) {
    this.timePikerError = false;
    if (event) {
      this.validationMinTime = this.form.value.startTime;
      this.validationMaxTime = event;
      // console.log(this.validationMaxTime);
      if (this.validationMinTime > this.validationMaxTime) {
        this.timePikerError = true;
        this.form.controls['endTime'].setErrors({'incorrect': true});
      }
    }
  }

  /** function to open time in the Start Time */
  openTimer() {
    const amazingTimePicker = this.atp.open({
      onlyHour: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.widget.startTime = time;
    });
  }

  /** function to open time in the End Time */
  openEndTimer() {
    const amazingTimePicker = this.atp.open({
      onlyHour: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.widget.endTime = time;
      this.log2(time);
    });
  }

  /** Function to check filter admin name */
  checkAdminname($event) {
    this.showThis = true;
    return this.updatedlistOfAdmins = this.listOfAdmins.filter(item => item.first_name.toLowerCase().indexOf($event) !== -1);
  }

  /** function to assign value to the models */
  assignValue(id, first_name, last_name) {
    this.widget.userId = id;
    this.adminName = first_name + ' ' + last_name;
    this.showThis = false;
    this.adminChanged(id);
  }

  /** function to reset the droupdown when click on close*/
  resetList() {
    this.adminName = '';
    this.showThis = true;
    this.widget.userId = 0;
  }

  /**
   * Buy Number
   */
  buyNumber(areaCode, contains) {
    if (areaCode && contains) {
      this.isBuyNumber = true;
      this.store.dispatch(new WidgetActions.GetNumberListAttempt({areaCode: areaCode, contains: contains}));
      this.afterLoginSubscription = this.store.select('afterLogin','widget')
        .map(data => data)
        .distinctUntilChanged()
        .subscribe(
          (data) => {
            if (data) {
              console.log(data.numbers);
              this.availableNumbers.push(data.numbers);
            }
          }
        );

    } else {
      this.numberErrorMessage = 'Please put area code & number contains for buy any number.';
      this.numberError = true;
    }
  }

}
