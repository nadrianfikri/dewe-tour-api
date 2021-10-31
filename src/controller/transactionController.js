const { Transaction, User, Trip } = require('../../models');

exports.addTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const { price } = await Trip.findOne({
      where: {
        id,
      },
    });

    const newTransaction = await Transaction.create({
      ...data,
      user_id: req.user.id,
      trip_id: id,
      total: price * req.body.qty,
      attachment: 'default.jpg',
    });

    res.send({
      status: 'success',
      message: 'add Transaction success',
      data: newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const dataTransaction = await Transaction.findAll({
      include: [
        {
          as: 'user',
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'role'],
          },
        },
        {
          as: 'trip',
          model: Trip,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'country_id'],
          },
        },
      ],

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'user_id', 'trip_id'],
      },
    });

    res.send({
      message: 'Get all data success',
      data: dataTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const dataTransaction = await Transaction.findOne({
      where: {
        id,
      },

      include: [
        {
          as: 'user',
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          as: 'trip',
          model: Trip,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'country_id'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'user_id', 'trip_id'],
      },
    });

    res.send({
      message: 'Get data success',
      data: dataTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    await Transaction.update(
      {
        ...data,
        attachment: req.files.attachment[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await Transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          as: 'user',
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          as: 'trip',
          model: Trip,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'country_id'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'user_id', 'trip_id'],
      },
    });

    res.send({
      message: 'update data Transaction is successfull',
      data: {
        Transaction: updatedData,
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

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `delete Transaction with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
