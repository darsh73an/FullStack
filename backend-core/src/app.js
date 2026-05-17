require("express-async-errors")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ── Security headers (sets X-Frame-Options, CSP, HSTS etc. automatically) ──
app.use(helmet());

app.use(cors({
    origin:"http://localhost:3000" || process.env.PORT ,
    credentials:true}
));

// ── Parse incoming JSON bodies ───────────────────────────────────────────────
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

