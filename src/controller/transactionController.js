const { Transaction, User, Trip } = require('../../models');
const pathFile = 'http://localhost:5000/uploads/';

exports.addTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const { price } = await Trip.findOne({
      where: {
        id,
      },
    });

    const data = await Transaction.create({
      ...req.body,
      user_id: req.user.id,
      trip_id: id,
      total: price * req.body.qty,
      status: 'Waiting Payment',
      attachment: 'default.jpg',
    });

    res.send({
      status: 'success',
      message: 'add Transaction success',
      data,
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
        exclude: ['createdAt', 'user_id', 'trip_id'],
      },
    });

    dataTransaction.forEach((data) => (data.attachment = pathFile + data.attachment));

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

    dataTransaction.attachment = pathFile + dataTransaction.attachment;

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

    if (req.files) {
      await Transaction.update(
        {
          ...req.body,
          attachment: req.files.attachment[0].filename,
        },
        {
          where: {
            id,
          },
        }
      );
    } else {
      await Transaction.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );
    }

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
    console.log(updatedData);

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
