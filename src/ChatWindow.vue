<template>
  <div>
    <!--<img src="https://forum-archive.vuejs.org/uploads/system/site-logo.png">-->
    <img class="common-icon" id="show" v-if="showWidget" @click="openSideBar" :src="widgetButton.src" :title="widgetButton.title" :alt="widgetButton.title">
    <div class="side-bar slideInRight animated" v-if="showSideBar">
      <span class="close-form hide1 cross" @click="closeSideBar">x</span>
      <h3 class="side-logo"><img :src="widget_logo.src" alt="img"></h3>
      <h2 v-if="!isAvailable || !chatScheduleClicked">Get In Touch With Us</h2>
      <p v-if="!isAvailable || !chatScheduleClicked">{{ this.widget.description }}</p><br>
      <div class="formcontainer">
        <h3 v-if="chatScheduleClicked">Schedule a time to chat!!!</h3>
        <h5 class="error-msg-scheduled-call" v-if="errorMessage!=''">{{ errorMessage }}</h5>
        <div class="side-arrow hide1" @click="closeSideBar"><img :src="widgetHost + '/images/right-arrow.png'" alt="img"></div>
        <form @submit.prevent="validateBeforeSubmit">
          <div class="row" v-if="chatScheduleClicked">
            <div class="col-sm-5 cust-pad">
              <div class="form-group">
                <select class="form-control" v-model="selectedDay">
                  <option :value="null">Select Date</option>
                  <option :value="day" v-for="(day) in availableDays" >{{ day }}</option>
                </select>
              </div>
            </div>
            <div class="col-sm-2"><span class="at">at</span></div>
            <div class="col-sm-5 cust-pad">
              <div class="form-group">
                <select class="form-control" v-model="selectedTime" :disabled="selectedDay==null">
                  <option :value="null">Select Time</option>
                  <option :value="time" v-for="(time, key) in availableTimes" :key="time.start">{{ time }}</option>
                </select>
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
                <span v-if="($v.email.$error  )  " class="help-block">
                  Your email is required!
                 </span>
              </div>
            </div>
            <div class="col-md-12 cust-pad">
              <d<div class="form-group"  :class="{ 'has-error': $v.phoneField.$error  }">
                <input class="form-control" type="text"  v-mask="'+1(###)-###-####'" v-model="phoneField" placeholder="Enter Your Phone Number" @blur="$v.phoneField.$touch()" >
                <span v-if="($v.phoneField.$error )  " class="help-block">
                  Your phone number is required!
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
        <span v-if="btnProp.showChatSchedule"><a @click="chatSchedule">{{ chatScheduleTitle }}</a></span>
      </div>

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
      msg: 'Welcome to Your Vue.js App',
      showWidget: false,
      isAvailable: false,
      errorMessage: '',
      showSideBar: false,
      timezone: null,
      phoneField: '',
      name: '',
      email: '',
      selectedDay: null,
      selectedTime: null,
      widgetId: null,
      widgetHost: null,
      widget_timezone: null,
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
      widget_logo: {
        title: '',
        src: ''
      },
      chatScheduleClicked: false,
      chatScheduleTitle: 'Choose a time to call',
      btnProp: {
        showChatSchedule: false,
        showChatNow:true,
        showChatLater: false,
      }
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
    this.widgetHostLocal = 'http://3c.local';
    this.$http.post( this.widgetHostLocal+'/api/v1/widget-data', { widgetUuid: 'HFQzyG7F48AhHL3W' })
    //this.$http.post(this.widgetHost + '/app/api/widget/fetch', { uuid: this.widgetId })
      .then(
        (response) => {
          if(response.status) {
            console.log(response);
            this.widget = response.body.widget;
            this.widget_timezone = response.body.timezone;
            this.availableDays = response.body.dates;
            let requiredUrl = response.url;
            // Add Checking 'requiredUrl' will not match
            const currentUrl = location.protocol + '\/\/' + location.host;
            requiredUrl = 'http://localhost:8083/';
            // if(requiredUrl === currentUrl){
            //   if( this.checkDevice()) {
            //     this.showButton();
            //   }
            // }
            this.showButton();
          }
        },
        (error) => {
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
          this.chatNow();
        }
      } else {
         if(this.validatePhoneNumber()  ){
          console.log("ok");
          this.chatLater();
        }
      }
    },
    addMessage() {
      console.log("Message added");
    },
    openSideBar () {
      this.showSideBar = true;
    },
    closeSideBar () {
      this.showSideBar = false;
    },
    checkDevice () {
      const min_width = 600;
      const device_width = window.screen.width;
      this.showWidget = false;

      switch (this.widget.view_type) {

        case 0: // Both
          this.showWidget = true;
          break;

        case 1: // Desktop
          if(device_width > min_width) {
            this.showWidget = true;
          }
          break;

        case 2: // Mobile
          if(device_width <= min_width) {
            this.showWidget = true;
          }
          break;

        default:
          break;
      }
      return this.showWidget;
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
      this.widgetButton.src = this.widgetHostLocal +'/widgets/chat-btn.png'; 
      this.showWidget= true;
      this.widget_logo.src = this.widgetHostLocal +'/widgets/'+this.widget.image;
      //this.widgetButton.src = "https://www.tablotv.com/sf/uploads/tablo_chat_icon.png";
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
        this.errorMessage = 'Please choose a valid schedule';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
        return false;
      }
      return true;
    },
    validatePhoneNumber () {
      let phoneNumberPattern = this.phoneField.replace(/[\s()+-]+/g, '');
      if(phoneNumberPattern != '') {
          if (phoneNumberPattern.length == 11 && phoneNumberPattern.charAt(0) !== 1) {

            this.$http.post(this.widgetHost + '/app/api/validate-us-phone-number', { phone_number: phoneNumberPattern })
              .then(
                (response) => {

                  if(response.body.http_code == 200){
                    return true;
                  } else {
                    this.errorMessage = 'Enter a valid Phone Number';
                    setTimeout(() => {
                      this.errorMessage = '';
                    }, 3000);
                    return false;
                  }
                },
                (error) => {
                  console.error(error);
                  return false;
                }
              );
          } else {
            this.errorMessage = 'Enter a valid Phone Number';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
            return false;
          }
        } else {
        this.errorMessage = 'Enter a valid Phone Number';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
        return false;
      }
    },
  
    sendData (client_name, client_email, client_phone, type, date, time) {
      let start, end, dataToSend;

      if(time != undefined) {
        if(time.split(' ')[1] == 'am') {
          start = time.split(' ')[0].indexOf(':') > -1? time.split(' ')[0] : time.split(' ')[0]+':00';
          end = (parseInt(start.split(':')[0])+1)+':'+start.split(':')[1];
        } else {
          start = time.split(' ')[0].indexOf(':') > -1 ? parseInt(time.split(' ')[0].split(':')[0]) >= 12 ? time.split(' ')[0]: (parseInt(time.split(' ')[0].split(':')[0])+12)+':'+time.split(' ')[0].split(':')[1]: parseInt(time.split(' ')[0].split(':')[0]) >= 12 ?time.split(' ')[0].split(':')[0]+':00': (parseInt(time.split(' ')[0].split(':')[0])+12)+':00';
          end = (parseInt(start.split(':')[0])+1) >= 24? start.split(':')[0]+':'+start.split(':')[1] : (parseInt(start.split(':')[0])+1)+':'+start.split(':')[1];
        }
      }

      dataToSend = {
        customer: {
          'name' : client_name,
          'email' : client_email,
          'phone_number' : client_phone
        },
        type: type,
        embed_id: this.widgetId,
        schedule_date: date != undefined ? date:0,
        schedule_start_time: start != undefined ? start.split(':')[0]+':00:00': 0,
        schedule_end_time: end != undefined ? end.split(':')[0]+':00:00': 0
      };

      if( date == undefined ) {
        this.startTimer();
      } else {
        this.showMessage(type);
      }
      
      this.$http.post(this.widgetHost + '/app/api/widget-call', dataToSend)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
    },
    showButton () {
      const min_width = 600;
      const responsive_width = 991;
      const device_width = window.screen.width;

      this.timezone = (this.widget_timezone.timezone_name).replace(/ *\([^)]*\) */g, "");

//      $("#commonform").on('click', ':not(.close-form)', function(e) {
//        e.stopPropagation();
//      });

      this.time.nowInLocal = new Date();
      this.time.utc = new Date(this.time.nowInLocal.getTime() + this.time.nowInLocal.getTimezoneOffset() * 60000);
      this.time.nowInUTC = new Date( this.time.utc.getTime() + (parseInt(this.widget_timezone.time_difference.split(":")[0]) * 60 * 60000));
      this.time.cur_date_UTC = this.formatDate(this.time.nowInUTC);
      this.time.cur_time_UTC = this.time.nowInUTC.getHours();
      this.time.cur_day_UTC = this.time.nowInUTC.getDay();
      this.time.schedules = this.widget_timezone.days;
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
    showMessage (type) {

      if(type == 1) {

        $('.formcontainer #msg').remove();
        $('.formcontainer').append('<p style="font-size: 20px;font-style: italic;color: #337ab7;" id="msg">Thank you for showing interest in our platform .We will call you back at a specified time.</p>');
        $('.formcontainer #again').remove();
        $('.formcontainer').append("<span style='display: block;text-decoration: underline; cursor: pointer;' id='again'>Call or Send SMS again</span>");

      }

      $('body').on('click', '#again', function(){
        $('.formcontainer #msg').remove();
        $('.formcontainer #again').remove();
        $('.commonform').show();
      });
    },
    startTimer() {
      var timer_start = 30;
      var refreshIntervalId = setInterval(function(){
        $('.formcontainer #timer').text('');
        $('.formcontainer #timer').text(timer_start);

        timer_start--;

       if(timer_start==0){

        clearInterval(refreshIntervalId);

        $('.formcontainer #timer').remove();
        $('.formcontainer #msg').remove();
        $('.formcontainer').append('<p style="font-size: 20px;font-style: italic;color: #337ab7;" id="confirmation">Have you got any call or sms from our representative?</p><div id="container" style="text-align: center;"><p id="yesNo"><button id="yes" style="width: 100px;height: 40px;margin-right:2px;">Yes</button><button id="no" style="width: 100px;height: 40px;margin-left:2px;">No</button></p></div>');

        $('body').on('click', '#yes', function(){
          $('.formcontainer #confirmation').remove();
          $('.formcontainer #yesNo').remove();
          $('.formcontainer #msg').remove();
          $('.formcontainer').append('<p style="font-size: 20px;font-style: italic;color: #337ab7;" id="msg">Thanks for contacting us!</p>');
          $('.formcontainer #again').remove();
          $('.formcontainer').append("<span style='display: block;text-decoration: underline; cursor: pointer;' id='again'>Call or Send SMS again</span>");
        });

        $('body').on('click', '#no', function(){
        $('.formcontainer #confirmation').remove();
        $('.formcontainer #yesNo').remove();
        $('.formcontainer #msg').remove();
        $('.formcontainer').append('<p style="font-size: 20px;font-style: italic;color: #337ab7;" id="msg">All of our representative are busy now. You will get a sms or call from them shortly!</p>');
        $('.formcontainer #again').remove();
        $('.formcontainer').append("<span style='display: block;text-decoration: underline; cursor: pointer;' id='again'>Call or Send SMS again</span>");
        });

        $('body').on('click', '#again', function(){
        $('.formcontainer #msg').remove();
        $('.formcontainer #again').remove();
        $('.commonform').show();
        });
      }
      $('body').on('click', '.close-form',function(){
        clearInterval(refreshIntervalId);
        $( '#timer' ).remove();
      });
    },1000);

  },
  chatNow () {
    this.sendData(this.name, this.email, this.phoneField, 1);
  },
  chatLater () {
    this.sendData(this.name, this.email, this.phoneField, 1, this.selectedDay, this.selectedTime);
  },
}
}
</script>

<style>
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";

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

