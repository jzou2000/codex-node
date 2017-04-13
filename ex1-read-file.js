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
                //console.log('%d: %s', i, lines[i])
        }
        if (p != undefined) proverb.push(p);
        console.log('loaded: %s', fname);
    });
    return proverb;
}

fname = 'proverb50.txt';
ps = getProverb(fname);

console.log('length of ps=%d', ps.length);

timers = require('timers');
timers.setTimeout(function(){
        console.log('timeout');
        for (i = 0; i < ps.length; ++i) {
            console.log("%d: %s\n        ", 1+i, ps[i].text, ps[i].desc);
        }

}, 200);


console.log('The End');


