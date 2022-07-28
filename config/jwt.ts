import jwt from 'jsonwebtoken';

export const generateJWT = (uid: String, name?: String) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, `${process.env.SECRET_JWT_SEE}`, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject(`Token not generate with error : ${error.message}`)
            }
            resolve(token);
        });
    });
};