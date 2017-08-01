const ua = window.navigator.userAgent

export const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
export const webkit = !!ua.match(/WebKit/i)
export const iOSSafari = iOS && webkit && !ua.match(/CriOS/i)
