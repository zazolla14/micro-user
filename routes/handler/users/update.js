const bcrypt = require('bcrypt')
const { Users } = require('../../../models')
const Validate = require('fastest-validator')
const v = new Validate()

module.exports = async (req, res) => {
  const schema = {
    name: 'string|min:4|max:50|empty:false',
    profession: 'string|min:6|max:100|optional',
    avatar: 'string|optional',
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

  // ! aturan
  // * 1. user harus ada
  //*  2. sukses ganti email terjadi jika, email masih tersedia karena tidak terdaftar di db
  // * 3. email tidak boleh sama dengan yang ada di database (tidak boleh menggunakan email orang lain)
  // * 4. jika tidak ingin mengupdate email maka, masukan email yang sama dengan email pada id yang akan di update
  const id = req.params.id
  const user = await Users.findByPk(id)
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    })
  }

  const email = req.body.email
  const checkEmail = await Users.findOne({
    where: { email },
  })

  if (checkEmail && email !== user.email) {
    //* && email !== user.email digunakan agar tidak wajib update email atau bisa menggunakan email sebelum nya
    //* catatan pada notepad (user-service-update.txt)
    return res.status(409).json({
      status: 'error',
      message: 'email already exist',
    })
  }

  const password = await bcrypt.hash(req.body.password, 10)

  const { name, profession, avatar } = req.body
  await user.update({
    name,
    profession,
    avatar,
    email,
    password,
  })

  return res.status(200).json({
    status: 'success',
    data: {
      id,
      name,
      profession,
      avatar,
      email,
    },
  })
}
