const mongoose = require('mongoose');
const cred = require('../credentials');

let count = 0;

const db_string = process.env.DB_CONNEXION_STRING ?
    process.env.DB_CONNEXION_STRING :
    'mongodb+srv://baj3ne:'+cred.passwd+'@cluster0.l7fg8.mongodb.net/baj3n?retryWrites=true&w=majority';

const options = {
    //geting rid off the depreciation errors
    useNewUrlParser: true,
    useUnifiedTopology: true

};

class MongooseService {

    static connectWithRetry() {
        console.log('MongoDB connection with retry')
        mongoose.connect(db_string, options).then(() => {
            console.log('MongoDB is connected')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count, err);
            setTimeout(this.connectWithRetry, 5000)
        })
    };
}

module.exports = {
    MongooseService
}