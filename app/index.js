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

    var _ = require('lodash');
    var fp = require('lodash/fp');
    app.get('/', function (req, res) {
        res.send('Hello Me');
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');

        // parser.parseString(xml_string, function(error, result) {
        //     if(error === null) {
        //         console.log(result);
        //     }
        //     else {
        //         console.log(error);
        //     }
        // });

        jsonQueryTest(_, fp)
    });

    app.post('/json', function (req, res) {
        console.log(req.body)
        // var a = req.body.x + req.body.y
        res.json(req.body)
    })

    app.get('/xml', function (req, res) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        parser.parseString(xml_string, function(error, result) {
            if(error === null) {
                res.json(result);
            }
            else {
                console.log(error);
            }
        });
    })
}
main()

function jsonQueryTest (_, fp) {
    // var itemFrom = {
    //     name: 'name',
    //     price: 'price',
    //     count: 'count'
    // }
    // var rools = {
    //     name: 'itemFrom.name',
    //     count: itemFrom.count
    // }
    // var itemTo = {
    //     name: rools.name
    // }

    let contact1 = {
        name: 'Sherlock Holmes',
        phone: ['555-123-456']
    };
    let contact2 = {
        address: '221B Baker Street',
        phone: ['555-654-321']
    };

    console.log(_.merge(contact1, contact2))
    console.log(fp.map(parseInt)(['6', '8', '10']))
}