const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const mongoose = require('mongoose');
const uri = 'mongodb+srv://vedanshsaini:<db_password>@2dmetaverse.huqpd.mongodb.net/?retryWrites=true&w=majority&appName=2dMetaverse';




// Serve static files if needed
app.use(express.static('public'));

//connect to mongodb atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB Atlas', err));


// Basic route to check server
app.get('/', (req, res) => {
  res.send('2D Metaverse Backend');
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
