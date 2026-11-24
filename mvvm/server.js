const express = require('express');
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log('Server en écoute sur le port 3000 : http://localhost:3000');
});