import {ActivatedRoute, Data, Router} from '@angular/router';
import {
    Component, OnDestroy, OnInit, ViewChild, ElementRef, ChangeDetectorRef,
    AfterViewChecked, TemplateRef
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
import {BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as AgentActions from '../../../store/agent/agent.actions';
import {forEach} from '@angular/router/src/utils/collection';

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
    newAfterLoginSubscription: Subscription;
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
        sunCbk: {
            startTime: '',
            endTime: '',
        },
        monCbk: {
            startTime: '',
            endTime: '',
        },
        tueCbk: {
            startTime: '',
            endTime: '',
        },
        wedCbk: {
            startTime: '',
            endTime: '',
        },
        thuCbk: {
            startTime: '',
            endTime: '',
        },
        friCbk: {
            startTime: '',
            endTime: '',
        },
        satCbk: {
            startTime: '',
            endTime: '',
        },
        startTime: '',
        endTime: '',
        image: '',
        script_url: '',
        phoneNumber: '',
      transferTimeout: '00:30',
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
    listOfAdmins = [];
    updatedlistOfAdmins = [];
    adminName: any;
    showThis = true;
    dropdownSettings = {};
    agentListDropdownSettings = {};
    limitArray = [];
    departmentArrayId = [];
    departmentIdList = '';
    numberError = false;
    numberErrorMessage = '';
    isBuyNumber = false;
    availableNumbers = [];
    buyButtonLoader = false;
    bsModalRef: BsModalRef;             /** bootstrap modal */
    dep: any;                            /** initialize the department object */
    departmentIdNewArray = [];

    sunTimePikerError: boolean;
    monTimePikerError: boolean;
    tueTimePikerError: boolean;
    wedTimePikerError: boolean;
    thuTimePikerError: boolean;
    friTimePikerError: boolean;
    satTimePikerError: boolean;

    checkSun: boolean;
    checkMon: boolean;
    checkTue: boolean;
    checkWed: boolean;
    checkThu: boolean;
    checkFri: boolean;
    checkSat: boolean;

    /** Service injection */
    constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
                private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private element: ElementRef,
                private atp: AmazingTimePickerService,
                private router: Router, private modalService: BsModalService) {

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
                        // this.store.dispatch(new AgentActions.GetAdminAgentListAttempt( { userId: data.userId}));
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
                                    this.widget.contains = widget.number_contains;
                                    this.widget.script_url = widget.script_url;
                                    this.widget.transferTimeout = widget.transfer_timeout;
                                    // this.widget.startTime = widget.widget_schedule ? widget.widget_schedule.start_time : '';
                                    // this.widget.endTime = widget.widget_schedule ? widget.widget_schedule.end_time : '';
                                    // this.widget.daysArray = widget.widget_schedule ? (widget.widget_schedule.day).split(',') : '';
                                    const that = this;
                                    if (widget.widget_schedule) {
                                        widget.widget_schedule.forEach(function (value) {
                                            if (value.day == 'Sun') {
                                                that.checkSun = true;
                                                that.widget.sunCbk.startTime = value.start_time;
                                                that.widget.sunCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Mon') {
                                                that.checkMon = true;
                                                that.widget.monCbk.startTime = value.start_time;
                                                that.widget.monCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Tue') {
                                                that.checkTue = true;
                                                that.widget.tueCbk.startTime = value.start_time;
                                                that.widget.tueCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Wed') {
                                                that.checkWed = true;
                                                that.widget.wedCbk.startTime = value.start_time;
                                                that.widget.wedCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Thu') {
                                                that.checkThu = true;
                                                that.widget.thuCbk.startTime = value.start_time;
                                                that.widget.thuCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Fri') {
                                                that.checkFri = true;
                                                that.widget.friCbk.startTime = value.start_time;
                                                that.widget.friCbk.endTime = value.end_time;
                                            }
                                            if (value.day == 'Sat') {
                                                that.checkSat = true;
                                                that.widget.satCbk.startTime = value.start_time;
                                                that.widget.satCbk.endTime = value.end_time;
                                            }
                                        });
                                    }   // Top IF
                                    this.widget.departmentIdArray = widget.departments;
                                    this.hideUploadedImage = false;
                                    this.imgSrc = widget.image;
                                    this.adminName = widget.first_name + ' ' + widget.last_name;
                                    if (typeof widget.twilio_numbers === 'object' && (widget.twilio_numbers !== undefined && widget.twilio_numbers !== null)) {
                                        this.widget.phoneNumber = widget.twilio_numbers.number;
                                    }
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

        this.agentListDropdownSettings = {
            singleSelection: false,
            text: 'Select Agent',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: 'myclass custom-class',
            primaryKey: 'id',
            labelKey: 'name'
        };

        this.limitArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        this.dep = {
            userId: '',
            departmentName: '',
            departmentDetails: ''
        };

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
        for (const departmentId in form.value.departmentIdArray) {
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
            formDataEdit.append('phoneNumber', form.value.number);
            formDataEdit.append('sunCbk', <any>this.checkSun);
            formDataEdit.append('sunStartTime', form.value.sunStartTime);
            formDataEdit.append('sunEndTime', form.value.sunEndTime);
            formDataEdit.append('monCbk', <any>this.checkMon);
            formDataEdit.append('monStartTime', form.value.monStartTime);
            formDataEdit.append('monEndTime', form.value.monEndTime);
            formDataEdit.append('tueCbk', <any>this.checkTue);
            formDataEdit.append('tueStartTime', form.value.tueStartTime);
            formDataEdit.append('tueEndTime', form.value.tueEndTime);
            formDataEdit.append('wedCbk', <any>this.checkWed);
            formDataEdit.append('wedStartTime', form.value.wedStartTime);
            formDataEdit.append('wedEndTime', form.value.wedEndTime);
            formDataEdit.append('thuCbk', <any>this.checkThu);
            formDataEdit.append('thuStartTime', form.value.thuStartTime);
            formDataEdit.append('thuEndTime', form.value.thuEndTime);
            formDataEdit.append('friCbk', <any>this.checkFri);
            formDataEdit.append('friStartTime', form.value.friStartTime);
            formDataEdit.append('friEndTime', form.value.friEndTime);
            formDataEdit.append('satCbk', <any>this.checkSat);
            formDataEdit.append('satStartTime', form.value.satStartTime);
            formDataEdit.append('satEndTime', form.value.satEndTime);
            formDataEdit.append('transferTimeout', form.value.timeout);
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
            formData.append('numberContains', form.value.contains);
            formData.append('phoneNumber', form.value.number);
            formData.append('sunCbk', <any>this.checkSun);
            formData.append('sunStartTime', form.value.sunStartTime);
            formData.append('sunEndTime', form.value.sunEndTime);
            formData.append('monCbk', <any>this.checkMon);
            formData.append('monStartTime', form.value.monStartTime);
            formData.append('monEndTime', form.value.monEndTime);
            formData.append('tueCbk', <any>this.checkTue);
            formData.append('tueStartTime', form.value.tueStartTime);
            formData.append('tueEndTime', form.value.tueEndTime);
            formData.append('wedCbk', <any>this.checkWed);
            formData.append('wedStartTime', form.value.wedStartTime);
            formData.append('wedEndTime', form.value.wedEndTime);
            formData.append('thuCbk', <any>this.checkThu);
            formData.append('thuStartTime', form.value.thuStartTime);
            formData.append('thuEndTime', form.value.thuEndTime);
            formData.append('friCbk', <any>this.checkFri);
            formData.append('friStartTime', form.value.friStartTime);
            formData.append('friEndTime', form.value.friEndTime);
            formData.append('satCbk', <any>this.checkSat);
            formData.append('satStartTime', form.value.satStartTime);
            formData.append('satEndTime', form.value.satEndTime);
            formData.append('transferTimeout', form.value.timeout);
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
        this.isBuyNumber = false;
    }

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
        this.afterLoginSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
        this.adminList.unsubscribe();
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

    /** function to open time in the Start Time */
    // openTimer() {
    //   const amazingTimePicker = this.atp.open({
    //     onlyHour: true,
    //   });
    //   amazingTimePicker.afterClose().subscribe(time => {
    //     this.widget.startTime = time;
    //   });
    // }

    /** function to open time in the End Time */
    // openEndTimer() {
    //   const amazingTimePicker = this.atp.open({
    //     onlyHour: true,
    //   });
    //   amazingTimePicker.afterClose().subscribe(time => {
    //     this.widget.endTime = time;
    //     this.log2(time);
    //   });
    // }

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
        if (areaCode || contains) {
            this.buyButtonLoader = true;
            this.isBuyNumber = true;
            this.store.dispatch(new WidgetActions.GetNumberListAttempt({areaCode: areaCode, contains: contains}));
            this.store.select('afterLogin', 'widget', 'buttonLoader').map(data => data).subscribe(
                (data) => {
                    if (data === 'danger' || data === 'success') {
                        this.buyButtonLoader = false;
                    }
                }
            );

        } else {
            this.numberErrorMessage = 'Please put area code or number contains for buy any number.';
            this.numberError = true;
            this.buyButtonLoader = false;
        }
    }
    /** Function to create modal for creating department */
    CreateDepartment( template:  TemplateRef<any>) {
        this.dep.userId = this.widget.userId;
        this.store.dispatch(new AgentActions.GetAdminAgentListAttempt( { userId: this.widget.userId}));
        this.bsModalRef = this.modalService.show(template);
    }

    /** function to create a department */
    onCreateDep(form) {
        this.store.dispatch(new DepartmentActions.AddDepartmentAttempt(form.value));
        const newArray = [];
        this.newAfterLoginSubscription = this.store.select('department')
            .subscribe(
                (data) => {
                    if (data.newDepartmentId > 0 && data){
                        newArray.push(data);
                        const oldArray = this.widget.departmentIdArray;
                        const newObj = [{id: newArray[newArray.length - 1].newDepartmentId, department_name: newArray[newArray.length - 1].newDepartmentName}];
                        let fIndex: any = -1;
                        if (oldArray.length > 0) {
                            oldArray.forEach((elem, index) => {
                                if (elem.id === newObj[0].id) {
                                    fIndex = index;
                                }
                            });
                        }
                        if (fIndex !== -1){
                            oldArray.splice(fIndex, 1);
                        }

                        this.widget.departmentIdArray = [ ...oldArray, ...newObj];
                    }
                }
            );
        this.bsModalRef.hide();
    }

    /** function to toggle timer */
    OpenTimer(value: number){
        if (value == 1){
            this.checkSun = !this.checkSun;
        }
        if (value == 2){
            this.checkMon = !this.checkMon;
        }
        if (value == 3){
            this.checkTue = !this.checkTue;
        }
        if (value == 4){
            this.checkWed = !this.checkWed;
        }
        if (value == 5){
            this.checkThu = !this.checkThu;
        }
        if (value == 6){
            this.checkFri = !this.checkFri;
        }
        if (value == 7){
            this.checkSat = !this.checkSat;
        }
    }
    /** Function to open start time piker */
    openStartTimePiker(value: number) {
        if ( value == 1 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.sunCbk.startTime = time;
            });
        }
        if ( value == 2 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.monCbk.startTime = time;
            });
        }
        if ( value == 3 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.tueCbk.startTime = time;
            });
        }
        if ( value == 4 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.wedCbk.startTime = time;
            });
        }
        if ( value == 5 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.thuCbk.startTime = time;
            });
        }
        if ( value == 6 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.friCbk.startTime = time;
            });
        }
        if ( value == 7 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.satCbk.startTime = time;
            });
        }
    }

    /** Function to open end time piker */
    openEndTimePiker(value: number) {
        if ( value == 1 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.sunCbk.endTime = time;
                this.log2(time, 1);
            });
        }
        if ( value == 2 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.monCbk.endTime = time;
                this.log2(time, 2);
            });
        }
        if ( value == 3 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.tueCbk.endTime = time;
                this.log2(time, 3);
            });
        }
        if ( value == 4 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.wedCbk.endTime = time;
                this.log2(time, 4);
            });
        }
        if ( value == 5 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.thuCbk.endTime = time;
                this.log2(time, 5);
            });
        }
        if ( value == 6 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.friCbk.endTime = time;
                this.log2(time, 6);
            });
        }
        if ( value == 7 ){
            const amazingTimePicker = this.atp.open({
                onlyHour: true,
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.widget.satCbk.endTime = time;
                this.log2(time, 7);
            });
        }
    }

    /** Function to check start and end time **** call on change of 'to' date */
    log2(event, value: number) {
        if (event) {
            if (value == 1 ){
                this.sunTimePikerError = false;
                this.validationMinTime = this.form.value.sunStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.sunTimePikerError = true;
                    this.form.controls['sunEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 2 ){
                this.monTimePikerError = false;
                this.validationMinTime = this.form.value.monStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.monTimePikerError = true;
                    this.form.controls['monEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 3 ){
                this.tueTimePikerError = false;
                this.validationMinTime = this.form.value.tueStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.tueTimePikerError = true;
                    this.form.controls['tueEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 4 ){
                this.wedTimePikerError = false;
                this.validationMinTime = this.form.value.wedStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.wedTimePikerError = true;
                    this.form.controls['wedEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 5 ){
                this.thuTimePikerError = false;
                this.validationMinTime = this.form.value.thuStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.thuTimePikerError = true;
                    this.form.controls['thuEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 6 ){
                this.friTimePikerError = false;
                this.validationMinTime = this.form.value.friStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.friTimePikerError = true;
                    this.form.controls['friEndTime'].setErrors({'incorrect': true});
                }
            }
            if (value == 7 ){
                this.satTimePikerError = false;
                this.validationMinTime = this.form.value.satStartTime;
                this.validationMaxTime = event;
                if (this.validationMinTime >= this.validationMaxTime) {
                    this.satTimePikerError = true;
                    this.form.controls['satEndTime'].setErrors({'incorrect': true});
                }
            }
        }
    }

}
