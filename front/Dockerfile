FROM node:20-alpine AS builder

WORKDIR /app

COPY ./front/package.json ./
COPY ./front/yarn.lock ./
RUN yarn install

FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV TZ=Asia/Ulaanbaatar

# Use the correct timezone
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=builder /app ./

EXPOSE 3030

ENV NEXT_HOST=0.0.0.0
ENV NEXT_PORT=3030
