const { User } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER HANDLE
exports.register = async (req, res) => {
  // create validation scheme with joi
  const scheme = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(8).required(),
    // address: Joi.string().min(8).required(),
  });

  const { error } = scheme.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 'failed',
      message: error.details[0].message,
    });
  }

  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // checking user exist by email
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

    // create new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      role: 'user',
      avatar: 'avatar.jpg',
    });

    // generate token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.TOKEN_KEY);

    // response
    res.send({
      status: 'success',
      message: 'register user is successfull',
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        // address: newUser.address,
        token,
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

// LOGIN HANDLE
exports.login = async (req, res) => {
  const scheme = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = scheme.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'phone', 'address'],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: 'failed',
        message: 'Email is wrong',
      });
    }

    // compare password between req.body and userExist
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    // check if not valid then return response bad request
    if (!isValid) {
      return res.status(400).send({
        status: 'failed',
        message: 'Password is invalid',
      });
    }

    // generate token
    const token = jwt.sign({ id: userExist.id, role: userExist.role }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: 'success...',
      data: {
        name: userExist.name,
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: 'failed',
      });
    }

    res.send({
      status: 'Success...',
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          role: dataUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
