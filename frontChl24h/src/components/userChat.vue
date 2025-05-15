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
    };
  },
  created() {
    // message
    socket.on('message', (message) => {
      this.messages.push(message);
    });

    // connected users
    socket.on('connectedUsers', (updatedConnectedUsers) => {
      this.connectedUsers = Object.values(updatedConnectedUsers);
    });
  },

  methods: {
    // envoie du nouveau message
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        socket.emit('message', this.newMessage);
        this.newMessage = '';
      }
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
  <div class="container-Btn-Zone">
    <button class="btn-select-zone" id="zone1" >
    Zone 1
    </button>
    <button class="btn-select-zone" id="zone2">
      Zone 2
    </button>
    <button class="btn-select-zone" id="zone3">
    Zone 3
    </button>
    <button class="btn-select-zone" id="zone4">
    ALL
    </button>
  </div>
  <div class = "ListeMessage" >

  </div>

  <div class="container-msg-Zone">
    <input type="text" class="input-Msg">

    <button class="btn-send-message">
      envoyer
    </button>
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
</style>