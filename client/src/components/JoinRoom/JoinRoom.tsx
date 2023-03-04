import React, { useContext, useState } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";

interface IJoinRoomProps {}

const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  border: solid 2px;
  padding: 50px;
  border-radius: 20px;
  background-color: #f7f7f7
`;

const RoomIdInput = styled.input`
  height: 40px;
  width: 20em;
  font-size: 20px;
  outline: none;
  border: 1px solid;
  border-radius: 10px;
  padding: 0 10px;
`;

const JoinButton = styled.button`
  outline: none;
  background-color: #0072b1;
  color: #fff;
  font-size: 1.5em;
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 10px 50px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #000;
  }
`;

const JoinRoom = (props: IJoinRoomProps) => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
        <h3>Enter your or your friend's name to join the game</h3>
        <RoomIdInput
          placeholder="Your name"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Joining..." : "Join"}
        </JoinButton>
      </JoinRoomContainer>
    </form>
  );
}

export default JoinRoom
