const bcrypt = require('bcrypt')
const { Users } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
  const schema = {
    name: 'string|min:4|max:50|empty:false',
    profession: 'string|min:6|max:100|optional',
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

  if (user) {
    return res.status(409).json({
      status: 'error',
      message: 'email already exist',
    })
  }

  const password = await bcrypt.hash(req.body.password, 10)
  const data = {
    name: req.body.name,
    profession: req.body.profession,
    email: req.body.email,
    password: password,
    role: 'student',
  }

  const createUser = await Users.create(data)

  return res.status(200).json({
    status: 'success',
    data: {
      id: createUser.id,
      name: createUser.name,
      profession: createUser.profession,
      email: createUser.email,
    },
  })
}
