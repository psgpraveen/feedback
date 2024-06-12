const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use Helmet for security
app.use(helmet());
app.use(express.json());
app.use(cors());

// MongoDB connection
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb is connected"))
  .catch(err => console.error("Mongodb connection error:", err));

// Define the schema and model
const kSchema = new mongoose.Schema({
  name: { type: String, required: true },
  msg: { type: String, required: true },
  email: { type: String, required: true },
});

const Feedback = mongoose.model('Feedback', kSchema);

// Define routes
app.get("/", async (req, res) => {
  try {
    const data = await Feedback.find({});
    res.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post('/', async (req, res) => {
  try {
    const newData = new Feedback(req.body);
    const result = await newData.save();
    console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
