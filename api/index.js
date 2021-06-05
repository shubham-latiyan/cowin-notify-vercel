"use strict";
require("dotenv").config();
const fastify = require("fastify");
const controller = require("../controllers");
let clearTime;

function build() {
  const app = fastify({
    logger: true,
  });

  controller.run();

  startCowinApp();
  // }, 840000);

  app.get("/", async (req, rep) => {
    startCowinApp();
    return { message: "Server is up..." };
  });

  process.on("SIGINT", () => {
    process.exit(1);
  });

  process.on("exit", () => {
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

function startCowinApp() {
  clearTime = setTimeout(() => {
    controller.run();
  }, 2000);
}
