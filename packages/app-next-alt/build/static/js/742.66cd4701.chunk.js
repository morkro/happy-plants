"use strict";(self.webpackChunkapp_next_react=self.webpackChunkapp_next_react||[]).push([[742],{1859:function(t,e,n){n.r(e);var i=['a[href]:not([tabindex^="-"])','area[href]:not([tabindex^="-"])','input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])','input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked','select:not([disabled]):not([tabindex^="-"])','textarea:not([disabled]):not([tabindex^="-"])','button:not([disabled]):not([tabindex^="-"])','iframe:not([tabindex^="-"])','audio[controls]:not([tabindex^="-"])','video[controls]:not([tabindex^="-"])','[contenteditable]:not([tabindex^="-"])','[tabindex]:not([tabindex^="-"])'];function r(t){this._show=this.show.bind(this),this._hide=this.hide.bind(this),this._maintainFocus=this._maintainFocus.bind(this),this._bindKeypress=this._bindKeypress.bind(this),this.$el=t,this.shown=!1,this._id=this.$el.getAttribute("data-a11y-dialog")||this.$el.id,this._previouslyFocused=null,this._listeners={},this.create()}function o(t,e){return n=(e||document).querySelectorAll(t),Array.prototype.slice.call(n);var n}function s(t){var e=a(t),n=t.querySelector("[autofocus]")||e[0];n&&n.focus()}function a(t){return o(i.join(","),t).filter((function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}))}function l(){o("[data-a11y-dialog]").forEach((function(t){new r(t)}))}r.prototype.create=function(){return this.$el.setAttribute("aria-hidden",!0),this.$el.setAttribute("aria-modal",!0),this.$el.hasAttribute("role")||this.$el.setAttribute("role","dialog"),this._openers=o('[data-a11y-dialog-show="'+this._id+'"]'),this._openers.forEach(function(t){t.addEventListener("click",this._show)}.bind(this)),this._closers=o("[data-a11y-dialog-hide]",this.$el).concat(o('[data-a11y-dialog-hide="'+this._id+'"]')),this._closers.forEach(function(t){t.addEventListener("click",this._hide)}.bind(this)),this._fire("create"),this},r.prototype.show=function(t){return this.shown||(this._previouslyFocused=document.activeElement,this.$el.removeAttribute("aria-hidden"),this.shown=!0,s(this.$el),document.body.addEventListener("focus",this._maintainFocus,!0),document.addEventListener("keydown",this._bindKeypress),this._fire("show",t)),this},r.prototype.hide=function(t){return this.shown?(this.shown=!1,this.$el.setAttribute("aria-hidden","true"),this._previouslyFocused&&this._previouslyFocused.focus&&this._previouslyFocused.focus(),document.body.removeEventListener("focus",this._maintainFocus,!0),document.removeEventListener("keydown",this._bindKeypress),this._fire("hide",t),this):this},r.prototype.destroy=function(){return this.hide(),this._openers.forEach(function(t){t.removeEventListener("click",this._show)}.bind(this)),this._closers.forEach(function(t){t.removeEventListener("click",this._hide)}.bind(this)),this._fire("destroy"),this._listeners={},this},r.prototype.on=function(t,e){return"undefined"===typeof this._listeners[t]&&(this._listeners[t]=[]),this._listeners[t].push(e),this},r.prototype.off=function(t,e){var n=(this._listeners[t]||[]).indexOf(e);return n>-1&&this._listeners[t].splice(n,1),this},r.prototype._fire=function(t,e){(this._listeners[t]||[]).forEach(function(t){t(this.$el,e)}.bind(this))},r.prototype._bindKeypress=function(t){this.$el.contains(document.activeElement)&&(this.shown&&27===t.which&&"alertdialog"!==this.$el.getAttribute("role")&&(t.preventDefault(),this.hide(t)),this.shown&&9===t.which&&function(t,e){var n=a(t),i=n.indexOf(document.activeElement);e.shiftKey&&0===i?(n[n.length-1].focus(),e.preventDefault()):e.shiftKey||i!==n.length-1||(n[0].focus(),e.preventDefault())}(this.$el,t))},r.prototype._maintainFocus=function(t){!this.shown||t.target.closest('[aria-modal="true"]')||t.target.closest("[data-a11y-dialog-ignore-focus-trap]")||s(this.$el)},"undefined"!==typeof document&&("loading"===document.readyState?document.addEventListener("DOMContentLoaded",l):window.requestAnimationFrame?window.requestAnimationFrame(l):window.setTimeout(l,16)),e.default=r},8192:function(t,e,n){e.cV=void 0;var i=a(n(2791)),r=a(n(4164)),o=a(n(1859)),s=a(n(2007));function a(t){return t&&t.__esModule?t:{default:t}}function l(){return l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},l.apply(this,arguments)}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],i=!0,r=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(l){r=!0,o=l}finally{try{i||null==a.return||a.return()}finally{if(r)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var d=function(t){var e=function(){var t=u(i.default.useState(null),2),e=t[0],n=t[1];return[e,i.default.useCallback((function(t){null!==t&&n(new o.default(t))}),[])]}(),n=u(e,2),r=n[0],s=n[1],a=i.default.useCallback((function(){return r.hide()}),[r]),l=t.role||"dialog",c="alertdialog"===l,d=t.titleId||t.id+"-title";return i.default.useEffect((function(){return function(){r&&r.destroy()}}),[r]),[r,{container:{id:t.id,ref:s,role:l,"aria-modal":!0,"aria-hidden":!0,"aria-labelledby":d},overlay:{onClick:c?void 0:a},dialog:{role:"document"},closeButton:{type:"button",onClick:a},title:{role:"heading","aria-level":1,id:d}}]};var f=function(t){var e=function(){var t=u(i.default.useState(!1),2),e=t[0],n=t[1];return i.default.useEffect((function(){return n(!0)}),[]),e}(),n=u(d(t),2),o=n[0],s=n[1],a=t.dialogRef;if(i.default.useEffect((function(){return o&&a(o),function(){return a(void 0)}}),[a,o]),!e)return null;var c=t.dialogRoot?document.querySelector(t.dialogRoot):document.body,f=i.default.createElement("p",l({},s.title,{className:t.classNames.title,key:"title"}),t.title),h=i.default.createElement("button",l({},s.closeButton,{className:t.classNames.closeButton,"aria-label":t.closeButtonLabel,key:"button"}),t.closeButtonContent),p=["first"===t.closeButtonPosition&&h,f,t.children,"last"===t.closeButtonPosition&&h].filter(Boolean);return r.default.createPortal(i.default.createElement("div",l({},s.container,{className:t.classNames.container}),i.default.createElement("div",l({},s.overlay,{className:t.classNames.overlay})),i.default.createElement("div",l({},s.dialog,{className:t.classNames.dialog}),p)),c)};e.cV=f,f.defaultProps={role:"dialog",closeButtonLabel:"Close this dialog window",closeButtonContent:"\xd7",closeButtonPosition:"first",classNames:{},dialogRef:function(){}},f.propTypes={role:s.default.oneOf(["dialog","alertdialog"]),id:s.default.string.isRequired,title:s.default.node.isRequired,dialogRef:s.default.func,titleId:s.default.string,closeButtonLabel:s.default.string,closeButtonContent:s.default.node,closeButtonPosition:s.default.oneOf(["first","last","none"]),dialogRoot:s.default.string,classNames:s.default.exact({container:s.default.string,overlay:s.default.string,dialog:s.default.string,title:s.default.string,closeButton:s.default.string}),children:s.default.node}},1469:function(t,e,n){var i=n(2791),r=n(2007),o=n.n(r);function s(){return s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)}function a(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var l=(0,i.forwardRef)((function(t,e){var n=t.color,r=void 0===n?"currentColor":n,o=t.size,l=void 0===o?24:o,u=a(t,["color","size"]);return i.createElement("svg",s({ref:e,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),i.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),i.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))}));l.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},l.displayName="Plus",e.Z=l},8965:function(t,e,n){var i=n(2791),r=n(2007),o=n.n(r);function s(){return s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)}function a(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var l=(0,i.forwardRef)((function(t,e){var n=t.color,r=void 0===n?"currentColor":n,o=t.size,l=void 0===o?24:o,u=a(t,["color","size"]);return i.createElement("svg",s({ref:e,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),i.createElement("polyline",{points:"3 6 5 6 21 6"}),i.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),i.createElement("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),i.createElement("line",{x1:"14",y1:"11",x2:"14",y2:"17"}))}));l.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},l.displayName="Trash2",e.Z=l},7702:function(t,e,n){var i=n(2791),r=n(2007),o=n.n(r);function s(){return s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)}function a(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var l=(0,i.forwardRef)((function(t,e){var n=t.color,r=void 0===n?"currentColor":n,o=t.size,l=void 0===o?24:o,u=a(t,["color","size"]);return i.createElement("svg",s({ref:e,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),i.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),i.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"}))}));l.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},l.displayName="X",e.Z=l}}]);
//# sourceMappingURL=742.66cd4701.chunk.js.map