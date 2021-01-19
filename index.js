const express = require('express');
const connectDatabase = require('./config/database');
const app = express();

connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
