// Load environment variables
require('dotenv').config();

// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Wait for connection before running operations
mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB Atlas');

  ///////////////////////////////////////
  // 1. Define Person Schema
  ///////////////////////////////////////
  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String] // Array of strings
  });

  // Create the model
  const Person = mongoose.model('Person', personSchema);

  ///////////////////////////////////////
  // 2. Create and Save a Single Person
  ///////////////////////////////////////
  const person = new Person({
    name: 'Alice',
    age: 25,
    favoriteFoods: ['pizza', 'pasta']
  });

  await person.save().then(data => {
    console.log('Saved person:', data);
  }).catch(console.error);

  ///////////////////////////////////////
  // 3. Create Many Records with Model.create()
  ///////////////////////////////////////
  const arrayOfPeople = [
    { name: 'John', age: 30, favoriteFoods: ['burger', 'fries'] },
    { name: 'Mary', age: 22, favoriteFoods: ['salad', 'burritos'] },
    { name: 'Mike', age: 28, favoriteFoods: ['burritos', 'tacos'] }
  ];

  await Person.create(arrayOfPeople).then(people => {
    console.log('Created multiple people:', people);
  }).catch(console.error);

  ///////////////////////////////////////
  // 4. Find all people by name
  ///////////////////////////////////////
  await Person.find({ name: 'Mary' }).then(people => {
    console.log('People named Mary:', people);
  }).catch(console.error);

  ///////////////////////////////////////
  // 5. Find one person by favorite food
  ///////////////////////////////////////
  await Person.findOne({ favoriteFoods: 'burritos' }).then(person => {
    console.log('Person who likes burritos:', person);
  }).catch(console.error);

  ///////////////////////////////////////
  // 6. Find person by ID
  ///////////////////////////////////////
  const personId = person._id; // Use the ID of the created person
  await Person.findById(personId).then(person => {
    console.log('Person by ID:', person);
  }).catch(console.error);

  ///////////////////////////////////////
  // 7. Find, Edit, then Save
  ///////////////////////////////////////
  await Person.findById(personId).then(async person => {
    if (!person) return;
    person.favoriteFoods.push('hamburger');
    await person.save().then(updatedPerson => {
      console.log('Updated person with hamburger:', updatedPerson);
    }).catch(console.error);
  }).catch(console.error);

  ///////////////////////////////////////
  // 8. Find One and Update
  ///////////////////////////////////////
  const personName = 'Alice';
  await Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  ).then(updatedPerson => {
    console.log('Updated age to 20:', updatedPerson);
  }).catch(console.error);

  ///////////////////////////////////////
  // 9. Delete One Document by ID
  ///////////////////////////////////////
  await Person.findByIdAndDelete(personId).then(removedPerson => {
    console.log('Removed person:', removedPerson);
  }).catch(console.error);

  ///////////////////////////////////////
  // 10. Delete Many Documents by Name
  ///////////////////////////////////////
  await Person.deleteMany({ name: 'Mary' }).then(result => {
    console.log('Removed all Marys:', result);
  }).catch(console.error);

  ///////////////////////////////////////
  // 11. Chain Search Query Helpers
  ///////////////////////////////////////
  await Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .then(data => {
      console.log('Chained query results:', data);
    }).catch(console.error);

  // Close connection when done
  mongoose.connection.close();
});
