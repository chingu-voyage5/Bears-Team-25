const whitelist = ['http://localhost:3000'];
var corsOptions = (req, callback) => {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true };
    }
    else {
        corsOptions = { origin: false, credentials: false };
    }
    callback(null, corsOptions);
};

exports.corsOptions