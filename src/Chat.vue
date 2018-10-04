<template>
    <div class="chat">
        <div class="chat-window col-md-4 col-sm-6">
            <div class="panel panel-default">
                <div class="top-bar">
                    <div class="col-md-9 col-xs-8">
                        <div class="row">
                            <div class="user-icon">
                                <img :src="apiHost + 'widgets/script/user3.png'" class="img-responsive" alt="user-img">
                            </div>
                            <div class="detail">
                                {{ client.name }}
                                <p>Chat with Agent</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-1" v-if="!minimize">
                        <a @click="chatMinimize">
                            <icon name="window-minimize" aria-hidden="true"></icon>
                        </a>
                    </div>
                    <div class="col-xs-1" v-if="minimize">
                        <a @click="chatMaximize">
                            <icon name="window-maximize" aria-hidden="true"></icon>
                        </a>
                    </div>
                </div>

                <div class="panel-body msg_container_base" v-if="!minimize && chatFailed">
                    <div class="chat-notification">
                        <div class="row">
                            <b> We are unable to connect now.</b>
                        </div>
                        <div class="row">
                            <b> Try again later!!!!</b>
                        </div>
                    </div>
                </div>

                <div class="panel-body msg_container_base" v-if="!minimize && !chatResolved && !chatFailed"
                     v-chat-scroll>
                    <div class="chat-notification">
                        <div class="row">
                            <b> {{ connectMessage }} </b>
                        </div>
                    </div>
                    <div v-for="message in messages">
                        <div class="row msg_container base_sent" v-if="message.direction === 1">
                            <div class="col-md-3 pull-left">
                                <span class="time-left"> <icon name="clock-o"></icon>
                                    {{ moment(message.created_at.date) }}
                                </span>
                            </div>
                            <div class="messages msg_sent">
                                <div v-if="message.isMMS">
                                    <div class="row">
                                        <a :href="message.fileUrl" class="pull-right" target="_blank">
                                            <div v-if="message.fileType === 'image'">
                                                <img :src="message.fileUrl" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'audio'">
                                                <img :src="apiHost + 'widgets/script/audio.png'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'video'">
                                                <img :src="apiHost + 'widgets/script/video.jpeg'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'document'">
                                                <img :src="apiHost + 'widgets/script/doc.jpg'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="row pull-right" v-if="message.message !== null"><p class="messageBody">{{ message.message }}</p></div>
                            </div>

                        </div>


                        <div class="row msg_container base_receive" v-if="message.direction === 2">
                            <div class="messages msg_receive">
                                <div v-if="message.isMMS">
                                    <div class="row">
                                        <a :href="message.fileUrl" class="pull-left" target="_blank">
                                            <div v-if="message.fileType === 'image'">
                                                <img :src="message.fileUrl" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'audio'">
                                                <img :src="apiHost + 'widgets/script/audio.png'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'video'">
                                                <img :src="apiHost + 'widgets/script/video.jpeg'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                            <div v-if="message.fileType === 'document'">
                                                <img :src="apiHost + 'widgets/script/doc.jpg'" :alt="message.fileUrl" class="docImage"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="row pull-left" v-if="message.message !== null"><p class="messageBody">{{ message.message }}</p></div>
                            </div>
                            <div class="col-md-3 pull-right">
                                <span class="time-right">
                                    {{ moment(message.created_at.date) }}
                                </span>
                            </div>
                        </div>

                       <!-- <div class="chat-notification" v-if="message.direction==3">
                            <div class="row">
                                <b> {{ message.message }} </b>
                            </div>
                        </div>-->


                    </div>
                </div>

                <div class="panel-body msg_container_base" v-if="!minimize && chatResolved && !chatFailed"
                     v-chat-scroll>
                    <div class="chat-notification">
                        <div class="col-lg-12">
                            <div class="panel-body" v-if="!chat && !departmentSubmitted">
                                <div class="row">
                                    <b> Thank you for chatting with us.</b>
                                </div>
                                <div class="col-md-12 cust-pad">
                                    <button type="button" class="btn btn-primary" @click="startChat"> Click here to
                                        start chatting
                                    </button>
                                </div>
                            </div>
                            <div class="panel-body" v-if="chat && !departmentSubmitted">
                                <div v-if="widgetDepartments.length > 0">
                                    <div class="col-md-12 cust-pad">
                                        <div class="form-group">
                                            <label class="control-label">
                                                Choose a department
                                            </label>
                                        </div>
                                        <div>
                                            <div v-for="department in widgetDepartments" class="list-group">
                                                <a class="list-group-item" @click="departmentSubmit(department.id)">
                                                    {{ department.department_name }} </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="loader"></div>
                                </div>
                            </div>
                            <div class="panel-body" v-if="chat && departmentSubmitted">
                                <div class="col-md-12 cust-pad">
                                    <!--<button type="button" class="btn btn-primary" @click="startChatAgain"
                                            v-if="!chatClicked"> Chat Again
                                    </button>-->
                                    <p v-if="chatClicked"> Please wait.... </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="panel-footer" v-if="!minimize && !chatResolved">
                    <div class="input-group" v-if="sendMessage">
                        <span class="input-group-btn" @click="triggerFileInput"> <icon name="paperclip"></icon></span>
                        <span class="input-group-btn imageName">{{ imageName }}</span>
                        <input type="text" class="form-control input-sm chat_input" placeholder="Type a message..."
                               v-model="message" @keyup.enter="addMessage"/>
                        <input type="file" name="fileInput" id="fileInput" @change="fileSelected"
                               style="display: none;"/>
                        <span class="input-group-btn" @click="addMessage">
                          <icon name="paper-plane"></icon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import {environment} from './environment/environment';
    import "bootstrap/dist/css/bootstrap.css";

    export default {
        name: 'chat',
        sockets: {
            connect: function () {
                console.log('Emiting client-connected from vue');
                //  this.$socket.emit('client-connected', this.client);
            },
            /** to get the client room */
            clientAddedToRoom: function (data) {
                //this.client = data;
                this.sendMessage = true;
                //this.chatResolved = false;
                console.log(data);
                this.chatRoomId = data.chatRoomId;
                console.log("connected client");

            },
            /**when the client does not get connected */
            clientNotAddedToRoom: function () {

                this.sendMessage = false;
                this.chatFailed = true;
                console.log("Client join failed");
                this.$socket.emit('disconnect');
            },
            /**when the agent resolves the chat */
            clientChatResolved: function () {
                this.chatResolved = true;
                console.log("Chat resolved");
                this.$socket.emit('disconnect');
            },
            /**when the agent transfers the chat */
            clientChatTransferred: function (msg) {
                var notification = {message: msg, direction: 3};
                console.log("Chat transferred");
                this.messages.push(notification);
                ;
            },

            /** to update the room the client has joined */
            updateRoom: function (data) {
                console.log(data);
                var update_message = 'You have joined the chatroom';
            },

            /** when the socket gets disconnected */
            disconnect: function () {
                //Vue.ls.remove('client');
                this.chatResolved = true;
                console.log("disconnected");
                this.sendMessage = false;
            },
            /** to update the chat room with the chat message */
            newmsg: function (data) {
                console.log('newMessage', data);
                this.messages.push(data);
            },

            connectedToRoom: function (msg) {
                console.log(msg);
                this.connectMessage = msg;
                this.chatResolved = false;
                this.departmentSubmitted = false;
                this.chat = false;
                this.messages = [];
                this.chatFailed = false;
                this.chatClicked = false;
            }

        },
        data() {
            return {
                id: '',
                messages: [],
                room_name: '',
                chatRoomId: '',
                client: {},
                widgetId: null,
                message: '',
                connectMessage: '',
                minimize: false,
                apiUrl: '',
                apiHost: '',
                sendMessage: false,
                chatResolved: false,
                chat: false,
                widgetDepartments: {},
                departmentSubmitted: false,
                chatFailed: false,
                chatClicked: false,
                image: {},
                imageName: '',
                imageUrl: '',
                fileType: '',
                departmentLength: 0
            }
        },
        created() {

            this.apiUrl = environment.API_BASE_URL;
            this.apiHost = environment.API_HOST;
            //console.log(Vue.ls.get('client'));

            this.widgetId = document.getElementById('tib-widget').getAttribute('data-uuid');

            this.client = Vue.ls.get('client');
            console.log(this.client);
            this.connectMessage = 'Please wait...We are connecting !!';
            this.$socket.emit('client-connected', this.client);

        },
        methods: {

            /** to add sent chat message */
            addMessage() {
                if (this.message || this.imageUrl) {
                    this.$socket.emit('msg', {
                        file: true,
                        fileURL: this.imageUrl,
                        fileType: this.fileType,
                        messageBody: this.message,
                        direction: 1,
                        user: this.client.name,
                        chatRoomId: this.chatRoomId,
                        fromNumber: this.client.from_number,
                        time: moment()
                    });
                }
                this.message = '';
                this.image = {};
                this.imageName = '';
                this.imageUrl = '';
                this.fileType = '';
            },

            triggerFileInput() {
                document.getElementById('fileInput').click()
            },

            fileSelected(e) {
                const file = e.target.files[0];
                let formData = new FormData();
                formData.append('file', file);

                /** api call to upload the file */
                this.$http.post(this.apiUrl + 'file-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(
                    (response) => {
                        if (response.status && response.body.status) {
                            this.imageUrl = response.body.response.url;
                            this.imageName = file.name;
                            this.fileType = response.body.response.type;
                        }
                    },
                    (error) => {
                        console.error(error);
                        this.imageUrl = '';
                        this.fileType = '';
                        this.image = {};
                        this.imageName = '';
                    }
                );
            },

            chatMinimize() {
                console.log("close");
                this.minimize = true;
            },
            chatMaximize() {
                console.log("open");
                this.minimize = false;
            },
            /** to initiate the chat process */
            startChat() {
                console.log("Start chat");

                /** api call to get the departments for the widget */
                this.$http.post(this.apiUrl + 'widget-departments', {widget_data: this.client})
                    .then(
                        (response) => {
                            if (response.status) {
                                if (response.body.status) {
                                    if (response.body) {
                                        this.departmentLength = response.body.departments.length;
                                        if (this.departmentLength > 1) {
                                            this.widgetDepartments = response.body.departments;
                                            this.chat = true;
                                            this.departmentSubmitted = false;
                                            console.log('department not found');
                                        } else if (this.departmentLength === 1) {
                                            this.departmentSubmit(response.body.departments[0].id);
                                            this.chat = true;
                                        } else {
                                            console.log('No department found');
                                        }
                                    }
                                }
                            }
                        },
                        (error) => {
                            console.error(error);
                        }
                    );

            },
            departmentSubmit(id) {
                console.log("Submitted department");
                this.client.departmentId = id;

                console.log(this.client);

                Vue.ls.set('client', this.client);
                console.log(Vue.ls.get('client'));
                this.departmentSubmitted = true;

                this.chatClicked = true;
                console.log("Started chat again");
                this.$socket.emit('client-connected', this.client);
            },
            /** to start the chatting */
            startChatAgain() {
                this.chatClicked = true;
                console.log("Started chat again");
                this.$socket.emit('client-connected', this.client);
            },
            moment(date) {
                return moment.utc(date).local().format('h:mm:ss a');
            }
        }
    }
</script>

<style type="text/css">

    .chat-window {
        bottom: 10px;
        position: fixed;
        right: 0;
        z-index: 9;
    }

    .chat-window > div > .panel {
        border-radius: 5px 5px 0 0;
    }

    .icon_minim {
        padding: 2px 10px;
    }

    .msg_container_base {
        background: #F7F8FA;
        margin: 0;
        padding: 0 10px 0px;
        max-height: 350px;
        overflow-x: hidden;
        overflow-y: auto;
        height: 350px;
    }

    .top-bar {
        background: #467FFD;
        color: #fff;
        padding: 5px 0;
        position: relative;
        overflow: hidden;
    }

    .msg_receive {
        background: #F7F8FA;
        color: #333;
    }

    .msg_sent {
        margin: 0;
        background: #F7F8FA;
        color: #fff;
    }

    .messages {
        padding: 2px;
        border-radius: 2px;
        max-width: 100%;
        margin: 0 10px;
        width: 70%;
        word-break: break-all;
    }

    .messages > p {
        margin: 0;
    }

    .messages > time {
        font-size: 11px;
        color: #ccc;
    }

    .msg_container {
        padding: 10px;
        overflow: hidden;
        display: flex;
    }

    .base_sent {
        justify-content: flex-end;
        align-items: flex-end;
    }

    .msg_sent > time {
        float: right;
    }

    .msg_container_base::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .msg_container_base::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }

    .msg_container_base::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
    }

    .btn-group.dropup {
        position: fixed;
        left: 0px;
        bottom: 0;
    }

    .detail {
        font-weight: bold;
    }

    .detail p {
        margin: 0;
        font-weight: normal;
        font-size: 12px;
    }

    .user-icon img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .user-icon {
        float: left;
        padding: 0 10px;
    }

    .panel-footer {
        background: #fff;
        padding: 0;
        border: none;
    }

    .panel-footer .form-control {
        height: 50px;
        border: none;
        box-shadow: none;
        font-size: 14px;
        color: #333;
    }

    .panel-footer .input-group-btn img {
        border: none;
        outline: none;
        height: 40px;
        width: 50px;
        font-size: 0;
        padding: 5px;
        color: #B3B3B3;
        cursor: pointer;
    }

    .chat-close {
        display: block;
        text-align: right;
        width: 50px;
    }

    .chat-minimise {
        display: inline-block;
        text-align: right;
        width: 50px;
    }

    a {
        color: #fff;
    }

    .chat-notification {
        display: inline-block;
        text-align: center;
        margin-left: 80px;
        padding: 15px;

    }

    .input-group-btn .fa-icon {
        fill: #467FFD;
        border: none;
        outline: none;
        height: 30px;
        width: 30px;
        padding: 5px;
        cursor: pointer;
    }

    /* Style time text */
    .time-right {
        float: right;
        color: #999;
        margin-right: 0;
        font-size: 12px;
    }

    /* Style time text */
    .time-left {
        float: left;
        color: #999;
        font-size: 12px;
    }

    .time-left .fa-icon {
        margin-left: 0;
        height: 10px;
        margin-right: 5px;
    }

    .msg_sent .messageBody {
        margin: 0;
        padding: 10px;
        background: #467FFD;
        color: #fff;
        font-size: 15px;

    }

    .msg_receive .messageBody {
        margin: 0;
        padding: 10px;
        background: #eef5f9;
        color: #333;
        font-size: 15px;

    }

    .pull-left {
        padding: 0px;
    }

    .pull-right {
        padding: 5px;
    }

    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid blue;
        border-right: 16px solid green;
        border-bottom: 16px solid red;
        border-left: 16px solid pink;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    #preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #preview img {
        max-width: 100%;
        max-height: 500px;
    }

    .imageName {
        font-size: 14px !important;
    }
    .docImage {
        height: 200px;
        width: 200px;
    }
</style>

