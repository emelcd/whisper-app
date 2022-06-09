import { createContext, useContext, useState } from "react";
import {Socket} from 'socket.io-client'
import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
  query: {
    token: "maximilian"
  }
});

console.log(socket)

interface ContextProvider {
  socket: Socket;
  users : any;
  setUsers: (user: any) => void;
}

const SocketContext = createContext<ContextProvider>({
  socket: socket,
  users: [],
  setUsers: () => {}
})



export function SocketProvider(props:any){
  const [users, setUsers] = useState([])
  socket.on('users', (data:any) => {
    setUsers(data)
    console.log(data)
  })
  return (
    <SocketContext.Provider value={{
      socket: socket,
      users: [users],
      setUsers: (user: any) => {
        setUsers(user)
      }
    }}>
      {props.children}
    </SocketContext.Provider>

  )
}


export const useSocket = () => useContext(SocketContext)