var time = document.getElementById('time'),
    hash = window.location.search,
    hashParts = hash ? hash.substr(1).split(':') : [],
    debug = false;

if (hash.length === 9 && hashParts.length === 3) {
    debug = true;

    for (var i = 0; i < hashParts.length; i++) {
        if (hashParts[i].length !== 2 || isNaN(hashParts[i])) {
            debug = false;
            break;
        }
    }
}

var render = function (h, m, s) {
    var r = Math.round(h / 23 * 255),
        g = Math.round(m / 59 * 255),
        b = Math.round(s / 59 * 255);

    h = h <= 9 ? '0' + h : h;
    m = m <= 9 ? '0' + m : m;
    s = s <= 9 ? '0' + s : s;

    document.body.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    // Credits to Gacek https://stackoverflow.com/a/1855903/3893182
    time.style.color = (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255) < 0.5 ? '#000' : '#fff';
    time.innerText = h + ':' + m + ':' + s;
};

if (debug) {
    render(
        parseInt(hashParts[0]),
        parseInt(hashParts[1]),
        parseInt(hashParts[2])
    );
} else {
    var tick = function () {
        var d = new Date(),
            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds();

        render(h, m, s);
    };

    tick();

    setInterval(tick, 1000);
}
