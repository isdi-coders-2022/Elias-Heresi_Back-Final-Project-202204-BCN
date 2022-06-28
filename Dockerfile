FROM node:latest
ARG PORT=8080
ENV PORT=$PORT
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE ${PORT}
CMD [ "node", "src/index.js" ] 
