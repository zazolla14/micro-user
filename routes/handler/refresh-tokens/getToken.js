const { RefreshTokens } = require('../../../models')

module.exports = async (req, res) => {
  const { refresh_token } = req.query
  const checkToken = await RefreshTokens.findOne({
    where: { token: refresh_token },
    attributes: ['id', 'token', 'user_id'],
  })
  if (!checkToken) {
    return res.status(400).json({
      status: 'error',
      message: 'invalid token',
    })
  }

  return res.status(200).json({
    status: 'sucess',
    data: checkToken,
  })
}
