(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{105:function(t,e,a){t.exports=a(136)},110:function(t,e,a){},135:function(t,e,a){},136:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(10),i=a.n(o);a(110),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s,c,l=a(192),u=a(187),d=a(181),p=a(138),f=a(193),m=a(195),b=a(200),g=a(191),v=a(194),E=a(12),h=a(9),y=a.n(h),k=a(18),L=a(28),I=a(85),j=a.n(I);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(s||(s={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(c||(c={}));var C=j.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"d54d3622-f03b-45b2-9f0a-fa6f5f4405c5"}}),w=function(){return C.get("todo-lists")},O=function(t){return C.post("todo-lists",{title:t})},x=function(t){return C.delete("todo-lists/".concat(t))},T=function(t,e){return C.put("todo-lists/".concat(t),{title:e})},A=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},S=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},D=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e})},_=function(t,e,a){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},F=function(t){return C.post("auth/login",t)},P=function(){return C.get("auth/me")},z=function(){return C.delete("auth/login")},N=a(29),B=Object(N.b)({name:"todoLists",initialState:[],reducers:{fetchTodoListsAC:function(t,e){return e.payload.todoLists.map((function(t){return Object(L.a)(Object(L.a)({},t),{},{filter:"all",todoListEntityStatus:"idle"})}))},addTodoListAC:function(t,e){t.unshift(Object(L.a)(Object(L.a)({},e.payload.todoList),{},{filter:"all",todoListEntityStatus:"idle"}))},deleteTodoListAC:function(t,e){return t.filter((function(t){return t.id!==e.payload.todoListId}))},changeTodoListFilterAC:function(t,e){return t.map((function(t){return t.id===e.payload.todoListId?Object(L.a)(Object(L.a)({},t),{},{filter:e.payload.filter}):t}))},changeTodoListTitleAC:function(t,e){return t.map((function(t){return t.id===e.payload.todoListId?Object(L.a)(Object(L.a)({},t),{},{title:e.payload.newTitle}):t}))},changeTodoListEntityStatusAC:function(t,e){return t.map((function(t){return t.id===e.payload.todoId?Object(L.a)(Object(L.a)({},t),{},{todoListEntityStatus:e.payload.todoListEntityStatus}):t}))},clearDataOnLogoutAC:function(){return[]}}}),H=B.reducer,M=B.actions,q=M.fetchTodoListsAC,K=M.addTodoListAC,R=M.deleteTodoListAC,U=M.changeTodoListFilterAC,Z=M.changeTodoListTitleAC,J=M.changeTodoListEntityStatusAC,W=M.clearDataOnLogoutAC,$=function(t,e){t.messages.length?e(ot({error:t.messages[0]})):e(ot({error:"unexpected error occurred"})),e(rt({status:"failed"}))},V=function(t,e){e(ot({error:t})),e(rt({status:"failed"}))},Y=function(t,e,a){t.messages.length?e(ot({error:t.messages[0]})):e(ot({error:"unexpected error occurred"})),e(J({todoId:a,todoListEntityStatus:"failed"}))},G=function(t,e,a){e(ot({error:t})),e(J({todoId:a,todoListEntityStatus:"failed"}))},Q=Object(N.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.isLoggedIn}}}),X=Q.reducer,tt=Q.actions.setIsLoggedInAC,et=Object(N.b)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error},setAppInitAC:function(t,e){t.isInitialized=e.payload.isInitialized}}}),at=et.reducer,nt=et.actions,rt=nt.setAppStatusAC,ot=nt.setAppErrorAC,it=nt.setAppInitAC,st=a(199),ct=a(197);function lt(t){return r.a.createElement(ct.a,Object.assign({elevation:6,variant:"filled"},t))}function ut(){var t=Object(E.c)((function(t){return t.app.error})),e=Object(E.b)(),a=function(t,a){"clickaway"!==a&&e(ot({error:null}))};return r.a.createElement(st.a,{open:null!==t,autoHideDuration:6e3,onClose:a},r.a.createElement(lt,{onClose:a,severity:"error"},t))}var dt=a(190),pt=a(198),ft=a(201),mt=a(186),bt=a(185),gt=a(184),vt=a(196),Et=a(183),ht=a(93),yt=a(13),kt=r.a.memo((function(){var t=Object(E.b)(),e=Object(E.c)((function(t){return t.auth.isLoggedIn})),a=Object(ht.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Field is required",t.password?t.password.length<4&&(e.password="password has to be at least 4 characters"):e.password="Field is required",e},onSubmit:function(e){var n;t((n=e,function(){var t=Object(k.a)(y.a.mark((function t(e){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,F(n);case 4:0===(a=t.sent).data.resultCode?(e(tt({isLoggedIn:!0})),e(rt({status:"succeeded"}))):$(a.data,e),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),V(t.t0.message,e);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}())),a.resetForm()}});return e?r.a.createElement(yt.a,{to:"/todo-list-solo-redo"}):r.a.createElement(Et.a,{container:!0,justify:"center"},r.a.createElement(Et.a,{item:!0,xs:3},r.a.createElement("form",{onSubmit:a.handleSubmit},r.a.createElement(ft.a,null,r.a.createElement(gt.a,null,r.a.createElement("p",null,"To log in please register",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"}," here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(bt.a,null,r.a.createElement(vt.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email&&a.touched.email&&r.a.createElement("div",{style:{color:"red"}},a.errors.email),r.a.createElement(vt.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password&&a.touched.password&&r.a.createElement("div",{style:{color:"red"}},a.errors.password),r.a.createElement(mt.a,Object.assign({label:"Remember me",control:r.a.createElement(pt.a,null)},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe})),r.a.createElement(u.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))})),Lt=a(44),It=a(188),jt=r.a.memo((function(t){var e=Object(n.useState)(""),a=Object(Lt.a)(e,2),o=a[0],i=a[1],s=Object(n.useState)(null),c=Object(Lt.a)(s,2),l=c[0],u=c[1],p=function(){""!==o.trim()?(t.addItem(o.trim()),i("")):u("Title required")};return r.a.createElement("div",null,r.a.createElement(vt.a,{size:"small",error:!!l,value:o,onChange:function(t){i(t.currentTarget.value),u(null)},onBlur:function(){null!==l&&u(null)},onKeyPress:function(t){"Enter"===t.key&&p()},variant:"outlined",label:"Title",helperText:l,disabled:t.disabled}),r.a.createElement(d.a,{color:"primary",onClick:p,disabled:t.disabled},r.a.createElement(It.a,null)))})),Ct=a(137),wt=(a(135),a(66)),Ot=a.n(wt),xt=r.a.memo((function(t){var e=t.title,a=t.changeTitle,o=t.disabled,i=Object(n.useState)(!1),s=Object(Lt.a)(i,2),c=s[0],l=s[1],u=Object(n.useState)(e),d=Object(Lt.a)(u,2),p=d[0],f=d[1],m=Object(n.useState)(!1),b=Object(Lt.a)(m,2),g=b[0],v=b[1];return c?r.a.createElement(vt.a,{className:"".concat(Ot.a.inputField," ").concat(g?Ot.a.error:""),autoFocus:!0,value:p,onBlur:function(){""!==p?(l(!1),a(p)):v(!0)},onKeyPress:function(t){""!==p?"Enter"===t.key&&(l(!1),a(p)):v(!0)},onChange:function(t){f(t.currentTarget.value),v(!1)},placeholder:g?"please enter title":"",variant:"outlined",size:"small",error:g}):r.a.createElement("span",{onDoubleClick:function(){o||(p!==e&&f(e),l(!0))}},e)})),Tt=a(189),At=Object(N.b)({name:"tasks",initialState:{},reducers:{fetchTasksAC:function(t,e){t[e.payload.todoListId]=e.payload.tasks},addTaskAC:function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)},deleteTaskAC:function(t,e){var a=t[e.payload.todoListId].findIndex((function(t){return t.id===e.payload.taskId}));t[e.payload.todoListId].splice(a,1)},changeTaskStatusAC:function(t,e){var a=t[e.payload.todoListId].findIndex((function(t){return t.id===e.payload.taskId}));t[e.payload.todoListId][a].status=e.payload.status},changeTaskTitleAC:function(t,e){var a=t[e.payload.todoListId].findIndex((function(t){return t.id===e.payload.taskId}));t[e.payload.todoListId][a].title=e.payload.newTitle}},extraReducers:function(t){t.addCase(q,(function(t,e){e.payload.todoLists.forEach((function(e){return t[e.id]=[]}))})),t.addCase(K,(function(t,e){t[e.payload.todoList.id]=[]})),t.addCase(R,(function(t,e){delete t[e.payload.todoListId]})),t.addCase(W,(function(t,e){return{}}))}}),St=At.reducer,Dt=At.actions,_t=Dt.fetchTasksAC,Ft=Dt.addTaskAC,Pt=Dt.deleteTaskAC,zt=Dt.changeTaskStatusAC,Nt=Dt.changeTaskTitleAC,Bt=a(67),Ht=a.n(Bt),Mt=r.a.memo((function(t){var e=t.id,a=t.title,o=t.status,i=t.todoListId,c=t.todoListEntityStatus,l=Object(E.b)(),u=Object(n.useCallback)((function(t){l(function(t,e,a){return function(){var n=Object(k.a)(y.a.mark((function n(r,o){var i,s,c;return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,r(J({todoId:e,todoListEntityStatus:"loading"})),!(i=o().tasks[e].find((function(e){return e.id===t})))){n.next=9;break}return s={title:a,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},n.next=7,_(e,t,s);case 7:0===(c=n.sent).data.resultCode?(r(Nt({todoListId:e,taskId:t,newTitle:a})),r(J({todoId:e,todoListEntityStatus:"succeeded"}))):Y(c.data,r,e);case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),G(n.t0.message,r,e);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(t,e){return n.apply(this,arguments)}}()}(e,i,t))}),[l,i,e]);return r.a.createElement("li",{key:e,className:"".concat(Ht.a.liElement," ").concat(2===o?Ht.a.isDoneClassName:"")},r.a.createElement(pt.a,{checked:2===o,onChange:function(t){l(function(t,e,a){return function(){var n=Object(k.a)(y.a.mark((function n(r,o){var i,s,c;return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,r(J({todoId:e,todoListEntityStatus:"loading"})),!(i=o().tasks[e].find((function(e){return e.id===t})))){n.next=9;break}return s={title:i.title,description:i.description,status:a,priority:i.priority,startDate:i.startDate,deadline:i.deadline},n.next=7,_(e,t,s);case 7:0===(c=n.sent).data.resultCode?(r(zt({taskId:t,todoListId:e,status:a})),r(J({todoId:e,todoListEntityStatus:"succeeded"}))):Y(c.data,r,e);case 9:n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),G(n.t0.message,r,e);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(t,e){return n.apply(this,arguments)}}()}(e,i,t.currentTarget.checked?s.Completed:s.New))},color:"primary",disabled:c}),r.a.createElement(xt,{title:a,changeTitle:u,disabled:c}),r.a.createElement(d.a,{onClick:function(){l(function(t,e){return function(){var a=Object(k.a)(y.a.mark((function a(n){var r;return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n(rt({status:"loading"})),a.next=4,S(e,t);case 4:0===(r=a.sent).data.resultCode?(n(Pt({taskId:t,todoListId:e})),n(rt({status:"succeeded"}))):$(r.data,n),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),V(a.t0.message,n);case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(t){return a.apply(this,arguments)}}()}(e,i))},disabled:c},r.a.createElement(Tt.a,null)))})),qt=r.a.memo((function(t){var e=t.id,a=t.todoListTitle,o=t.filter,i=t.todoListEntityStatus,s=Object(E.b)();Object(n.useEffect)((function(){var t;s((t=e,function(){var e=Object(k.a)(y.a.mark((function e(a){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(rt({status:"loading"})),e.next=4,A(t);case 4:n=e.sent,a(_t({tasks:n.data.items,todoListId:t})),a(rt({status:"succeeded"})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),V(e.t0.message,a);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()))}),[s,e]);var c=Object(E.c)((function(t){switch(o){case"active":return t.tasks[e].filter((function(t){return 0===t.status}));case"completed":return t.tasks[e].filter((function(t){return 2===t.status}));default:return t.tasks[e]}})).map((function(t){return r.a.createElement(Mt,{key:t.id+e,id:t.id,status:t.status,title:t.title,todoListId:e,todoListEntityStatus:"loading"===i})})),l=Object(n.useCallback)((function(t){var a,n;s((a=e,n=t,function(){var t=Object(k.a)(y.a.mark((function t(e){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(J({todoId:a,todoListEntityStatus:"loading"})),t.next=4,T(a,n);case 4:0===(r=t.sent).data.resultCode?(e(Z({todoListId:a,newTitle:n})),e(J({todoId:a,todoListEntityStatus:"succeeded"}))):Y(r.data,e,a),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),G(t.t0.message,e,a);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()))}),[s,e]),p="all"===o?"contained":void 0,f="active"===o?"contained":void 0,m="completed"===o?"contained":void 0;return r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement(xt,{title:a,changeTitle:l,disabled:"loading"===i}),r.a.createElement(d.a,{onClick:function(){s(function(t){return function(){var e=Object(k.a)(y.a.mark((function e(a){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(rt({status:"loading"})),e.next=4,x(t);case 4:0===(n=e.sent).data.resultCode?(a(R({todoListId:t})),a(rt({status:"succeeded"}))):$(n.data,a),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),V(e.t0.message,a);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}(e))},disabled:"loading"===i},r.a.createElement(Tt.a,null))),r.a.createElement(jt,{addItem:function(t){var a,n;s((a=t,n=e,function(){var t=Object(k.a)(y.a.mark((function t(e){var r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,D(n,a);case 4:0===(r=t.sent).data.resultCode?(e(Ft({task:r.data.data.item})),e(rt({status:"succeeded"}))):$(r.data,e),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),V(t.t0.message,e);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()))},disabled:"loading"===i}),r.a.createElement("div",null,c),r.a.createElement("div",null,r.a.createElement(u.a,{color:"primary",variant:p,style:{marginTop:"3px"},onClick:function(){s(U({filter:"all",todoListId:e}))}},"All"),r.a.createElement(u.a,{color:"primary",variant:f,style:{marginTop:"3px"},onClick:function(){s(U({filter:"active",todoListId:e}))}},"Active"),r.a.createElement(u.a,{color:"primary",variant:m,style:{marginTop:"3px"},onClick:function(){s(U({filter:"completed",todoListId:e}))}},"Completed")))})),Kt=r.a.memo((function(){var t=Object(E.b)(),e=Object(E.c)((function(t){return t.todoLists})),a=Object(E.c)((function(t){return t.auth.isLoggedIn})),o=Object(n.useCallback)((function(e){var a;t((a=e,function(){var t=Object(k.a)(y.a.mark((function t(e){var n;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,O(a);case 4:0===(n=t.sent).data.resultCode?(e(K({todoList:n.data.data.item})),e(rt({status:"succeeded"}))):$(n.data,e),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),V(t.t0.message,e);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()))}),[t]);if(Object(n.useEffect)((function(){a&&t(function(){var t=Object(k.a)(y.a.mark((function t(e){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,w();case 4:a=t.sent,e(q({todoLists:a.data})),e(rt({status:"succeeded"})),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),V(t.t0.message,e);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}())}),[t,a]),!a)return r.a.createElement(yt.a,{to:"/login"});var i=e.map((function(t){return r.a.createElement(Et.a,{key:t.id,item:!0,style:{wordBreak:"break-word"}},r.a.createElement(Ct.a,{style:{padding:"10px"}},r.a.createElement(qt,{id:t.id,todoListTitle:t.title,filter:t.filter,todoListEntityStatus:t.todoListEntityStatus})))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(Et.a,{container:!0,style:{padding:"20px",justifyContent:"center"}},r.a.createElement(jt,{addItem:o})),r.a.createElement(Et.a,{container:!0,spacing:3,style:{justifyContent:"center"}},i))})),Rt=Object(dt.a)((function(t){return{backdrop:{zIndex:t.zIndex.drawer+1,color:"#fff"}}})),Ut=r.a.memo((function(){var t=Rt(),e=Object(E.b)(),a=Object(E.c)((function(t){return t.app.status})),o=Object(E.c)((function(t){return t.app.isInitialized})),i=Object(E.c)((function(t){return t.auth.isLoggedIn})),s=Object(n.useCallback)((function(){e(function(){var t=Object(k.a)(y.a.mark((function t(e){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,z();case 4:0===(a=t.sent).data.resultCode?(e(tt({isLoggedIn:!1})),e(rt({status:"succeeded"})),e(W())):$(a.data,e),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),V(t.t0.message,e);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}())}),[e]);return Object(n.useEffect)((function(){e(function(){var t=Object(k.a)(y.a.mark((function t(e){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(rt({status:"loading"})),t.next=4,P();case 4:0===t.sent.data.resultCode?(e(tt({isLoggedIn:!0})),e(rt({status:"succeeded"}))):e(rt({status:"succeeded"})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),V(t.t0.message,e);case 11:return t.prev=11,e(it({isInitialized:!0})),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,8,11,14]])})));return function(e){return t.apply(this,arguments)}}())}),[e]),o?r.a.createElement("div",{className:"App"},r.a.createElement(ut,null),r.a.createElement(b.a,{open:"loading"===a,className:t.backdrop},r.a.createElement(g.a,{color:"primary",size:70})),r.a.createElement(l.a,{position:"static"},r.a.createElement(f.a,{style:{justifyContent:"space-between"}},r.a.createElement(d.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(v.a,null)),r.a.createElement(p.a,{variant:"h6"},"TodoList"),i?r.a.createElement(u.a,{color:"inherit",onClick:s},"Logout"):r.a.createElement(u.a,{style:{color:"white"},disabled:!0},"Login"))),r.a.createElement(m.a,{fixed:!0},r.a.createElement(yt.d,null,r.a.createElement(yt.b,{exact:!0,path:"/todo-list-solo-redo",render:function(){return r.a.createElement(Kt,null)}}),r.a.createElement(yt.b,{path:"/login",render:function(){return r.a.createElement(kt,null)}}),r.a.createElement(yt.b,{path:"/404",render:function(){return r.a.createElement("h1",{style:{textAlign:"center"}},"404: Page not found")}}),r.a.createElement(yt.a,{exact:!0,from:"/",to:"/todo-list-solo-redo"}),r.a.createElement(yt.a,{from:"*",to:"/404"})))):r.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},r.a.createElement(g.a,null))})),Zt=a(26),Jt=a(51),Wt=Object(Zt.b)({tasks:St,todoLists:H,app:at,auth:X}),$t=Object(N.a)({reducer:Wt,middleware:function(t){return t().prepend(Jt.a)}});window.store=$t;var Vt=a(50);i.a.render(r.a.createElement(Vt.a,null,r.a.createElement(E.a,{store:$t},r.a.createElement(Ut,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},66:function(t,e,a){t.exports={inputField:"EditableSpan_inputField__3qIHy",error:"EditableSpan_error__26IDH"}},67:function(t,e,a){t.exports={isDone:"Task_isDone__1B-ow",liElement:"Task_liElement__2oSik"}}},[[105,1,2]]]);
//# sourceMappingURL=main.a1a10339.chunk.js.map