import{_ as y,e as x,r as o,d as f,w as T,f as b,o as k,c as q,a as e,t as v,g as _,v as p,n as w,h as C}from"./index-57986c7b.js";const D={class:"query-detail"},M={class:"page-title"},R={class:"content-box"},S={class:"result-area"},B={class:"button-area"},H={class:"log-section"},P={class:"log-content"},V={__name:"query-detail",setup($){const i=x(),t=o(""),a=o(""),l=o(null),n=o(""),u=o(!1),g=f(()=>{switch(i.params.type){case"address":return"查询终端地址";case"ip":return"查询终端IP";case"ethernetMaster":return"查询以太网主站参数";case"ethernetComm":return"查询以太网通信设置";case"gprsMaster":return"查询GPRS主站参数";case"gprsComm":return"查询GPRS通信参数";case"time":return"查询终端时间";case"version":return"查询终端版本信息";case"mac":return"查询终端MAC地址";default:return"查询"}}),m=()=>{const r=new Date().toLocaleTimeString();try{t.value="模拟查询结果",a.value+=`[${r}] 发起查询
`,n.value="",u.value=!1}catch(s){n.value="查询失败："+s.message,u.value=!0,a.value+=`[${r}] 查询失败: ${s.message}
`}},h=()=>{a.value="",t.value="",n.value="",u.value=!1},d=()=>{if(l.value){l.value.style.height="0px";const r=l.value.scrollHeight;l.value.style.height=r+2+"px"}};return T(t,()=>{C(d)}),b(()=>{console.log("查询类型:",i.params.type),d()}),(r,s)=>(k(),q("div",D,[e("div",M,v(g.value),1),e("div",R,[e("div",S,[_(e("textarea",{"onUpdate:modelValue":s[0]||(s[0]=c=>t.value=c),class:"result-textarea",readonly:"",placeholder:"查询结果将显示在这里",rows:"1",ref_key:"resultTextarea",ref:l},null,512),[[p,t.value]])]),e("div",B,[e("div",{class:w(["message-area",{error:u.value}])},v(n.value),3),e("button",{class:"query-btn",onClick:m},"查询")]),e("div",H,[e("div",{class:"log-header"},[s[2]||(s[2]=e("span",null,"日志信息",-1)),e("button",{class:"clear-btn",onClick:h},"清除日志")]),e("div",P,[_(e("textarea",{"onUpdate:modelValue":s[1]||(s[1]=c=>a.value=c),readonly:"",class:"log-textarea",placeholder:"这里将显示查询日志..."},null,512),[[p,a.value]])])])])]))}},G=y(V,[["__scopeId","data-v-89951063"]]);export{G as default};
