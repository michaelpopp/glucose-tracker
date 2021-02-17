const express = require('express');
const connectDatabase = require('./config/database');
const app = express();

// Connect to Database
connectDatabase();

app.use(express.json({ extended: false }));

// Defining Routes
app.use('/user', require('./routes/users'));
app.use('/glucose', require('./routes/glucose'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
