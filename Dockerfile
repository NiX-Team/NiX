FROM kkarczmarczyk/node-yarn:latest
WORKDIR /nix
COPY package.json /nix
COPY yarn.lock /nix
RUN yarn --registry=https://registry.npm.taobao.org
COPY . /nix
CMD npm start
EXPOSE 8080
