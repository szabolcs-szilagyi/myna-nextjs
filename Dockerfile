FROM node:14

USER node

RUN npm set progress=false && npm config set depth 0

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm ci --no-audit
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
