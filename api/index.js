"use strict";
require("dotenv").config();
const fastify = require("fastify");
const controller = require("../controllers");
const CronJob = require("cron").CronJob;

function build() {
  const app = fastify({
    logger: true,
  });

  app.get("/", async (req, rep) => {
    startCowinApp();
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

function startCowinApp() {
  const job = new CronJob("0 */1 * * * *", function () {
    const d = new Date();
    console.log("Every fifth Minute:", d);
    controller.run();
  });
  job.start();
}
