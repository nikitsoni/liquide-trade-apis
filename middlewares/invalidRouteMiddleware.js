const methodNotAllowed = (req, res) => {
  res.status(405).json({
    message: `The ${req.method} method is not allowed on this endpoint.`,
  });
};

module.exports = methodNotAllowed;
