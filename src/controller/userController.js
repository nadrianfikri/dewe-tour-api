const { User } = require('../../models');
const pathFile = 'http://localhost:5000/uploads/';

exports.addUser = async (req, res) => {
  try {
    const data = req.body;

    const newUser = await User.create({
      ...data,
      avatar: 'avatar.jpg',
    });

    res.send({
      status: 'success',
      message: 'add user success',
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const dataUsers = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    dataUsers.forEach((user) => (user.avatar = pathFile + user.avatar));

    res.send({
      message: 'Get data success',
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    dataUser.avatar = pathFile + dataUser.avatar;
    res.send({
      message: 'Get data success',
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.update(
      {
        ...req.body,
        avatar: req.files.avatar[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.send({
      message: 'update data user is successfull',
      data: {
        user: updatedData,
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `delete user with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
