import React, { useEffect, useState,  useMemo } from 'react'
import {io} from "socket.io-client"
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SideBar from './SideBar';


const Negotiation = ({negoProduct}) => {


  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("")
  const [socketID, setSocketID] = useState();
  const [messages, setMessages]= useState([])
  const [roomName, setRoomName] = useState("");


  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const handleSubmit=(e)=>{
    e.preventDefault()
    socket.emit("message", {room, message,sender: true})
    setMessage("")


  }

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };



  useEffect(()=>{

    socket.on("connect", ()=>{
      console.log("connected",socket.id);
      setSocketID(socket.id)

    })
    socket.on("welcome", (s)=>{
      console.log(s)
    })

    socket.on("recive",(data)=>{
      console.log(data)
      setMessages((messages)=> [...messages,{ text: data, sender: false }])
    })

    return ()=>{ 
      socket.disconnect();
    }


  },[])

  const renderMessage = (message, index) => {
    const backgroundColor = message.sender ? '#90EE90' : '#ADD8E6'; // Different colors for sent and received messages
    return (
      <Typography
        key={index}
        variant="h6"
        component="div"
        gutterBottom
        sx={{
          backgroundColor: backgroundColor,
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '5px',
        }}
      >
        {message.text}
      </Typography>
    );
  };


  return (

    <>
    <SideBar product={negoProduct}/>
    <Container maxWidth="sm" sx={{paddingBottom: '40px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center', marginBottom: '20px' , backgroundColor: '#45a049', padding: '10px',  borderRadius:'5px'}}>
        <Typography variant="h6" component="div" gutterBottom>
          Product Id : {negoProduct.id}
        </Typography>
      </Box> 
      
      <Box sx={{height: 150}}/>
      <Typography variant="h6" component="div" gutterBottom>
        Welcome to Negotiation Dashboard
      </Typography>
      
      <Typography variant="h6" component="div" gutterBottom>
        Your negotiation ID : {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room using product ID</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Product id"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>


      <form onSubmit={handleSubmit}>
        
        <TextField
        value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
         value={room}
         onChange={(e) => setRoom(e.target.value)}
         id="outlined-basic"
         label="Product id"
         variant="outlined"
       />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack >
        {messages.map((m, i) => renderMessage(m, i))}
      </Stack>

      
      
    </Container>
    </>
  )
}

export default Negotiation