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
Starts a dev server in `development` mode

### yarn www start production
Starts a dev server in `production` mode

---

## API Scripts
Use the scripts below from the workspace root to run development servers
on your local machine

### yarn api start
Starts a dev server in `development` mode

### yarn api start production
Starts a dev server in `production` mode

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
