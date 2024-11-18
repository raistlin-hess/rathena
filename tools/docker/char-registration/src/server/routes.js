const { doesUserExist, createUser } = require('./database');


const ROUTES = {
  home: '/',
  registerUser: '/register-user',
};


module.exports = function initializeRoutes(app) {
  app.get(ROUTES.home, home);
  app.post(ROUTES.registerUser, registerUser);
};

function home(_, res) {
  res.render('index', {
    registerUserFormAction: ROUTES.registerUser,
  });
}

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    //Make sure user doesn't exist
    const userExists = await doesUserExist(username);
    if(userExists) {
      console.error(`Failed to register duplicate username: ${username}`);
      res.status(400)
        .setHeader('Content-Type', 'application/json')
        .send(JSON.stringify({ error: 'That username is taken. Please use another.' }));
      return;
    }

    //Create user
    const createSuccess = await createUser(username, password);
    if(createSuccess) {
      console.info(`New user created: ${username}`);
      res.status(200)
        .setHeader('Content-Type', 'application/json')
        .send(JSON.stringify({ success: true }));
    } else {
      throw new Error(`Failed to create user: ${username}`);
    }
  } catch(err) {
    console.error(err);
    res.status(500)
      .setHeader('Content-Type', 'application/json')
      // .send(JSON.stringify({ error: err.message }));
      .send(JSON.stringify({ error: 'Generic backend error.' }));
  }
}
