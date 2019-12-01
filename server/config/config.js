// configurar environment
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.SEED = process.env.SEED || 'secret-token-key';
process.env.TIME_TOKEN = 60 * 60 * 10;

let urlDataBase;

if (process.env.NODE_ENV === 'dev') {
    urlDataBase = 'mongodb://localhost:27017/cafe';
} else {
    // connect to mongo atlas
    urlDataBase = 'mongodb://localhost:27017/cafe';
}

process.env.UrlDataBase = urlDataBase;