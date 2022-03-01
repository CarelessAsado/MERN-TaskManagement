const finalErrorHandler = (error, req, res, next) => {
  console.log(error, "final error handler middle");
  return res.status(500).json(error.message);
};

module.exports = finalErrorHandler;
