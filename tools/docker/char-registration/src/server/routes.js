const {createReadStream} = require('fs');
const {access} = require('fs/promises');
const {doesUserExist, createUser} = require('./database');
const {CLIENT_DOWNLOAD_LOCAL_PATH} = require('../env');


const ROUTES = {
  home: '/',
  registerUser: '/register-user',
  downloadClient: '/download-client',
};


module.exports = function initializeRoutes(app) {
  app.get(ROUTES.home, home);
  app.post(ROUTES.registerUser, registerUser);
  app.get(ROUTES.downloadClient, downloadClient);
};

function home(_, res) {
  res.render('index', {
    registerUserFormAction: ROUTES.registerUser,
    downloadClient: ROUTES.downloadClient,
  });
}

async function registerUser(req, res) {
  try {
    const {username, password} = req.body;

    //Make sure user doesn't exist
    const userExists = await doesUserExist(username);
    if(userExists) {
      console.error(`Failed to register duplicate username: ${username}`);
      res.status(400)
        .setHeader('Content-Type', 'application/json')
        .send(JSON.stringify({error: 'That username is taken. Please use another.'}));
      return;
    }

    //Create user
    const createSuccess = await createUser(username, password);
    if(createSuccess) {
      console.info(`New user created: ${username}`);
      res.status(200)
        .setHeader('Content-Type', 'application/json')
        .send(JSON.stringify({success: true}));
    } else {
      throw new Error(`Failed to create user: ${username}`);
    }
  } catch(err) {
    console.error(err);
    res.status(500)
      .setHeader('Content-Type', 'application/json')
      // .send(JSON.stringify({ error: err.message }));
      .send(JSON.stringify({error: 'Generic backend error.'}));
  }
}

async function downloadClient(_, res) {
  //Make sure file exists before serving.
  try {
    await access(CLIENT_DOWNLOAD_LOCAL_PATH);
  } catch(err) {
    console.error(err);
    res.status(404)
      .send('Client not found. Please contact the owner.');
  }

  //Serve file in response
  const fileSream = createReadStream(CLIENT_DOWNLOAD_LOCAL_PATH, {autoClose: true});
  fileSream.on('error', err => {
    console.error(err);
    fileSream.close();
  });
  fileSream.on('end', () => {
    console.info(`Successfully served entire client: "${CLIENT_DOWNLOAD_LOCAL_PATH}"`);
  });
  fileSream.pipe(res);
}
