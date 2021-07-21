const express = require("express");
const app = express();
const PORT = 4000;
const router = require('./route')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded ({ extended: true }))
app.use(express.json());
app.use(errorHandler);

app.use(router);

app.listen(PORT, () => {
    console.log("🚀 Orchestrator running on port ", PORT);
})