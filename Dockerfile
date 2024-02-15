FROM node:18.12.1-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json postinstall.js ./
RUN npm install
RUN node postinstall.js
COPY . ./
RUN npm run build

# Serve with Nginx
FROM nginx:1.22-alpine

COPY ./.docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]