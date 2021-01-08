const { Users, RefreshTokens } = require('../../../models')
const Validate = require('fastest-validator')
const v = new Validate()

module.exports = async (req, res) => {
  const { user_id, refresh_token } = req.body

  const schema = {
    user_id: 'number',
    refresh_token: 'string',
  }
  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    })
  }

  const checkUser = await Users.findByPk(user_id)
  if (!checkUser) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    })
  }

  const data = {
    user_id,
    token: refresh_token,
  }
  const createdToken = await RefreshTokens.create(data)
  return res.status(200).json({
    status: 'success',
    data: {
      id: createdToken.id,
      user_id: createdToken.user_id,
      token: createdToken.token,
    },
  })
}
