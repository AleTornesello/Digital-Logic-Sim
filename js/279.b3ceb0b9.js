"use strict";(self["webpackChunkdigital_logic_sim"]=self["webpackChunkdigital_logic_sim"]||[]).push([[279],{7279:(e,o,d)=>{d.r(o),d.d(o,{default:()=>Q});var a=d(3673),n=d(2323);const t=(0,a.Uk)("Digital Logic Sim"),l={class:"q-pa-sm",id:"nodes_preview_container"};function s(e,o,d,s,r,i){const u=(0,a.up)("q-toolbar-title"),p=(0,a.up)("q-toolbar"),c=(0,a.up)("q-icon"),m=(0,a.up)("q-btn"),w=(0,a.up)("q-tab"),b=(0,a.up)("q-tabs"),f=(0,a.up)("q-header"),g=(0,a.up)("q-scroll-area"),_=(0,a.up)("q-drawer"),N=(0,a.up)("router-view"),h=(0,a.up)("q-page-container"),v=(0,a.up)("q-layout");return(0,a.wg)(),(0,a.j4)(v,{view:"hHh LpR fFf"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{class:"bg-dark",bordered:""},{default:(0,a.w5)((()=>[(0,a.Wm)(p,null,{default:(0,a.w5)((()=>[(0,a.Wm)(u,null,{default:(0,a.w5)((()=>[t])),_:1})])),_:1}),(0,a.Wm)(b,{modelValue:e.openedTab,"onUpdate:modelValue":[o[1]||(o[1]=o=>e.openedTab=o),o[2]||(o[2]=o=>e.setVisibleNode())],dense:"",class:"bg-dark text-white"},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.openedNodesIds,(o=>((0,a.wg)(),(0,a.j4)(w,{key:o,name:o},{default:(0,a.w5)((()=>{var d;return[(0,a._)("span",null,[(0,a.Uk)((0,n.zw)((null===(d=e.getNodeById(o))||void 0===d?void 0:d.name)||"")+" ",1),(0,a.Wm)(m,{flat:"",padding:"none"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{name:"close",onClick:d=>e.removeNode(o)},null,8,["onClick"])])),_:2},1024)])]})),_:2},1032,["name"])))),128)),(0,a.Wm)(m,{flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{name:"add",onClick:o[0]||(o[0]=o=>e.addNewNode())})])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,a.Wm)(_,{modelValue:e.nodesDrawerModel,"onUpdate:modelValue":o[3]||(o[3]=o=>e.nodesDrawerModel=o),"show-if-above":"",breakpoint:700,class:"bg-primary text-white"},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{class:"fit"},{default:(0,a.w5)((()=>[(0,a._)("div",l,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.nodes,(e=>((0,a.wg)(),(0,a.iD)("div",{key:e.id,class:"node_preview",style:(0,n.j5)({"background-color":e.color})},(0,n.zw)(e.name),5)))),128))])])),_:1})])),_:1},8,["modelValue"]),(0,a.Wm)(h,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N)])),_:1})])),_:1})}var r=d(5523),i=d(1185),u=d(735);const p=(0,a.aZ)({name:"MainLayout",data(){return{openedTab:"0",nodesDrawerModel:!0,openedNodesIds:Array.of()}},setup(){const e=(0,u.S)(),o=(0,a.Fl)((()=>e.getters.nodes));return{nodes:o,nodesStore:e}},methods:{addNewNode(){const e=(0,i.Z)();this.nodesStore.commit("addNode",new r.N({id:e,name:"New Node"})),this.openedNodesIds.push(e)},removeNode(e){const o=this.openedNodesIds.findIndex((o=>o===e));-1!==o&&this.openedNodesIds.splice(o,1)},getNodeById(e){return this.nodes.find((o=>o.id===e))},toggleNodesDrawer(){this.nodesDrawerModel=!this.nodesDrawerModel},setVisibleNode(){const e=this.openedTab;this.nodesStore.commit("setVisualizedNode",e)}}});var c=d(4260),m=d(9214),w=d(3812),b=d(9570),f=d(3747),g=d(5602),_=d(3269),N=d(8671),h=d(4554),v=d(3304),k=d(7704),Z=d(2652),q=d(7518),W=d.n(q);const D=(0,c.Z)(p,[["render",s],["__scopeId","data-v-33e1aead"]]),Q=D;W()(p,"components",{QLayout:m.Z,QHeader:w.Z,QToolbar:b.Z,QToolbarTitle:f.Z,QTabs:g.Z,QTab:_.Z,QBtn:N.Z,QIcon:h.Z,QDrawer:v.Z,QScrollArea:k.Z,QPageContainer:Z.Z})}}]);