const express = require('express');
const router = express.Router();
const request = require("request");

// Generate XML formated sitemap
function generate_xml_sitemap(callback) {
    const url = "https://api.stadmatcher.se/events/";
    const urls = ['/'];
    const root_path = 'https://stadmatcher.se';
    request.get(url, (error, response, body) => {
      let json = JSON.parse(body);
      
      for (var i = 0; i < json.length; i++) {
        urls.push('/match/'+json[i].id);
      }

        var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        for (var i in urls) {
            var priority = 0.5;
            var freq = 'monthly';
            
            xml += '<url>';
            xml += '<loc>'+ root_path + urls[i] + '</loc>';
            if(i == 0){
                freq = 'daily';
                priority = 0.9;
            }
            xml += '<changefreq>'+ freq +'</changefreq>';
            xml += '<priority>'+ priority +'</priority>';
            xml += '</url>';
            i++;
        }
        xml += '</urlset>';
        callback(xml);

    });
}

router.get('/robots.txt', function(req, res) {
   res.type('text/plain')
    res.send("User-agent: *\nDisallow: ");
})

// /sitemap.xml
router.get('/sitemap.xml', function(req, res) {
    generate_xml_sitemap(function(sitemap){
        res.header('Content-Type', 'text/xml');
        res.send(sitemap);  
    }); // get the dynamically generated XML sitemap   
})

module.exports = router;