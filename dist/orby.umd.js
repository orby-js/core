!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e["@orby/core"]={})}(this,function(e){"use strict";class t{constructor(e,t={},n=[]){this.tag=e,this.props=Object.assign({},t,{children:n})}clone(e=this.tag,n=this.props,r=this.props.children){return new t(e,n,r)}emit(e,...t){this.prevent||("remove"===e&&(this.prevent=!0),"function"==typeof this.props[e]&&this.props[e](...t))}}function n(e){return"object"==typeof e&&e instanceof t}function r(e){return e.shadowRoot||e}function o(e,t){r(e).removeChild(t)}function i(e,t){r(e).appendChild(t)}let s=1e3/120,c="__master__",p="__remove__",f="__listeners__",l=["children","create","created","remove","removed","update","updated","context","state","static"];function u(e){return e&&e[c]||{}}function a(e,t,n,r,o,i){let c;return{tag:e,render:function f(l,u,a,g){let h=!0;return u=d(l,u,e(a,{set:e=>{t=e,u[p]||c||h||(c=!0,function(e){setTimeout(e,s)}(()=>{f(l,u,a,g),c=!1}))},get:()=>t},g),g,n,r,o+1,i),h=!1,u},get prevent(){return c}}}function d(e,s,p,h={},m,v=0,y=0,_={}){p=n(p)?p:new t("",{},[p||""]);let b,w,x=s,{prev:j=new t,components:O=_}=u(x),A=p.props.context;if(h=A?Object.assign({},h,A):h,m="svg"===p.tag||m,j===p||j.tag&&p.tag&&p.props.static)return x;O[y]&&O[y].tag!==p.tag&&delete O[y],"function"==typeof p.tag&&((O[y]||{}).tag!==p.tag&&(O[y]=a(p.tag,p.props.state,m,v,y,O)),b=O[y],p=p.clone(j.tag||(m?"g":"")));let C=p.props.children;if(p.tag!==j.tag){if(x=function(e,t){return t?document.createElementNS("http://www.w3.org/2000/svg",e):e?document.createElement(e):document.createTextNode("")}(p.tag,m),s){if(!b&&""!==p.tag){let e=C.length;for(;s.firstChild&&e--;)i(x,s.firstChild)}!function(e,t,n){r(e).replaceChild(t,n)}(e,x,s),g(s)}else i(e,x);w=!0,p.emit("create",x)}if(b)return v&&b.prevent?x:b.render(e,x,p.props,h);if(p.tag){if(w||!1!==p.emit("update",x,j.props,p.props)){!function(e,t,n,r){let o=Object.keys(t),i=Object.keys(n).filter(e=>-1===o.indexOf(e)),s=o.concat(i);for(let o=0;o<s.length;o++){let i=s[o];if(l.indexOf(i)>-1||t[i]===n[i])continue;let c="function"==typeof t[i],p="function"==typeof n[i];if(c||p)!p&&c&&e.removeEventListener(i,e[f][i][0]),p&&(c||(e[f]=e[f]||{},e[f][i]||(e[f][i]=[t=>{e[f][i][1](t)}]),e.addEventListener(i,e[f][i][0])),e[f][i][1]=n[i]);else if(i in n)if(i in e&&!r||r&&"style"===i)if("style"===i)if("object"==typeof n[i]){let r=t[i]||{},o=n[i];for(let t in o)r[t]!==o[t]&&("-"===t[0]?e.setProperty(t,o[t]):e.style[t]=o[t])}else e.style.cssText=n[i];else e[i]=n[i];else r?e.setAttributeNS(null,i,n[i]):e.setAttribute(i,n[i]);else e.removeAttribute(i)}}(x,p.tag===j.tag?j.props:{},p.props,m),v++;let e=Array.from(r(x).childNodes),t=Math.max(e.length,C.length);for(let n=0;n<t;n++)C[n]?d(x,e[n],C[n],h,m,v):e[n]&&(g(e[n]),o(x,e[n]))}}else j.props.children[0]!==p.props.children[0]&&(x.textContent=String(p.props.children[0]));return x[c]={prev:p,components:O},p.emit(w?"created":"updated",x),x}function g(e){let{prev:n=new t}=u(e),r=e.childNodes;e[p]=!0,n.emit("remove",e);for(let e=0;e<r.length;e++)g(r[e]);n.emit("removed",e)}e.render=function(e,t,n,r,o){return d(t,n,e,r,o)},e.h=function(e,r,...o){return new t(e||"",r,function e(r,o=[]){for(let i=0;i<r.length;i++){let s=r[i];Array.isArray(s)?e(s,o):o.push(n(s)?s:new t("",{},[s||""]))}return o}(o))},e.isVDom=n,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=orby.umd.js.map
