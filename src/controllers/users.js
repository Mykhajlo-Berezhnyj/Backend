export const userController = async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    status: 200,
    message: "Current user info",
    data: { id: _id, name, email },
  });
};
