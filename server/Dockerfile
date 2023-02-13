# syntax=docker/dockerfile:1

FROM ubuntu:latest
WORKDIR /server
COPY . .
RUN apt update
RUN apt-get install -y curl 
# gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

CMD ["bash", "-c", "node index.mjs; cd bedrock-server; ./bedrock_server"]
EXPOSE 19132

# TODO: Use printenv and send result to a .env file and have index.mjs load it up
# Commands
# ENV 
# docker build -t bedrock-server .
# docker volume create current-world
# docker run -it --network bedrock --network-alias bed --mount type=volume,src=current-world,target=/server/worlds bedrock-server
# /stop
