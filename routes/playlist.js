const express = require('express')
const Playlist = require('../models/Playlist')
const router = express.Router()

//creating a new playlist
router.post('/', async(req, res) => {
    const {name, songs} = req.body;
    try{
        const playlist = new Playlist({userId: req.user.userId, name, songs})
        await playlist.save();
        res.status(201).json(playlist);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}) 

//get all playlist for the authenticated user
router.get('/', async(req, res) => {
    try{
        const playlists = new Playlist({userId: req.user.userId})
        res.json(playlist);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}) 

//update a playlist
router.put('/:id', async(req, res) => {
    const {name, songs} = req.body;
    try{
        const playlist = new Playlist.findById(req.params.id)
        if(!playlist || playlist.userId.toString() !== req.user.userId){
            return res.status(403).send('forbidden')
        }
        playlist.name = name || playlist.name
        playlist.songs = songs || playlist.songs 
        await playlist.save();
        res.json(playlist);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}) 

router.delete('/:id', async(req, res) => {
    try{
        const playlist = new Playlist.findById(req.params.id)
        if(!playlist || playlist.userId.toString() !== req.user.userId){
            return res.status(403).send('forbidden')
        }
        await playlist.remove();
        res.send('playlist deleted');
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

router.get('/search', async(req, res) => {
    const {query} = req.qeury;
    try{
        const playlists = await Playlist.find({
            userId: req.user.userId,
            name: { $regex: query, $options: 'i'}
        })
        res.json({playlists})
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = router
