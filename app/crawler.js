var Crawler = require('simplecrawler'),
    scrapper = require('./scrapper.js'),
    db = require('./database.js')

db.connect(function() {
    crawl();
});

function crawl() 
{
    var crawler = Crawler('http://www.cl.df.gov.br/pt_PT/pregoes');

    // crawler configuration
    crawler.interval = 100;
    crawler.maxConcurrency = 15;

    // crawler conditions
    crawler.addFetchCondition(function(queueItem, referrerQueueItem, callback) {
        var match = queueItem.path.match(/\/pt_PT\/pregoes\/-\/document_library_display/);
        
        callback(null, match);    
    });

    // crawler events
    crawler.on('crawlstart', function() {
        console.log('crawling pages...');
        console.log('please wait for crawling to finish');
    });

    crawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {        
        var match = queueItem.path.match(/\/pt_PT\/pregoes\/-\/document_library_display\/ou5V\/view\/(\d*)$/)
        
        if (match) {
            // Matches a pregão page

            var url = queueItem.url;
            var id = match[1];

            pregao = scrapper.parse(responseBuffer);

            if (pregao) {
                pregao.id = id;
                pregao.url = url;
                db.storePregao(pregao);
            }
                
        } else {
            match = queueItem.path.match(/\/pt_PT\/pregoes\/-\/document_library_display\/ou5V\/view\/(\d*)\/(\d*)/);
            if (match)
            {
                // Matches a file page

                var id = match[1];
                
                document = scrapper.parseDocumentPage(responseBuffer);

                if(document) {
                    db.storeAttachment(id, document);
                }
            }
        }
    });

    crawler.start();
}
