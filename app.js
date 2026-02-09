const express = require("express");
const path = require("node:path");

const app = express();
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter);

// Error Handler

app.use((req, res, next) => {
    res.status(404).send("Oops, where are we?")
})

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error
    }
    console.log(`Express app running on port ${PORT}`);
})