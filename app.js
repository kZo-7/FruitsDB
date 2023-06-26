//USING MONGOOSE PACKAGE INSTEAD OF native mongodb driver
const mongoose = require("mongoose");

//SCHEMAS - Schema is declaring the properties and behaviors of our models
const fruitSchema = new mongoose.Schema({
    //validate data by adding rules
    name: {
        type: String,
        required: [true, 'Gimme a fruit name please']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

//MODELS - Model is a class with which we construct documents
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

//CREATE NEW DOCUMENTS
// const fruit = new Fruit({
//     name: "peacher",
//     rating: 9,
//     review: "Delicious!"
// });
// const kiwi = new Fruit({
//     name: "kiwi",
//     rating: 10,
//     review: "The King"
// });
// const orange = new Fruit({
//     name: "orange",
//     rating: 8,
//     review: "Kinda of sour but full of vitamin C"
// });
// const strawberry = new Fruit({
//     name: "strawberry",
//     rating: 10,
//     review: "The sexiest of all"
// });
// const mango = new Fruit({
//     name: "mango",
//     rating: 7,
//     review: "Decent fruit"
// });

// const person = new Person({
//     name: "Amy",
//     age: 15,
//     favouriteFruit: mango
// });

//INSERTING MANY DOCUMENTS INTO DATABASE
// Fruit.insertMany([apple, kiwi, orange, strawberry, banana])
//     .then(() => {
//         console.log("All fruits saved to FruitsDB");
//     })
//     .catch((err) => {
//         console.log(`Fruits have not been saved into FruitsDB. Error is: ${err}`);
//     });

//The save() method saves the document "fruit" into a "Fruits" collection inside my "FruitsDB"
// mango.save();
// person.save();

//FIND() method for finding documents of a specific collection
async function findFruit() {
    try{
        const allfruits = await Person.find();
        console.log(`Collection persons contains:`);
        allfruits.forEach(el => {
            console.log(`- ${el.name} having ${el.favouriteFruit.name} as a favorite fruit`);
        });
    } catch(err) {
        console.log(`Something's gone wrong with find(). Error is: ${err}`);
    }
    //close the connection with the database
    mongoose.connection.close();  
}

//UPDATE A DOCUMENT
async function updateFruit() {
    try {
        await Fruit.updateOne(
            {name: "John"},
            {favouriteFruit: mango}
        );
        console.log("Successfully updated!");
    } catch(err) {
        console.log(`Something's gone wrong with updating. Error is: ${err}`)
    }
    mongoose.connection.close();  
}

//DELETE A DOCUMENT
async function deleteFruit(){
    try{
        await Person.deleteOne(
            {_id: "6496d55eec0b911ad2234d89"}
        );
        console.log("Successfully deleted..");
    } catch(err) {
        console.log(`Something's gone wrong with deleting. Error is: ${err}`)
    }
    mongoose.connection.close();
}

// updateFruit();
// deleteFruit();
findFruit();

async function main() {
    //Specify the port where we will access our MongoDB Server. Here "fruitsDB" is the 
    //name of the database where we want to connect to.
    //Open connection with database
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    console.log("Succesfully connected to MongoDB.");
}

main().catch(err => console.log(err));





//USING THE NATIVE MONGODB DRIVER TO CONNECT Node.js WITH MongoDB SERVICE
// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string. Usually it is "mongodb://localhost:27017"
// // but we have to replace "localhost" -> "127.0.0.1"
// const uri = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(uri);

// const database = 'fruitsDB';
// const coll = "fruits";

// async function main() {
//   try {
//     //connect to the server
//     await client.connect();
//     console.log("Succesfully connected to MongoDB.");

//     //insert one document:
//     // await addFruit(client, {
//     //     name: "Apple",
//     //     score: 8,
//     //     review: "A whole meal!"
//     // });

//     //insert multiple documents
//     // await addFruits(client, [
//     //     {
//     //         name: "Strawberry",
//     //         score: 10,
//     //         review: "The sexiest.."
//     //     },
//     //     {
//     //         name: "Banana",
//     //         score: 9,
//     //         review: "Great stuff!"
//     //     },
//     //     {
//     //         name: "Orange",
//     //         score: 8,
//     //         review: "Kinda sour but full of vitamin C"
//     //     }
//     // ]);
    
//     //await listDatabases(client);
//     await findAllFruits(client);

//   } catch (e) {
//     console.log("Error caught: " + e)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// main().catch(console.dir);

// //insert one document
// async function addFruit(client, newFruit) {
//     const result = await client.db(database).collection(coll).insertOne(newFruit);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }

// //insert multiple documents
// async function addFruits(client, newFruitsArray){
//     const result = await client.db(database).collection(coll).insertMany(newFruitsArray);
//     console.log(`${result.insertedCount} listing(s) created with the following ID(s):`);
//     console.log(`- ${result.insertedIds}`)
// }

// async function findAllFruits(client) {
//     const result = await client.db(database).collection(coll).find().toArray();
//     console.log(`Found the following fruits:`);
//     console.log(`- ${JSON.stringify(result)}`);
// }

// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(el => {
//         console.log(`- ${el.name}`);
//     });
// }