class VDom{constructor(e,t={},n=[]){this.tag=e,this.props=Object.assign({},t,{children:n})}clone(e=this.tag,t=this.props,n=this.props.children){return new VDom(e,t,n)}emit(e,...t){this.prevent||("remove"===e&&(this.prevent=!0),"function"==typeof this.props[e]&&this.props[e](...t))}}function h(e,t,...n){return new VDom(e||"",t,concat(n))}function isVDom(e){return"object"==typeof e&&e instanceof VDom}function concat(e,t=[]){for(let n=0;n<e.length;n++){let o=e[n];Array.isArray(o)?concat(o,t):t.push(isVDom(o)?o:new VDom("",{},[o||""]))}return t}function create(e,t){return t?document.createElementNS("http://www.w3.org/2000/svg",e):e?document.createElement(e):document.createTextNode("")}function root(e){return e.shadowRoot||e}function remove(e,t){root(e).removeChild(t)}function append(e,t){root(e).appendChild(t)}function replace(e,t,n){root(e).replaceChild(t,n)}const MASTER="__master__",REMOVE="__remove__",IGNORE=["children","create","remove","context","state"];function render(e,t,n,o,r){return diff(t,n,e,o,r)}function getMaster(e){return e&&e[MASTER]||{}}function createComponent(e,t,n){return function o(r,i,s,c){return i=render(e(s,{set:e=>{i[REMOVE]||(t=e,i=o(r,i,s,c))},get:()=>t},c),r,i,c,n)}}function diff(e,t,n,o={},r){n=isVDom(n)?n:new VDom("",{},[n||""]);let i,s,c=t,{prev:p=new VDom,components:f=new Map}=getMaster(c),l=n.props.context;o=l?Object.assign({},o,l):o,r="svg"===n.tag||r,"function"==typeof n.tag&&(i=n.tag,f.has(i)||f.set(i,createComponent(i,n.props.state,r)),n=n.clone(p.tag||(r?"g":"")));let a=n.props.children;if(n.tag!==p.tag){if(c=create(n.tag,r),t){if(!i&&""!==n.tag){let e=a.length;for(;t.firstChild&&e--;)append(c,t.firstChild)}replace(e,c,t),emitRemove(t)}else append(e,c);s=!0,n.emit("create",c)}if(i&&f.has(i))return f.get(i)(e,c,n.props,o);if(n.tag){if(s||!1!==n.emit("update",c,p.props,n.props)){diffProps(c,p.props,n.props,r);let e=Array.from(root(c).childNodes),t=Math.max(e.length,a.length);for(let n=0;n<t;n++)a[n]?diff(c,e[n],a[n],o,r):e[n]&&(emitRemove(e[n]),remove(c,e[n]))}}else p.props.children[0]!==n.props.children[0]&&(c.textContent=String(n.props.children[0]));return c[MASTER]={prev:i?getMaster(c).prev:n,components:f},n.emit(s?"created":"updated",c),c}function diffProps(e,t,n,o){let r=Object.keys(t),i=Object.keys(n).filter(e=>-1===r.indexOf(e)),s=r.concat(i);for(let r=0;r<s.length;r++){let i=s[r];if(t[i]===n[i]||IGNORE.indexOf(i)>-1)continue;let c="function"==typeof t[i],p="function"==typeof n[i];if(c||p)c&&e.removeEventListener(i,t[i]),p&&e.addEventListener(i,n[i]);else if(i in n)if(i in e&&!o||o&&"style"===i)if("style"===i)if("object"==typeof n[i]){let o=t[i]||{},r=n[i];for(let t in r)o[t]!==r[t]&&("-"===t[0]?e.setProperty(t,r[t]):e.style[t]=r[t]);n[i]=Object.assign({},o,r)}else e.style.cssText=n[i];else e[i]=n[i];else o?e.setAttributeNS(null,i,n[i]):e.setAttribute(i,n[i]);else e.removeAttribute(i)}}function emitRemove(e){let{prev:t=new VDom}=getMaster(e),n=e.childNodes;e[REMOVE]=!0,t.emit("remove",e);for(let e=0;e<n.length;e++)emitRemove(n[e]);t.emit("removed",e)}export{render,h,isVDom};
//# sourceMappingURL=orby.m.js.map
