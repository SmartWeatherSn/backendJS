import log from "../logger";

const mongoose = require('mongoose');
const cred = require('../credentials');

export class MongooseService {
    static count = 0;

    static db_string = process.env.DB_CONNEXION_STRING ?
        process.env.DB_CONNEXION_STRING :
        'mongodb+srv://baj3ne:'+cred.passwd+'@cluster0.l7fg8.mongodb.net/baj3n?retryWrites=true&w=majority';

    static options = {
        //geting rid off the depreciation errors
        useNewUrlParser: true,
        useUnifiedTopology: true

    };

    static connectWithRetry = () => {
        log.info('MongoDB connection with retry')
        mongoose.connect(MoongoseService.db_string, MoongoseService.options).then(() => {
            log.info('MongoDB is connected')
        }).catch(err => {
            log.error('MongoDB connection unsuccessful, retry after 5 seconds. ', ++MoongoseService.count, err);
            setTimeout(MoongoseService.connectWithRetry, 5000)
        })
    };
}