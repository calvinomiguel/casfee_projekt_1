import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile('/Users/calvinomiguel/Documents/Dev/casfee_projekt_1/src/index.html');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});