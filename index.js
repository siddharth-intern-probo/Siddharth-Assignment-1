const express = require("express");
const routes = require('./routes/userRoutes')
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/routes", routes);
app.listen(process.env.PORT, () => {
    console.log(`Server Running at port ${process.env.PORT}`)
})