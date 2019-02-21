const config = {
    production: {
        secret: process.env.secret,
        MONGO_URI: process.env.MONGO_URI,
        port: process.env.port
    }, development: {
        secret: '',
        MONGO_URI: 'mongodb://localhost:27017/practice',
        port: ''
    }

};

const getConfig = env => config[env] || config.development;
module.exports = getConfig;
