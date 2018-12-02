var t=function(t,e,n){void 0===e&&(e={}),void 0===n&&(n=[]),this.tag=t,this.props=Object.assign({},e,{children:n})};function e(e,n){for(var r=[],o=arguments.length-2;o-- >0;)r[o]=arguments[o+2];return new t(e||"",n,function t(e,n){void 0===n&&(n=[]);for(var r=0;r<e.length;r++){var o=e[r];Array.isArray(o)?t(o,n):n.push(o)}return n}(r))}function n(t){return t.shadowRoot||t}function r(t,e){t.removeChild(e)}function o(t,e){t.appendChild(e)}t.prototype.clone=function(e,n,r){return void 0===e&&(e=this.tag),void 0===n&&(n=this.props),void 0===r&&(r=this.props.children),new t(e,n,r)},t.prototype.emit=function(t){for(var e,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];this.prevent||("remove"===t&&(this.prevent=!0),"function"==typeof this.props[t]&&(e=this.props)[t].apply(e,n))};var i={delay:1},s="__components__",a="__previous__",p="__remove__",c="__listeners__",f=/^(context|state|children|(create|update|remove)(d){0,1}|xmlns)$/;function d(t,e,r,o,i){return l(n(e),r,t,o,i)}function v(t,e,n,r,o,s){var a=this;this.tag=t,this.state=e,this.context={},this.prevent=!1,this.render=function(t,e){return e=l(t,e,a.tag(a.props,{set:function(n){a.state=n,e[p]||a.prevent||(a.prevent=!0,setTimeout(function(){a.render(t,e),a.prevent=!1},i.delay))},get:function(){return a.state}},a.context),a.context,n,r+1,o+1,s)}}function l(e,i,d,u,h,g,m,y){void 0===u&&(u={}),void 0===g&&(g=0),void 0===m&&(m=0),void 0===y&&(y={});var _,w,x=i&&i[a]||new t,b=i&&i[s]||y,A=i;if(x===d)return A;d instanceof t||(d=new t("",{},d));var C=d.props.children,j=d.props.context;if(u=j?Object.assign({},u,j):u,h="svg"===d.tag||h,b[m]&&b[m].tag!==d.tag&&delete b[m],"function"==typeof d.tag&&((b[m]||{}).tag!==d.tag&&(b[m]=new v(d.tag,d.props.state,h,g,m,b)),w=b[m],d=d.clone(x.tag||(h?"g":""))),x.tag!==d.tag){if(A=function(t,e){return e?document.createElementNS("http://www.w3.org/2000/svg",t):t?document.createElement(t):document.createTextNode("")}(d.tag,h),i){if(!w&&d.tag)for(var E=C.length;i.firstChild&&E--;)o(A,i.firstChild);!function(t,e,n){t.replaceChild(e,n)}(e,A,i),!w&&x.tag&&function e(n){var r=n&&n[MASTER]||{};var o=r.prev;void 0===o&&(o=new t);var i=n.childNodes;n[p]=!0;o.emit("remove",n);for(var s=0;s<i.length;s++)e(i[s]);o.emit("removed",n)}(i)}else o(e,A);_=!0,d.emit("create",A)}if(w)return w.props=d.props,w.context=u,g&&w.prevent?A:w.render(e,A);if(d.tag){if(_||!1!==d.emit("update",A,x.props,d.props)){!function(t,e,n,r){for(var o=Object.keys(e),i=Object.keys(n),s=o.concat(i),a={},p=function(o){var i=s[o];if(!a[i]&&e[i]!==n[i]&&!f.test(i))if(a[i]=!0,"scoped"===i&&"attachShadow"in t)t.attachShadow({mode:n[i]?"open":"closed"});else{var p="function"==typeof e[i],d="function"==typeof n[i];if(p||d)!d&&p&&t.removeEventListener(i,t[c][i][0]),d&&(p||(t[c]=t[c]||{},t[c][i]||(t[c][i]=[function(e){t[c][i][1](e)}]),t.addEventListener(i,t[c][i][0])),t[c][i][1]=n[i]);else if(i in n)if(i in t&&!r||r&&"style"===i)if("style"===i)if("object"==typeof n[i]){var v=e[i]||{},l=n[i];for(var u in l)v[u]!==l[u]&&("-"===u[0]?t.style.setProperty(u,l[u]):t.style[u]=l[u])}else t.style.cssText=n[i];else t[i]=n[i];else r?t.setAttributeNS(null,i,n[i]):t.setAttribute(i,n[i]);else t.removeAttribute(i)}},d=0;d<s.length;d++)p(d)}(A,x.tag===d.tag?x.props:{},d.props,h);for(var N=d.props.scoped?n(A):A,S=N.childNodes,O=0,T=Math.max(C.length,S.length),k=0;k<T;k++){var L=k-O;k in C?l(N,S[L],C[k],h):(r(N,S[L]),O++)}}}else x.props.children!==d.props.children&&(A.textContent=d.props.children);return A[a]=d,A[s]=b,d.emit(_?"created":"updated",A),A}export{d as render,e as h,i as options};
//# sourceMappingURL=orby.m.js.map
