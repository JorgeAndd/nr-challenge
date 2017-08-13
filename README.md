# nr-challenge

Javascript implementation for a web crawler/scrapper, using nodeJS, simplecrawler, cheerio and MongoDB.

## Prerequisites
For running this project you will need
* Node.js ( code implemented on v6.9.2);
* A MongoDB server;


## Installing
```
> git clone https://github.com/JorgeAndd/nr-challenge
> cd nr-challenge
> npm install
> npm start
```

This program is configured to run on a localhost MongoDB server, on default port 27017. To change this configuration, please edit file **/config/config.js**

## How this program works

This program crawls on the **CÂMARA LEGISLATIVA DO DISTRITO FEDERAL** website, searching for biddings (*licitações*) pages, and storing them on a MongoDB database.

The crawling is done using [simplecrawler](https://github.com/cgiffard/node-simplecrawler), using regexes to limit the pages of interest, these pages being biddings or files pages. 

When a page corresponding to a bidding or a file page, the page is scrapped using [cheerio](https://github.com/cheeriojs/cheerio). The scrapper is responsible for getting the needed information from the page, as well as making a final checking to guarantee that this is indeed the correct kind of page.

Biddings and files information are stored in a Mongo database to allow later querying. 
The mongo object is stored in the following format
```
    {
    _id      : ObjectID,
    nome     : String,
    abertura : String,
    id       : String
    documents: Array [{
                         nome: String
                         url : String
                      }]
    }
```
