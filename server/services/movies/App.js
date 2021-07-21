const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const route = require("./routes");
const errorHandler = require('./middlewares/errorHandler');

const { connect } = require("./config/mongo");

app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use(route);

connect()
.then(() => {
    console.log("🚀 Successfully connected to database!");
    app.listen(PORT, () => {
        console.log("🚀 Services Movies running on port ", PORT);
    })
})

