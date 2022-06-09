import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SocketProvider, useSocket } from "./context/Socket.context";
import { Socket } from "socket.io-client";
import MainChat from "./components/MainChat";

function App() {



  
  return (
    <SocketProvider>
      <MainChat />

    </SocketProvider>
  );
}

export default App;
