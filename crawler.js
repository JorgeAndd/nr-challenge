var Crawler = require('simplecrawler');
    scrapper = require('./scrapper.js');

crawl();

function crawl() 
{
    var crawler = Crawler('http://www.cl.df.gov.br/pt_PT/pregoes');

    // crawler configuration
    crawler.interval = 100; // 0.5 second
    crawler.maxConcurrency = 15;

    // crawler conditions
    crawler.addFetchCondition(function(queueItem, referrerQueueItem, callback) {
        callback(null, queueItem.path.match(/\/pt_PT\/pregoes\//));
    })

    // crawler events
    crawler.on('crawlstart', function() {
        console.log('crawler started' + crawler.maxDepth);
    });

    crawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {
        // If path matches a pregão page, calls the scrapper
        if(queueItem.path.match(/\/pt_PT\/pregoes\/-\/document_library_display\/.*document_library_display/)) 
        {
            scrapper.parse(responseBuffer);
        }
    });

    crawler.start();
}
