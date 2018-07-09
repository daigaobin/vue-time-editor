!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TimeEditor",[],e):"object"==typeof exports?exports.TimeEditor=e():t.TimeEditor=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=1)}([function(t,e,r){"use strict";e.a={name:"TimeEditor",components:{},props:{value:{type:Array,required:!0},week:{type:Array,default:function(){return["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]}},hour:{type:[Number,Array],default:24},interval:{type:Number,default:60}},data:function(){return{toString:Object.prototype.toString,currentValue:this.value,colspan:1,hourList:[],timeList:[],startSrcElement:null,endSrcElement:null,isActive:!1,status:"NONE",NONE:"NONE",DOWN:"DOWN",MOVE:"MOVE",timer:null,tooltipText:"星期日 16:30"}},created:function(){this.init()},mounted:function(){document.querySelector(".time-editor .calendar").addEventListener("mouseup",this.mouseUpHandler)},destroyed:function(){document.querySelector(".time-editor .calendar").removeEventListener("mouseup",this.mouseUpHandler)},methods:{init:function(){this.setTimesData()},setTimesData:function(){this.setColspan(),this.setHourList(),this.setTimeList()},setColspan:function(){this.colspan=60/this.interval},setHourList:function(){var t=this.toString.apply(this.hour);"[object Number]"===t?this.convertNumberToArray():"[object Array]"===t&&this.convertArrayToArray()},convertNumberToArray:function(){if(this.hour>24||this.hour<0)throw new Error("Hour cannot be less than 0 greater than 23");this.hourList=[];for(var t=0;t<this.hour;t++)this.hourList.push(t)},convertArrayToArray:function(){this.hourList=[],this.hourList=this.hour.sort(function(t,e){return t<e?1:-1})},setTimeList:function(){this.timeList=[];for(var t=0,e=this.hourList.length*this.colspan;t<e;t++)this.timeList.push(t)},setStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NONE";this.status=t},setIsActive:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isActive=t},setTooltipText:function(t){this.tooltipText=t},isStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NONE";return this.status===t},mouseDownHandler:function(t){t&&(this.startSrcElement=t.srcElement,this.endSrcElement=t.srcElement,this.setIsActive(-1!==this.startSrcElement.className.indexOf("active")),this.setStatus(this.DOWN),this.startSrcElement===this.endSrcElement&&this.setMultipleSelectedTime())},mouseUpHandler:function(t){t&&this.setStatus(this.NONE)},mouseMoveHandler:function(t){t&&-1!==t.srcElement.className.indexOf("un-selected")&&(this.endSrcElement=t.srcElement,this.isStatus(this.DOWN)&&this.setStatus(this.MOVE),this.isStatus(this.MOVE)&&this.setMultipleSelectedTime())},mouseOverHandler:function(t){var e=this;t&&(this.timer&&(clearTimeout(this.timer),this.timer=null),this.setTooltipText(""),this.timer=setTimeout(function(){if(-1!==t.srcElement.className.indexOf("un-selected")){var r=+t.srcElement.getAttribute("data-week"),n=+t.srcElement.getAttribute("data-time");e.$refs.tooltip.style.transform="translate3d("+(-70+t.layerX)+"px, "+(-75+t.layerY)+"px, 0px)",e.setTooltipText(e.week[r]+" "+e.minuteConvertHourText(n*e.interval+e.interval))}},1e3))},setMultipleSelectedTime:function(){if(this.startSrcElement&&this.endSrcElement&&(!this.isStatus(this.NONE)||!this.reset())){var t=+this.startSrcElement.getAttribute("data-week"),e=+this.startSrcElement.getAttribute("data-time"),r=+this.endSrcElement.getAttribute("data-week"),n=+this.endSrcElement.getAttribute("data-time");if(t>r){var a=[r,t];t=a[0],r=a[1]}if(e>n){var i=[n,e];e=i[0],n=i[1]}for(var s=t;s<=r;s++)for(var o=e;o<=n;o++){this.currentValue[s]||this.$set(this.currentValue,s,[]);var c=this.currentValue[s].indexOf(o);-1!==c&&this.isActive?this.currentValue[s].splice(c,1):-1!==c||this.isActive||this.currentValue[s].push(o)}for(var u=0;u<this.currentValue.length;u++)this.currentValue[u]||this.currentValue.splice(u,1,[]);for(var l=7-this.currentValue.length,d=0;d<l;d++)this.currentValue.push([]);this.$emit("change",this.currentValue)}},clearSelectedTime:function(){var t=this;this.currentValue.forEach(function(e,r){return t.$set(t.currentValue,r,[])})},reset:function(){this.startSrcElement=null,this.endSrcElement=null},minuteConvertHourText:function(t){var e=t/60,r=e.toString().split(".");return 1===r.length?e<10?"0"+e+":00":e+":00":e<10?"0"+r[0]+":"+60*r[1]/10:r[0]+":"+60*r[1]/10}},watch:{currentValue:function(t,e){t&&this.setTimesData()}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(2);n.a.install=function(t){t.component(n.a.name,n.a)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(n.a),e.default=n.a},function(t,e,r){"use strict";function n(t){r(3)}var a=r(0),i=r(9),s=r(8),o=n,c=s(a.a,i.a,!1,o,"data-v-fa572c9a",null);e.a=c.exports},function(t,e,r){var n=r(4);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(6)("ec4f51c4",n,!0,{})},function(t,e,r){e=t.exports=r(5)(!1),e.push([t.i,".time-editor .calendar[data-v-fa572c9a]{background-color:#fff;-webkit-user-select:none;position:relative;display:inline-block}.time-editor .calendar .week-td[data-v-fa572c9a]{width:70px}.time-editor .calendar .calendar-table[data-v-fa572c9a]{border-collapse:collapse}.time-editor .calendar .calendar-table td[data-v-fa572c9a],.time-editor .calendar .calendar-table th[data-v-fa572c9a],.time-editor .calendar .calendar-table tr[data-v-fa572c9a]{border:1px solid #dee4f5;font-size:12px;text-align:center;min-width:12px;line-height:1.8em;-webkit-transition:background .2s ease;-moz-transition:background .2s ease;-ms-transition:background .2s ease;transition:background .2s ease}.time-editor .calendar .calendar-table td.un-selected[data-v-fa572c9a]{background:#f5f5f5}.time-editor .calendar .calendar-table td.active[data-v-fa572c9a]{background:#2d8cf0}.time-editor .calendar .calendar-table .clear-bar[data-v-fa572c9a]{line-height:2.4em;padding:0 18px}.time-editor .calendar .calendar-table .clear-bar .pull-left[data-v-fa572c9a]{float:left}.time-editor .calendar .calendar-table .clear-bar .pull-right[data-v-fa572c9a]{float:right}.time-editor .calendar .calendar-table-hour td[data-v-fa572c9a],.time-editor .calendar .calendar-table-hour th[data-v-fa572c9a],.time-editor .calendar .calendar-table-hour tr[data-v-fa572c9a]{min-width:18px}.time-editor .byted-popover[data-v-fa572c9a]{width:128px;padding:12px 0}.time-editor .byted-popover .bui-popover-arrow[data-v-fa572c9a]{bottom:7px;border-top-width:0;border-right-width:1px;border-bottom-width:1px;border-left-width:0;box-shadow:3px 3px 7px 0 #d4d7e4;left:59px;position:absolute;width:10px;height:10px;background-color:#fff;transform:rotate(45deg);border-radius:2px;border:none}.time-editor .byted-popover .bui-popover-panel[data-v-fa572c9a]{padding:15px 20px;background-color:#fff;border-radius:2px;border:1px solid #dee4f5;box-shadow:0 3px 7px 0 #d4d7e4}",""])},function(t,e){function r(t,e){var r=t[1]||"",a=t[3];if(!a)return r;if(e&&"function"==typeof btoa){var i=n(a);return[r].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([i]).join("\n")}return[r].join("\n")}function n(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=r(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(n[i]=!0)}for(a=0;a<t.length;a++){var s=t[a];"number"==typeof s[0]&&n[s[0]]||(r&&!s[2]?s[2]=r:r&&(s[2]="("+s[2]+") and ("+r+")"),e.push(s))}},e}},function(t,e,r){function n(t){for(var e=0;e<t.length;e++){var r=t[e],n=l[r.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](r.parts[a]);for(;a<r.parts.length;a++)n.parts.push(i(r.parts[a]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var s=[],a=0;a<r.parts.length;a++)s.push(i(r.parts[a]));l[r.id]={id:r.id,refs:1,parts:s}}}}function a(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function i(t){var e,r,n=document.querySelector("style["+b+'~="'+t.id+'"]');if(n){if(h)return m;n.parentNode.removeChild(n)}if(g){var i=p++;n=f||(f=a()),e=s.bind(null,n,i,!1),r=s.bind(null,n,i,!0)}else n=a(),e=o.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}function s(t,e,r,n){var a=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=x(e,a);else{var i=document.createTextNode(a),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function o(t,e){var r=e.css,n=e.media,a=e.sourceMap;if(n&&t.setAttribute("media",n),v.ssrId&&t.setAttribute(b,e.id),a&&(r+="\n/*# sourceURL="+a.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=r(7),l={},d=c&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,h=!1,m=function(){},v=null,b="data-vue-ssr-id",g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,r,a){h=r,v=a||{};var i=u(t,e);return n(i),function(e){for(var r=[],a=0;a<i.length;a++){var s=i[a],o=l[s.id];o.refs--,r.push(o)}e?(i=u(t,e),n(i)):i=[];for(var a=0;a<r.length;a++){var o=r[a];if(0===o.refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete l[o.id]}}}};var x=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var r=[],n={},a=0;a<e.length;a++){var i=e[a],s=i[0],o=i[1],c=i[2],u=i[3],l={id:t+":"+a,css:o,media:c,sourceMap:u};n[s]?n[s].parts.push(l):r.push(n[s]={id:s,parts:[l]})}return r}},function(t,e){t.exports=function(t,e,r,n,a,i){var s,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(s=t,o=t.default);var u="function"==typeof o?o.options:o;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),r&&(u.functional=!0),a&&(u._scopeId=a);var l;if(i?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=l):n&&(l=n),l){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),f(t,e)}):u.beforeCreate=f?[].concat(f,l):[l]}return{esModule:s,exports:o,options:u}}},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"time-editor"},[r("div",{staticClass:"calendar"},[r("table",{staticClass:"calendar-table",class:{"calendar-table-hour":60===t.interval}},[r("thead",{staticClass:"calendar-head"},[r("tr",[r("th",{staticClass:"week-td",attrs:{rowspan:"8"}},[t._v("星期/时间")]),t._v(" "),r("th",{attrs:{colspan:12*t.colspan}},[t._v("00:00 - 12:00")]),t._v(" "),r("th",{attrs:{colspan:12*t.colspan}},[t._v("12:00 - 24:00")])]),t._v(" "),r("tr",t._l(t.hourList,function(e){return r("td",{key:e,attrs:{colspan:t.colspan}},[t._v(t._s(e))])}))]),t._v(" "),r("tbody",{staticClass:"calendar-body",on:{mousedown:function(e){t.mouseDownHandler(e)},mouseup:function(e){t.mouseUpHandler(e)},mousemove:function(e){t.mouseMoveHandler(e)}}},[t._l(t.week,function(e,n){return r("tr",{key:n},[r("td",[t._v(t._s(e))]),t._v(" "),t._l(t.timeList,function(e){return r("td",{key:e,staticClass:"un-selected",class:{active:t.currentValue[n]&&-1!==t.currentValue[n].indexOf(e)},attrs:{"data-week":n,"data-time":e}})})],2)}),t._v(" "),r("tr",[r("td",{staticClass:"clear-bar",attrs:{colspan:this.timeList.length+1}},[r("span",{staticClass:"pull-left"},[t._v("可拖动鼠标选择时间段")]),t._v(" "),r("a",{staticClass:"pull-right",attrs:{href:"javascript:void(0)"},on:{mouseup:function(e){return e.stopPropagation(),t.clearSelectedTime(e)},mousedown:function(t){t.stopPropagation()}}},[t._v("清空选择")])])])],2)])])])},a=[],i={render:n,staticRenderFns:a};e.a=i}])});
//# sourceMappingURL=vue-time-editor.js.map