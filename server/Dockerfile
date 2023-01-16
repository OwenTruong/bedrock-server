# syntax=docker/dockerfile:1

FROM ubuntu:latest
WORKDIR /server
RUN apt update
RUN apt upgrade
RUN apt-get install curl -y
RUN apt-get install nodejs -y
COPY . .
CMD ["./bedrock_server"]
EXPOSE 19132


# Commands
# ENV 
# docker build -t bedrock-server .
# docker volume create current-world
# docker run -it --network bedrock --network-alias bed --mount type=volume,src=current-world,target=/server/worlds bedrock-server
# /stop

# docker rm -f $(docker ps -a -q)