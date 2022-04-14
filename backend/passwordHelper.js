const bcrypt = require("bcrypt");

exports.hashPassword = (password) => {
    //resolve or reject
    return new Promise((resolve, reject) => {
        //to give strength of password. higher strength makes it slower.
        bcrypt.genSalt(12,(err, salt) => {
            if (err) {
                reject(err);

            }
            //Once resolved(accepted), hash a password
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// When user log in, compare the password user entered and the password stored in database
exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}