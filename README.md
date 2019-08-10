# ◴ divvy
<img src='assets/hero.png' width='240'/>

---

## Installing the monorepo
```sh
# Clones the git repository
git clone https://github.com/jaredLunde/divvy.git

# Installs the workspaces
cd divvy
yarn install

# Start the frontend server
yarn www start production

# In another frame, start the backend server
yarn api start production
```

## Frontend Scripts
Use the scripts below from the workspace root to run development servers
on your local machine

### yarn www start
Starts a dev server in `development` mode at http://127.0.0.1:3000

### yarn www start production
Starts a dev server in `production` mode at http://127.0.0.1:3000

---

## API Scripts
Use the scripts below from the workspace root to run development servers
on your local machine

### yarn api start
Starts a dev server in `development` mode at http://127.0.0.1:4000

### yarn api start production
Starts a dev server in `production` mode at http://127.0.0.1:4000

---

## Shortcuts
### Frontend
- [Package](./packages/www)
- [App source](./packages/www/src)
- [Pages](./packages/www/src/pages)
- [Components](./packages/www/src/components)
- [Theme](./packages/www/src/theme)

### API
- [Package](./packages/api)
- [API source](./packages/api/src)
- [Express handler](./packages/api/src/index.js)
