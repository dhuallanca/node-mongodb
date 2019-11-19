// configurar environment
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDataBase;

if (process.env.NODE_ENV === 'dev') {
    urlDataBase = 'mongodb://localhost:27017/cafe';
} else {
    // connect to mongo atlas
    urlDataBase = 'mongodb://localhost:27017/cafe';
}

process.env.UrlDataBase = urlDataBase;