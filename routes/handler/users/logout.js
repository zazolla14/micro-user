const { Users, RefreshTokens } = require('../../../models')

module.exports = async (req, res) => {
  const { user_id } = req.body
  const checkUser = await Users.findByPk(user_id)
  if (!checkUser) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    })
  }

  await RefreshTokens.destroy({
    where: { user_id },
  })

  return res.status(200).json({
    status: 'success',
    message: 'refresh token deleted',
  })
}
