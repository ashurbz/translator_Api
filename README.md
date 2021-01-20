# TRANSLATION API WITH REDIS
A API for translation text to a particular language with use of redis for cache so that we can get results faster for same query
<br/>

**Tech used**<br/>
  >Nodejs<br/>
  >Express framework<br/>
  >Redis (For cache)<br/>
  >Microsoft rapid API

**Setup the API**
> Start the redis server on port 6379 
> Run npm start (In VS Code terminal)<br/>

**API Functionality**
- Translates text<br/>
- Implements caching for repeated api hits<br/>
- Implemented smart caching so  that if a user translates a text into
Kannada, he is likely to also translate the same text to Hindi. Therefore we want to not only request Kannada
from the external service but also other languages like Hindi, Tamil, etc. and store it in our cache.
- The smart caching is not affecting the response time of the translation API.
<br/>

**PROCEDURE For Testing in POSTMAN**
- Hit a POST request on http://localhost:8000/translate
- Send two keys in body(text and language) and required results will be there

**POSTMAN Collection Link**
- You can visit on https://www.postman.com/collections/d3c19c53ee3 to view the example.




