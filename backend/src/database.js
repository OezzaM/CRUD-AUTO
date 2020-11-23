import MongoClient from 'mongodb';

export async function connect () {
    try{

        const client = await MongoClient.connect( /* process.env.MONGODB_URI || */'mongodb://localhost:27017',{
            useUnifiedTopology: true
        })
        const db = client.db('autos');
        return db;
    } catch(e){
        console.log(e);
    }
}

