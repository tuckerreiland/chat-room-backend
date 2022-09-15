const express = require('express');
const cors = require("cors")
const { createServer } = require("http");
const { Server } = require("socket.io");
// const allRoutes = require('./routes');
// const mongoose = require('./config/connection');
// require('dotenv').config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors:{
		origin: 'http://localhost:3000',
		methods: ['GET','POST']
	}
});
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


io.on("connection", (socket) => {
	console.log(`Connected to ${socket.id}`)

  	socket.on('send-message', (data) => {
		console.log(data)
		socket.broadcast.emit('receive-message', data)
	})
});

server.listen(3001, () => {
	console.log(`Server listening on ${PORT}`)
});



// app.use('/', allRoutes);

// mongoose.once('open',() => {
//     app.listen(PORT, () => {
// 		console.log(`API server running on port http://localhost:${PORT} !`);
// 	  });
// });