# ◴ divvy
<img src='assets/hero.png' width='240'/>

---

Use the scripts below from the workspace root to run development servers
on your local machine

## Installing the monorepo
```sh
# Clones the git repository
git clone https://github.com/jaredLunde/divvy.git

# Installs the workspaces
cd divvy
yarn install
```

## Frontend Scripts
### yarn www start
Starts a dev server in `development` mode

### yarn www start production
Starts a dev server in `production` mode

---

## API Scripts
### yarn api start
Starts a dev server in `development` mode

### yarn api start production
Starts a dev server in `production` mode

---

## Shortcuts
### Frontend
- [Package](tree/master/packages/www)
- [App source](tree/master/packages/www/src)
- [Pages](tree/master/packages/www/src/pages)
- [Components](tree/master/packages/www/src/components)
- [Theme](tree/master/packages/www/src/theme)

### API
- [Package](tree/master/packages/api)
- [API source](tree/master/packages/api/src)
- [Express handler](tree/master/packages/api/src/index.js)