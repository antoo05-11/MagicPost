import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./api/routes";

dotenv.config();

var http = require('http');
var app = express();
var server = http.createServer(app);

// Register middleware
app.use(express.json());
app.use(cookieParser());

// Static files
app.use("/src/public", express.static('./src/public/'));
app.use(cors());

// Error handler
app.use((err, req, res, next) => {
    const {
        status = 404, message = "Error"
    } = err;
    res.status(status).json({
        message
    });
});

const PORT = process.env.PORT || 5050;;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to MagicPost server!!!"
    });
});

app.use("/api", router);

const https = require('https');
function makeRequest() {
    https.get(process.env.ACTIVATE_SERVER_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                console.log(jsonData); 
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

makeRequest();
setInterval(makeRequest, 600000);