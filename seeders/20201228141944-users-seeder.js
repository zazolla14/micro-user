'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Azola Zubizarreta',
        profession: 'Web Development',
        role: 'admin',
        email: 'azola.zubizarreta@gmail.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Zubizarreta',
        profession: 'Back End Development',
        role: 'student',
        email: 'zubizarreta@gmail.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
