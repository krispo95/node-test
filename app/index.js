var express = require('express');
var app = express();

async function main() {

    app.use(express.urlencoded());


    // Parse JSON bodies (as sent by API clients)
    app.use(express.json());

    const xml2js = require('xml2js');
    const fs = require('fs');
    const parser = new xml2js.Parser({attrkey: "ATTR"});
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
        parser.parseString(xml_string, function (error, result) {
            if (error === null) {
                res.json(result);
            } else {
                console.log(error);
            }
        });
    })
}

main()

function jsonQueryTest(_, fp) {
    var source = {
        item: {
            name: 'first_item',
            price: 999,
            count: 25,
            group: 'group1'
        }
    }
    var roolsItemTo = {
        'item.name': 'item.name',
        'item.price': 'item.price',
        'item.count': 'item.count',
        'group.name': 'item.group'
    }
    var target = {
        item: {
            name: null,
            price: null,
            count: null
        },
        group: {
            name: null
        }
    }
    _.set(target, 'item.name', _.get(source, _.get(roolsItemTo, 'item.name')))
    _.set(target, 'item.price', _.get(source, _.get(roolsItemTo, 'item.price')))
    _.set(target, 'item.count', _.get(source, _.get(roolsItemTo, 'item.count')))
    _.set(target, 'group.name', _.get(source, _.get(roolsItemTo, 'group.name')))
    console.log(target)
}