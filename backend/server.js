const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const moodsRoutes = require("./routes/moods");
const journalRoutes = require("./routes/journals");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/moods", moodsRoutes);
app.use("/api/journals", journalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
