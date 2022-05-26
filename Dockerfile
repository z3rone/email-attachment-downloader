FROM node:12.22.5-bullseye-slim

RUN mkdir /app
WORKDIR /app
RUN mkdir status
RUN mkdir downloads


COPY src/index.js .
COPY package.json .
COPY package-lock.json .
COPY src/entrypoint.sh .

RUN chmod +x entrypoint.sh

VOLUME ["/app/status", "/app/downloads", "app/node_modules"]

ENV CRON_SCHEDULE="0 0 * * *"
ENV TIME_ZONE="Europe/Berlin"
ENV FILENAME_PATTERN="{filename}"

CMD ["bash", "entrypoint.sh"]
