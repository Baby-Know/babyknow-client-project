import accessLevel from '../../src/config';

const rejectStudent = (req, res, next) => {
  // check if logged in
  if (req.user.access >= accessLevel.teacher) {
    // They are admins! User may do the next thing
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectStudent };
