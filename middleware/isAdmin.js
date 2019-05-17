const adminAccess = (req, res, next) => {
  if (req.users.user.isAdmin === 'true') {
    return next();
  }
  return res.status(403).send({
    status: 403,
    error: 'you are not an admin',
  });
};
export default adminAccess;
