const { User } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  // create validation scheme with joi
  const scheme = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(8).required(),
    address: Joi.string().min(8).required(),
  });

  const { error } = scheme.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 'failed',
      message: error.details[0].message,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: 'failed',
        message: 'email is registered',
      });
    }

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      role: 'user',
    });

    res.send({
      status: 'success',
      message: 'register user is successfull',
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
