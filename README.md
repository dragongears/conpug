# conpug

An app to organize pick-up games and other activities at conventions.

This project is very much a work in progress and is in no way complete.

At this point I am not satisfied with how it is going and will probably shelve it for a while.

Meanwhile, it was good for learning about Firebase.
- Authorization: logging into the app
- Database: users and activities
- Storage: profile pictures

Firebase configuration should be stored in an .env.local file in the project root:

```
VUE_APP_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VUE_APP_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VUE_APP_FIREBASE_DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VUE_APP_FIREBASE_PROJECT_ID=XXXXXXXXXXXXXXXXXXX
VUE_APP_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
