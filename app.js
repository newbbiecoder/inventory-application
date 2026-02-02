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

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error
    }
    console.log(`Express app running on port ${PORT}`);
})