(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{39:function(e,t,a){e.exports={inputField:"EditableSpan_inputField__2zjDg",error:"EditableSpan_error__7i9XP"}},58:function(e,t,a){e.exports=a(71)},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),r=a.n(c),l=(a(63),a(35)),o=a(12),u=a(17),d=a(16),s=(a(64),a(114)),m=(a(65),a(113)),f=a(103),b=a(104);function j(e){var t=Object(n.useState)(""),a=Object(d.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(null),o=Object(d.a)(l,2),u=o[0],s=o[1],j=function(){""!==c.trim()?(e.addItem(c.trim()),r("")):s("Title required")};return i.a.createElement("div",null,i.a.createElement(m.a,{error:!!u,value:c,onChange:function(e){r(e.currentTarget.value),s(null)},onKeyPress:function(e){"Enter"===e.key&&j()},variant:"outlined",label:"Title",helperText:u}),i.a.createElement(f.a,{color:"primary",onClick:j},i.a.createElement(b.a,null)))}var O=a(39),v=a.n(O);function E(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(e.title),o=Object(d.a)(l,2),u=o[0],s=o[1],f=Object(n.useState)(!1),b=Object(d.a)(f,2),j=b[0],O=b[1];return c?i.a.createElement(m.a,{className:"".concat(v.a.inputField," ").concat(j?v.a.error:""),autoFocus:!0,value:u,onBlur:function(){""!==u?(r(!1),e.changeTitle(u)):O(!0)},onKeyPress:function(t){""!==u?"Enter"===t.key&&(r(!1),e.changeTitle(u)):O(!0)},onChange:function(e){s(e.currentTarget.value),O(!1)},placeholder:j?"please enter title":"",variant:"outlined"}):i.a.createElement("span",{onDoubleClick:function(){r(!0)}},u)}var p=a(115),h=a(106),k=a(105);function g(e){var t=e.tasks.map((function(t){var a=t.isDone?"isDone":"";return i.a.createElement("div",{key:t.id,className:a},i.a.createElement(p.a,{checked:t.isDone,onChange:function(a){e.changeTaskStatus(t.id,a.currentTarget.checked,e.id)},color:"primary"}),i.a.createElement(E,{title:t.title,changeTitle:function(a){e.changeTaskTitle(e.id,t.id,a)}}),i.a.createElement(f.a,{onClick:function(){e.deleteTask(t.id,e.id)}},i.a.createElement(k.a,null)))}));return i.a.createElement("div",null,i.a.createElement("h3",null,e.todoListTitle,i.a.createElement(f.a,{onClick:function(){e.deleteTodoList(e.id)}},i.a.createElement(k.a,null))),i.a.createElement(j,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("div",null,t),i.a.createElement("div",null,i.a.createElement(h.a,{color:"primary",variant:"all"===e.filter?"contained":void 0,onClick:function(){e.changeFilter("all",e.id)}},"All"),i.a.createElement(h.a,{color:"primary",variant:"active"===e.filter?"contained":void 0,onClick:function(){e.changeFilter("active",e.id)}},"Active"),i.a.createElement(h.a,{color:"primary",variant:"completed"===e.filter?"contained":void 0,onClick:function(){e.changeFilter("completed",e.id)}},"Completed")))}var T=a(107),y=a(72),D=a(108),C=a(109),S=a(111),w=a(112),F=a(110);var x=function(){var e,t=Object(s.a)(),a=Object(s.a)(),c=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to buy",filter:"all"}]),r=Object(d.a)(c,2),m=r[0],b=r[1],O=Object(n.useState)((e={},Object(u.a)(e,t,[{id:Object(s.a)(),title:"HTML&CSS",isDone:!0},{id:Object(s.a)(),title:"JS/TS",isDone:!0},{id:Object(s.a)(),title:"React",isDone:!1},{id:Object(s.a)(),title:"Redux",isDone:!1}]),Object(u.a)(e,a,[{id:Object(s.a)(),title:"Time",isDone:!0},{id:Object(s.a)(),title:"Brain",isDone:!0},{id:Object(s.a)(),title:"Car",isDone:!1},{id:Object(s.a)(),title:"Penthouse",isDone:!1}]),e)),v=Object(d.a)(O,2),E=v[0],p=v[1],k=function(e){var t=m.filter((function(t){return t.id!==e}));b(t),delete E[e],p(Object(o.a)({},E))},x=function(e,t){var a=E[t].filter((function(t){return t.id!==e}));p(Object(o.a)(Object(o.a)({},E),{},Object(u.a)({},t,a)))},L=function(e,t){if(""!==e.trim()){var a=[{id:Object(s.a)(),title:e,isDone:!1}].concat(Object(l.a)(E[t]));p(Object(o.a)(Object(o.a)({},E),{},Object(u.a)({},t,a)))}},_=function(e,t,a){var n=E[a].map((function(a){return a.id===e?Object(o.a)(Object(o.a)({},a),{},{isDone:t}):a}));p(Object(o.a)(Object(o.a)({},E),{},Object(u.a)({},a,n)))},B=function(e,t,a){var n=E[e].map((function(e){return e.id===t?Object(o.a)(Object(o.a)({},e),{},{title:a}):e}));p(Object(o.a)(Object(o.a)({},E),{},Object(u.a)({},e,n)))},I=function(e,t){var a=m.find((function(e){return e.id===t}));a&&(a.filter=e,b(Object(l.a)(m)))},P=m.map((function(e){var t=E[e.id],a=t;return"active"===e.filter&&(a=t.filter((function(e){return!e.isDone}))),"completed"===e.filter&&(a=t.filter((function(e){return e.isDone}))),i.a.createElement(T.a,{item:!0,style:{wordBreak:"break-word"}},i.a.createElement(y.a,{style:{padding:"10px"}},i.a.createElement(g,{key:e.id,id:e.id,todoListTitle:e.title,filter:e.filter,tasks:a,deleteTodoList:k,deleteTask:x,changeFilter:I,changeTaskStatus:_,changeTaskTitle:B,addTask:L})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(D.a,{position:"static"},i.a.createElement(C.a,{style:{justifyContent:"space-between"}},i.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(F.a,null)),i.a.createElement(S.a,{variant:"h6"},"TodoList"),i.a.createElement(h.a,{color:"inherit"},"Login"))),i.a.createElement(w.a,{fixed:!0},i.a.createElement(T.a,{container:!0,style:{padding:"20px",justifyContent:"center"}},i.a.createElement(j,{addItem:function(e){var t=Object(s.a)(),a={id:t,title:e,filter:"all"};b([].concat(Object(l.a)(m),[a])),p(Object(o.a)(Object(o.a)({},E),{},Object(u.a)({},t,[])))}})),i.a.createElement(T.a,{container:!0,spacing:3,style:{justifyContent:"center"}},P)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.d080ab9e.chunk.js.map