# <img src="/readme-assets/logo.png" alt="logo" width="32" height="32" align="left"> Sensei's Top

A real-time, no-nonsense, web-based life counter for TCGs.

<img src="/readme-assets/screenshot.png" alt="app screenshot" width="640">

Instead of one person needing to manage life totals for 2–4+ other players (or fighting over one device), Sensei's Top allows you to instead connect to a shared room and keep track of only your own life total. Each player controls their own life, and changes are synced with else in the room.

Tap the `rooms` icon on the bottom of the screen to create or join a room. Once a room has been created, it'll stick around until all participants have exited— no fussing about with ownership or hosts needed. It just works. Rooms can currently support up to 5 players, and optionally can be secured with a password.

Sensei's Top will remember the last room you connected to and automatically attempt to reconnect at startup. If you play with the same players often, you should only need to join a room once in a while.

## "Installing" the app

Sensei's Top works just fine in-browser, but is best when installed to a device's homescreen. For iOS users, using the 'Add to Homescreen' button in Safari should give you a near-native experience. Android users will have to sit tight for a bit, as service workers are required to add to homescreen on android phones.

## Limitations

Currently there is no support for tracking commander damage, poison counters, etc. That's likely to get added in the future, as well as dice rolling and coin flipping. Support for token tracking is unplanned.

Offline usage via a service worker is something that's likely to happen, though without access to the web socket server the app is substantially less useful.

## Contributing

### Installing deps

You'll need `yarn` installed globally, running `yarn` should take care of the rest. Deployment to a production environment assumes you've configured `pm2`.

### .env

You'll need a `.env` file at the root of the project with the following fields (these are examples and should be configured to your setup):

```
WS_HOST_DEV=ws://localhost:5000
WS_HOST_PROD=wss://example.com
WS_PORT=5000
INSTALL_PATH=/path/to/install
PROD_SERVER=user@hostname
```

`PROD_SERVER`, `WS_HOST_PROD`, and `INSTALL_PATH` are only needed if you intend to deploy a production version of the app.

### Starting the app

`yarn run start` should spin up a webpack dev server to serve static content and handle hot reloading as well as a websocket server. For testing purposes, it is often useful to set `WS_HOST_DEV` to a local IP rather than `localhost` so you can access it on mobile devices within your network.

### Debug utilities

If you set `DEBUG_ENV=true` in your `.env` file, the server will auto-generate a room with 4 users in it that you can connect to. You can set a password via `DEBUG_ENV_PASSWORD`.

### Building/deploying the app

`yarn run build` will create a `dist/` directory that has all client and server files built for production environments. Running `deply.sh` will execute `yarn run build`, as well as installing the app wherever you have configured in `.env`.

### Helpful stuff you can do

The next big things I'd like to tackle are setting up a service worker and writing a bunch of tests. I'm not good at writing tests, so if you are then that'd be a great way to help out. Also, Android support is probably a little rough around the edges. I don't have access to an Android device, so help would be appreciated on that front too.
