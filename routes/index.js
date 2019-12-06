const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const mysql = require('mysql');
let exec = require('sync-exec');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'service_monitor'
});

connection.connect(err => {
  if (err)
    throw err;
  else console.log("MySQL connected...");
});

const slackBot = require('slackbots');
const bot = new slackBot({
  token: 'xoxb-802339229714-847389333906-aEJVHuzxrrdgjXEImg281gtH',
  name: 'service_monitor_bot'
});


// bot.on('start', () => {
//     bot.postMessageToChannel('general', 'Service monitor started..', '', () => {
//     });
// });

bot.on('error', err => console.log(err));

router.post('/useraction', (req, res, next) => {
  let action = req.body.action;
  bot.postMessageToChannel('general', service + " went down");
  console.log(req.body.service);
  res.send(req.body);
});

let notifiedFailedServices = [""];

cron.schedule('* * * * * *', () => {

  connection.query(`SELECT name FROM services`, (error, results, fields) => {
    if (error) throw error;
    let service;
    results.forEach(async element => {
      service = element.name;

      let data = exec(`systemctl is-active ${service}.service`);

      console.log(data.stdout.includes("failed") && !notifiedFailedServices.includes(service))
      console.log(notifiedFailedServices)
      if (data.stdout.includes("active") && !notifiedFailedServices.includes(service)) {
        bot.postMessageToChannel('general', `${service} has failed`);
        notifiedFailedServices.push(service);
      }

    });
  });
});


module.exports = router;