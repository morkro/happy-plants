<h1 align="center">
  <img src="resources/logo-readme.png" alt="HappyPlants 🌵🌱" />
</h1>

<p align="center">
  Current version: <code>1.4.0</code> <a href="CHANGELOG.md">(Changelog)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2018.svg" alt="Maintenance" />
  <a href="http://makeapullrequest.com" target="_blank">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  </a>
</p>

---

<img src="resources/web-app.png" align="left" width="180px" alt="HappyPlants App" />

[_HappyPlants_](https://happyplants.garden) is all about organising and adding all kinds of information of your little friends. _How much water does it need? During which seasons does it grow? When is it dormant? Does it require lots of sun?_ Basically, creating your own plant database in a visual way. You can either save HappyPlants to your homescreens on mobile devices (recommended) or add it to your bookmarks on desktop.

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior.

-   [🌵 About](#about)
-   [✨ Features](#features)
-   [🎛 Data structure](#data-structure)
-   [⌨️ Development](#development)
-   [🎉 Credits](#credits)

---

## About
If your hobby is collecting (and growing) plants, you maybe also like to gather all the information about them and keep an organised overview about your little home garden.

_HappyPlants_ is a mobile-first, progressive web application which helps organising and keeping track of your plants.

## Features
This project is currently still in `alpha` development and only supports a bare minimum set of features.

### Planned

| Feature | Status |
| ------- | ------ |
| Firebase integration | ✅ Implemented |
| Better onboarding | ✅ Implemented |
| Skeleton views | ✅ Implemented |
| Growth progress gallery | Not started |
| Desktop layout | Not started |

### Overview page

| Feature | Description |
| ------- | ----------- |
| View mode | Choose between grid and list view. |
| Order by | The overview can be sorted by date (latest first) and alphabetical. |
| Filter | Filter view by tags. |

### Add plant

| Feature | Description |
| ------- | ----------- |
| Name and photo | Add a name and upload an additional, optional photo of the plant. |

### Plant profile

| Feature | Description |
| ------- | ----------- |
| Edit basic data | Edit your plants name or photo. |
| Add tags | / |
| Manage modules | Add/remove plant modules |
| Watering module | Manage the required watering of a plant. |
| Sunshine module | Manage the amount of sunlight the plant needs. |
| Seasons module | Lets you define the seasons in which a plant is in growth/ dormant. |
| Notes | Add notes to a plant. |
| Delete plant | Deletes your plant. |

### Settings

| Feature | Description |
| ------- | ----------- |
| Tags | Delete or rename tags. |
| Import/export | Import or export plant data. |
| Delete all | Delete all plant data. This is permanent and lost data can't be restored. |

## Data structure
In the application settings, you can download and import your plant data.

### Basic plant data
This is the minimum required data of a single plant. If you want to import the data, it should be an Array of objects.

```typescript
{
  "guid": String, // [required] A random, version 4 GUID
  "created": Date, // [required] Date when the plant has been created
  "modified": Date, // [required] Date when plant has been modified, defaults to created date
  "name": String, // [required] Name of the plant
  "blob": Blob | Base64 | undefined, // [optional] A base64 encoded or Blob of the plant photo
  "modules": Array<PlantModule> // [optional] Array of plant modules, should default to []
}
```

### Tag data
A plant can be assigned to various, user created, tags. A tag object should be defined as follows:

```typescript
{
  "guid": String, // [required] A random, version 4 GUID
  "created": Date, // [required] Date when the plant has been created
  "modified": Date, // [required] Date when plant has been modified, defaults to created date
  "name": String, // [required] Identifier name of the tag
  "label": String, [required]
  "plants": Array<guid> // [required] A list of plants associated with the tag
}
```

### Plant Modules
Modules have all the same structure with a module-specific `value` definition.

#### Watering module

```typescript
{
  "type": "watering",
  "value": {
    "amount": 1 | 2 | 3,
    "frequency": String
  }
}
```

#### Sunshine module

```typescript
{
  "type": "sunshine",
  "value": {
    "insensity": 1 | 2 | 3
  }
}
```

#### Seasons module

```typescript
{
  "type": "seasons",
  "value": {
    "seasons": [
      {
        "month": "January",
        "growth": Boolean
      },
      ...
    ]
  }
}
```

#### Notes module

```typescript
{
  "type": "notes",
  "value": {
    "notes": String
  }
}
```

## Development

| Command | Description |
| ------- | ----------- |
| `npm install` | Installs dependencies |
| `npm run dev` | Serve with hot reload at localhost:8080 |
| `npm run build` | Build for production with minification |
| `npm run build --report` | Build for production and view the bundle analyzer report |
| `npm run unit` | Run unit tests |
| `npm test` | Run all tests |
| `npm lint` | Runs `Standard` over all `.js` and `.vue` files |

This is an Vue.js progressive web application, developed with [`@vue/cli`](https://github.com/vuejs/vue-cli).

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Credits
### Logo
The logo is a combination of existing illustrations by [Vitaly Gorbachev](https://www.flaticon.com/authors/vitaly-gorbachev) and [Freepik](https://www.flaticon.com/authors/freepik).

### Icons
Icons taken from [Freepik](http://www.freepik.com) and [Dimitry Miroliubov](http://www.flaticon.com/authors/dimitry-miroliubov).

## License
[MIT](https:/github.com/morkro/happy-plants/LICENSE)
