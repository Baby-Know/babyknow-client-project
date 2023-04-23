import accessLevel from "../../src/config";

const rejectNonAdmin = (req, res, next) => {
  // check if logged in
  if (req.user.access >= accessLevel.admin) {
    // They are admins! User may do the next thing
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectNonAdmin };
