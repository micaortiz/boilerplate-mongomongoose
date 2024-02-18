require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI);

/** 2) Create a 'Person' Model */
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  favoriteFoods:{
    type: [String]
  }
  
})
/** 3) Create and Save a Person */
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name:'Justin',
    age: 25,
    favoriteFoods: ['Ice Cream', 'Burguer']
  } ) 
  
  person.save(function(err, data) {
    if (err) return console.error(err);
      done(null, data)
    });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name:'Justina' , age:26 , favoriteFoods:['Pizza','Chocolate']},
  {name:'Drew' , age:18 , favoriteFoods:['Empanadas','Hamburguesa']},
  {name:'Issac' , age:9 , favoriteFoods:['Queso','Lasaña']}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people){
    if (err) return console.log(err);
    done(null, people)
  });
};

/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function (err, personFound) {
  //cb se utiliza para manejar el resultado de la operación de búsqueda asíncrona realizada por Person.find()
  //toma dos parámetros: err, que contendrá un error si ocurrió durante la búsqueda, y personFound, que contendrá los resultados de la búsqueda.
    if (err) return console.log(err);
    done(null , personFound);
  })
  
};
/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
  });
};

/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data){
    if(err) return console.log(err);
    done(null , data);
  });
};

/** 8) Use `Model.findById()` */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  //Método .findById() para buscar una persona por _id con el parámetro personId como clave de búsqueda.
  Person.findById(personId, (err, person)=>{
    if(err) return console.log(err);
    // agrega la comida al array de comidas favoritas
    person.favoriteFoods.push(foodToAdd);
    //// y dentro del callback - save() Person update
    //guarde los cambios en la base de datos
    person.save((err,updatePerson)=>{
      if(err) return console.log(err);
      done(null , updatePerson);
    });
  });
};

/** 9) Use `Model.findOneAndUpdate()` */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // busca y actualiza a la persona que coincida con el nombre pasado en el parámetro personName, actualiza la edad  
  Person.findOneAndUpdate({name: personName},{age: ageToSet}, {new: true},(err, updatePerson)=>{
    //{new: true} indica que se desea devolver el documento actualizado en lugar del documento original. 
    if(err) return console.log(err);
    done(null , updatePerson);
  });

};
/** 10) Use `Model.findByIdAndRemove or finOneAndRemove()` */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personDelete)=>{
    if(err) return console.log(err);
    done(null , personDelete);
  });
};

/** 11) Use `Model.remove()` */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, personRemove)=>{
    if(err) return console.log(err)
    done(null , personRemove);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({ name:1 }) // Orden ascendente por el campo 'name'
    .limit(2)
    .select({age:0}) // age:0 oculta la edad
    .exec(function(err, people) {
      if(err) return console.log(err)
      done(null , people);
    
  });
};
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
