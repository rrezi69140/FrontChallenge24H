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
/* Boutons zones */
.btn-select-zone {
  width: 5vw;
  height: 2.5vw;
  background-color: #007BFF; /* bleu vif */
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-select-zone:hover {
  background-color: #0056b3; /* bleu foncé au hover */
}

/* Conteneur principal */
.container-Fond {
  width: 32vw;
  height: 55vw;
  background: linear-gradient(135deg, #1e3c72, #2a5298); /* dégradé bleu */
  border-radius: 12px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 8px 16px rgba(0, 0, 50, 0.3);
}

/* Texte zone actuelle */
.container-Fond > p {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* Liste des messages */
.ListeMessage {
  width: 100%;
  height: 30vw;
  background-color: #f0f4ff;
  border-radius: 10px;
  padding: 1rem;
  overflow-y: auto;
  box-shadow: inset 0 0 10px rgba(0, 123, 255, 0.15);
  color: #333;
  font-size: 1rem;
}

/* Message individuel */
.message {
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  background-color: #e6f0ff; /* fond très clair bleu */
  box-shadow: 0 1px 2px rgba(0, 0, 50, 0.1);
  color: #003366;
  word-break: break-word;
  font-weight: 500;
}

/* Couleurs spécifiques par zone */
.message[zone="zone1"] {
  background-color: #d0e7ff;
}
.message[zone="zone2"] {
  background-color: #b3d1ff;
}
.message[zone="zone3"] {
  background-color: #99c1ff;
}
.message[zone="ALL"] {
  background-color: #cce0ff;
}

/* Zone boutons (zone + username) */
.container-Btn-Zone {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
}

/* Input username */
.username-input label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.username-input input {
  width: 15vw;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1.5px solid #007bff;
  font-size: 1rem;
  color: #003366;
  outline: none;
  transition: border-color 0.3s ease;
}

.username-input input:focus {
  border-color: #0056b3;
}

/* Input message */
.container-msg-Zone {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.input-Msg {
  width: 80%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #007bff;
  color: #003366;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-Msg:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

/* Bouton envoyer - optionnel */
.btn-send-message {
  width: 18%;
  margin-left: 0.5rem;
  padding: 0.6rem 0;
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-send-message:hover {
  background-color: #0056b3;
}
</style>
