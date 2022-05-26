# Introduction
This docker container lets you download email attachments on a schedule.

This project ist based on the following packages:
* https://github.com/kelektiv/node-cron
* https://github.com/eHealthAfrica/download-email-attachments

# Usage
`docker run -it -e EMAIL_CONNECTION=$EMAIL_CONNECTION z3rone/email-attachment-downloader:0.5`

## Environment Variables

* `EMAIL_CONNECTION` - Defines the IMAP connection and login. For syntax see https://github.com/eHealthAfrica/download-email-attachments
* `CRON_SCHEDULE` - Defines the cron scheduling. Example: `*/5 * * * *` for every 5mins.
* `TIME_ZONE` - Defines the time zone for the cron package.
* `FILENAME_PATTERN` - Defines the file name pattern of the downloaded attachments. For syntax see https://github.com/eHealthAfrica/download-email-attachments
