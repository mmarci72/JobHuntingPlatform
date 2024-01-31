FROM node:20-alpine AS build
WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/front-end/browser /usr/share/nginx/html
