const express = require('express');
const crypto = require('bcrypt');
const Usuario = require('../models/usuario');
const jwtoken = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();


app.post('', (req, res) => {
    const { email, pass } = req.body;
    Usuario.findOne({ email }, (err, userDb) => {

        if (err) {
            return res.status(500).json({
                succeded: false,
                err,
            });
        }
        if (!userDb) {
            return res.status(400).json({
                succeded: false,
                message: 'Usuario o Clave incorrectas'
            });
        }
        // valida contraseña encriptada
        if (!crypto.compareSync(pass, userDb.password)) {
            return res.status(400).json({
                succeded: false,
                message: 'Clave incorrectas'
            });
        }
        // secret code = seed
        const token = createToken(userDb);
        return res.status(200).json({
            succeded: true,
            message: `Bienvenido ${userDb.nombre}`,
            persona: userDb,
            token
        });
    });


});

// sign in google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    }
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
}

app.post('/googleSignIn', async(req, res) => {
    const token = req.body.idtoken;
    const userGoogle = await verify(token).catch(
        err => {
            return res.status(403).json({
                succeded: false,
                err
            });
        }
    );
    // validate if user exists in database
    /*
     const userExists = await Usuario.exists({email: userGoogle.email}, (err, res) => {
         err => {
             return res.status(500).json({
                 succeded: false,
                 err
             });
         }
     });
     */
    Usuario.findOne({ email: userGoogle.email }, (err, userObjectRes) => {
        if (err) {
            res.status(500).json({
                succeded: false,
                err
            });
        }
        // si no encuentra datos el userObjectRes is null
        if (userObjectRes) {
            if (!userObjectRes.google) {
                res.status(400).json({
                    succeded: false,
                    err: {
                        message: 'Debe usar la autenticación normal'
                    }
                });
            } else if (userObjectRes.google) {
                const token = createToken(userObjectRes);

                return res.json({
                    succeded: true,
                    persona: userObjectRes,
                    token
                });
            }
        } else {
            // usuario no ha sido registrado en la data base con su cta google
            const newUser = new Usuario({
                nombre: userGoogle.nombre,
                email: userGoogle.email,
                img: userGoogle.img,
                google: true,
            });

            newUser.save((err, userResponse) => {
                if (err) {
                    return res.status(400).json({
                        succeded: false,
                        err
                    });
                }
                const token = createToken(userResponse);

                res.json({
                    succeded: true,
                    message: 'usuario creado con su cta google',
                    persona: userResponse,
                    token
                });
            });
        }

    });
});

function createToken(user) {
    return jwtoken.sign({
            user
        },
        process.env.SEED, {
            expiresIn: process.env.TIME_TOKEN
        });
}
module.exports = app;