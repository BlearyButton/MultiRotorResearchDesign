import React, { useRef } from 'react';
import '../shared.scss';
import './TestPage.scss';

// import axios from 'axios';
import Button from '../../components/Button/Button';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
// import Input from '../../components/Input/Input';

export default function TestPage() {
  // const [scriptName, setScriptName] = useState();
  // const [coords, setCoords] = useState();
  //
  // const [connection, setConnection] = useState(null);
  // const [chat, setChat] = useState([]);
  // const latestChat = useRef(null);
  const textAreaRef = useRef(null);
  //
  // latestChat.current = chat;

  // const connectionEstablishedHandler = () => {
  //   textAreaRef.current.append('Connected! \n');
  // };
  //
  // const realTimeDataReceivedHandler = (data) => {
  //   console.log(data);
  //   textAreaRef.current.append(`${data}\n`);
  //   textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
  // };

  const eraseTextarea = () => {
    textAreaRef.current.value = '';
  };

  // const sendWaypoint = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/Waypoint`, {
  //     latitude,
  //     longitude,
  //     altitude,
  //     heading,
  //     order,
  //     missionId,
  //   });
  // };
  //
  // const runScript = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/RunScript`, { scriptName });
  // };
  //
  // const startTraining = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/RunScript`, {
  //     scriptName: 'f_data.py',
  //   });
  // };
  //
  // const startListening = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/StartListeningToDrone`);
  // };
  //
  // const sendCoords = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/SendTrainingCoords`, {
  //     scriptName: coords,
  //   });
  // };
  //
  // const startMission = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/StartMission`, {
  //     Id: missionId,
  //   });
  // };
  //
  // const endMission = () => {
  //   axios.post(`https://localhost:7001/DroneCommand/EndMission`, {
  //     Id: missionId,
  //   });
  // };

  return (
    <PageWrapper>
      <div className="TestPage">
        <p>
          Debug messages<Button onclick={eraseTextarea}>Clear</Button>
        </p>

        <br />
        <br />
        <br />

        <textarea id="debugMessagesTextArea" name="debugMessages" rows="20" cols="100" ref={textAreaRef} />
      </div>
    </PageWrapper>
  );
}
