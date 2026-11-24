const express = require('express');
const path = require('node:path');

const InMemoryUserRepository = require('./infrastructure/InMemoryUserRepository');
const GetProfile = require('./application/GetProfile');
const UpdateProfile = require('./application/UpdateProfile');
const createProfileRoutes = require('./infrastructure/profileRoutes');

const app = express();
app.use(express.json());

const repository = new InMemoryUserRepository();

const getProfile = new GetProfile(repository);
const updateProfile = new UpdateProfile(repository);

app.use('/api/profile',createProfileRoutes(getProfile, updateProfile));

app.listen(3000, () => {
    console.log("Serveur en écoute sur le port 3000");
});