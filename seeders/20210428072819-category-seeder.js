'use strict';

//it calls when you insert seed 
module.exports = {
  up: async (queryInterface, Sequelize) => {
      //categories is a tbl name
    return queryInterface.bulkInsert('categories',[
      {
        name: 'NodeJs'
      },
      {
        name:'VueJs'
      },
      {
        name: 'ReactJs'
      },
      {
        name:'ReactNative'
      },
      {
        name: 'Laravel'
      },
      {
        name:'Flutter'
      }
    ]);
  },
  //it calls when you undo a seed
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories',{},null);
  }
};
