const api = require("./api");
const email = require("./email");

exports.run = async () => {
  const result = await api.getAvailableSlots();
  await generateTemplate(result);
};

async function generateTemplate(results) {
  let text = "";
  results.forEach((el, index) => {
    text += `${index + 1}  |  date: ${el.date}  |  capacity: ${
      el.available_capacity
    }  |  age: ${el.min_age_limit}  |  vaccine: ${
      el.vaccine
    }  |  slots: ${el.slots.join(",  ")}  <br>`;
  });
  await email.sendEmail(String(results.length), text);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});
