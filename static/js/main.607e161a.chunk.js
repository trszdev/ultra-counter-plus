(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},44:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var i=n(0),s=n(1),o=n.n(s),r=n(21),a=n.n(r),u=(n(31),n(25)),c=n(3),d=n(4),m=n(6),l=n(5),p=(n(32),function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"getItemCounts",value:function(){var e=this.props,t=e.group,n=e.session,i=n.workstate;return n.itemGroups.filter((function(e){return e.groupId===t.id})).map((function(e){return{item:e,count:i.itemCounts[e.id]||0}}))}},{key:"didTapItem",value:function(e){var t=this.props,n=t.isDecrementing,i=t.didUpdateWorkstate,s=t.session.workstate,o=n?-1:1;s.itemCounts[e.id]=(s.itemCounts[e.id]||0)+o,s.groupCounts[e.groupId]=(s.groupCounts[e.groupId]||0)+o,i(s)}},{key:"render",value:function(){var e=this,t=this.props,n=t.group,s=t.session,o=s.settings,r=s.workstate,a={width:o.itemWidthPx,height:o.itemHeightPx,marginLeft:o.itemHorizontalSpacingPx,marginRight:o.itemHorizontalSpacingPx,marginTop:o.itemSpacingPx,marginBottom:o.itemSpacingPx};return Object(i.jsxs)("div",{className:"group-column",children:[Object(i.jsxs)("div",{className:"group-column-header",style:a,children:[Object(i.jsx)("div",{className:"group-column-header-title",style:{fontSize:o.groupFontSizePx},children:n.mnemonic}),Object(i.jsx)("div",{className:"group-column-header-count",style:{fontSize:o.counterFontSizePx},children:r.groupCounts[n.id]||0})]}),Object(i.jsx)("div",{className:"group-column-items",children:this.getItemCounts().map((function(t){var n=t.item,s=t.count;return Object(i.jsxs)("div",{onClick:function(){return e.didTapItem(n)},className:"group-column-item",style:a,children:[Object(i.jsx)("div",{className:"group-column-item-name",style:{fontSize:o.itemFontSizePx},children:null===n||void 0===n?void 0:n.mnemonic}),Object(i.jsx)("div",{className:"group-column-item-count",style:{fontSize:o.counterFontSizePx},children:s})]},n.id)}))})]})}}]),n}(s.Component)),h=n(7),g=n.n(h),f=n(11),b=n(22),j=n.n(b),v=n(2),x={Group:v.iface([],{id:"string",name:"string",mnemonic:"string"}),ItemGroup:v.iface(["Group"],{groupId:"string"}),Settings:v.iface([],{alertThresholds:"any",itemWidthPx:"number",itemHeightPx:"number",itemSpacingPx:"number",itemHorizontalSpacingPx:"number",counterFontSizePx:"number",itemFontSizePx:"number",groupFontSizePx:"number"}),Workstate:v.iface([],{itemCounts:"any",groupCounts:"any"}),Session:v.iface([],{name:"string",groups:v.array("Group"),itemGroups:v.array("ItemGroup"),settings:"Settings",workstate:"Workstate"})},O=Object(v.createCheckers)(x),S=function(e){var t;try{t=JSON.parse(e)}catch(n){return{error:n}}var n=O.Session.validate(t);return null!==n?{error:new Error("Not valid session: ".concat(n.path," ").concat(n.message))}:{session:t}},k=function(e){return JSON.stringify(e,null,2)},C=n(23),y=function(){var e={name:(new C.Chance).word({length:6}),groups:[],itemGroups:[],settings:{alertThresholds:{},itemFontSizePx:12,itemHeightPx:50,itemHorizontalSpacingPx:10,itemSpacingPx:20,itemWidthPx:50,counterFontSizePx:12,groupFontSizePx:12},workstate:{itemCounts:{},groupCounts:{}}};return e.groups.push({id:"group_id1",mnemonic:"group1",name:"ID 1 - GROUP"}),e.groups.push({id:"group_id2",mnemonic:"group2",name:"ID 2 - GROUP"}),e.itemGroups.push({id:"item1",groupId:"group_id1",mnemonic:"itm1",name:"Item 1"}),e.itemGroups.push({id:"item2",groupId:"group_id1",mnemonic:"itm2",name:"Item 2"}),e.itemGroups.push({id:"item3",groupId:"group_id1",mnemonic:"itm3",name:"Item 3"}),e.itemGroups.push({id:"item4",groupId:"group_id2",mnemonic:"itm4",name:"Item 4"}),e.workstate.itemCounts.item3=1,e.workstate.groupCounts.group_id1=1,e.settings.alertThresholds.group_id1=500,e},w=(n(44),n(45),n(46),n(24)),P=function(){var e=Object(f.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=function(){if(null!==n.files){var i=n.files[0],s=new FileReader;s.onerror=t,s.onload=function(t){var n,i=(null===(n=t.target)||void 0===n?void 0:n.result)+"";e(i)},s.readAsText(i,"UTF-8")}},n.click()})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).text=void 0,i.text=k(e.session),i}return Object(d.a)(n,[{key:"updateCurrentSession",value:function(e){var t=S(e||this.text),n=t.error,i=t.session;n?alert(n.message):(this.props.didUpdateSession(i),alert("Session updated"))}},{key:"componentDidUpdate",value:function(){this.text=k(this.props.session)}},{key:"downloadSession",value:function(){!function(e,t){var n=new Blob([e],{type:"application/json;charset=utf-8"});w.saveAs(n,"".concat(t,".json"))}(this.text,this.props.session.name)}},{key:"uploadSession",value:function(){var e=Object(f.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P();case 2:t=e.sent,this.updateCurrentSession(t);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"toggleCountMode",value:function(){this.props.didChangeCountMode(!this.props.isDecrementing)}},{key:"sortItems",value:function(){var e=this.props.session,t=e.workstate.itemCounts,n={};e.itemGroups.forEach((function(e){var t=n[e.groupId]||[];t.push(e),n[e.groupId]=t})),e.itemGroups=Object.values(n).flatMap((function(e){return e.sort((function(e,n){return(t[n.id]||0)-(t[e.id]||0)}))})),this.props.didUpdateSession(e)}},{key:"resetCounts",value:function(){if(confirm("Do you really want to reset all progress?")){var e=this.props.session;e.workstate.itemCounts={},e.workstate.groupCounts={},this.props.didUpdateSession(e)}}},{key:"didChangeText",value:function(e){this.text=e}},{key:"render",value:function(){var e=this,t=this.props.isDecrementing;return Object(i.jsxs)("div",{className:"menu",children:[Object(i.jsxs)("div",{className:"menu-buttons",children:[Object(i.jsx)("button",{onClick:function(){return e.updateCurrentSession()},children:"Update current session"}),Object(i.jsx)("button",{onClick:this.downloadSession.bind(this),children:"Download session"}),Object(i.jsx)("button",{onClick:this.uploadSession.bind(this),children:"Open session"}),Object(i.jsx)("button",{onClick:this.toggleCountMode.bind(this),children:t?"Increment mode":"Decrement mode"}),Object(i.jsx)("button",{onClick:this.sortItems.bind(this),children:"Sort items"}),Object(i.jsx)("button",{onClick:this.resetCounts.bind(this),children:"Reset progress"})]}),Object(i.jsx)("div",{className:"menu-editor",children:Object(i.jsx)(j.a,{placeholder:z,mode:"json",theme:"github",name:"menu-editor-ace",onChange:this.didChangeText.bind(this),fontSize:14,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,value:k(this.props.session),setOptions:{showLineNumbers:!0,tabSize:2,useWorker:!1}})})]})}}]),n}(s.Component),z=k(y()),N=function(){function e(){Object(c.a)(this,e)}return Object(d.a)(e,[{key:"store",value:function(e){localStorage.setItem("last_session",k(e))}},{key:"load",value:function(){var e=localStorage.getItem("last_session");if(null===e)return null;var t=S(e),n=t.session;return t.error?null:n}}],[{key:"instance",value:function(){return new e}}]),e}(),G=(n(47),function(e){Object(m.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).state={session:e.session,isMenu:!1,isDecrementing:!1},i}return Object(d.a)(n,[{key:"didUpdateWorkstate",value:function(e,t){var n=t||this.state.session,i=n.groups,s=n.settings,o=Object.entries(s.alertThresholds).map((function(t){var n=Object(u.a)(t,2),s=n[0],o=n[1];return(e.groupCounts[s]||0)>=o?i.find((function(e){return e.id===s})):null})).filter(Boolean);o.length>0&&(o.forEach((function(e){return delete s.alertThresholds[e.id]})),alert("Threshold reached for: ".concat(o.map((function(e){return e.name})).join(", ")))),this.setState({session:n}),N.instance().store(n)}},{key:"didUpdateSession",value:function(e){this.didUpdateWorkstate(e.workstate,e)}},{key:"didChangeCountMode",value:function(e){this.setState({isDecrementing:e,isMenu:!1})}},{key:"render",value:function(){var e=this,t=this.state,n=t.isMenu,s=t.isDecrementing,o=t.session;return Object(i.jsxs)("div",{className:"session-screen",children:[Object(i.jsxs)("div",{className:"session-screen-toolbar ".concat(s?"decrementing":"incrementing"),children:[Object(i.jsxs)("div",{className:"session-screen-toolbar-name",children:["Session: ",o.name]}),Object(i.jsx)("div",{onClick:function(){return e.setState({isMenu:!n})},className:"session-screen-toolbar-btn ".concat(n?"close":"menu")})]}),n?Object(i.jsx)(I,{isDecrementing:s,session:o,didChangeCountMode:this.didChangeCountMode.bind(this),didUpdateSession:this.didUpdateSession.bind(this)}):Object(i.jsx)("div",{className:"session-screen-board",children:o.groups.map((function(t){return Object(i.jsx)(p,{isDecrementing:s,group:t,session:o,didUpdateWorkstate:e.didUpdateWorkstate.bind(e)},t.id)}))})]})}}]),n}(s.Component)),F=function(){var e=N.instance().load()||y();return Object(i.jsx)(G,{session:e})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,49)).then((function(t){var n=t.getCLS,i=t.getFID,s=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),i(e),s(e),o(e),r(e)}))};a.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(F,{})}),document.getElementById("root")),U()}},[[48,1,2]]]);
//# sourceMappingURL=main.607e161a.chunk.js.map