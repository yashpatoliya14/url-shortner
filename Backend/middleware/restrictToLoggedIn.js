const jwt = require('jsonwebtoken');

const restrictToLoggedIn = (req, res, next) => {
    // const token = req.cookies?.uid;
    // console.log(token);
    
    // if (!token) {
    //     return res.status(401).json({ "msg": "Authentication required" });
    // }

    // try {
    //     const user = jwt.verify(token, process.env.secret);

    //     if (!user) {
    //         return res.status(401).send({ "msg": "Invalid token" });
    //     }
    //     console.log("print-------------------------------------------------------------");
        
    //     console.log(user);
        
    //     req.user = user;
    //     next();
    // } catch (error) {
    //     return res.status(403).send({ "msg": "Token verification failed" });
    // }
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).send({ msg: "No token provided", success: false });
    }

    const token = authHeader.split(' ')[1]; // Extract token from the 'Bearer <token>' format
    
    if (!token) {
        return res.status(403).send({ msg: "No token provided", success: false });
    }

    jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: "Invalid token", success: false });
        }

        req.user = decoded; // Store user details from token payload
        next();
    });
};

module.exports = { restrictToLoggedIn };
