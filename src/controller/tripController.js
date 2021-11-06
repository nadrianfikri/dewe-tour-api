const { Trip, Country } = require('../../models');
const pathFile = 'http://localhost:5000/uploads/';

exports.addTrip = async (req, res) => {
  try {
    const allImage = req.files.images.map((image) => image.filename);

    const newTrip = await Trip.create({
      ...req.body,
      images: JSON.stringify(allImage),
    });

    const dataTrip = await Trip.findOne({
      where: {
        id: newTrip.id,
      },
      include: {
        as: 'country',
        model: Country,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'country_id'],
      },
    });

    res.send({
      status: 'success',
      message: 'add trip success',
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

exports.getAllTrip = async (req, res) => {
  try {
    const dataTrip = await Trip.findAll({
      include: {
        as: 'country',
        model: Country,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'country_id'],
      },
    });

    dataTrip.forEach((data) => {
      const arrImages = JSON.parse(data.images);
      const images = arrImages.map((image) => pathFile + image);

      data.images = images;
      return data.images;
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
      include: {
        as: 'country',
        model: Country,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'country_id'],
      },
    });

    const arrImages = JSON.parse(dataTrip.images);
    const images = arrImages.map((data) => pathFile + data);

    dataTrip.images = images;

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
    const { ...data } = req.body;
    const { images } = req.files;

    const allImage = [];
    for (let image of images) {
      allImage.push(image.filename);
    }

    await Trip.update(
      {
        ...data,
        images: JSON.stringify(allImage),
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedData = await Trip.findOne({
      where: {
        id,
      },
      include: {
        as: 'country',
        model: Country,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'country_id'],
      },
    });

    res.send({
      message: 'update data trip is successfull',
      data: {
        trip: updatedData,
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
