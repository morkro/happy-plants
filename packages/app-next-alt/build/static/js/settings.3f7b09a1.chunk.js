"use strict";(self.webpackChunkapp_next_react=self.webpackChunkapp_next_react||[]).push([[571],{6240:function(e,n,r){r.r(n),r.d(n,{default:function(){return Q}});var t=r(1413),i=r(5861),a=r(885),o=r(168),s=r(7757),l=r.n(s),c=r(2791),u=r(8367),d=r(6871),h=r(4587),f=r(5751),p=r(2007),g=r.n(p);function v(){return v=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},v.apply(this,arguments)}function m(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var x=(0,c.forwardRef)((function(e,n){var r=e.color,t=void 0===r?"currentColor":r,i=e.size,a=void 0===i?24:i,o=m(e,["color","size"]);return c.createElement("svg",v({ref:n,xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},o),c.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),c.createElement("polyline",{points:"12 5 19 12 12 19"}))}));x.propTypes={color:g().string,size:g().oneOfType([g().string,g().number])},x.displayName="ArrowRight";var b,Z,j,y,w,k,P=x,S=r(4568),z=r(3504),C=r(9752),D=r(8013),O=r(5689),T=r(3426),R=r(3154),A=r(3723),M=r(1866),X=r(4886),E=r(9385),W=r(9329),B=r(4609),L=r(7987),I=r(1008),N=r(184),Y=(0,f.ZP)(M.Z)(b||(b=(0,o.Z)(["\n  position: absolute;\n  z-index: -1;\n  width: 100%;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  transform: translateY(-35%);\n"]))),q=f.ZP.header(Z||(Z=(0,o.Z)(["\n  --avatar-size: 45px;\n  position: relative;\n  width: ",";\n  margin-bottom: 15%;\n"])),(function(e){var n=e.theme;return"calc(100% + 2 * ".concat(n.spacings.m,")")})),F=f.ZP.div(j||(j=(0,o.Z)(["\n  width: var(--avatar-size);\n  height: var(--avatar-size);\n  border-radius: ",";\n  overflow: hidden;\n  background-color: ",";\n  box-shadow: 0px 4px 0px -2px ",";\n  display: flex;\n  align-items: center;\n\n  img,\n  svg {\n    object-fit: cover;\n    aspect-ratio: 1 / 1;\n    width: 100%;\n  }\n"])),(function(e){return e.theme.baseRadius}),(function(e){return e.theme.colors.yellow}),(function(e){return e.theme.colors.greenDark})),U=f.ZP.div(y||(y=(0,o.Z)(["\n  display: grid;\n  background-color: ",";\n  padding: ",";\n  grid-template-columns: var(--avatar-size) 1fr;\n  column-gap: ",";\n\n  > div:not(",") {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n  }\n\n  > div:not(",") p {\n    display: flex;\n    gap: ",";\n  }\n"])),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.m}),(function(e){return e.theme.spacings.l}),F,F,(function(e){return e.theme.spacings.s})),H=f.ZP.section(w||(w=(0,o.Z)(["\n  width: 100%;\n  margin-top: ",";\n  margin-bottom: ",";\n\n  h2 {\n    display: flex;\n    align-items: center;\n\n    svg {\n      margin-right: ",";\n    }\n  }\n"])),(function(e){return e.theme.spacings.m}),(function(e){return e.theme.spacings.m}),(function(e){return e.theme.spacings.m})),_=f.ZP.ul(k||(k=(0,o.Z)(["\n  list-style: none;\n  width: 100%;\n\n  li {\n    border-radius: ",";\n    background-color: ",";\n    margin-bottom: 2px;\n  }\n\n  a {\n    text-decoration: none;\n\n    &:hover,\n    &:focus {\n      text-decoration: underline;\n    }\n  }\n\n  a,\n  li > div {\n    padding: ",";\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n"])),(function(e){return e.theme.baseRadius}),(function(e){return e.theme.colors.white}),(function(e){var n=e.theme;return"".concat(n.spacings.l," ").concat(n.spacings.l)}));function V(e){return(0,N.jsx)("li",{children:(0,N.jsxs)(z.rU,{to:e.link,children:[(0,N.jsx)(A.xv,{color:"greenDark",semiBold:!0,children:e.label}),(0,N.jsx)(P,{color:D.rS.colors.greenDark,"aria-hidden":"true",focusable:"false"})]})})}var J={happyplants:[{label:"Tags",link:h.X.settings.tags},{label:"Modules",link:h.X.settings.modules},{label:"Accessibility",link:h.X.settings.a11y}],account:[{label:"Change email",link:h.X.settings.email},{label:"Change password",link:h.X.settings.password}],application:[{label:"About",link:h.X.settings.about},{label:"Release notes",link:h.X.settings.releaseNotes},{label:"Bug reports",link:h.X.settings.bugReport}]};function Q(){var e=(0,L.Z)("settingsBase"),n=(0,d.s0)(),r=(0,I.Z)(),o=(0,u.qr)().setStore,s=(0,O.tS)(),c=(0,a.Z)(s,3),f=c[0],p=c[1],g=c[2];function v(){return(v=(0,i.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o({authLoader:{show:!0,message:"logout"}}),e.next=3,(0,B.Z)(2e3);case 3:return e.prev=3,e.next=6,(0,O.Mx)();case 6:n(h.X.home),o(u.C1),e.next=15;break;case 10:e.prev=10,e.t0=e.catch(3),o({authLoader:{show:!1}}),(0,W.Z)(e.t0.message,!0),R.A.error("There was an issue logging you out, please refresh.");case 15:case"end":return e.stop()}}),e,null,[[3,10]])})))).apply(this,arguments)}return(0,N.jsxs)(X.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:[(0,N.jsx)(q,{children:(0,N.jsxs)(U,{children:[(0,N.jsx)(F,{role:"img","aria-label":(null===r||void 0===r?void 0:r.displayName)||void 0,children:r.photoURL?(0,N.jsx)("img",{src:null===r||void 0===r?void 0:r.photoURL,loading:"lazy",alt:""}):(0,N.jsx)(S.Z,{color:D.rS.colors.greenDark})}),(0,N.jsxs)("div",{children:[(0,N.jsx)(A.xv,{color:"white",size:"m",bold:!0,children:null===r||void 0===r?void 0:r.displayName}),!g&&(0,N.jsx)(A.xv,{color:"white",size:"m",children:p?(0,N.jsx)(E.Z,{}):"".concat(f," Plants")})]})]})}),(0,N.jsx)(Y,{viewBox:"0 0 360 204",children:(0,N.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[(0,N.jsx)("path",{fill:D.rS.colors.white,d:"M324.238 61.787c11.994-6.299 24.425-9.031 35.763-7.254L360 124.576c-5.01 4.241-9.168 9.434-10.95 17.276-2.065 9.087-2.39 18-3.618 25.087-2.813 16.261-16.19 28.217-32.846 34.848-7.36 2.913-14.782 2.891-22.31.283-9.082-3.142-10.878-8.562-13.404-15.219l-.508-1.325c-8.31-21.348-53.772-8.282-70.316-34.63-12.272-19.522 5.436-49.326 25.359-58.587 18.445-8.585 35.306-8.467 44.215-9.249l.602-.055c21.887-2.152 32.218-12.913 48.014-21.218zM201.593 168.182c.093 3.685-1.334 6.48-4.166 8.449-7.948 5.526-14.643-1.645-13.24-7.231 1.839-7.324 6.636-15.157 12.211-11.448 3.529 2.35 5.099 5.84 5.195 10.23"}),(0,N.jsx)("path",{fill:D.rS.colors.green,d:"M0 0h360v139H0z"}),(0,N.jsx)("path",{fill:D.rS.colors.green,d:"M295.782 119.436c16.422 2.233 42.549 6.005 56.274 11.532 3.435 1.375 5.867 3.357 7.122 5.737 1.864 3.488.515 5.254-3.616 7.255-13.441 6.46-27.08 5.92-43.125 3.407-17.813-2.788-29.088 3.744-35.93 6.846-6.757 3.062-14.265 4.168-22.392 3.717-22.653-1.243-23.708-6.385-46.906-12.24-19.238-4.856-28.679 4.75-39.802 10.478-45.202 23.275-68.645-18.366-116.215-.053-7.166 2.758-19.463 8.763-25.671 11.115-6.98 2.644-18.093 3.623-25.522-1.227v-48.19c3.495-6.366 8.947-12.186 16.185-17.433 33.551-24.413 98.474-5.552 279.598 19.056z"})]})}),(0,N.jsxs)(H,{children:[(0,N.jsx)(A.X6,{as:"h2",color:"beigeDark",mb:"m",children:"HappyPlants"}),(0,N.jsx)(_,{children:J.happyplants.map((function(e,n){return(0,N.jsx)(V,(0,t.Z)({},e),e.label+n)}))})]}),(0,N.jsxs)(H,{children:[(0,N.jsx)(A.X6,{as:"h2",color:"beigeDark",mb:"m",children:"Account"}),(0,N.jsx)(_,{children:J.account.map((function(e,n){return(0,N.jsx)(V,(0,t.Z)({},e),e.label+n)}))})]}),(0,N.jsxs)(H,{children:[(0,N.jsx)(A.X6,{as:"h2",color:"beigeDark",mb:"m",children:"Application"}),(0,N.jsxs)(_,{children:[J.application.map((function(e,n){return(0,N.jsx)(V,(0,t.Z)({},e),e.label+n)})),(0,N.jsx)("li",{children:(0,N.jsxs)("div",{children:[(0,N.jsx)(A.xv,{color:"greenDark",semiBold:!0,children:"Version"}),(0,N.jsx)(A.xv,{color:"greenDark",children:C.Z.version})]})})]})]}),(0,N.jsx)(T.z,{onClick:function(){return v.apply(this,arguments)},variant:"alarm",size:"s",mt:"m",mb:"l",children:"Logout"})]}))}},998:function(e,n,r){r.r(n),r.d(n,{default:function(){return E}});var t=r(1413),i=r(168),a=r(2791),o=r(5751),s=r(9752),l=r(8367),c=r(3723),u=r(5987),d=r(2007),h=r.n(d);function f(){return f=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},f.apply(this,arguments)}function p(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var g=(0,a.forwardRef)((function(e,n){var r=e.color,t=void 0===r?"currentColor":r,i=e.size,o=void 0===i?24:i,s=p(e,["color","size"]);return a.createElement("svg",f({ref:n,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("polyline",{points:"20 6 9 17 4 12"}))}));g.propTypes={color:h().string,size:h().oneOfType([h().string,h().number])},g.displayName="Check";var v,m,x,b=g,Z=r(7702),j=r(8013),y=r(215),w=r(7704),k=r(184),P=["pressed","onClick","toggleDirection","fullWidth"],S=o.ZP.span(v||(v=(0,i.Z)(["\n  --offset: 10%;\n  --diameter: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 64px;\n  height: 24px;\n  position: relative;\n  border-radius: 100vw;\n  background-color: ",";\n  transition: transform var(--base-transition) ease-in-out;\n\n  &::before {\n    content: '';\n    z-index: 2;\n    position: absolute;\n    top: 50%;\n    left: var(--offset);\n    box-sizing: border-box;\n    width: var(--diameter);\n    height: var(--diameter);\n    border: 2px solid ",";\n    border-radius: 50%;\n    background-color: ",";\n    transform: translate(0, -50%);\n    will-change: transform;\n    transition: inherit;\n  }\n\n  svg {\n    transform: translateY(1px);\n  }\n"])),(function(e){return e.theme.colors.beige}),(function(e){return e.theme.colors.beigeDark}),(function(e){return e.theme.colors.white})),z=o.ZP.button(m||(m=(0,i.Z)(["\n  ","\n\n  border: 0;\n  padding: 0;\n  background: transparent;\n  font: inherit;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: ",";\n\n  &:focus {\n    outline: 0;\n\n    & "," {\n      outline: 2px dotted ",";\n      outline-offset: 2px;\n    }\n\n    &:focus:not(:focus-visible) "," {\n      outline: 0;\n    }\n  }\n\n  &[aria-pressed='true'] "," {\n    background-color: ",";\n\n    &::before {\n      transform: translate(100%, -50%);\n      border-color: ",";\n    }\n  }\n\n  &[disabled] "," {\n    opacity: 0.6;\n    filter: grayscale(40%);\n    cursor: not-allowed;\n  }\n"])),y.n,(function(e){return e.fullWidth?"100%":"auto"}),S,(function(e){return e.theme.colors.beigeDark}),S,S,(function(e){return e.theme.colors.green}),(function(e){return e.theme.colors.green}),S),C=(0,o.vJ)(x||(x=(0,i.Z)(["\n  [dir='rtl'] ","::before {\n    left: auto;\n    right: var(--offset);\n  }\n\n  [dir='rtl'] ","[aria-pressed='true'] + ","::before {\n    transform: translate(-100%, -50%);\n  }\n"])),S,z,S);function D(){return(0,k.jsxs)(S,{hidden:!0,children:[(0,k.jsx)(b,{"aria-hidden":"true",focusable:"false",color:j.rS.colors.white}),(0,k.jsx)(Z.Z,{"aria-hidden":"true",focusable:"false",color:j.rS.colors.beigeDark})]})}function O(e){var n=e.pressed,r=e.onClick,i=void 0===r?w.Z:r,o=e.toggleDirection,s=void 0===o?"left":o,l=e.fullWidth,d=void 0!==l&&l,h=(0,u.Z)(e,P);return(0,k.jsxs)(a.Fragment,{children:[(0,k.jsx)(C,{}),(0,k.jsxs)(z,(0,t.Z)((0,t.Z)({"aria-pressed":n,onClick:i,fullWidth:d},h),{},{children:["left"===s&&(0,k.jsx)(D,{}),(0,k.jsx)(c.xv,{bold:!0,color:"greenDark",ml:"left"===s?"m":void 0,mr:"right"===s?"m":void 0,children:e.children}),"right"===s&&(0,k.jsx)(D,{})]}))]})}var T,R=r(9025),A=r(4886),M=r(7987),X=o.ZP.section(T||(T=(0,i.Z)(["\n  width: ",";\n  background: ",";\n  padding: ",";\n\n  &:not(:last-of-type) {\n    margin-bottom: ",";\n  }\n"])),(function(e){var n=e.theme;return"calc(100% + ".concat(n.spacings.l,")")}),(function(e){return e.theme.colors.white}),(function(e){return e.theme.spacings.m}),(function(e){return e.theme.spacings.m}));function E(){var e=(0,M.Z)("settingsA11y"),n=(0,l.qr)(),r=n.store,i=n.setStore,a="enabled"===r.userPreferences.animations;return(0,k.jsxs)(A.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:[(0,k.jsxs)(X,{children:[(0,k.jsx)(c.X6,{as:"h2",bold:!0,color:"greenDark",mb:"m",children:"Animations"}),(0,k.jsx)(O,{toggleDirection:"right",pressed:a,mt:"s",mb:"m",onClick:function(){var e=a?"disabled":"enabled";(0,R.W5)(s.Z.localStorage.userAnimationPreference,e),i({userPreferences:(0,t.Z)((0,t.Z)({},r.userPreferences),{},{animations:e})})},fullWidth:!0,children:"Enable animations"}),(0,k.jsxs)(c.xv,{color:"beigeDark",children:["This option lets you toggle all animations and transitions. Your current settings have them ",(0,k.jsx)("strong",{children:a?"enabled":"disabled"}),", based on your operating systems settings. Setting them explicitly will overwrite your systems settings."]})]}),(0,k.jsxs)(X,{children:[(0,k.jsx)(c.X6,{as:"h2",bold:!0,color:"greenDark",mb:"m",children:"Colors"}),(0,k.jsx)(c.xv,{color:"beigeDark",children:"This option is not yet available."})]})]}))}},321:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1413),i=(r(2791),r(4886)),a=r(7987),o=r(184);function s(){var e=(0,a.Z)("settingsAbout");return(0,o.jsx)(i.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:(0,o.jsx)("h1",{children:"about"})}))}},1524:function(e,n,r){r.r(n),r.d(n,{default:function(){return R}});var t,i,a,o=r(1413),s=r(5861),l=r(885),c=r(168),u=r(7757),d=r.n(u),h=r(2791),f=r(5751),p=r(8013),g=r(6360),v=r(3426),m=r(3723),x=r(8790),b=r(9385),Z=r(4886),j=r(3154),y=r(5689),w=r(9329),k=r(812),P=r(1866),S=r(1008),z=r(7987),C=r(184),D=(0,f.ZP)(P.Z)(t||(t=(0,c.Z)(["\n  width: 104px;\n  display: block;\n  position: absolute;\n  right: 0;\n  top: 0;\n  transform: translate(-17%, 34%);\n"]))),O=f.ZP.div(i||(i=(0,c.Z)(["\n  width: ",";\n  margin-bottom: ",";\n\n  & svg {\n    width: 100%;\n  }\n"])),(function(e){var n=e.theme;return"calc(100% + 2 * ".concat(n.spacings.m,")")}),(function(e){return e.theme.spacings.m})),T=f.ZP.form(a||(a=(0,c.Z)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n\n  label {\n    position: relative;\n    margin-bottom: ",";\n  }\n"])),(function(e){return e.theme.spacings.m}));function R(){var e=(0,z.Z)("settingsBugReport"),n=(0,S.Z)(),r=(0,h.useState)({value:"",invalid:!1,error:""}),t=(0,l.Z)(r,2),i=t[0],a=t[1],c=(0,h.useState)({value:void 0,invalid:!1,error:""}),u=(0,l.Z)(c,2),f=u[0],R=u[1],A=(0,h.useState)(!1),M=(0,l.Z)(A,2),X=M[0],E=M[1];function W(){return(W=(0,s.Z)(d().mark((function e(r){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),E(!0),e.prev=2,e.next=5,(0,y.kS)({description:i.value,screenshot:f.value,reportedBy:{userId:n.id,email:n.email}});case 5:j.A.success("Thank you for reporting this bug. We will look into it!"),a((function(e){return(0,o.Z)((0,o.Z)({},e),{},{value:""})})),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(2),t=(0,k.Z)(e.t0),(0,w.Z)(t.message,!0),j.A.error(t.message);case 14:return e.prev=14,E(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[2,9,14,17]])})))).apply(this,arguments)}return(0,C.jsxs)(Z.ZP,(0,o.Z)((0,o.Z)({},e),{},{children:[(0,C.jsx)(g.Qg.Source,{children:(0,C.jsx)(D,{viewBox:"0 0 104 86",children:(0,C.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[(0,C.jsx)("path",{fill:p.rS.colors.red,d:"M84.277656 44.383686c.743125 4.259099-.40409-1.25526 4.288604 20.478317.173896.800856.491663 1.605478.085071 2.405079-.947045.385365.360303.740603-18.316642-9.558808-.681823.47951.430362-1.32932-14.682338 26.287662-.44037.804622-1.02336 2.059882-1.678911 2.00214-.6543-.056486-.873234-1.351915-1.20101-2.826846-.017514-.075315-5.96126-26.861315-5.96251-26.935376-.033779-1.547736-.979573-2.062393-2.354479-2.38876-2.083-.493318-15.860829-3.866202-17.915055-4.587977-.241453-.085357-.456634-.453149-.531697-.731817-.253963-.927637 5.066758-2.05235 14.940055-6.22609-1.947887-4.07081-12.740706-22.34991-13.652723-24.355817-.221436-.485785.042536-1.06697.575484-1.191242.46539-.107952.99959-.179502 1.442462-.053976.040034.010042 18.269102 8.983898 20.259525 9.91279 1.24855-1.005463 9.586807-22.85829 11.523434-26.38306.19141-.346452.889497-.2862 1.050883.07908.724359 1.63937 6.097624 18.736016 7.24734 20.99423C73.693762 19.169272 93.486645 6.82002 95.507093 6.11331c.14387-.05021.661806.395407.636785.55608-.245206 1.609244-1.048381 2.403823-9.980888 21.955758.243955.947722-.770647-.02134 15.192768 11.57601.81068.588718 1.610103 1.191243 2.383252 1.82515.161386.133057.312763.494572.243956.645203-.357801.771985-.900757.718009-2.387006.787048-18.790791.877427-14.519702.62512-17.318304.925127"}),(0,C.jsx)("path",{fill:"#1F2421",d:"M66.998688 45.104344c.064404 2.79862-2.258194 3.57035-3.300747 2.307634-.8963-1.085205-.937894-3.632038-.075138-4.751234.64539-.839713 1.759056-.881258 2.517154-.112046.717845.730185.845313 1.624031.85873 2.555646M61.99796 37.632913c.042645.6564-.589723 1.325885-1.284232 1.365138-.83341.045796-1.69119-.722912-1.713121-1.534144-.048738-1.831815 2.853577-2.127304 2.997353.169006M68 36.77627c-.138186.333146-.194176.550079-.31211.7327-.260886.406196-.931566.592138-1.47359.43608-1.281796-.370778-1.81548-2.257872-.259694-2.858864.495564-.192583 1.174583-.06198 1.46525.38738.27399.42169.41575.91643.580144 1.302703"}),(0,C.jsx)("path",{fill:p.rS.colors.yellow,d:"M20.149325 55.201202c4.339951 3.914063 5.260377 4.653685 5.260377 4.653685 1.120329 1.039387.57044 1.537362-1.012593 3.477876-.359327.439858-.79463.532234-1.325214.2808-.444644-.211059-.315112-.151718-5.955366-2.422584-.349986.431905-.19928-.055059-1.17264 8.394008-.069126.598304-.222322 1.150727-.80584 1.237597-.978964.1456-1.963533.32913-3.032174-.035482-.419734-1.441927-.906102-6.4694-1.477165-9.570429-1.497093.390917.208622-.143153-7.307359 3.414864-.348117.164565-.675684.10033-.899875-.178635-.565457-.702916-1.110987-1.421738-1.636589-2.15402-.452117-.629504.309507-1.021033.714295-1.323856C6.674865 57.10501 5.411926 58.07282 6.37034 57.19861c-.338777-.571999-.505674-.48207-4.580333-3.856558-.475159-.393364-.921049-.824045-1.352615-1.263903-.486991-.49614-.579781-1.076092-.215472-1.679903 1.716924-2.8447 1.750553-2.979288 2.745086-2.55656 2.817948 1.198445 5.153886 2.40729 6.40437 2.720513.215472-1.191104.582272-6.307894.708068-6.98634.125173-.674163.52996-1.114021 1.210628-1.239433 3.1424-.576281 3.476818-.463105 3.682948.738399 0 0 .686272 4.24931 1.110988 6.864598.306393.157836.467686-.079529.653888-.219623 5.969067-4.506862 5.473358-4.61698 6.977924-3.209923.419734.39214.81518.813034 1.198172 1.24188.543662.608093.449004.428235-4.764667 7.449445"})]})})}),(0,C.jsx)(O,{children:(0,C.jsx)(P.Z,{viewBox:"0 0 360 46",children:(0,C.jsx)("path",{fill:p.rS.colors.green,fillRule:"evenodd",d:"M0 0h360v17l-.055095.00034c-.240482 1.238536-1.246316 2.228744-2.963361 3.21666l-.4433.246672-.47265.247426-.501814.24903c-9.719426 4.671986-19.542238 5.682998-30.302892 4.934432l-1.378859-.104974c-.922722-.07616-1.852494-.164478-2.78983-.263783l-1.411742-.15705-1.423475-.172652-1.435592-.187374a180.431435 180.431435 0 01-.722462-.098933l-1.454493-.207808-1.467577-.220332-.738815-.114588c-7.963257-1.24599-14.619867-.629564-20.157966.710303l-.865169.217404c-.427965.111542-.84902.227219-1.263257.34647l-.819414.243106-.801399.251641-.78355.259182-.385133.132107-.943623.336609-.916441.34411-.713797.27938-.69677.281939-.679908.283501-.663211.284068-.646677.283637-1.244414.562-4.1059 1.920613-.243349.110907c-6.756477 3.06195-14.264847 4.167557-22.392143 3.716547l-.684326-.039129-1.329565-.085433-1.279287-.094866c-3.137208-.248824-5.82375-.584577-8.214814-.995957l-.941035-.168559c-.617341-.115026-1.215142-.235322-1.796345-.360675l-.970142-.217362-.941517-.226822a60.575733 60.575733 0 01-.916078-.23605l-1.114183-.307685-1.085645-.321287-.852153-.266519-.421719-.136342-.836713-.278705-.830406-.28654-1.240755-.443991-.828584-.30511-1.252968-.470758-3.476444-1.326632-1.85979-.698711-1.468952-.537995-1.544429-.549091-1.076867-.371839-1.118383-.37619-1.163088-.380307a141.593986 141.593986 0 00-.599304-.191627l-1.236124-.38605-1.288799-.38959c-.438734-.130427-.886778-.261405-1.344664-.392895l-1.403716-.39597a161.431559 161.431559 0 00-.724999-.199064l-1.498273-.400145c-.510418-.13381-1.032006-.268036-1.565296-.402638-10.58118-2.670282-18.198375-.966242-24.761785 2.061173l-.71192.335367-.352997.171345-.700412.349466-.69343.357764-.686997.365183-.681118.371722-.675787.37738-1.004894.574753-.664875.387675-.661474.390253-.987041.588286-2.614907 1.564842-.652803.385551c-1.306154.767372-2.616704 1.5106-3.951489 2.197997-15.404771 7.931938-28.282402 8.324306-40.449151 6.119708l-1.026525-.192376-1.023383-.204077-1.020486-.215115a103.239191 103.239191 0 01-.509233-.11149l-1.016597-.23043-1.014308-.23981a123.744496 123.744496 0 01-.506372-.123217l-1.011333-.25264-1.009653-.260364-1.511864-.403578-1.509455-.417229-2.010281-.573673-1.507033-.44038-2.093827-.621432-3.146759-.941438-2.105064-.625077-2.113412-.616046-1.538098-.437414-1.544478-.427241-1.03361-.27805-1.037068-.271838-1.040772-.26495a136.50513 136.50513 0 00-.521853-.129682l-1.046796-.253353-1.051121-.244776a114.450845 114.450845 0 00-.52726-.11896l-1.058077-.230643c-.707006-.150414-1.41731-.293984-2.131242-.429808l-1.073662-.197813c-11.302906-2.013676-23.547161-1.99407-38.02677 3.58021l-.68103.265715a95.652282 95.652282 0 00-.350989.139495l-1.091852.443188-1.144913.477-1.191198.506645-1.23071.532126-1.263449.55344-1.941737.861015-1.977294.885542-6.167877 2.775705-2.057202.915403-1.956525.85669-1.383257.592874-.875066.367282-.833001.342213-.787183.314837-.737608.28515c-2.010394.761826-4.36384 1.385418-6.873434 1.771629H7.985715C5.117783 45.506004 2.371084 44.55169 0 43.003444V0z"})})}),(0,C.jsxs)(T,{onSubmit:function(e){return W.apply(this,arguments)},children:[(0,C.jsxs)("label",{htmlFor:"bugreport-description",children:[(0,C.jsxs)(m.xv,{color:"greenDark",mb:"m",children:["Please describe the bug you're facing. ",(0,C.jsx)("span",{"aria-hidden":"true",children:"*"})]}),(0,C.jsx)(x.g,{required:!0,fullWidth:!0,height:"30vh",value:i.value,id:"bugreport-description",placeholder:"e.g. when clicking on a plant it loads wrong data","aria-describedby":"bugreport-description","aria-invalid":i.invalid,error:i.error,onChange:function(e){return a((function(n){return(0,o.Z)((0,o.Z)({},n),{},{value:e.target.value})}))}})]}),(0,C.jsxs)("label",{htmlFor:"bugreport-screenshot",children:[(0,C.jsx)(m.xv,{color:"greenDark",mb:"m",children:"You can upload a screenshot of the bug you're having."}),(0,C.jsx)(x.I,{type:"file",onFileInput:function(e){var n=e.file;return R((function(e){return(0,o.Z)((0,o.Z)({},e),{},{value:n})}))}})]}),(0,C.jsxs)(v.z,{"aria-disabled":""===i.value,mt:"m",children:[X&&(0,C.jsx)(b.Z,{"aria-hidden":"true",focusable:"false"}),"Submit bug report"]})]})]}))}},5585:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1413),i=(r(2791),r(4886)),a=r(7987),o=r(184);function s(){var e=(0,a.Z)("settingsEmail");return(0,o.jsx)(i.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:(0,o.jsx)("h1",{children:"Email"})}))}},4182:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1413),i=(r(2791),r(4886)),a=r(7987),o=r(184);function s(){var e=(0,a.Z)("settingsModules");return(0,o.jsx)(i.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:(0,o.jsx)("h1",{children:"Modules"})}))}},9996:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1413),i=(r(2791),r(4886)),a=r(7987),o=r(184);function s(){var e=(0,a.Z)("settingsPassword");return(0,o.jsx)(i.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:(0,o.jsx)("h1",{children:"Password"})}))}},4820:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1413),i=(r(2791),r(4886)),a=r(7987),o=r(184);function s(){var e=(0,a.Z)("settingsReleaseNotes");return(0,o.jsx)(i.ZP,(0,t.Z)((0,t.Z)({},e),{},{children:(0,o.jsx)("h1",{children:"Release Notes"})}))}},3179:function(e,n,r){r.r(n),r.d(n,{default:function(){return M}});var t,i,a=r(7762),o=r(1413),s=r(5861),l=r(885),c=r(168),u=r(7757),d=r.n(u),h=r(2791),f=r(8965),p=r(1469),g=r(8013),v=r(5751),m=r(4882),x=r(4886),b=r(2078),Z=r(8790),j=r(3426),y=r(9657),w=r(3723),k=r(9385),P=r(4912),S=r(5689),z=r(7987),C=r(1008),D=r(8371),O=r(9329),T=r(184),R=v.ZP.div(t||(t=(0,c.Z)(["\n  margin-bottom: ",";\n  width: 100%;\n"])),(function(e){return e.theme.spacings.l})),A=v.ZP.div(i||(i=(0,c.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: ",";\n  width: 100%;\n  margin-top: ",";\n"])),(function(e){return e.theme.spacings.l}),(function(e){return e.theme.spacings.l}));function M(){var e=(0,z.Z)("settingsTags"),n=(0,C.Z)(),r=(0,h.useState)({value:"",error:""}),t=(0,l.Z)(r,2),i=t[0],c=t[1],u=(0,h.useState)({value:"",error:""}),v=(0,l.Z)(u,2),M=v[0],X=v[1],E=(0,h.useState)(!1),W=(0,l.Z)(E,2),B=W[0],L=W[1],I=(0,h.useState)(!1),N=(0,l.Z)(I,2),Y=N[0],q=N[1],F=(0,S.qc)(),U=(0,l.Z)(F,2),H=U[0],_=U[1],V=(0,h.useState)(),J=(0,l.Z)(V,2),Q=J[0],G=J[1],K=(0,h.useState)(),$=(0,l.Z)(K,2),ee=$[0],ne=$[1],re=(0,h.useState)(!1),te=(0,l.Z)(re,2),ie=te[0],ae=te[1];function oe(){return(oe=(0,s.Z)(d().mark((function e(){var r,t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==i.value.trim()){e.next=3;break}return c((function(e){return(0,o.Z)((0,o.Z)({},e),{},{error:"Tag name can't be empty."})})),e.abrupt("return");case 3:return L(!0),e.prev=4,r=i.value.trim(),t={label:r,value:(0,D.Z)(r)},e.next=9,(0,S.xH)(n.id,t);case 9:m.ZP.success("Tag successfully created."),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),(0,O.Z)(e.t0,!0),m.ZP.error("An error occured creating your tag, please try again");case 16:return e.prev=16,L(!1),c({value:"",error:""}),e.finish(16);case 20:case"end":return e.stop()}}),e,null,[[4,12,16,20]])})))).apply(this,arguments)}function se(){return(se=(0,s.Z)(d().mark((function e(){var r,t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==(null===M||void 0===M?void 0:M.value.trim())){e.next=3;break}return X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{error:"Tag name can't be empty."})})),e.abrupt("return");case 3:if(M.value!==(null===Q||void 0===Q?void 0:Q.label)){e.next=5;break}return e.abrupt("return");case 5:return L(!0),e.prev=6,r=M.value.trim(),t=(0,o.Z)((0,o.Z)({},Q),{},{label:r,value:(0,D.Z)(r)}),e.next=11,(0,S.wC)(n.id,t);case 11:m.ZP.success("Tag successfully updated."),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(6),(0,O.Z)(e.t0,!0),m.ZP.error("Unable to update tag, please try again.");case 18:return e.prev=18,L(!1),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[6,14,18,21]])})))).apply(this,arguments)}function le(){return(le=(0,s.Z)(d().mark((function e(){var r,t,i,o,s,l,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==ie){e.next=3;break}return ae(!0),e.abrupt("return");case 3:return q(!0),e.prev=4,e.next=7,(0,S.qf)(n.id,Q.id);case 7:return e.next=9,(0,S.TJ)(n.id,Q.id);case 9:if((r=e.sent).empty){e.next=35;break}i=null===r||void 0===r||null===(t=r.docs)||void 0===t?void 0:t.map((function(e){return e.data()})),o=(0,a.Z)(i),e.prev=13,o.s();case 15:if((s=o.n()).done){e.next=27;break}return l=s.value,e.prev=17,e.next=20,(0,S.Vn)(n.id,{id:l.id,tags:null===(c=l.tags)||void 0===c?void 0:c.filter((function(e){return e.id!==Q.id}))});case 20:e.next=25;break;case 22:e.prev=22,e.t0=e.catch(17),(0,O.Z)(e.t0,!0);case 25:e.next=15;break;case 27:e.next=32;break;case 29:e.prev=29,e.t1=e.catch(13),o.e(e.t1);case 32:return e.prev=32,o.f(),e.finish(32);case 35:G(void 0),m.ZP.success("Tag deleted."),null===ee||void 0===ee||ee.hide(),e.next=44;break;case 40:e.prev=40,e.t2=e.catch(4),(0,O.Z)(e.t2,!0),m.ZP.error("Unable to delete tag, please try again.");case 44:return e.prev=44,q(!1),ae(!1),e.finish(44);case 48:case"end":return e.stop()}}),e,null,[[4,40,44,48],[13,29,32,35],[17,22]])})))).apply(this,arguments)}function ce(){return(ce=(0,s.Z)(d().mark((function e(n){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:G(n),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{value:n.label})})),null===ee||void 0===ee||ee.show();case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(){G(void 0),X({value:"",error:""})}return(0,h.useEffect)((function(){return null===ee||void 0===ee||ee.on("hide",ue),function(){null===ee||void 0===ee||ee.off("hide",ue)}}),[ee]),(0,T.jsxs)(x.ZP,(0,o.Z)((0,o.Z)({},e),{},{children:[(0,T.jsxs)(P.Z,{id:"tag-edit",title:"Edit tag",reference:ne,children:[(0,T.jsx)(Z.I,{fullWidth:!0,type:"text",placeholder:"Edit tag name",id:"tags-edit",value:M.value,error:M.error,disabled:B,onChange:function(e){return X({value:e.target.value,error:""})}}),(0,T.jsxs)(A,{children:[(0,T.jsxs)(j.z,{variant:"alarm",onClick:function(){return le.apply(this,arguments)},children:[Y?(0,T.jsx)(k.Z,{}):(0,T.jsx)(f.Z,{}),ie?"Are you sure?":"Delete tag"]}),(0,T.jsxs)(j.z,{variant:"normal",onClick:function(){return se.apply(this,arguments)},children:[B&&(0,T.jsx)(k.Z,{}),"Save"]})]})]}),(0,T.jsx)(R,{children:(0,T.jsx)(w.xv,{color:"greenDark",children:"Some description how tags can be used here."})}),_?(0,T.jsx)(k.Z,{}):0===(null===H||void 0===H?void 0:H.length)?(0,T.jsx)(w.xv,{as:"span",color:"beigeDark",children:"You dont have any tags created yet."}):(0,T.jsx)(b.Z,{tags:H,onSelect:function(e){return ce.apply(this,arguments)}}),(0,T.jsxs)(A,{children:[(0,T.jsx)(Z.I,{fullWidth:!0,type:"text",placeholder:"Create new tag",id:"tags-create",value:i.value,error:i.error,disabled:B,onChange:function(e){return c({value:e.target.value,error:""})}}),(0,T.jsxs)(j.z,{round:!0,onClick:function(){return oe.apply(this,arguments)},children:[(0,T.jsx)(y.Z,{children:"Create new tag"}),B?(0,T.jsx)(k.Z,{}):(0,T.jsx)(p.Z,{color:g.rS.colors.white})]})]})]}))}},4609:function(e,n,r){r.d(n,{Z:function(){return o}});var t=r(5861),i=r(7757),a=r.n(i);function o(){return s.apply(this,arguments)}function s(){return s=(0,t.Z)(a().mark((function e(){var n,r=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.length>0&&void 0!==r[0]?r[0]:2e3,e.abrupt("return",new Promise((function(e){return setTimeout(e,n)})));case 2:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},812:function(e,n,r){function t(e){var n={type:"unknown",message:"Something went wrong, please try again."};switch(e.code){case"auth/email-already-in-use":case"auth/invalid-email":case"auth/user-not-found":n.type="email",n.message=e.message;break;case"auth/weak-password":n.type="password",n.message=e.message;break;case"auth/wrong-password":n.type="password",n.message="Your password seems wrong. Please re-check."}return n}r.d(n,{Z:function(){return t}})}}]);
//# sourceMappingURL=settings.3f7b09a1.chunk.js.map