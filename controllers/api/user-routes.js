const router = require('express').Router();
const { User } = require('../../models');

// /api/users
// CREATE new user
router.post('/', async (req, res) => {
  try {
    const loginData = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.email = loginData.email;
      req.session.userId = loginData.id

      res.status(200).json(loginData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const loginData = await User.findOne({where: {email: req.body.email},});

    if (!loginData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await loginData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // const currentUserData = loginData.get({ plain: true })
    req.session.save(() => {
      req.session.userId = loginData.id;
      req.session.email = loginData.email
      req.session.loggedIn = true;

      res.json({ user: loginData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;