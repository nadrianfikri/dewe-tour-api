const { User } = require('../../models');

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    await User.create(data);

    res.send({
      status: 'success',
      message: 'add user success',
      data: data,
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
