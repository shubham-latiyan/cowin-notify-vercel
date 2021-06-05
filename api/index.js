"use strict";
require("dotenv").config();
const fastify = require("fastify");
const controller = require("../controllers");

function build() {
  const app = fastify({
    logger: true,
  });

  app.get("/", async (req, rep) => {
    controller.run();
    return { message: "Server is up..." };
  });

  process.on("SIGINT", () => {
    clearInterval(clearTime);
    process.exit(1);
  });

  process.on("exit", () => {
    clearInterval(clearTime);
  });

  process
    .on("unhandledRejection", (reason, p) => {
      app.log.info(reason, "Unhandled Rejection at Promise", p);
    })
    .on("uncaughtException", (err) => {
      app.log.info(err, "Uncaught Exception thrown");
      process.exit(1);
    });

  return app;
}

module.exports = build;