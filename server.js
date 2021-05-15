// Dependencies
const express = require('express');

// Sets up the Express App
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starts Listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));