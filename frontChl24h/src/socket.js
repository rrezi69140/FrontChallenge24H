// src/socket.js
import { io } from "socket.io-client";

//const socket = io("https://schallenge48.noemieanneg.com/")

const socket = io("http://localhost:3000")  // adapte le port à ton serveur
export default socket
