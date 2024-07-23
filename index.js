const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const playlistRoutes = require('./routes/playlist')
const authMiddleWare = require('./middleware/auth')
const app = express();
const port = 4444;

const uri = process.env.ATLAS_URI
mongoose.connect('mongodb+srv://abhi123:abhi123@cluster0.yx6qx06.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongodb connected')
})

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/playlists', authMiddleWare, playlistRoutes);

app.listen(port, ()=> {
    console.log('server started')
});
