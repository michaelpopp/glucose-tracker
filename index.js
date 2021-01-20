const express = require('express');
const connectDatabase = require('./config/database');
const app = express();

// Connect to Database
connectDatabase();

app.use(express.json({ extended: false }));

// Defining Routes
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
