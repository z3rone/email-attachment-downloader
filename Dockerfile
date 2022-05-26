FROM node:latest

RUN mkdir /app
WORKDIR /app
RUN mkdir status
RUN mkdir downloads


COPY src/index.js .
COPY package.json .
COPY src/entrypoint.sh .

RUN chmod +x entrypoint.sh

VOLUME ["/app/status", "/app/downloads", "app/node_modules"]

ENV CRON_SCHEDULE="0 0 * * *"

CMD ["bash", "entrypoint.sh"]
