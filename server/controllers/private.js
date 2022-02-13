exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    data: "You got acces to the priavte data",
  });
};
