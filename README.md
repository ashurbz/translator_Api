# TRANSLATION API WITH CACHE IMPLEMENTATION
A design of an API for translation of text to any particular language the user wants. There is implementation of cache using Redis for repeatedly hitting api's and smart caching is also implemented.<br/>

**Tech stack used**<br/>
  >Nodejs<br/>
  >Express framework<br/>
  >Redis (For cache)<br/>

**Setup the API**
> Fireup the Redis server on PORT 6379<br/>
> Run npm start (In VSC terminal)<br/>

**Theme of the API**
- Translates text<br/>
- Implements caching for repeated api hits<br/>
- Pre-Caching is being done in such a way that if user enters a language then same text for other languages of same region also gets cached anticipating that user might also want to translate in some other language.<br/>
- For example if the user translates the text to kannada, then translation to languages such as hindi, telugu, bengali etc will also be stored in cache which will reduce the response time of the api(For hindi,telugu etc).<br/>
- Expiration time of each data is set in cache.

**Key modules used**<br>
- vitalets/google-translate-api (for translating text)<br/>
- iso-639-1 (for detecting language code)<br/>   

**Explanation of Design Decisions**

- Express framework used <br/>
- Controller folder has the functionality of text translation and pre-caching<br/>
- Middleware folder contails the middleware of cache that act as a check before moving to the controller, if key is present in redis then it would return the value and not move to the controller else if not found it will move to the controller<br>
- Client enters text and language he wants to translate it to<br/>
- At the server side Language code is detected by using iso-639-1 module as we need this code for translation<br/>
- vitalets/google-translate-api module is used to translate the text, text and language code are passed as parameters to translate function provided by this module and in response we get the translated text<br/>
- This translated text is cached to reduce response time of repeated api hits<br>
- For similar languages a list of related languages is stored<br>
- Smart pre-cache function is being called in the translate text function in which related languages of the entered language are cheched, translated and stored in cache<br/>
- Evaluation of the results is done by comparing the response time of the api<br/> 

**Screenshots**

![alt text](https://github.com/muneeb21/translation-api/blob/master/screenshots/ss3.png?raw=true)<br/>

**Repeated hit for same text**
![alt text](https://github.com/muneeb21/translation-api/blob/master/screenshots/ss4.png?raw=true)<br/>

**Example for pre-caching**

![alt text](https://github.com/muneeb21/translation-api/blob/master/screenshots/ss1.png?raw=true)<br/>

**Pre-caching**

![alt text](https://github.com/muneeb21/translation-api/blob/master/screenshots/ss2.png?raw=true)<br/>
