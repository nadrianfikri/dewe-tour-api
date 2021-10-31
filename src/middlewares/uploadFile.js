const multer = require('multer');

exports.uploadfile = (imageFile) => {
  // define storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
    },
  });

  //file filtering only images
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|JPEG|png|PNG|svg|SVG)$/)) {
        req.fileValidationError = {
          message: 'Only uploads images file',
        };

        return cb(new Error('Only uploads images file'), false);
      }
      cb(null, true);
    }
  };
  // maximum file size
  const sizeInMB = 10;
  const maxSize = sizeInMB * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 5,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (!req.files && !err) {
        return res.status(400).send({
          message: 'Please select file to upload',
        });
      }

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized is 10MB',
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
