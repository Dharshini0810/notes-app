const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorHandler');
const { dbConnect } = require('./config/dbConnection');
const app = express()

const PORT = process.env.PORT || 5001

app.use(express.json());

app.use(
    cors({
        origin: '*'
    })
);

dbConnect()

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/notes',require('./routes/notesRoutes'))
app.use(errorHandler)


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = app


