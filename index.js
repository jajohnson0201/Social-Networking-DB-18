const express = require('express');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const db = require('./config/connect');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('once', ()=> {
    app.listen(PORT, () => {
        console.log(`db server running on port: ${PORT}`);
    });
});



