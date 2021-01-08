const { Users } = require('../../../models')

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || []
  const sqlOptions = {
    attributes: ['id', 'name', 'profession', 'avatar', 'role', 'email'],
  }
  // ? SELECT 'id', 'name', 'profession', 'avatar', 'role', 'email' WHERE id IN [userIds]
  if (userIds.length) {
    // * jika ada params yang dikirimkan maka variabel sqlOptions isi nya berubah
    sqlOptions.where = {
      id: userIds,
    }
  }
  const users = await Users.findAll(sqlOptions)
  return res.status(200).json({
    status: 'success',
    data: users,
  })
}
