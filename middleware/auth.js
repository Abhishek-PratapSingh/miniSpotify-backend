const jwt = require('jsonwebtoken')
const authentication = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.sendStatus(403);

    jwt.verify(token, 'djacahfqy89dcj', (err, user) => {
        if(err) return res.sendStatus(400);
        req.user = user;
        next();
    })
}

module.exports = authentication