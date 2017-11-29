<div class="side-bar slideInRight animated" v-if="showSideBar">
      <span class="close-form hide1 cross" @click="closeSideBar">x</span>
      <h3 class="side-logo"><img :src="widget.logo" alt="img"></h3>
      <h2 v-if="!isAvailable || !callScheduleClicked">Get In Touch</h2>
      <p v-if="!isAvailable || !callScheduleClicked">{{ this.widget.description }}</p><br>
      <div class="formcontainer">
        <h3 v-if="callScheduleClicked">What is the best time to call you?</h3>
        <h5 class="error-msg-scheduled-call" v-if="errorMessage!=''">{{ errorMessage }}</h5>
        <div class="side-arrow hide1" @click="closeSideBar"><img :src="widgetHost + '/images/right-arrow.png'" alt="img"></div>
        <form>
          <div class="row" v-if="callScheduleClicked">
            <div class="col-sm-5 cust-pad">
              <div class="form-group">
                <select class="form-control" v-model="selectedDay">
                  <option :value="null">Select Date</option>
                  <option :value="day" v-for="(day, key) in widget.timesetfinal" :key="day.start">{{ key }}</option>
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
              <span class="timezone" v-if="callScheduleClicked">*Time shown in {{ this.timezone }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 cust-pad">
              <div class="form-group">
                <input class="form-control" type="text" name="" v-mask="'+1(###)-###-####'" v-model="phoneField" placeholder="Enter Your Phone Number">
              </div>
            </div>
          </div><br>
          <div class="row" v-if="btnProp.showCallNow">
            <div class="col-md-12">
              <div class="form-group">
                <a @click="callNow()">
                  <img :src="widgetHost + '/images/callme.png'" alt="CALL NOW">
                </a>
              </div>
            </div>
          </div>
          <div class="row" v-if="btnProp.showCallLater">
            <div class="col-md-12">
              <div class="form-group">
                <a @click="callLater()">
                  <img :src="widgetHost + '/images/call-later.png'" alt="CALL LATER">
                </a>
              </div>
            </div>
          </div>
          <div class="or-text" v-if="(btnProp.showCallNow || btnProp.showCallLater) && btnProp.showSmsNow">OR</div>
          <div class="row" v-if="btnProp.showSmsNow">
            <div class="col-md-12">
              <div class="form-group">
                <a @click="smsNow()">
                  <img :src="widgetHost + '/images/textme.png'" alt="SMS NOW">
                </a>
              </div>
            </div>
          </div>
        </form>
        <span v-if="btnProp.showCallSchedule"><a @click="callSchedule">{{ callScheduleTitle }}</a></span>
      </div>
      <div>
      <p class="powredby">Powered by <a href="https://tier5.us/" target="_blank"><img :src="widgetHost + '/images/tier5.png'" title="Tier5" class="logo-icon"></a></p>
      </div>
     

    </div>