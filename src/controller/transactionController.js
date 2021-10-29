const { Transaction } = require('../../models');

exports.addTransaction = async (req, res) => {
  try {
    const data = req.body;
    await Transaction.create(data);

    res.send({
      status: 'success',
      message: 'add Transaction success',
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

exports.getAllTransaction = async (req, res) => {
  try {
    const dataTransaction = await Transaction.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
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
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
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

    await Transaction.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
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