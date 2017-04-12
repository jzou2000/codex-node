var express = require('express')
var app = express()

app.use(express.static('public'))


app.get('/rest', function(req, res) {
    res.send('hello world')
})

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
