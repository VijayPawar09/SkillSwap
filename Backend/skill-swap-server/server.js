// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const connectDB = require('./config/db'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/matches', require('./routes/match'));
app.use('/api/messages', require('./routes/message'));

// Socket.io
io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => socket.join(room));
  
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('receiveMessage', data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
