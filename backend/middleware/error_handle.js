exports.errorhandler = async (err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    const statusCode = err.statusCode;
    const message = err.message;
    res.status(statusCode).json({
      message: message,
    });
  } else {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.notfound = async (req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
};
