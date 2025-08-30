export const userController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 200,
    message: "Current user info",
    data: user,
  });
};
