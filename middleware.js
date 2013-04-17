var fs = require('fs'),
    path = require('path');

module.exports = function Config(options) {

    return function ImageUpload(req, res, next) {

        if (req.method !== 'PUT') {
            return next();
        }

        var filename = String(Math.random()).replace(/^0\./, '') + path.basename(req.url);
        var writeStream = fs.createWriteStream(path.join(options.uploadDir, filename));

        writeStream.on('error', function (err) {
            console.log(err);
        });
        writeStream.on('close', function () {
            res.statusCode = 201;
            res.end(JSON.stringify({
                url: options.uploadUrl + filename
            }));
        })
        req.pipe(writeStream);
    };
};