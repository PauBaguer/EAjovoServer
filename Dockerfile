FROM node:16
WORKDIR /app
RUN npm install -g @jovotech/cli
COPY package.json .
RUN npm install
COPY . .

EXPOSE 5000
CMD jovo run --port 5000