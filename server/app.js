const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

// Set up the express app
const app = express();
app.use(cors());
// get all todos
app.get("/bookings", (req, res) => {
  fetch("https://challenge.smove.sg/bookings")
    .then(res => res.json())
    .then(json => res.status(200).send(json))
    .catch(err => res.status(500).send(err.message));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
