"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9725],{28368:function(e,t,r){var n;r.d(t,{j:function(){return o}});let o=((n={}).Starter="starter",n.Reply="reply",n)},7937:function(e,t,r){function n(e){return null!=e}r.d(t,{BB:function(){return u},He:function(){return d},PO:function(){return a},Ry:function(){return m},Um:function(){return s},WU:function(){return f},aS:function(){return c},lm:function(){return n},r3:function(){return o},sw:function(){return p}});let o=(e,t)=>e.includes(t),i=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(null==e)return r;let n=Array.isArray(e)?e:[e];return t?n.map(t):n},a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return r=>i(r,e,t)},l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"object"!=typeof e||null==e||Array.isArray(e)?t:e},s=(e,t)=>{let r=l(e),n={};for(let e in t)n[e]=t[e](r?.[e]);return n},c=e=>t=>s(t,e),u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"object"==typeof e||null==e?t:String(e)},d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if("object"==typeof e||null==e)return t;let r=Number(e);return isNaN(r)?t:r},p=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("boolean"==typeof e)return e;if("number"==typeof e){if(0===e)return!1;if(1===e)return!0}if("string"==typeof e){let t=e.toLowerCase();if("false"===t)return!1;if("true"===t)return!0}return t},f=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t[0];return o(t,e)?e:r},m=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e[0];return r=>f(r,e,t)}},59725:function(e,t,r){r.d(t,{B0:function(){return v},EF:function(){return m},Yt:function(){return g},k$:function(){return p},m0:function(){return j},zf:function(){return x}});var n=r(71522),o=r(19841),i=r(15478),a=r(93951),l=r(31498),s=r(28146),c=r(25162),u=r(57456),d=r(651);let p=e=>{let{iconName:t,className:r,notice:n,size:i="medium"}=e,a=c.nI;return"user"===t&&(a=s.tBG),(0,d.jsxs)(y,{className:(0,o.default)(r,f[i]),children:[(0,d.jsx)(a,{className:h[i]}),n&&("warning"===n||"danger"===n)&&(0,d.jsx)(b,{$type:n,children:"!"})]})},f={small:"h-[18px] w-[18px]",gizmo:"h-8 w-8",gizmoConversation:"h-6 w-6",medium:"h-8 w-8",workspaceMedium:"h-9 w-9",large:"h-12 w-12",workspaceAvatarPreview:"h-24 w-24",cover:"h-[234px] w-[234px]"},m={small:18,gizmo:32,gizmoConversation:24,medium:32,workspaceMedium:36,large:48,workspaceAvatarPreview:96,cover:234},h={small:"icon-xs",medium:"icon-md",workspaceMedium:"icon-md",large:"icon-lg",workspaceAvatarPreview:"icon-workspace-avatar-preview",cover:"icon-cover",gizmo:"icon-md",gizmoConversation:"icon-sm"},g=e=>{let{user:t,notice:r}=e,n=r&&("warning"===r||"danger"===r)&&(0,d.jsx)(b,{$type:r,children:"!"});if(t?.picture)return(0,d.jsxs)("div",{className:(0,o.default)("relative flex",e.customStyle?e.className:""),children:[(0,d.jsx)("img",{src:t.picture,alt:"User",width:e.customStyle?e.size:m[e.size],height:e.customStyle?e.size:m[e.size],className:e.customStyle?"":e.roundedStyle??"rounded-sm",referrerPolicy:"no-referrer"}),n]});let i=(t?.name??"").split(" ").map(e=>e[0]).join("");return(0,d.jsx)("div",{className:"overflow-hidden rounded-full",style:e.customStyle?{width:e.size,height:e.size}:{width:m[e.size],height:m[e.size]},children:(0,d.jsxs)("div",{className:(0,o.default)("relative flex items-center justify-center bg-blue-300 text-white",e.customStyle?e.className:(0,o.default)("gizmo"===e.size?"h-7 w-7 overflow-hidden rounded-full text-xs":"h-full w-full","small"===e.size||"gizmo"===e.size||"gizmoConversation"===e.size?"text-xs":"text-sm")),children:[i?(0,d.jsx)("div",{className:"indent-[0.1em] tracking-widest",children:i}):(0,d.jsx)(s.tBG,{className:e.customStyle?"h-4/5 w-4/5":h[e.size]}),n]})})};function v(e){let{src:t,size:r="large",alt:n}=e;return(0,d.jsx)(d.Fragment,{children:t?(0,d.jsx)("img",{src:t,className:"inline rounded-full bg-token-main-surface-secondary",alt:n??"",width:m[r],height:m[r]}):(0,d.jsx)(c.Wv,{width:m[r].toString(),height:m[r].toString()})})}function x(e){let{className:t,iconSize:r="medium",notice:i,workspace:s}=e,c=(0,a.t)();s??=c;let u=s?.isPersonalAccount(),p=(0,l.aF)();return(0,d.jsx)(n.ZP,{children:(0,d.jsx)("div",{className:(0,o.default)("flex items-center justify-center overflow-hidden rounded-full",t),children:!s||u&&void 0!==p?(0,d.jsx)(g,{user:p,size:r,notice:i}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(v,{src:s.data.profilePictureUrl,size:r}),i&&(0,d.jsx)(b,{$type:i,children:"!"})]})})})}let w=i.Z.div`relative p-1 rounded-sm h-9 w-9 flex items-center justify-center`,y=e=>{let{className:t,children:r}=e;return(0,d.jsx)(w,{className:t,children:r})},b=i.Z.span`
  absolute w-4 h-4 rounded-full text-[10px] text-white flex  justify-center items-center right-0 top-[20px] -mr-2 border border-white
  ${e=>{let{$type:t}=e;return"warning"===t&&"bg-orange-500 text-white"}}
  ${e=>{let{$type:t}=e;return"danger"===t&&"bg-red-500 text-white"}}
`;function j(e){let{name:t,size:r,className:n,initialsCount:i=1}=e,a="";return a=1===i?t.charAt(0):t.split(" ").slice(0,2).map(e=>e[0]).join(""),(0,d.jsx)("div",{className:(0,o.default)("overflow-hidden rounded-full pt-[4.5px] text-center text-[9px] font-extralight text-white",n),style:{backgroundColor:function(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)+t^e.charCodeAt(r);return u.e_[Math.abs(t)%u.e_.length]}(t),width:m[r]+"px",height:m[r]+"px"},children:a})}},71522:function(e,t,r){r.d(t,{Md:function(){return s}});var n=r(38482),o=r.n(n);r(92379);var i=r(651);let a=e=>{let{children:t}=e;return(0,i.jsx)(i.Fragment,{children:t})},l=o()(()=>Promise.resolve(a),{ssr:!1});t.ZP=l;let s=l},17004:function(e,t,r){r.d(t,{E:function(){return i},P:function(){return o}});var n=r(92379);let o=(0,n.createContext)({isEmbeddedInFocusedView:!1});function i(){return(0,n.useContext)(o).isEmbeddedInFocusedView}},55357:function(e,t,r){r.d(t,{B:function(){return a},X:function(){return i}});var n=r(16757),o=r(7937);let i=e=>(0,o.r3)([n.OL.GizmoMagicCreate,n.OL.GizmoTest],e?.kind),a=e=>(0,o.r3)([n.OL.GizmoInteraction,n.OL.GizmoMagicCreate,n.OL.GizmoTest],e?.kind)},2319:function(e,t,r){r.d(t,{D:function(){return o},Q:function(){return i}});var n=r(92379);let o=n.createContext({mode:void 0,getGizmoId:void 0}),i=()=>(0,n.useContext)(o)},8643:function(e,t,r){r.d(t,{b:function(){return l},l:function(){return s}});var n=r(83271),o=r(92379),i=r(651);let a=(0,o.createContext)(null);function l(e){let{children:t}=e;return(0,i.jsx)(a.Provider,{value:{store:(0,o.useRef)((0,n.rd)()).current},children:t})}function s(){let e=(0,o.useContext)(a);if(!e)throw Error("usePromptTextareaContext must be used within a PromptTextareaProvider");return e}},83271:function(e,t,r){r.d(t,{Tk:function(){return u},cq:function(){return d},j9:function(){return p},rd:function(){return m}});var n,o,i,a=r(92379),l=r(68810),s=r(73177),c=r(95267);let u=((n={}).Header="Header",n.HeaderTop="HeaderTop",n.HeaderBottom="HeaderBottom",n),d=((o={}).Box="Box",o.ItemActions="ItemActions",o.PromptTextareaAction="PromptTextareaAction",o.BannerTermsDisclaimer="BannerTermsDisclaimer",o.BannerSignup="BannerSignup",o.BannersRateLimit="BannersRateLimit",o.BannerSidekickAnnouncement="BannerSidekickAnnouncement",o.BannerMemoryFull="BannerMemoryFull",o.ParagenControls="ParagenControls",o),p=((i={}).DallePromptControls="DallePromptControls",i),f={contentAreas:{[u.Header]:{dimensions:null,contentId:null},[u.HeaderTop]:{dimensions:null,contentId:null},[u.HeaderBottom]:{dimensions:null,contentId:null}},sharedProps:null};function m(){let e=(0,l.Ue)((0,s.XR)((0,c.n)(()=>f)));function t(t,r){e.setState(e=>{e.contentAreas[t].dimensions=r})}return{reset:()=>e.setState(f),useContentAreaId:t=>e(e=>e.contentAreas[t].contentId),useContentAreaApi:t=>({set:(0,a.useCallback)(r=>e.setState(e=>{e.contentAreas[t].contentId=r}),[t]),remove:(0,a.useCallback)(()=>{e.setState(e=>{e.contentAreas[t].contentId=null})},[t])}),useContentAreaDimensions:(t,r)=>e(e=>r(e.contentAreas[t].dimensions)),useContentAreaResizeObserver(e,r){(0,a.useEffect)(()=>{if(r.current){t(e,r.current.getBoundingClientRect());let n=new ResizeObserver(r=>{for(let n of r)t(e,n.contentRect)});return n.observe(r.current),()=>{n.disconnect(),t(e,null)}}},[r,e])},useIsHeaderContentAreaPopulated:()=>e(e=>!!e.contentAreas[u.HeaderTop].contentId||!!e.contentAreas[u.HeaderBottom].contentId),useSharedProps:t=>e(e=>t?t(e.sharedProps):e.sharedProps),useSetSharedProps:()=>(0,a.useCallback)(t=>{e.setState(e=>{e.sharedProps=t})},[])}}},50820:function(e,t,r){r.d(t,{f:function(){return c}});var n=r(92745),o=r(31438),i=r(90215),a=r(92379),l=r(8643),s=r(70879);function c(){let{store:e}=(0,l.l)(),t=e.useSharedProps();return(0,a.useCallback)(async(e,r,a)=>{if(!t)return;let{clientThreadId:l,currentLeafId:c,onCreateNewCompletion:u,onResetState:d,conversationMode:p}=t;o.vm.hideThreadHeader();let f=`${c}-nextPrompt`;await u({promptId:f,content:(0,i.bf)(e),eventMetadata:{eventSource:"mouse"},completionMetadata:{suggestions:r,conversationMode:p??n.iN.getConversationMode(l)},messageMetadata:{is_starter_prompt:!0,suggestion_type:e.type}});let m=n.tQ.getTree(l).getMessageId(f);d(),(0,i.wj)(e,a,m),(0,s.go)()},[t])}},70879:function(e,t,r){r.d(t,{N:function(){return a},go:function(){return i},hB:function(){return o}});var n=r(13249);let o="prompt-textarea";function i(){document.getElementById(o)?.focus()}let a={getAndReset:(e,t)=>{let r=n.m.getItem(n.F.RestoreMessageAfterOauthRedirect);return(n.m.removeItem(n.F.RestoreMessageAfterOauthRedirect),!r||r.userId!==e||t!==r.serverThreadId||Date.now()>r.expiresAt)?null:r},set:(e,t,r)=>{let o={userId:e,serverThreadId:t,inputText:r,expiresAt:Date.now()+6e4};n.m.setItem(n.F.RestoreMessageAfterOauthRedirect,o)}}},57456:function(e,t,r){r.d(t,{e_:function(){return ej},ch:function(){return ew},pF:function(){return eP},cS:function(){return eS}});var n,o,i,a,l,s,c,u,d,p,f,m,h,g,v,x,w,y,b,j,k,O,S,P,E,C,_,M=r(98601),A=r(52088),L=r(28146),z=r(50820),N=r(25905),B=r(54097),I=r(35367),R=r(9026),H=r(92745),T=r(86025),W=r(15913),D=r(90215),F=r(45120),$=r(19841),G=r(21389),Z=r(88600),U=r(92379),q=r(62984),Q=r(25162);function V(){return(V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var J=e=>U.createElement("svg",V({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),n||(n=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"m9.65 13.026-3.287 1.19A2 2 0 0 1 3.8 13.027l-.342-.934.597-1.275L1.75 7.419l2.348-.85 2.564 1.484a2 2 0 0 0 1.689.15l8.512-3.083c.291-.106.603-.142.912-.107l2.833.325a1.842 1.842 0 0 1 .422 3.565l-5.276 1.911m.598-1.275L13 14.5l-2.817 1.02-.343-3.622"})),o||(o=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:2,d:"M3 19h18"})));function K(){return(K=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var Y=e=>U.createElement("svg",K({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),i||(i=U.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M13.997 3.39A2.5 2.5 0 0 1 17.2 2.103l2.203.882a2.5 2.5 0 0 1 1.342 3.369L19.063 10H20a1 1 0 0 1 1 1v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a1 1 0 0 1 .992-1l-.149-.101-.03-.022c-1.254-.924-1.016-2.864.425-3.458l2.12-.874.724-2.176c.492-1.479 2.41-1.851 3.42-.665L11.99 4.45l1.521.01zm1.513 1.506a2 2 0 0 1 .461 2.618l-1.144 1.861v.045a1.3 1.3 0 0 0 .044.278 1 1 0 0 1 .047.302h1.942l2.07-4.485a.5.5 0 0 0-.268-.673l-2.203-.882a.5.5 0 0 0-.641.258zM12.889 10a3.3 3.3 0 0 1-.06-.499c-.01-.236-.004-.69.237-1.081l1.202-1.954-2.293-.016a2 2 0 0 1-1.51-.704L8.98 4l-.725 2.176A2 2 0 0 1 7.12 7.394L5 8.267l2.063 1.407c.129.087.23.2.303.326zM5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7zm4.5 2.5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1",clipRule:"evenodd"})));function X(){return(X=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var ee=e=>U.createElement("svg",X({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),a||(a=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 16.584a5.001 5.001 0 0 1 1.326-9.539A6 6 0 0 1 18 9a4 4 0 0 1 2.5 7.123M9.25 16l-2.5 5M13.25 16l-2.5 5M17.25 16l-2.5 5"})));function et(){return(et=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var er=e=>U.createElement("svg",et({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),l||(l=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"m4.5 17.5 3.069-3.118a2 2 0 0 1 2.783-.066L16.5 20"})),s||(s=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 12h-.62a3 3 0 0 1-2.278-1.048l-4.204-4.904A3 3 0 0 0 9.62 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"})),c||(c=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 5h-.62a3 3 0 0 0-2.278 1.048L14 8.5"})),u||(u=U.createElement("circle",{cx:8.5,cy:9.5,r:1.5,fill:"currentColor"})),d||(d=U.createElement("path",{fill:"currentColor",d:"M18 14v-4a.5.5 0 0 1 .8-.4l2.667 2a.5.5 0 0 1 0 .8l-2.667 2a.5.5 0 0 1-.8-.4M18 7V3a.5.5 0 0 1 .8-.4l2.667 2a.5.5 0 0 1 0 .8l-2.667 2A.5.5 0 0 1 18 7"})));function en(){return(en=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var eo=e=>U.createElement("svg",en({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),p||(p=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15.5 14v3"})),f||(f=U.createElement("rect",{width:14,height:18,x:5,y:3,stroke:"currentColor",strokeWidth:2,rx:2})),m||(m=U.createElement("circle",{cx:8.5,cy:14,r:1,fill:"currentColor"})),h||(h=U.createElement("circle",{cx:8.5,cy:17,r:1,fill:"currentColor"})),g||(g=U.createElement("circle",{cx:12,cy:17,r:1,fill:"currentColor"})),v||(v=U.createElement("circle",{cx:12,cy:14,r:1,fill:"currentColor"})),x||(x=U.createElement("circle",{cx:8.5,cy:11,r:1,fill:"currentColor"})),w||(w=U.createElement("circle",{cx:12,cy:11,r:1,fill:"currentColor"})),y||(y=U.createElement("circle",{cx:15.5,cy:11,r:1,fill:"currentColor"})));function ei(){return(ei=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var ea=e=>U.createElement("svg",ei({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),b||(b=U.createElement("circle",{cx:12,cy:10.5,r:7.5,stroke:"currentColor",strokeWidth:2})),j||(j=U.createElement("path",{stroke:"currentColor",strokeLinejoin:"round",strokeWidth:2,d:"M8 17v5l4-1 4 1v-5"})));function el(){return(el=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var es=e=>U.createElement("svg",el({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),k||(k=U.createElement("path",{stroke:"currentColor",strokeWidth:2,d:"M17 8h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2m0 0H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2Z"})),O||(O=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 10h6M7 13h3"})));function ec(){return(ec=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var eu=e=>U.createElement("svg",ec({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),S||(S=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:2,d:"M6 5H5a2 2 0 0 0-2 2v1m15-3h1a2 2 0 0 1 2 2v1m0 8v1a2 2 0 0 1-2 2h-1M6 19H5a2 2 0 0 1-2-2v-1M8 10h8M8 14h6"})));function ed(){return(ed=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var ep=e=>U.createElement("svg",ed({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),P||(P=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 18V7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"})),E||(E=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4"})));function ef(){return(ef=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}var em=e=>U.createElement("svg",ef({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24"},e),C||(C=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:2,d:"M3 6h7M3 10h4"})),_||(_=U.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13.428 17.572 20.5 10.5a2.828 2.828 0 1 0-4-4l-7.072 7.072a2 2 0 0 0-.547 1.022L8 19l4.406-.881a2 2 0 0 0 1.022-.547"}))),eh=r(651);let eg=["promptStarters","onSelectStarterPrompt","isSendBlocked","clientThreadId","isTwoLine"];function ev(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function ex(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ev(Object(r),!0).forEach(function(t){(0,M.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ev(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function ew(e){let{clientThreadId:t}=e,{isUnauthenticated:r}=(0,T.u)(),n=!r,o=(0,H.Zz)(t),i=(0,H.Kt)(t),a=(0,R.ep)(),l=(0,W.BL)(),s=(0,z.f)(),c=(0,I.R)(t),{promptStarters:u,isSuccess:d,isError:p}=(0,B.P)(o&&!i,t,l?2:4),f=u&&u?.length>0,m=d&&f&&n&&!c,{layer:h}=(0,F.AH)("4031588851"),g=h.get("is_two_line",!1);return(0,eh.jsx)(eh.Fragment,{children:(0,eh.jsx)(G.M,{children:(p||d)&&(0,eh.jsxs)(eh.Fragment,{children:[(0,eh.jsx)(Q.nI,{className:`h-12 w-12 ${n?"":"max-sm:hidden"}`}),m&&(0,eh.jsx)(eb,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},promptStarters:u,onSelectStarterPrompt:s,isSendBlocked:a,clientThreadId:t,isTwoLine:g}),!f&&n&&!c&&(0,eh.jsx)(ey,{}),c,p&&n&&(0,eh.jsx)(ey,{})]})})})}function ey(){return(0,eh.jsx)("div",{className:"mt-7 text-3xl",children:(0,eh.jsx)(q.Z,{id:"24tuqq",defaultMessage:"Hi, how can I help?"})})}function eb(e){let{promptStarters:t,onSelectStarterPrompt:r,isSendBlocked:n,clientThreadId:o,isTwoLine:i}=e,a=(0,A.Z)(e,eg);return(0,U.useEffect)(()=>{(0,D.SB)(t,o)},[o]),(0,eh.jsx)(eh.Fragment,{children:i?(0,eh.jsx)(Z.E.div,ex(ex({},a),{},{className:"absolute bottom-6 w-full px-4",children:(0,eh.jsx)(N.N,{children:(0,eh.jsx)(eP,{starterPrompts:t,onSelectStarterPrompt:r,disabled:n})})})):(0,eh.jsx)(Z.E.div,ex(ex({},a),{},{children:(0,eh.jsx)(eS,{starterPrompts:t,onSelectStarterPrompt:r,disabled:n})}))})}let ej=["#cb8bd0","#e2c541","#ed6262","#76d0eb"];function ek(e){let{starterPrompt:t}=e;if(null==t.category)return null;let r=function(e){switch(e){case"genius":return L.cvK;case"idea":default:return L.WGR;case"data-vis":return L.eJP;case"code":return L.FxN;case"dalle":return er;case"local":return L.tEx;case"math":return eo;case"misc":return Y;case"news":return es;case"teach-or-explain":return L.bsk;case"read-or-analyze":return eu;case"rank-or-rate":return ea;case"current-event":case"browse":return L.W1M;case"shop":return ep;case"travel":return J;case"weather":return ee;case"write":return em;case"vision":return L.tEF;case"file-upload-document":return L.h3O}}(t.category);return(0,eh.jsx)(r,{className:"icon-md",style:{color:function(e){switch(e){case"write":case"shop":return ej[0];case"idea":case"travel":return ej[1];case"code":case"vision":return ej[2];default:return ej[3]}}(t.category)}})}let eO=/\s/;function eS(e){let{starterPrompts:t,onSelectStarterPrompt:r,disabled:n}=e,o=t.map((e,o)=>{let i=e.oneliner??e.title;""===i&&(i=e.body);let a=eO.test(i);return(0,eh.jsxs)("button",{className:"relative flex w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed",disabled:n,onClick:()=>r(e,t,o),children:[(0,eh.jsx)(ek,{starterPrompt:e}),(0,eh.jsx)("div",{className:(0,$.default)("line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500",a?"break-word":"break-all"),children:i})]},e.id??o)});if(o.length>2){let e=Math.floor(o.length/2);o=[o.slice(0,e),o.slice(e)].map((e,t)=>(0,eh.jsx)("div",{className:"flex max-w-3xl flex-wrap items-stretch justify-center gap-4",children:e},t))}return(0,eh.jsx)("div",{className:"mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4",children:o})}function eP(e){let{starterPrompts:t,onSelectStarterPrompt:r,disabled:n}=e,o=t.map((e,o)=>(0,eh.jsx)("button",{className:"relative whitespace-nowrap rounded-2xl border border-token-border-light px-4 py-2 text-start align-top text-[15px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed",disabled:n,onClick:()=>r(e,t,o),children:(0,eh.jsxs)("div",{className:"flex flex-col overflow-hidden",children:[e.title&&(0,eh.jsx)("div",{className:"truncate font-semibold",children:e.title}),(0,eh.jsx)("div",{className:(0,$.default)("truncate font-normal",e.title?"opacity-50":""),children:e.body})]})},e.id??o)),i=Math.floor(o.length/2);return o=[o.slice(0,i),o.slice(i)].map((e,t)=>(0,eh.jsx)("div",{className:"flex flex-col gap-2",children:e},t)),(0,eh.jsx)("div",{className:"grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2",children:o})}},25905:function(e,t,r){r.d(t,{N:function(){return s},n:function(){return l}});var n=r(31438),o=r(19841),i=r(17004),a=r(651);function l(e){let{showInlineEmbeddedDisplay:t,isStaticSharedThread:r,children:n,withVerticalPadding:i,withHorizontalPadding:l}=e;return(0,a.jsx)("div",{className:(0,o.default)("text-base",i&&"py-[18px]",l&&"px-3 md:px-4",t&&!r?"ml-5":"m-auto",l&&!r&&"md:px-5"),children:n})}function s(e){let{children:t}=e,r=(0,i.E)(),l=(0,n.tN)(e=>e.isDesktopNavCollapsed);return(0,a.jsx)("div",{className:(0,o.default)("mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6",l?"md:max-w-3xl":"md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]",r&&"-mx-4"),children:t})}},54097:function(e,t,r){r.d(t,{O:function(){return f},P:function(){return m}});var n=r(16757),o=r(28368),i=r(93951),a=r(92745),l=r(84760),s=r(2721),c=r(55357),u=r(2319),d=r(39004),p=r(45334);function f(e){return(p.WQ(e)?e.promptStarters:e.gizmo.display.prompt_starters)?.map(e=>({type:o.j.Starter,title:"",body:e,prompt:e}))}function m(e,t,r){let p=(0,i.hz)(),m=(0,a.WA)(t),h=(0,d.b9)(m?.kind===n.OL.GizmoInteraction?m.gizmo_id:void 0).data,{gizmoEditorData:g,mode:v}=(0,u.Q)(),x=(0,c.B)(m),w=(0,i.t)(),y=e&&!x&&!w?.isEnterprisey(),{data:b,isLoading:j,isSuccess:k,isError:O}=(0,l.a)({queryKey:["promptStarters",t,r],queryFn:()=>s.Z.getSampledPromptStarter(r),enabled:y});return null==p?{promptStarters:[],isLoading:!0,isSuccess:!1}:"test"===v&&g?{promptStarters:f(g)??[],isLoading:!1,isSuccess:!0}:null!=h?{promptStarters:f(h),isLoading:!1,isSuccess:!0}:y?{promptStarters:b?.items.map(e=>({type:o.j.Starter,id:e.id,title:e.title,body:e.description,prompt:e.prompt,category:e.category,oneliner:e.oneliner}))??[],isLoading:j,isSuccess:k,isError:O}:{promptStarters:[],isLoading:!1,isSuccess:!0}}},35367:function(e,t,r){r.d(t,{R:function(){return s},Y:function(){return l}});var n=r(67437),o=r(66234),i=r(92379),a=r(75172);function l(e){let t=(0,o.Uq)(),{0:n,1:a}=(0,i.useState)(()=>()=>!1);return(0,i.useEffect)(()=>{t&&r.e(8682).then(r.bind(r,23123)).then(e=>a(()=>e.isModelEligibleForCa)).catch()},[t]),t&&n(e)}function s(e){let t=l((0,n.Bv)(e)),o=(0,a.Z)(),{0:s,1:c}=(0,i.useState)(null);return(0,i.useEffect)(()=>{t&&r.e(8682).then(r.bind(r,23123)).then(e=>c(()=>e.getCaEmptyState(o))).catch()},[t,o]),t?s:null}},66234:function(e,t,r){r.d(t,{D7:function(){return u},HY:function(){return d},LA:function(){return h},Uq:function(){return p}});var n=r(98601),o=r(88667),i=r(18939),a=r.n(i),l=r(85302);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=!(arguments.length>3)||void 0===arguments[3]||arguments[3],o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===t.length)return e;let r=t.filter(t=>t.end_ix<=e.length&&"tether_markdown"===t.citation_format_type&&t.metadata?.type==="webpage");for(let t=r.length-1;t>=0;t--){let n=r[t];if(n.metadata?.type!=="webpage")continue;let{start_ix:o,end_ix:i,metadata:a}=n,l=e.substring(o,i).replace(/\[(.*?)\]\((\d+)\)/g,`[$1](${a?.url})`);e=e.substring(0,o)+l+e.substring(i)}return e}(e,t),i=[...r.length>0?[]:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===t.length)return[];let r=[],n=t.filter(t=>t.end_ix<=e.length&&"tether_markdown"!==t.citation_format_type),o=(0,l.J)(e);for(let e=n.length-1;e>=0;e--){let t;let a=n[e],{start_ix:l,end_ix:s,metadata:u,invalid_reason:d}=a;if(!u?.type)continue;let p=o.slice(l,s).join("");switch(u.type){case"webpage":var i;t=c(c({},u),{},{type:"webpage",title:u.title??"",snippet:u.text??null,pub_date:null==(i=u.pub_date)?null:new Date(i).getTime()/1e3,matched_text:p,start_idx:l,end_idx:s,alt:null});break;case"file":t=c(c({},u),{},{matched_text:p,start_idx:l,end_idx:s,alt:null})}d&&(t={type:"invalid",alt:d,start_idx:l,end_idx:s,matched_text:p,invalid:!0});let f=!1;if(r.length>0){let e=r[r.length-1];m(e)===m(t)&&0===o.slice(e.end_idx,a.start_ix).join("").trim().length&&(r[r.length-1].end_idx=a.end_ix,f=!0)}!f&&t&&r.push(t)}return r}(o,t),...r];return{text:o,contentReferences:a()(i.map(e=>"file"===e.type?h(n,e):e))}}function d(){let{config:e}=(0,o.xb)("1001765573"),t=(0,o.xb)("3168246095");return e.get("ca_enabled",!1)?t.config.get("gizmo_ids",[],f):[]}function p(){return(0,o.xb)("1001765573").config.get("ca_enabled",!1)}function f(e){return Array.isArray(e)&&e.every(e=>"string"==typeof e)}function m(e){switch(e.type){case"file":return e.id;case"webpage":return e.url;case"invalid":return e.alt}}function h(e,t){let r;if(!e)return t;let n=t.name.split("\xa4");if(3!==n.length)return t;let[o,i,a]=n,l=a,s=a.lastIndexOf(".");-1!==s&&(l=a.slice(0,s));let u="Google Drive";if("gdrive"===o)r=`https://drive.google.com/file/d/${i}/view`,u="Google Drive";else if("gdoc"===o)r=`https://docs.google.com/document/d/${i}`,u="Google Docs";else{if("notion"!==o)return t;r=`https://www.notion.so/openai/${i}`,u="Notion"}return c(c({},t),{},{type:"webpage",url:r,title:l,snippet:u,pub_date:null})}},85302:function(e,t,r){r.d(t,{J:function(){return n}});function n(e){try{let t=new Intl.Segmenter("en-US",{granularity:"grapheme"}).segment(e),r=[];for(let e of t)r.push(e.segment);return r}catch{return e.split("")}}},90215:function(e,t,r){r.d(t,{Gb:function(){return d},QO:function(){return u},SB:function(){return f},bf:function(){return c},wj:function(){return p}});var n=r(28368),o=r(92745),i=r(99976),a=r(61619),l=r(82363),s=r(88667);let c=e=>{switch(e.type){case n.j.Reply:return e.text;case n.j.Starter:return e.prompt}},u=e=>e.type===n.j.Reply,d=e=>e.type===n.j.Starter,p=(e,t,r)=>{switch(s.m9.logEvent("chatgpt_prompt_use_suggestion",c(e),{index:`${t}`,type:e.type}),e.type){case n.j.Reply:i.A.logEvent(a.M.useSuggestedReply,{value:c(e),prompt_type:n.j.Reply,messageId:r});break;case n.j.Starter:i.A.logEvent(a.M.useStarterPrompt,{value:c(e),prompt_type:n.j.Starter,title:e.title,id:e.id,category:e.category,messageId:r})}},f=(e,t)=>{let r=o.tQ.getThreadCurrentLeafId(t),c=o.tQ.getTree(t).getMessageId(r);s.m9.logEvent("chatgpt_prompt_show_suggestions",`count_${e.length}`,{type:e[0].type}),e.every(u)?i.A.logEvent(a.M.showSuggestedReplies,{prompt_count:e.length,prompt_type:n.j.Reply,client_thread_id:t,suggestions:e.map(e=>e.text),message_id:c}):e.every(d)?i.A.logEvent(a.M.showStarterPrompts,{prompt_count:e.length,prompt_type:n.j.Starter,titles:e.map(e=>e.title),ids:e.map(e=>e.id),client_thread_id:t,message_id:c}):l.U.addError("Unhandled suggestion type",{type:e[0].type})}}}]);
//# sourceMappingURL=9725-581bf2e145f98f0f.js.map