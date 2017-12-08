<template>
  <div>
    <!--<img src="https://forum-archive.vuejs.org/uploads/system/site-logo.png">-->
    <img class="common-icon" id="show" v-if="showWidget" @click="openSideBar" :src="widgetButton.src" :title="widgetButton.title" :alt="widgetButton.title">
    <div class="side-bar slideInRight animated" v-if="showSideBar && !chat">
      <span class="close-form hide1 cross" @click="closeSideBar">x</span>
      <h3 class="side-logo"><img :src="widgetLogo.src" alt=""></h3>
      <div v-if="!formSubmit">
        <h1 v-if="isAvailable || !chatScheduleClicked">Get In Touch With Us</h1>
        <div class="formcontainer" >
          <h3 v-if="chatScheduleClicked">
            <p v-if="!isAvailable">We are unable to chat with you now.</p>
            Schedule a time to chat!
          </h3>
          <div class="side-arrow hide1" @click="closeSideBar"><img :src="widgetHost + '/widgets/right-arrow.png'" alt="img"></div>
          <form @submit.prevent="validateBeforeSubmit">
            <div class="row" v-if="chatScheduleClicked">
              <div class="col-sm-5 cust-pad">
                <div class="form-group"  :class="{ 'has-error': errorSchedule }">
                  <select class="form-control" v-model="selectedDay">
                    <option :value="null">Select Date</option>
                    <option :value="day" v-for="(day) in availableDays" >{{ day }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-2"><span class="at">at</span></div>
              <div class="col-sm-5 cust-pad">
                <div class="form-group" :class="{ 'has-error': errorSchedule }">
                  <select class="form-control" v-model="selectedTime" :disabled="selectedDay==null">
                    <option :value="null">Select Time</option>
                    <option :value="time" v-for="(time, key) in availableTimes" :key="time.start">{{ time }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12 cust-pad" v-if="errorSchedule">
                <div class="has-error">
                  <span  class="help-block">
                    Please enter a valid schedule
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 cust-pad">
                <span class="timezone" v-if="chatScheduleClicked">*Time shown in {{ this.timezone }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 cust-pad">
                <div class="form-group" :class="{ 'has-error': $v.name.$error }">
                  <input class="form-control" type="text"  v-model="name" placeholder="Enter Your Name" @blur="$v.name.$touch()"  >
                  <span v-if="($v.name.$error  )  " class="help-block">
                    Your name is required! 
                  </span>
                </div>
              </div>
              <div class="col-md-12 cust-pad">

                <div class="form-group"  :class="{ 'has-error': $v.email.$error  }">
                  <input v-model="email" class="form-control" type="text" placeholder="Enter Your Email ID" @blur="$v.email.$touch()" >
                  <span v-if="($v.email.$error)" class="help-block">
                    Your email is required!
                   </span>
                </div>
              </div>
              <div class="col-md-12 cust-pad">
                <div class="form-group"  :class="{ 'has-error': $v.phoneField.$error  || errorPhoneField}">
                  <input class="form-control" type="text"  v-mask="'+1(###)-###-####'" v-model="phoneField" placeholder="Enter Your Phone Number" @blur="$v.phoneField.$touch()" >
                  <span v-if="($v.phoneField.$error )" class="help-block">
                    Your phone number is required!
                  </span>
                  <span v-if="errorPhoneField" class="help-block">
                    Please enter a valid phone number
                  </span>
                </div>
              </div>
            </div><br>
            <div class="row" v-if="btnProp.showChatNow">
              <div class="col-md-12">
                <div class="form-group">
                  <button class="btn btn-primary" type="submit"  :disabled="$v.$invalid">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="row" v-if="btnProp.showChatLater">
              <div class="col-md-12">
                <div class="form-group">
                  <button class="btn btn-primary" type="submit" :disabled="$v.$invalid">Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <span v-if="btnProp.showChatSchedule"><a @click="chatSchedule">{{ chatScheduleTitle }}</a></span>
      </div>
      <div v-if="formSubmit" id="department">
          <div class="container" v-if="!checkMobile">
           <div class="side-arrow hide1" @click="closeSideBar"><img :src="widgetHost + '/widgets/right-arrow.png'" alt="img"></div>
              <div class="col-md-8">
                <div class="col-md-5" v-if="!departmentFormSubmit">
                <div class="form-group">
                  <label class="control-label">
                      Choose a department
                  </label>
                  <div>
                    <div v-for="department in widgetDepartments"  class="list-group" >
                       <a  class="list-group-item" @click="departmentSubmit(department.id)"> {{ department.department_name }} </a>
                    </div>
                  </div>
                </div></div>
                <div class="col-md-5" v-if="departmentFormSubmit">
                  <div class="panel-body">
                    <div class="formcontainer">
                      <p v-if="chatScheduleClicked">
                        Thank you for showing interest in our platform .One of our agents will chat with you at the specified time.
                      </p>
                      <p v-if="!chatScheduleClicked">Thank you for showing interest in our platform . To start chatting click the button given below.</p>
                    </div>
                    <button type="button" class="btn btn-primary" @click="startChat"> Start Chat </button>
                    <div class="col-md-12 cust-pad">
                      <!-- <span style='display: block;text-decoration: underline; cursor: pointer;' id='again'>Chat again</span> -->
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="container" v-if="checkMobile">
           <div class="side-arrow hide1" @click="closeSideBar"><img :src="widgetHost + '/widgets/right-arrow.png'" alt="img"></div>
              <chat-mobile v-on:messageSent="sendChatMessage"> </chat-mobile>
            </div>        
          </div>
      </div>
      <chat v-if="chat" > </chat>
    </div>
    
     
  </div>
</template>

<script>

import { required, email, minLength, requiredIf,numeric } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      messages : [
        {
          message : 'Hi',
          author  : 'Danny',
        },
        {
          message : 'Hey',
          author  : 'John',
        },
      ],
      chat : false,
      chat_id: '',
      msg: 'Welcome to Your Vue.js App',
      showWidget: false,
      isAvailable: false,
      errorSchedule: false,
      errorPhoneField: false,
      showSideBar: false,
      timezone: null,
      phoneField: '',
      name: '',
      email: '',
      selectedDay: null,
      selectedTime: null,
      widgetId: null,
      widgetHost: null,
      widgetTimezone: null,
      widgetDepartments: {},
      widget: {},
      availableDays: {},
      time: {
        nowInLocal: '',
        utc: '',
        nowInUTC: '',
        cur_date_UTC: '',
        cur_time_UTC: '',
        first_val: '',
        schedules: '',
        start_val: '',
        end_val: ''
      },
      widgetButton: {
        title: '',
        src: ''
      },
      widgetLogo: {
        title: '',
        src: ''
      },
      chatScheduleClicked: false,
      chatScheduleTitle: 'Choose a time to call',
      btnProp: {
        showChatSchedule: false,
        showChatNow:true,
        showChatLater: false,
      },
      formSubmit : false,
      departmentFormSubmit : false,
      dataToSend : {},
      checkEmail : false,
      checkMobile : ''
    }
  },

  // Validation
  validations: {
    email: {
      required,
      email
    },
    name : {
      required
    },
    phoneField : {
      required
    }
  },
  created () {
    this.widgetId = document.getElementById('tib-widget').getAttribute('data-uuid');
    this.widgetHost = document.getElementById('tib_widget').src.split(':')[0] + ':\/\/' + document.getElementById('tib_widget').src.split('/')[2];
    this.$http.post(this.widgetHost + '/api/v1/widget-data', { widgetUuid: this.widgetId })
      .then(
        (response) => {
          console.log(response);
          if(response.status) {
            if(response.body.status) {
              this.widget = response.body.widget;
              this.widgetTimezone = response.body.timezone;
              this.availableDays = response.body.dates;
              let requiredUrl = response.url;
              // Add Checking 'requiredUrl' will not match
              const currentUrl = location.protocol + '\/\/' + location.host;
              requiredUrl = 'http://localhost:8080';
              if(requiredUrl === currentUrl){
                this.showWidget = true;
                this.checkDevice();
                this.showButton();
                
              }
            }
          }
        },
        (error) => {
          this.showWidget = false;
          console.error(error);
        }
      );
     

  },
  watch: {
    chatScheduleClicked (value) {
      if (value) {
        this.chatScheduleTitle = 'We can chat with you now';
      } else {
        this.chatScheduleTitle = 'Choose a time to chat';
      }
      this.configureView();
    }
  },
  computed: {
    availableTimes () {
      this.selectedTime = null;
      if (this.selectedDay != null) {
        const optionTime = [];
        let startTime = this.time.start_val;
        const endTime = this.time.end_val;
        let i,diff;
        for(i=startTime; i<=endTime;i++) {
          if(i<12) {
            optionTime.push(i+'am');
          } else {
            diff = endTime-12;
             optionTime.push(diff+' pm');
          }
        }
        return optionTime;
      }
      return null;
    }
  },
  methods: {
    validateBeforeSubmit() {
      if(this.chatScheduleClicked) {
        if( this.validateSchedule() && this.validatePhoneNumber() ){
          this.chatLater();
        }
      } else {
         if(this.validatePhoneNumber()){
          this.chatNow();
        }
      }
    },
    departmentSubmit(id) {
      this.departmentFormSubmit = true;
      this.dataToSend.department_id = id;

      console.log(this.dataToSend);
      // this.$http.post(this.widgetHost + '/api/v1/widget-data', { data: this.dataToSend })
      // .then(
      //   (response) => {
      //     console.log(response);
      //     if(response.status) {
      //       if(response.body.status) {
      //         console.log(response);
      //       }
      //     }
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
      
    },
    openSideBar () {
      this.showSideBar = true;
    },
    closeSideBar () {
      this.showSideBar = false;
    },
    formatDate (date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [year, month, day].join('-');
    },
    configureView () {
      this.widgetButton.title = 'Chat with us';
      //this.widgetButton.src = this.widgetHost + '/images/text-btn.png';
      this.widgetButton.src = this.widgetHost +'/widgets/chat-btn.png'; 
      this.widgetLogo.src = this.widgetHost +'/widgets/'+this.widget.image;
      this.btnProp.showChatSchedule = this.isAvailable;
      if(this.chatScheduleClicked) {
        this.btnProp.showChatNow = false;
        this.btnProp.showChatLater = true;
      } else {
        this.btnProp.showChatNow = true;
        this.btnProp.showChatLater = false;
      } 

    },
    chatSchedule () {
      this.chatScheduleClicked = !this.chatScheduleClicked;
    },
    validateSchedule() {
      let date  = this.selectedDay;
      let time  = this.selectedTime;
      if(date == undefined || time == undefined || date == null || time == null || date == '' || time == '') {
        this.errorSchedule = true;
        return false;
      }
      this.errorSchedule = false;
      return true;
    },
    validatePhoneNumber () {
      let phoneNumberPattern = this.phoneField.replace(/[\s()+-]+/g, '');
      if(phoneNumberPattern != '') {
          if (phoneNumberPattern.length == 11 && phoneNumberPattern.charAt(0) !== 1) {
            this.errorPhoneField = false;
            return true;
          } else {
            this.errorPhoneField = true;
            return false;
          }
        } else {
        this.errorPhoneField = true;
        return false;
      }
    },
    sendData (client_name, client_email, client_phone, date, time) {
      let start, end;
      if(time != undefined) {

        if(time.split(' ')[1] == 'am') {
          start = time.split(' ')[0].indexOf(':') > -1? time.split(' ')[0] : time.split(' ')[0]+':00';
          
        } else {
          start = time.split(' ')[0].indexOf(':') > -1 ? parseInt(time.split(' ')[0].split(':')[0]) >= 12 ? time.split(' ')[0]: (parseInt(time.split(' ')[0].split(':')[0])+12)+':'+time.split(' ')[0].split(':')[1]: parseInt(time.split(' ')[0].split(':')[0]) >= 12 ?time.split(' ')[0].split(':')[0]+':00': (parseInt(time.split(' ')[0].split(':')[0])+12)+':00';
          
        }
      }

      this.dataToSend = {
        client: {
          'name' : client_name,
          'email' : client_email,
          'phone_number' : client_phone
        },
        widget_uuid: this.widgetId,
        schedule_date: date != undefined ? date:0,
        schedule_time: start != undefined ? start.split(':')[0]+':00:00': 0,

      };

      this.formSubmit = true;

      /** api call to get the departments for the widget */
      this.$http.post(this.widgetHost + '/api/v1/widget-departments', { widget_data: this.dataToSend })
      .then(
        (response) => {
          if(response.status) {
            if(response.body.status) {
              console.log(response);
              this.widgetDepartments = response.body.departments;
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
      
      // setTimeout(() => {
      //     this.checkEmail = true;
      //   }, 3000);
      /** API call to sned mail to the entered email id */
      // this.$http.post(this.widgetHost + '/api/v1/widget-data', { data: this.dataToSend })
      // .then(
      //   (response) => {
      //     console.log(response);
      //     if(response.status) {
      //       if(response.body.status) {
      //         console.log(response);
      //         this.checkEmail = true;
      //       }
      //     }
      //   },
      //   (error) => {
      //     console.error(error);
      //     this.checkEmail = false;
      //   }
      // );
    },
    showButton () {
      const min_width = 600;
      const responsive_width = 991;
      const device_width = window.screen.width;

      this.timezone = (this.widgetTimezone.timezone_name).replace(/ *\([^)]*\) */g, "");

//      $("#commonform").on('click', ':not(.close-form)', function(e) {
//        e.stopPropagation();
//      });

      this.time.nowInLocal = new Date();
      this.time.utc = new Date(this.time.nowInLocal.getTime() + this.time.nowInLocal.getTimezoneOffset() * 60000);
      this.time.nowInUTC = new Date( this.time.utc.getTime() + (parseInt(this.widgetTimezone.time_difference.split(":")[0]) * 60 * 60000));
      this.time.cur_date_UTC = this.formatDate(this.time.nowInUTC);
      this.time.cur_time_UTC = this.time.nowInUTC.getHours();
      this.time.cur_day_UTC = this.time.nowInUTC.getDay();
      this.time.schedules = this.widgetTimezone.days;
      this.time.start_val = parseInt(this.widget.widget_schedule.start_time.toString().split(":")[0]);
      this.time.end_val = parseInt(this.widget.widget_schedule.end_time.toString().split(":")[0]);
      if(this.time.schedules.hasOwnProperty(this.time.cur_day_UTC))  {
        if (this.time.cur_time_UTC >= this.time.start_val && this.time.cur_time_UTC < this.time.end_val) {
          console.log('true: available');
          this.btnProp.showChatSchedule = true;
          this.chatScheduleClicked = false;
          this.isAvailable = true;
        } else {
          console.log("true: not available");
          this.btnProp.showChatSchedule = false;
          this.chatScheduleClicked = true;
          this.isAvailable = false;
        }
      } else {
        console.log('false: not available');
        this.btnProp.showChatSchedule = false;
        this.chatScheduleClicked = true;
        this.isAvailable = false;
      }
      this.configureView();

    },
  chatNow () {
    this.sendData(this.name, this.email, this.phoneField);
  },
  chatLater () {
    this.sendData(this.name, this.email, this.phoneField, this.selectedDay, this.selectedTime);
  },
  /** to check if mobile or desktop */
  checkDevice () {
      const min_width = 600;
      const device_width = window.screen.width;
      this.checkMobile = false;

       // Desktop
      if(device_width > min_width) {
        this.checkMobile = false;
      }
      // Mobile
      if(device_width <= min_width) {
        this.checkMobile = true;
      }
  },
  startChat () {
    console.log("Start chat");
    this.chat = true;

    this.$http.post(this.widgetHost + '/api/v1/add-chat-user', { data: this.dataToSend })
      .then(
        (response) => {
          
          if(response.status) {
            if(response.body.status) {
              console.log(response.body);
              this.chat_id = response.body.response.id;
              this.$localStorage.set('id', this.chat_id)
              console.log(this.chat_id);
              
            }
          }
        },
        (error) => {
          this.showWidget = false;
          console.error(error);
        }
      );
     
  },
  sendChatMessage(message) {
    this.dataToSend.message = message;
    console.log(this.dataToSend);
  }
}
}
</script>

<style>
@import "~/node_modules/bootstrap/dist/css/bootstrap.css";

a {
  cursor: pointer;
}

.at {
  display: block;
  float: left;
  width: 10%;
  height: 45px;
  margin: 20px 0 0;
  line-height: 40px;
  color: #999;
}

.common-icon {
  position: fixed;
  right: 50px;
  bottom: 100px;
  z-index: 999;
  width: auto;
  height: auto;
  cursor: pointer;
  display: block;
}

.side-bar {
  position: fixed;
  top: 0px;
  bottom: 0px;
  z-index: 9999;
  background: rgb(240, 240, 240) none repeat scroll 0% 0%;
  height: auto;
  width: 393px;
  padding: 10px 20px 20px;
  box-shadow: rgb(178, 178, 178) 1px 0px 20px 1px;
  color: rgb(51, 51, 51);
  text-align: center;
  overflow-y: auto;
  right: 0px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow-x: hidden ;
}
.side-bar h2 {
  text-align: center;
  text-transform: capitalize;
  margin: 13px 0px 15px;
  color: rgb(94, 94, 94);
  font-weight: bold;
  font-size: 36px;
}
.side-bar h3 {
  padding-bottom: 8px;
  font-size: 27px;
  margin-bottom: 10px;
  color: #5E5E5E;
  text-align: left;
  margin-top:0;
}
.side-bar select {
  appearance:none !important;
  -webkit-appearance: none !important;
  -moz-appearance:none !important;
  background: rgb(255, 255, 255) url("https://www.textinbulk.com/images/select-icon.png") no-repeat scroll 90% center;
}
.side-bar .form-control {
  height: 45px; text-align: center;
}
.side-bar .cust-pad {
  padding: 0 5px;
}

.close-form {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #B3B3B3;
  font-size: 14px;
  text-decoration: none;
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.close-form img {
  max-width: 100%;
}

.hide1 {
  position: absolute;
  top: 7px;
  right: 10px;
  z-index: 9999;

}
.cross {
  width: 30px;
  height: 30px;
  border: 1px solid rgb(94, 94, 94);
  border-radius: 50%;
  text-align: center;
  font-size: 19px;
  color: rgb(94, 94, 94);
}

h3.side-logo {
  width: 200px;
  margin: 15px auto 40px;
}

.formcontainer {
  background: rgb(249, 249, 249) none repeat scroll 0% 0%;
  padding: 20px;
  border-radius: 10px;
}

.error-msg-scheduled-call {
  text-align: center;
  color: red;
  display: block;
  margin-bottom: 17px;
}

.side-arrow {
  position: absolute;
  top: 50%;
  left: 10px;
  display: block;
  margin: 15px auto 40px;
  transform: translate(-50%,-50%);
  cursor: pointer;
}

.powredby {
  text-align: center;
  margin-bottom: 20px;
  color: #5E5E5E;
  padding-top: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.powredby img {
  width: 75px;
}


h3.side-logo img {
  max-width:100%;
}
h3.side-logo {
  margin:15px auto 5px !important;
}
.timezone {
  display: inline-block;
  margin: 0px 0px 15px;
  color: rgb(255, 87, 34);
  font-size: 12px;
}

@media screen and (max-width: 1300px) {

  .powredby {
    position: relative;
    padding: 15px 0;
  }

}

@media screen and (max-width: 469px) {

  .side-bar {
    width: 100%;
  }
  .powredby {
    position: relative; padding: 15px 0;
  }


}

</style>

