var express = require('express');
var app = express();

async function main () {

    app.use(express.urlencoded());


    // Parse JSON bodies (as sent by API clients)
    app.use(express.json());

    var xmlData =  '<?xml version="1.0" encoding="UTF-8"?>' +
        '<root>' +
        '<child foo="bar">' +
        '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
        '</child>' +
        '<sibling>with content!</sibling>' +
        '</root>';

    var parser = require('fast-xml-parser');

    var options = {
        attributeNamePrefix : "@_",
        attrNodeName: false,
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        attrValueProcessor: a => a.toUpperCase(),
        tagValueProcessor : a => a.toUpperCase()
    }

    if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(xmlData);
    }
    const xml2js = require('xml2js');
    const fs = require('fs');
    const parser2 = new xml2js.Parser({ attrkey: "ATTR" });
    let xml_string = fs.readFileSync("registers.xml", "utf8");

// Intermediate obj
//     var tObj = parser.getTraversalObj(xmlData,options);
//     var jsonObj = parser.convertToJson(tObj,options);

    app.get('/', function (req, res) {
        res.send('Hello Me');
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');

        parser2.parseString(xml_string, function(error, result) {
            if(error === null) {
                console.log(result);
            }
            else {
                console.log(error);
            }
        });
        console.log(jsonObj);
    });

    app.post('/sum', function (req, res) {
        console.log(req.body)
        var a = req.body.x + req.body.y
        res.json(a)
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