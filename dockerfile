FROM node:14

# Create app directory
WORKDIR /src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY . .

RUN npm install

RUN npx tsc
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

CMD [ "node", "/lib/app.js" ]