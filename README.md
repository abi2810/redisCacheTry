# Redis Cache using Nodejs and Express

## Redis 
 - Redis can act as database and cache.
 - It store data as data structure.
 - It is so fast and NoSql database.
 - It is often used to store the state temporarily.
 - Other than storing the data, It can act as message broker.

<b> Reference: </b> https://medium.com/@pealami/my-redis-research-what-why-35d941c5f6e3

## Project Info
We will call this project Wikipedia Article Getter and it will allow users to query the Wikipedia API from our endpoint.

## Prerequisite
Ensure you have Node.js installed on your computer, then open your Terminal (Mac OS) or Command Prompt (Windows users).

## Install Redis on your machine
If you an OSX user, you can install using the command below. For other platforms, please follow the guide on https://redis.io/download.

```brew install redis ```

## Follow up this step to create node application
- Create a directory as ```mkdir redisCacheTry ```
- Then navigate to the directory and do the command ```npm init -y``` (To initiate the package.json)
- Create a file in root as app.js.
- And then install, ```npm install --save axios express redis response-time```
    * Axios - To make HTTP requests.
    * Express - For Routing.
    * Redis - As Nodejs redis client.
    * ResponseTime - To record response time in response header.
- After installing all the dependency packages, copy and paste the code from project folder to app.js.
- Before running the application, you have to run the redis server and make sure redis is connected and running in the default port.
- To run the redis server, use this command ```redis-server```
- And then run the application from another terminal as ```node app.js```

Thats it. 
Now you can see your application is running and do some search and get the response.
