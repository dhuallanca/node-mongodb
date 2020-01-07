// configurar environment
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.SEED = process.env.SEED || 'secret-token-key';
process.env.TIME_TOKEN = 60 * 60 * 300;

let urlDataBase;

if (process.env.NODE_ENV === 'dev') {
    urlDataBase = 'mongodb://localhost:27017/cafe';
} else {
    // connect to mongo atlas
    urlDataBase = 'mongodb://localhost:27017/cafe';
}

process.env.UrlDataBase = urlDataBase;

process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '1093725568326-1spm7u009nv51u03lfurnda18qsgud6s.apps.googleusercontent.com';

// https://github.com/enrikraymtz/restserver-node-curso/blob/master/server/middlewares/autenticacion.js