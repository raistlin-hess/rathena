const {createReadStream} = require('fs');
const {access} = require('fs/promises');
const {resolve} = require('path');
const {static} = require('express');
const {doesUserExist, createUser} = require('./database');
const {CLIENT_DOWNLOAD_LOCAL_PATH, PATCH_FILES_LOCAL_PATH} = require('../env');

const ROUTES = {
  home: '/',
  registerUser: '/register-user',
  downloadClient: '/download-client',
  plist: '/patch-files/plist.txt',
  patchFiles: '/patch-files',
  patcherHome: '/patcher-home',
};


module.exports = function initializeRoutes(app) {
  //Dynamic routes
  app.get(ROUTES.home, home);
  app.post(ROUTES.registerUser, registerUser);
  app.get(ROUTES.downloadClient, downloadClient); //TODO: Move to static content?

  //Static content
  app.use(ROUTES.patchFiles, static(PATCH_FILES_LOCAL_PATH, {index: false}));
  app.use(ROUTES.plist, static(resolve(PATCH_FILES_LOCAL_PATH, 'plist.txt'), {index: false}));
  app.use(ROUTES.patcherHome, static('C:\\Users\\hive\\Desktop\\Useful Junk\\rathena\\tools\\docker\\char-registration\\src\\views\\patcher-home'));


  //Fallback for logging
  app.all('*', (req, _, next) => {
    console.error(`[ERR] Unmatched route requested: ${req.url}`);
    next();
  });
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
