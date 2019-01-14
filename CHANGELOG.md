# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.6.1] - 2019-01-14

### Fixed
- Plant order in Overview wasn't quite working when switching views.

## [1.6.0] - 2019-01-09

### Added
- Gallery module for plants.

### Changed
- Couple of layout adjustments for the desktop version.

### Fixed
- Some minor layout issues in Plant screen.
- Issues with the dialog.

## [1.5.1] - 2018-11-10

### Added
- Added plant name to header when scrolling down.

### Changed
- Header height is now slightly reduced

### Fixed
- Login/Logout button size in settings menu.
- An info layer when the application is offline should now actually show up.

## [1.5.0] - 2018-10-31

### Added
- Added Twitter and GitHub as additional login methods.

### Changed
- Plant images are now lazy loaded, improving download times and data usage for mobile users.

### Fixed
- Improved data loading for cloud users, resulting in a more fluent experience on the overview.
- Couple of performance improvements.

## [1.4.0] - 2018-10-23

### Added
- Improved touch actions on the overview menu.
- Added suggestions when adding a new tag to a plant.
- It's now possible to login from the Settings view.

### Changed
- Updated list view with more details.

### Fixed
- Hiding tags on plant view now works again.

## [1.3.1] - 2018-10-18

### Changed
- Improved plant loading experience for cloud users, now presenting individual results as soon they're downloaded.

## [1.3.0] - 2018-10-07

### Added
- It's now possible to backup your data in the cloud _(using Google Firebase)_ and login from different devices.
- Information layer when an update has been downloaded including the specific changes (you're reading this right now).
- Added a dark theme in settings section.

### Changed
- Restructured the settings view.
- A couple of more or less subtle design updates including buttons and general design elements.

### Fixed
- A production-only bug related build tools and styling.
- Lots of more, subtle bugs.

## [1.2.2] - 2018-07-22

### Fixed
- Fixes an issue with elements on overview to not be aligned in a grid anymore.

## [1.2.0] - 2018-07-22

### Added
- Notification system to let users know a new version of the app has been released and downloaded.

### Changed
- Onboarding screen has been moved to its own route.
- Renamed Changelog to Release Notes in Settings.
- Updated icon for tags to be more clear.

### Fixed
- Some minor fixes with the button component and icons.
- An issue with the build tools (PostCSS).

## [1.1.0] - 2018-07-16

### Added
- Added a CHANGELOG to the repository and application.

### Fixed
- One test was broken due to the removed file in the previous release.

## [1.0.3-alpha] - 2018-07-15

### Removed
- Removed unused Vue.js helper utility method (`vue-computed-properties`).

## [1.0.2-alpha] - 2018-07-15

### Changed
- Updated color theme to use same colors as in logo (mainly blue and green).

## [1.0.1-alpha] - 2018-07-15

### Changed
- Updated to a better maintained icon library (`vue-feather-icons`)

## [1.0.0-alpha] - 2018-07-15

The unofficial launch date. Everything has been added.
