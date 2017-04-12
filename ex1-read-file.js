var fs = require('fs')

fname = 'proverb50.txt'
fs.readFile(fname, function(err, data) {
    if (err) {
        return console.error(err)
    }
    console.log('Async read: \n' + data.toString())
})

console.log('The End')
