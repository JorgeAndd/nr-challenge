var cheerio = require('cheerio');

module.exports = {
    parseFirstPage: function(html) {
        var $ = cheerio.load(html);
        var links = [];

        $('.results-grid table tbody').first().filter(function() {
            var table = $(this);
    
            var rows = table.find('tr, .results-row').slice(2); // The first two rows are not biddings links
    
            rows.each(function(i, element) {
                var row = $(this);
                var link = row.find('a').attr('href');
    
                links.push(link);
            });
    
        });

        return links;
    },

    parse: function(html) {
        var $ = cheerio.load(html);

        var title = $('#breadcrumbs .last span a').text(); 

        // Ignores page if title does not starts with 'Pregão'
        if (title.indexOf('Pregão') == -1)
            return;

        var nome;
        var abertura;
        
        nome = $('.header-title span').text().trim();
        abertura = $('.lfr-asset-description').text().trim();

        return {nome: nome, abertura: abertura};
    },

    parseDocumentPage: function(html) {
        var $ = cheerio.load(html);

        var nome = $('.header-title span').text().trim();
        var url = $('.lfr-asset-field input').attr('value');

        if(nome == null || url == null)
            return null;
        else
            return {nome: nome, url: url};
    }
}