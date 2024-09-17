import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setlatestMessage] = useState("");
  const [message, setmessage] = useState('');
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setlatestMessage(message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])
 if(!socket){
  return <div>
    Connecting to socket...
  </div>
 }
  return (
    <>
      <input onChange={(e)=>{
setmessage(e.target.value)
      }}></input>
      <button onClick={()=>{
        socket.send(message);
      }}>send</button>
      {latestMessage}
    </>
  )
}

export default App