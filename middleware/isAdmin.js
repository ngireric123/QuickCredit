class admin{
const adminAccess (req, res, next) => {
  if (req.users.user.isAdmin) {
    return next();
  }
  return res.status(403).send({
    status: 403,
    error: 'you are not an admin',
  });
};
}
export default admin;
