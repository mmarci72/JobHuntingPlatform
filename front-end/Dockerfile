FROM node:20-alpine AS build
WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm ci
COPY . .
RUN env NG_BUILD_MANGLE=false npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/front-end/browser /usr/share/nginx/html
