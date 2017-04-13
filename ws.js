var express = require('express')
var app = express()

app.use(express.static('public'))

var fs = require('fs')
function getProverb(fname)
{
    proverb = [];
    fs.readFile(fname, function(err, data) {
        if (err) {
            return console.error(err);
        }
        lines = data.toString().split('\n');
        var pat = /\s*"\s*(.*?)\s*"\s*/;
        var p;
        for (i in lines) {
            m = pat.exec(lines[i]);
            if (m == null) {
                if (p != undefined) p.desc += lines[i];
            } else {
                if (p != undefined) proverb.push(p);
                p = { text: m[1], desc: '' };
            }
        }
        if (p != undefined) proverb.push(p);
        console.log('loaded: %s', fname);
    });
    return proverb;
}


ps = { proverb: getProverb('proverb50.txt'),
       index: 0 };

app.get('/rest', function(req, res) {
    var t = ps.proverb[ps.index];
    if (ps.index++ >= ps.proverb.length)
        ps.index = 0;
    res.send('<h2>' + t.text + '</h2>' + '<p>' + t.desc + '</p>')
});

app.get('/users/:uid/task/:taskid', function(req, res) {
    // give parameters in REST
    // for /user/jason/task/build, the output will be
    // {"uid":"jason","taskid":"build"}
    res.send(req.params)
})

var server = app.listen(8888, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Webservices is listening at http://%s:%s', host, port)
})
