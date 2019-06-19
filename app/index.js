var express = require('express');
var app = express();

async function main () {

    app.use(express.urlencoded());


    // Parse JSON bodies (as sent by API clients)
    app.use(express.json());

    const xml2js = require('xml2js');
    const fs = require('fs');
    const parser = new xml2js.Parser({ attrkey: "ATTR" });
    let xml_string = fs.readFileSync("app/registers.xml", "utf8");

// Intermediate obj
//     var tObj = parser.getTraversalObj(xmlData,options);
//     var jsonObj = parser.convertToJson(tObj,options);

    app.get('/', function (req, res) {
        res.send('Hello Me');
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');

        parser.parseString(xml_string, function(error, result) {
            if(error === null) {
                console.log(result);
            }
            else {
                console.log(error);
            }
        });
    });

    app.post('/sum', function (req, res) {
        console.log(req.body)
        var a = req.body.x + req.body.y
        res.json(a)
    })

    app.get('/xml', function (req, res) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        parser.parseString(xml_string, function(error, result) {
            if(error === null) {
                console.log(result);
                res.json(result)
            }
            else {
                console.log(error);
            }
        });
    })

    app.get('/users', function (req, res) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        collection.find().toArray((err, items) => {
            console.log(items)
            res.json(items)
          })
    })

}
main()