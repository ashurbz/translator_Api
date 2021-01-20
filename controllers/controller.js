const axios=require("axios")

// creating the redis client
const redis=require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

// For knowing the language code of language entered by user
const ISO6391 = require('iso-639-1');
 


// add similar languages array(smart precaching)
const similarLanguagesList=[
    ["hi","kn","bn","gu","pa","ta","te"],
    ["en","cy",],
    ["fr","de","it","es","nl"]
]

// smart cache function to create a cache for similar languages

function smartCache(languageCode,text){
 
    // search for similar languages inside the array
    for(let i=0;i<similarLanguagesList.length;i++){
        let index=similarLanguagesList[i].indexOf(languageCode);
        
    // if language is not there in list then continue
        if(index==-1){
            continue;
        }
         
       for(let j=0;j<similarLanguagesList[i].length;j++){
           if(j!=index){
               console.log(similarLanguagesList[i][j]);
        const options = {
      method: 'POST',
    //   using api for translation
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        to: similarLanguagesList[i][j],
        'api-version': '3.0',
        profanityAction: 'NoAction', 
        textType: 'plain' 
      },
      headers: {
        'content-type': 'application/json',
         
        'x-rapidapi-key': '5b619857d7mshc5ac66e73308840p1ef199jsn73cdfb32d201',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data:JSON.stringify([{Text:text}])
    };
    
    axios.request(options)
        
               .then(response => {
                console.log(response.data[0].translations[0].text);
    
                // adding data to redis
                let key=text+":"+similarLanguagesList[i][j];
                client.setex(key, 2000, response.data[0].translations[0].text);                          
                
            }).catch(err => {
                console.log('**err**',err.data);
            });
           }
       }   
        
    }

}

// function to translate the text

module.exports.translateText= function(req,res){
   
    // getting the language code
    let languageCode= ISO6391.getCode(req.body.language);
    
    smartCache(languageCode,req.body.text);


    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        to: languageCode,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '5b619857d7mshc5ac66e73308840p1ef199jsn73cdfb32d201',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: JSON.stringify([{Text:req.body.text}])
    };
    
    axios.request(options).
    then(response => {
            console.log(response.data[0].translations[0]);
            
            // enter data in cache
            let key=req.body.text+":"+languageCode;
            
             
            client.setex(key, 2000, response.data[0].translations[0].text);
        
            return res.json(200, {
                message: "translaton done",
                data:response.data[0].translations[0].text
            });          
            
        }).catch(err => {
            console.log('********', err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        });

   

    
    
    
    
}