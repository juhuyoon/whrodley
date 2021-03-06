const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authenticatedUser = req.session.user;

  if (!authenticatedUser) {
    return next(createError(401, 'Unauthorized'));
  }

  const teams = await User.relatedQuery('teams').for(authenticatedUser.id);

  if (teams && teams.length === 0) {
    return res.redirect('/teams/create');
  }

  next();
};
