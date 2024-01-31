FROM node:18.16.1 AS node
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/project-opportunities /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
