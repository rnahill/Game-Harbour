const router = require('express').Router();
const { Game, User, Review } = require('../models');
const withAuth = require('../utils/auth');
require('dotenv').config();
const axios = require('axios')

// router.get('/', async (req, res) => {
//   try {
//     // Get all games and JOIN with user data
//     const gameData = await Game.findAll({ where:{
//       user_id: req.session.user_id
//     },
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const games = gameData.map((game) => game.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('gameList', { 
//       games, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });



// router.get('/game/:id', async (req, res) => {
//   try {
//     const gameData = await Game.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const game = gameData.get({ plain: true });

//     res.render('game', {
//       ...game,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game, Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/search', (req, res) => {
  res.render('search')
})

router.get('/search/:title', withAuth, async (req, res) => {
  // render the search page
  const apikey = process.env.GIANT_BOMB_APIKEY
  const baseurl = `https://www.giantbomb.com/api/search/?api_key=${apikey}&format=json&query=${req.params.title}&resources=game`
  let data = await axios.get(baseurl)
  data = JSON.parse(JSON.stringify(data.data))
  console.log(data)
  res.render('search', {
    apikey: process.env.GIANT_BOMB_APIKEY, 
    data: data.results
  });

  return;
})

module.exports = router;
