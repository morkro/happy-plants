// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
