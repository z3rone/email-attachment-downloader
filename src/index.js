var CronJob = require('cron').CronJob
var downloadEmailAttachments = require('download-email-attachments');
var fs = require('fs')
var moment = require('moment')
var downloadEmailAttachments = require('download-email-attachments');

const lastRunFile = 'status/lastRun'

var lastRun = '1970-01-01'
if(fs.existsSync(lastRunFile)) {
  lastRun = fs.readFileSync(lastRunFile)
  console.log("Ran last time "+lastRun)
} else {
  console.log("No previous run")
}

console.log("Schedule download")
var CronJob = require('cron').CronJob;
var job = new CronJob(
	process.env.CRON_SCHEDULE,
	run,
	null,
	true,
	process.env.TIME_ZONE
);

function run() {
  downloadEmailAttachments({
    account: process.env.EMAIL_CONNECTION, // all options and params besides account are optional
    directory: './downloads',
    filenameTemplate: '{senderAddress}/{day}/{filename}',
    timeout: 10000,
    log: {warn: console.warn, debug: (msg)=>{}, error: console.error, info: console.info },
    since: moment(lastRun, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),
    attachmentHandler: function (attachmentData, callback, errorCB) {
      //console.log(attachmentData)
      callback()
    }
  }, onEnd)
}

var onEnd = function (result) {
  if (result.error) {
    console.log(result.error)
    return
  }
  console.log("done")
  console.log(result.latestTime)
  fs.writeFileSync(lastRunFile, moment().format('YYYY-MM-DD'), { flag:'w+' })
}
