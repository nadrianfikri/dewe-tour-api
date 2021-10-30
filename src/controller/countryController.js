const { Country } = require('../../models');

exports.addCountry = async (req, res) => {
  try {
    const countryExist = await Country.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (countryExist) {
      return res.status(400).send({
        status: 'failed',
        message: 'country already exist',
      });
    }

    const data = req.body;
    await Country.create(data);

    res.send({
      status: 'success',
      message: 'add country success',
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

exports.getAllCountry = async (req, res) => {
  try {
    const dataCountry = await Country.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'Get all data success',
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCountry = await Country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      message: 'Get data success',
      data: dataCountry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const countryExist = await Country.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (countryExist) {
      return res.status(400).send({
        status: 'failed',
        message: 'country already exist',
      });
    }

    const { id } = req.params;

    await Country.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await Country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'update data country is successfull',
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

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `delete country with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
