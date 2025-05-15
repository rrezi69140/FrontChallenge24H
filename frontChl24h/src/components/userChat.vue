<script>
import socket from '../socket.js';

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      messages: [],
      connectedUsers: [],
      newMessage: '',
      UserName: '',
      clientId: socket.id,
      selectedZone: 'ALL'
    };
  },
  created() {
    // message
    socket.on('message', (data) => {
      if (this.selectedZone === 'all' || data.zone === this.selectedZone) {
        this.messages.push({
          text: data.text,
          username: data.username,
          zone: data.zone
        });
      }
    });

    socket.on('messageHistory', (messages) => {
      this.messages = messages;
    });


    // connected users
    socket.on('connectedUsers', (updatedConnectedUsers) => {
      this.connectedUsers = Object.values(updatedConnectedUsers);
    });
  },

  methods: {
    // envoie du nouveau message
    sendMessage() {
      if (!this.UserName.trim()) return alert("Veuillez saisir un nom d'utilisateur.");
      {   if (this.newMessage.trim() !== '') {
        socket.emit('message', {
          text: this.newMessage,
          username: this.UserName,
          zone: this.selectedZone,

        });
        this.newMessage = '';
      }}

    },



    selectZone(zone) {
      this.selectedZone = zone;
      this.messages = [];
      socket.emit('getMessages', zone);
    },




    // envoie du nom d'utilisateur
    SetPlayerUserName() {
      if (this.UserName.trim() !== '') {
        socket.emit('UsurNameSend', this.UserName);
      }
    },
  },
};
</script>



<template>
<div class="container-Fond">

  <p style="color: white; font-weight: bold;">
    Zone actuelle : {{ selectedZone }}
  </p>


  <div class="container-Btn-Zone">
    <button class="btn-select-zone" @click="selectZone('zone1')">Zone 1</button>
    <button class="btn-select-zone" @click="selectZone('zone2')">Zone 2</button>
    <button class="btn-select-zone" @click="selectZone('zone3')">Zone 3</button>
    <button class="btn-select-zone" @click="selectZone('ALL')">ALL</button>
  </div>

  <div class="container-Btn-Zone">
    <div class="username-input">
      <label for="PlayerUserName">Nom d'utilisateur :</label>
      <input
          type="text"
          id="PlayerUserName"
          v-model="UserName"
          placeholder="Entrez votre nom..."
          @keyup.enter="SetPlayerUserName"
      />
    </div>
  </div>
  <div class = "ListeMessage" >
    <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :zone="message.zone"
    >
      <strong>[{{ message.zone.toUpperCase() }}] {{ message.username }}:</strong> {{ message.text }}
    </div>

  </div>

  <div class="container-msg-Zone">
    <input type="text" class="input-Msg" v-model="newMessage"
           @keyup.enter="sendMessage"
           placeholder="Type a message..."/>
  </div>



</div>

</template>

<style scoped>

button{
  font-size: 0.7vw;
}
.container-Fond {
  width: 30vw;
  height: 50vw;
  background: saddlebrown;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.ListeMessage {
  width: 25vw;
  height: 30vw;
  background: whitesmoke;
}

.container-Btn-Zone{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25vw;
  height: 5vw;
  border: solid 1px yellow;

}

.container-msg-Zone{
  display: flex;
  align-items: center;
  justify-content: space-around;;
  width: 25vw;
  height: 5vw;
  border: solid 1px red;
}

.input-Msg{
  width: 15vw;
  height: 3vw;
}
.btn-send-message{
  width:5vw;
  height: 2vw;
}


.btn-select-zone{
  width:4vw;
  height: 2vw;
}


.message[zone="zone1"] { background: #e6f7ff; }
.message[zone="zone2"] { background: #fff4e6; }
.message[zone="zone3"] { background: #f0fff0; }
.message[zone="ALL"]  { background: #f0f0f0; }


</style>