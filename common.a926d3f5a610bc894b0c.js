(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{aqqe:function(t,a,r){"use strict";r.d(a,"e",function(){return i}),r.d(a,"h",function(){return e}),r.d(a,"l",function(){return o}),r.d(a,"k",function(){return c}),r.d(a,"j",function(){return d}),r.d(a,"i",function(){return u}),r.d(a,"c",function(){return l}),r.d(a,"f",function(){return m}),r.d(a,"m",function(){return g}),r.d(a,"g",function(){return s}),r.d(a,"n",function(){return f}),r.d(a,"d",function(){return p}),r.d(a,"a",function(){return b}),r.d(a,"b",function(){return x});var n=r("yGQT"),i=(Object(n.r)("routerReducer"),Object(n.t)(function(t){return t.gloabalData.projectData},function(t){return t})),e=function(t){return Object(n.t)(function(t){return t.gloabalData.projectData},function(a){return Object.assign({},a[t])})},o=Object(n.t)(function(t){return t.gloabalData.projectData[t.gloabalData.editProjectIndex].stages},function(t){return t}),c=function(t){return Object(n.t)(function(t){return t.gloabalData.projectData[t.gloabalData.editProjectIndex].stages},function(a){return Object.assign({},a[t])})},d=Object(n.t)(function(t){return t.gloabalData.projectData[t.gloabalData.editProjectIndex].stages[t.gloabalData.editStageIndex].stageData},function(t){return t}),u=Object(n.t)(function(t){var a=t.gloabalData.projectData[t.gloabalData.editProjectIndex];return void 0!==a?a.uid:null},function(t){return t}),l=Object(n.t)(function(t,a){var r=t.gloabalData.projectData[t.gloabalData.editProjectIndex].uid,n=t.gloabalData.projectData.filter(function(t){return t.uid===r})[0].stages[a];return{projectUid:r,stageUid:void 0===n?"":n.uid}},function(t){return t}),m=Object(n.t)(function(t){return t.gloabalData.isProjectLoaded},function(t){return t}),g=Object(n.t)(function(t){return t.gloabalData.isStageLoaded},function(t){return t}),s=Object(n.t)(function(t){return t.gloabalData.projectSideInfo},function(t){return t}),f=Object(n.t)(function(t){return t.gloabalData.stageSideInfo},function(t){return t}),p=Object(n.t)(function(t){return t.gloabalData.editMode},function(t){return t}),b=Object(n.t)(function(t){return t.auth.userData},function(t,a){return{email:t.email,project:t.project,projectData:a}}),x=Object(n.t)(function(t,a){var r=t.gloabalData.editProjectIndex;return{email:t.auth.userData.email,projectUid:t.gloabalData.projectData[r].uid,stagesLength:t.gloabalData.projectData[r].stages.length,stageData:a}},function(t){return t});Object(n.t)(function(t){return t.gloabalData.editProjectIndex},function(t){return t}),Object(n.t)(function(t){return t.gloabalData.editStageIndex},function(t){return t})},lzlj:function(t,a,r){"use strict";r.d(a,"a",function(){return i}),r.d(a,"d",function(){return e}),r.d(a,"b",function(){return o}),r.d(a,"c",function(){return c});var n=r("CcnG"),i=(r("FVSy"),r("Fzqc"),r("Wf4p"),r("ZYjt"),n.sb({encapsulation:2,styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}@media (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-actions,.mat-card-content,.mat-card-subtitle{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media (max-width:599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child:not(.mat-card-footer),.mat-card>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],data:{}}));function e(t){return n.Nb(2,[n.Db(null,0),n.Db(null,1)],null,null)}var o=n.sb({encapsulation:2,styles:[],data:{}});function c(t){return n.Nb(2,[n.Db(null,0),(t()(),n.ub(1,0,null,null,1,"div",[["class","mat-card-header-text"]],null,null,null,null,null)),n.Db(null,1),n.Db(null,2)],null,null)}}}]);