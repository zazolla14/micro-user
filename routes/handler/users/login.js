const bcrypt = require('bcrypt')
const { Users } = require('../../../models')
const Validate = require('fastest-validator')
const v = new Validate()

module.exports = async (req, res) => {
  const schema = {
    email: 'email|empty:false',
    password: 'string|min:8',
  }

  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    })
  }

  const user = await Users.findOne({
    where: { email: req.body.email },
  })
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    })
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password)
  if (!isValidPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'wrong password',
    })
  }

  return res.status(200).json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      profession: user.profession,
      avatar: user.avatar,
      role: user.role,
      email: user.email,
    },
  })
}
