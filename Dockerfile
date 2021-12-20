## declare base image - node 16
FROM node:16.13.1-alpine3.12 AS builder
## make work directory and copy files 
WORKDIR /app 
COPY . . 
## project dependency install 
RUN apk add --no-cache python3 make g++
RUN yarn 
RUN yarn run build 

FROM node:16.13.1-alpine3.12
WORKDIR /usr/src/app 
COPY --from=builder /app ./ 

EXPOSE 3000 
CMD yarn start:prod
