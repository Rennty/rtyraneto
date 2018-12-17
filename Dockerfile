FROM node

WORKDIR /tmp
COPY package.json /tmp/
RUN ["npm", "config", "set", "registry", "http://registry.npmjs.org/"]
RUN ["npm", "install"]

WORKDIR /usr/src/app
COPY . /usr/src/app/

EXPOSE 3000

RUN ["cp", "-a", "/tmp/node_modules", "/usr/src/app/"]
RUN ["npm", "run", "gulp"]

CMD ["npm", "start"]