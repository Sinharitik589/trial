import express from "express";
import fs from "fs";
import path from "path";
const app = express();

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from "../src/App"


app.use("^/$", (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some Error Happened");

        }
        
        return res.send(data.replace("<div id='root'></div>", `<div id='root'>${ReactDOMServer.renderToString(<App />)}</div>`))
    })
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(8000, () => {
    console.log("Server started on 8000");
});

