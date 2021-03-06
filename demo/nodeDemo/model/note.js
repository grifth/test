
var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') 
});


// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });
var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid:{
  	type:Sequelize.STRING
  }

});

Note.sync(true);


// Note.findAll({
//   raw:true,where:{id:2}}).then(function(notes){
//     console.log(note)
//   })

  module.exports = Note