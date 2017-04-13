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

exports.getProverb = getProverb;


