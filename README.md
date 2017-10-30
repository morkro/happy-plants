<h1 align="center">
  Happy Plants 🌵🌱
</h1>

<p align="center">
  Current version: <code>1.0.0-alpha</code>
</p>

<p align="center">
  <a href="https://travis-ci.com/morkro/happy-plants">
    <img src="https://travis-ci.com/morkro/happy-plants.svg?token=jraMM7KwaR9EEq8wiKZk&branch=master)" alt="Build Status" />
    <img src="https://img.shields.io/maintenance/yes/2017.svg" alt="Maintenance" />
  </a>
</p>

---

_Happy Plants_ is a mobile-first, progressive web application which helps organising and keeping track of your plants. See the list of [features](#features) for more information.

#### Usage
_Happy Plants_ is available at [happy-plans.netlify.com](https://happy-plans.netlify.com). You can either add it to your bookmarks on desktop, or save it to your homescreens on mobile devices.

- [About](#about)
- [Features](#features)
- [Data structure](#data-structure)
- [Development](#development)

---

## About
If your hobby is collecting (and growing) plants, you maybe also like to gather all the information about them and keep an organised overview about your little home garden.

**_Happy Plants_ is all about organising, collecting all sorts of information and trivia, and adding notes on your little friends.** Basically, creating your own plant database.

## Features
This project is currently still very early in development right now and only supports a bare minimum set of features.

#### Adding plants
Add a name and photo to your plant. This can always be updated in the detailed plant view.

#### Overview
An overview of all your plants. Currently, you can only filter them by date or name.

#### Detailed plant profile
- Maintain a growth calendar to know if your plant is currently in a growth or dormant phase.
- Add notes.

### Planned features
Keeping track of planned features here. This is the minimum of features to move the project out of `alpha` state.

- Integrate Firebase.
- Add more basic information (scientific name, location of your plant, pruning, how much sun, ...) to plants.
- Add gallery.
- Create custom categories and sorting in overview.
- Highlight specific plants in overview.

## Data structure
In the application settings, you can download all your plant data and as well as importing data. If you want to create the plant data yourself, it has to be a valid JSON array/object structured as follows:

```
[
  {
    "guid": String,
    "created": Date,
    "modified": Date,
    "blob": Blob|base64,
    "name": String,
    "seasons": [
      {
        "month": String,
        "growth": Boolean
      }
    ],
    "notes": String,
    "watering": {
      "level": Number
    },
    "sun": {
      "grade": Number
    }
  }
]
```

- `watering.level`: Can range from `1` to `3`.
- `sun.grade`: Can range from `1` to `3`.
- `seasons`: Should be an array containing each month.
  - If the plant is in a growth phase during that month, set `growth` to `true`.

## Development
This project supports Yarn, so you can either use `yarn` or `npm` to run tasks.

| Command | Description |
| ------- | ----------- |
| `yarn` / `npm install` | Installs dependencies |
| `yarn/npm run dev` | Serve with hot reload at localhost:8080 |
| `yarn/npm run build` | Build for production with minification |
| `yarn/npm run build --report` | Build for production and view the bundle analyzer report |
| `yarn/npm run unit` | Run unit tests |
| `yarn/npm run e2e` | Run end-to-end tests |
| `yarn/npm test` | Run all tests |
| `yarn/npm lint` | Runs `Standard` over all `.js` files |

This is an Vue.js progressive web application, bootstrapped with [`vue-init pwa`](https://github.com/vuejs-templates/pwa). For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Credits
Icons taken from [Freepik](http://www.freepik.com), [Dimitry Miroliubov](http://www.flaticon.com/authors/dimitry-miroliubov) licensed under [CC 3.0](http://creativecommons.org/licenses/by/3.0/).

## License
[MIT](https:/github.com/morkro/happy-plants/LICENSE)
