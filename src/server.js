import express from "express";

const server = express()
  .get("/*", (req, res) => {
    res.send("TEST");
  });

export default server;
