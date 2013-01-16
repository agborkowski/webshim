jQuery.webshims.register("spinbtn-ui",function(e,t,n,r,i,s){"use strict";var o=e.webshims.formcfg,u,a=function(t){if(!t.date.monthkeys){var n=function(e,n){var r,i=e+1;r=i<10?"0"+i:""+i,t.date.monthkeys[i]=r,t.date.monthkeys[n]=r};t.date.monthkeys={},e.each(t.date.monthNames,n),e.each(t.date.monthNamesShort,n)}},f=function(t){e(this)[t.type=="mousepressstart"?"addClass":"removeClass"]("mousepress-ui")},l=function(e,t){return typeof e=="number"||e&&e==e*1?e*1:t},c=["step","min","max","readonly","title","disabled","tabindex","value"],h=function(t){if(!u.patterns[t+"Obj"]){var n={};e.each(u.patterns[t].split(u[t+"Format"]),function(e,t){n[t]=e}),u.patterns[t+"Obj"]=n}},p=function(e){return e?(e+="",e.length==1?"0"+e:e):""},d={number:function(e){return(e+"").replace(/\,/g,"").replace(/\./,u.numberFormat["."])},time:function(e){return e},month:function(e,t){var n,r=e.split("-");return r[0]&&r[1]&&(n=u.date[t.monthNames]||u.date.monthNames,r[1]=n[r[1]*1-1],r[1]&&(e=u.date.showMonthAfterYear?r.join(" "):r[1]+" "+r[0])),e},date:function(e){var t=(e+"").split("-");return t[2]&&t[1]&&t[0]&&(e=u.patterns.d.replace("yy",t[0]||""),e=e.replace("mm",t[1]||""),e=e.replace("dd",t[2]||"")),e}},v={number:function(e){return(e+"").replace(u.numberFormat[","],"").replace(u.numberFormat["."],".")},time:function(e){return e},month:function(e){var t=e.trim().split(/[\s-\/\\]+/);return t.length==2&&(t[0]=u.date.monthkeys[t[0]]||t[0],t[1]=u.date.monthkeys[t[1]]||t[1],t[1].length==2?e=t[0]+"-"+t[1]:t[0].length==2&&(e=t[1]+"-"+t[0])),e},date:function(e){h("d");var t,n=u.patterns.dObj;return e=e.split(u.dFormat),e.length==3?[p(e[n.yy]),p(e[n.mm]),p(e[n.dd])].join("-"):""}},m={number:{step:1},time:{step:60},month:{step:1,start:new Date((new Date).getFullYear(),0,1)},date:{step:1,start:new Date((new Date).getFullYear(),0,1)}},g=function(){var t={};return function(n){var r;return t[n]||(r=e('<input type="'+n+'" />'),t[n]=function(e){var t=typeof e=="object"?"valueAsDate":"value";return r.prop(t,e).prop("valueAsNumber")}),t[n]}}();m.range=m.number;var y={_create:function(){var t;this.type=this.options.type,this.orig=this.options.orig,this.elemHelper=e('<input type="'+this.type+'" />'),this.asNumber=g(this.type),this.buttonWrapper=e('<span class="input-buttons '+this.type+'-input-buttons"><span unselectable="on" class="step-controls"><span class="step-up"></span><span class="step-down"></span></span></span>').insertAfter(this.element),typeof m[this.type].start=="object"&&(m[this.type].start=this.asNumber(m[this.type].start));for(t=0;t<c.length;t++)this[c[t]](this.options[c[t]]);var r=this.element.attr("autocomplete","off").data("wsspinner",this);this.addBindings(),e.browser.mozilla&&e(n).on("unload",function(){r.remove()}),this._init=!0},parseValue:function(e){return v[this.type](e)},formatValue:function(e){return d[this.type](e,this.options)},addZero:p,_setStartInRange:function(){var e=m[this.type].start||0;!isNaN(this.minAsNumber)&&e<this.minAsNumber?e=this.minAsNumber:!isNaN(this.maxAsNumber)&&e>this.maxAsNumber&&(e=this.maxAsNumber),this.elemHelper.prop("valueAsNumber",e).prop("value"),this.options.defValue=this.elemHelper.prop("value")},value:function(e){this.valueAsNumber=this.asNumber(e),this.options.value=e,isNaN(this.valueAsNumber)?this._setStartInRange():this.elemHelper.prop("value",e),this.element.prop("value",d[this.type](e,this.options))},list:function(e){this.options.options=e||{}},readonly:function(e){this.options.readonly=!!e,this.element.prop("readonly",this.options.readonly),(this.options.readonly||this._init)&&this.buttonWrapper[this.options.readonly?"addClass":"removeClass"]("ws-readonly")},disabled:function(e){this.options.disabled=!!e,this.element.prop("disabled",this.options.disabled),(this.options.disabled||this._init)&&this.buttonWrapper[this.options.readonly?"addClass":"removeClass"]("ws-disabled")},tabindex:function(e){this.options.tabindex=e,this.element.prop("tabindex",this.options.tabindex)},title:function(e){this.options.title=e,this.element.prop("tabindex",this.options.title)},min:function(e){this.elemHelper.prop("min",e),this.minAsNumber=this.asNumber(e),this.valueAsNumber!=null&&isNaN(this.valueAsNumber)&&this._setStartInRange()},max:function(e){this.elemHelper.prop("max",e),this.maxAsNumber=this.asNumber(e),this.valueAsNumber!=null&&isNaN(this.valueAsNumber)&&this._setStartInRange()},step:function(e){var t=m[this.type];this.elemHelper.prop("step",l(e,t.step))},addBindings:function(){var t,n=this,r=this.options,i=function(){var t={};return{init:function(r,i,s){t[r]||(t[r]={fn:s},e(n.orig).on(r,function(){t[r].val=e.prop(n.orig,"value")})),t[r].val=i},call:function(e,r){t[e]&&t[e].val!=r&&(clearTimeout(t[e].timer),t[e].val=r,t[e].timer=setTimeout(function(){t[e].fn(r,n)},0))}}}(),s=function(){return!r.disabled&&!t&&n.element[0].focus(),a.set(),!1},o={},a=function(e){if(a.prevent)return e.preventDefault(),n.element.focus(),e.stopImmediatePropagation(),!0};a.set=function(){var e,t=function(){a.prevent=!1};return function(){clearTimeout(e),a.prevent=!0,setTimeout(t,9)}}(),["stepUp","stepDown"].forEach(function(e){o[e]=function(o){if(!r.disabled&&!r.readonly){t||s();var u=!1;o||(o=1);try{n.elemHelper[e](o),u=n.elemHelper.prop("value"),n.value(u),i.call("input",u)}catch(a){}return u}}}),this.buttonWrapper.on("mousedown",s),this.setChange=function(e){n.value(e),i.call("input",e),i.call("change",e)},this.element.on({blur:function(s){!a(s)&&!r.disabled&&!r.readonly&&(i.call("input",e.prop(n.orig,"value")),i.call("change",e.prop(n.orig,"value")),a.prevent||(t=!1))},focus:function(){i.init("input",e.prop(n.orig,"value"),n.options.input),i.init("change",e.prop(n.orig,"value"),n.options.change),t=!0},change:function(){var t=v[n.type](e.prop(this,"value"));e.prop(n.orig,"value",t),i.call("input",t),i.call("change",t)},mousewheel:function(e,n){n&&t&&!r.disabled&&(o[n>0?"stepUp":"stepDown"](),e.preventDefault())},keypress:function(e){var t,r=!0,i=e.keyCode;i==38?o.stepUp():i==40?o.stepDown():!e.ctrlKey&&!e.metaKey&&u[n.type+"Signs"]?(t=String.fromCharCode(e.charCode==null?i:e.charCode),r=!(t<" "||(u[n.type+"Signs"]+"0123456789").indexOf(t)>-1)):r=!1,r&&e.preventDefault()},wslocalechange:function(){n.value(n.options.value)}}),e(".step-up",this.buttonWrapper).on({"mousepressstart mousepressend":f,"mousedown mousepress":function(e){o.stepUp()}}),e(".step-down",this.buttonWrapper).on({"mousepressstart mousepressend":f,"mousedown mousepress":function(e){o.stepDown()}})}};o.de={numberFormat:{",":".",".":","},timeSigns:":. ",numberSigns:",",dateSigns:".",dFormat:".",patterns:{d:"dd.mm.yy"},date:{close:"schlie\u00dfen",prevText:"zur\u00fcck",nextText:"Vor",currentText:"heute",monthNames:["Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","M\u00e4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayNamesMin:["So","Mo","Di","Mi","Do","Fr","Sa"],weekHeader:"KW",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},o.en={numberFormat:{".":".",",":","},numberSigns:".",dateSigns:"/",timeSigns:":. ",dFormat:"/",patterns:{d:"mm/dd/yy"},date:{closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},o["en-US"]=o["en-US"]||o.en,o[""]=o[""]||o["en-US"],u=o[""],a(u),e.webshims.ready("dom-extend",function(){e.webshims.activeLang({register:"form-core",callback:function(){e.each(arguments,function(t,n){if(o[n])return u=o[n],a(u),e.event.trigger("wslocalechange"),!1})}})}),e.fn.spinbtnUI=function(t){return t=e.extend({monthNames:"monthNamesShort",size:1,startAt:0,selectNav:!1,openOnFocus:!1},t),this.each(function(){e.webshims.objectCreate(y,{element:{value:e(this)}},t)})}});