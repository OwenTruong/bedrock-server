# syntax=docker/dockerfile:1

FROM ubuntu:latest
WORKDIR /bedrock
RUN apt update
RUN apt upgrade
RUN apt-get install curl -y
RUN apt-get install nodejs
COPY . .
CMD ["./bedrock_server"]
EXPOSE 19132

# Commands
# docker build -t bedrock-testing .
# docker run -it --network bedrock --network-alias bed bedrock-test