import React, { useEffect } from "react";
import { useSocket } from "../context/Socket.context";

function MainChat() {
  const { socket, users } = useSocket();
  return (
    <div>
      {/* {
        JSON.stringify(users)
      } */}
      {users[0].map((user: any, idx: number) => {
        return (
          <div key={idx}>
            <h5>{user.username}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default MainChat;
