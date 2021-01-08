const { Users } = require('../../../models')

module.exports = async (req, res) => {
  const id = req.params.id
  const user = await Users.findByPk(id, {
    attributes: ['id', 'name', 'profession', 'avatar', 'role', 'email'],
  })
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    })
  }

  return res.status(200).json({
    status: 'success',
    data: user,
  })
}
