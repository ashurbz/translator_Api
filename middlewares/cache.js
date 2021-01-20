const REDIS_PORT = process.env.PORT || 6379;
const redis=require('redis');
// create the redis client
const client = redis.createClient(REDIS_PORT);

const ISO6391 = require('iso-639-1');


// middleware for cache
module.exports.cache=function (req, res, next) {
  
  if(req.body.text.length==0){
    return res.json(422, {
      message: "Please enter text",
      
  });
  }
  let languageCode= ISO6391.getCode(req.body.language);
  
  let key=req.body.text+":"+languageCode;
    
    client.get(key, (err, data) => {
      if (err) throw err;
  
      if (data !== null) {
          console.log("middleware used");
        return res.json(200, {
            message: "Here is the translated text",
            data:data
        }); 
      } else {

        next();
      }
    });
  }