const express = require('express');
const dotenv = require('dotenv');
const boardRoute = require('./routes/boardRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use('/boards', boardRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
