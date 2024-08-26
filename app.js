const express = require("express");
const app = express();
const path = require("path");


const http = require("http");

const socketio = require("socket.io");  // socketio ko chalane k lea http ka server chahea
// http is a packeage which is pre innstalled in nodejs

const server = http.createServer(app);
const io = socketio(server);

// THIS ALL WAS THE BOILER PLATE OF SOCJETIO WHICH IS NEEDED TO BE SETUP BEFORE USING SOCJETIO
// -------------------------------------------------------------

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    // console.log("connected");
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000);