// Import the installed modules.
const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

const app = express();

// create and connect redis client to local instance.
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// use response-time as a middleware
app.use(responseTime());

app.get('/api/search',(req,res) => {
  // res.send('Hello World');
  const qu = (req.query.qu).trim();
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${qu}`;
  console.log(qu)
  console.log('searchUrl')
  console.log(searchUrl)
  return client.get('wikipedia:${qu}',(err,result) => {
    console.log('inside')
    //If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else{
      //Key does not exist in Redis store.
      // Fetch directly from Wikipedia API
      return axios.get(searchUrl)
        .then(response => {
          console.log('response')
          console.log(response.data)
          const responseJSON = response.data;
          // Save the Wikipedia API response in Redis store
          client.setex('wikipedia:${qu}', 3600, JSON.stringify({ source: 'Redis Cache',responseJSON, }));
          return res.status(200).json({ source: 'Wikipedia API',responseJSON, });
          // return res.status(200).send(response.data);
        })
        .catch(err =>{
          return res.json(err);
        });
      // return res.status(404).json({error: err});
    }
  });
});


// // create an api/search route
// app.get('/api/search', (req, res) => {
//   // Extract the query from url and trim trailing spaces
//   const query = (req.query.query).trim();
//   // Build the Wikipedia API url
//   const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;
//
//   // Try fetching the result from Redis first in case we have it cached
  // return client.get(`wikipedia:${query}`, (err, result) => {
//     // If that key exist in Redis store
//     if (result) {
//       const resultJSON = JSON.parse(result);
//       return res.status(200).json(resultJSON);
//     } else { // Key does not exist in Redis store
//       // Fetch directly from Wikipedia API
//       return axios.get(searchUrl)
//         .then(response => {
//           const responseJSON = response.data;
//           // Save the Wikipedia API response in Redis store
          // client.setex(`wikipedia:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
//           // Send JSON response to client
//           return res.status(200).json({ source: 'Wikipedia API', ...responseJSON, });
//         })
//         .catch(err => {
//           return res.json(err);
//         });
//     }
//   });
// });

app.listen(8080, () => {
  console.log('Server listening on port: ', 8080);
});
