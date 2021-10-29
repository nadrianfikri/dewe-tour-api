const { Trip } = require('../../models');

exports.addTrip = async (req, res) => {
  try {
    const data = req.body;
    await Trip.create(data);

    res.send({
      status: 'success',
      message: 'add trip success',
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

exports.getAllTrip = async (req, res) => {
  try {
    const dataTrip = await Trip.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'Get all data success',
      data: dataTrip,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTrip = await Trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      message: 'Get data success',
      data: dataTrip,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    await Trip.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await Trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'update data trip is successfull',
      data: {
        country: updatedData,
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

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await Trip.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `delete trip with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
