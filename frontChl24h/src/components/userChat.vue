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
.container-Fond {
  width: 28vw;
  height: 90vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 50, 0.2);
  overflow: hidden;
}

/* Zone actuelle */
.container-Fond > p {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

/* Boutons de sélection de zone */
.container-Btn-Zone {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.btn-select-zone {
  flex: 1 1 45%;
  height: 2.5rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-select-zone:hover {
  background-color: #0056b3;
}

/* Username */
.username-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.username-input input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1.5px solid #007bff;
  font-size: 0.9rem;
  color: #003366;
}

/* Messages */
.ListeMessage {
  flex: 1;
  overflow-y: auto;
  background: #f0f4ff;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  box-shadow: inset 0 0 6px rgba(0, 123, 255, 0.2);
  color: #333;
}
.message {
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  background-color: #e6f0ff;
  color: #003366;
}

/* Couleurs par zone */
.message[zone="zone1"] { background-color: #d0e7ff; }
.message[zone="zone2"] { background-color: #b3d1ff; }
.message[zone="zone3"] { background-color: #99c1ff; }
.message[zone="ALL"]  { background-color: #cce0ff; }

/* Input + envoi */
.container-msg-Zone {
  display: flex;
  gap: 0.5rem;
}
.input-Msg {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 2px solid #007bff;
  font-size: 0.9rem;
  color: #003366;
}
.input-Msg:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.4);
}
.btn-send-message {
  width: 3rem;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

</style>
