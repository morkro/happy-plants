<h1 align="center">
  <img src="resources/logo-readme.png" alt="HappyPlants 🌵🌱" />
</h1>

<p align="center">
  Current version: <code>1.7.3</code> <a href="packages/app/CHANGELOG.md">(Changelog)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2020.svg" alt="Maintenance" />
  <a href="http://makeapullrequest.com" target="_blank">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  </a>
</p>

<img src="resources/happyplants-phone-presentation.png" alt="HappyPlants App" />

[**🌿 HappyPlants**](https://happyplants.garden) is all about collecting, organising, and adding all kinds of information of your little friends. _How much water does it need? During which seasons does it grow? When is it dormant? Does it require lots of sun?_ Basically, creating your own plant database in a visual way. You can either save HappyPlants to your homescreens on mobile devices (recommended) or add it to your bookmarks on desktop. This is a **mobile-first web application**.

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior.

**Table of contents:**

- [🔜 Version 2](#version-2)
- [🎁 Features](#features)
- [👩🏻‍💻 Development](#development)

---

## 🔜 Version 2

HappyPlants is currently being rewritten for a new major release with more features and better application architecture. The progress can be found in [**`packages/app-next`**](packages/app-next). The first release candidate is currently planned for some time mid-July to early August.

## ✨ Features

### General

- 🔋 Save all data either _locally on device_ (via IndexedDB) or in the cloud (Firebase)
  - 🗝 Sign in options: Twitter, GitHub, Google
- 📦 Import/Export your plant data
- 📦 Migrate your data from local storage to Firebase and vice versa
- 📱 Responsive layout with mobile-first focus
- 💡 Dark/Light Theme

### Plants

- 🗂 Add, delete, modify your plants
- 🔖 Add _tags_ to your plants for better organisation

#### Add different modules to each plant

![plant-modules](resources/plant-modules.png)

  - 💦 Watering schedule
  - ☀️ Sunshine requirements
  - 🌱 Growth cycle
  - 📝 Notes
  - 🖼 Gallery

## Development

This repository is organised with [Lerna](https://lerna.js.org).

## License

[BSD 3-Clause](https:/github.com/morkro/happy-plants/LICENSE)
