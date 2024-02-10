import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app= express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
      credentials: true, 
    },
  });

io.on("connection", (socket)=>{
    
    console.log("User connected ", socket.id);
    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id)
    }) 
    socket.on("message", ({room,message,sender})=>{
        console.log(room,message);
        io.to(room).emit("recive", message, sender )
    })
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
      });

    
})


app.get("/", (req, res)=>{ 

    res.send("hello world")
})

server.listen(port, ()=>{

     console.log("Server is leastning on port 3000")
    
}) 