jQuery.webshims.register("form-datalist",function(b,c,l,d,q){c.propTypes.element=function(d){c.createPropDefault(d,"attr");if(!d.prop)d.prop={get:function(){var c=d.attr.get.call(this);c&&(c=b("#"+c)[0])&&d.propNodeName&&!b.nodeName(c,d.propNodeName)&&(c=null);return c||null},writeable:!1}};(function(){if(!Modernizr.input.list){var j=0,n={submit:1,button:1,reset:1,hidden:1,range:1,date:1},p=b.browser.msie&&7>parseInt(b.browser.version,10),k={},m=function(b){if(!b)return[];if(k[b])return k[b];var a;
c.ready("json-storage",function(){try{a=JSON.parse(localStorage.getItem("storedDatalistOptions"+b))}catch(e){}k[b]=a||[]});return a||[]},s={_create:function(h){if(!n[(h.input.getAttribute("type")||"").toLowerCase()||h.input.type]){var a=h.datalist,e=b.data(h.input,"datalistWidget");if(a&&e&&e.datalist!==a)e.datalist=a,e.id=h.id,e._resetListCached();else if(a){if(!(e&&e.datalist===a)){j++;var g=this;this.timedHide=function(){clearTimeout(g.hideTimer);g.hideTimer=setTimeout(b.proxy(g,"hideList"),9)};
this.datalist=a;this.id=h.id;this.hasViewableData=!0;this._autocomplete=b.attr(h.input,"autocomplete");b.data(h.input,"datalistWidget",this);this.shadowList=b('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=h.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(a){var e=b("li:not(.hidden-item)",g.shadowList),h="mousedown"==a.type||"click"==a.type;g.markItem(e.index(a.target),h,e);"click"==
a.type&&g.hideList();return"mousedown"!=a.type}).bind("focusout",this.timedHide);h.input.setAttribute("autocomplete","off");b(h.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",b.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(a){var e=a.keyCode;if(40==e&&!g.showList())return g.markItem(g.index+1,!0),!1;if(g.isListVisible){if(38==e)return g.markItem(g.index-1,!0),!1;if(!a.shiftKey&&(33==e||36==e))return g.markItem(0,!0),!1;if(!a.shiftKey&&(34==e||35==e))return a=
b("li:not(.hidden-item)",g.shadowList),g.markItem(a.length-1,!0,a),!1;if(13==e||27==e)return 13==e&&(a=b("li.active-item:not(.hidden-item)",g.shadowList),a[0]&&(b.prop(g.input,"value",a.attr("data-value")),b(g.input).triggerHandler("updateInput"))),g.hideList(),!1}}).bind("focus.datalistWidget",function(){b(this).hasClass("list-focus")&&g.showList()}).bind("blur.datalistWidget",this.timedHide);b(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",b.proxy(this,
"_resetListCached"));this._resetListCached();h.input.form&&h.input.id&&b(h.input.form).bind("submit.datalistWidget"+h.input.id,function(){var a=b.prop(h.input,"value");g.storedOptions=m(h.input.name||h.input.id);if(a&&-1==g.storedOptions.indexOf(a)){g.storedOptions.push(a);var a=h.input.name||h.input.id,e=g.storedOptions;if(a){e=e||[];try{localStorage.setItem("storedDatalistOptions"+a,JSON.stringify(e))}catch(c){}}}});b(l).bind("unload",function(){g.destroy()})}}else e&&e.destroy()}},destroy:function(){var h=
b.attr(this.input,"autocomplete");b(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();b(d).unbind(".datalist"+this.id);this.input.form&&this.input.id&&b(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");h===q?this.input.removeAttribute("autocomplete"):b(this.input).attr("autocomplete",h)},_resetListCached:function(b){var a=this;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";if(!this.updateTimer)this.updateTimer=
setTimeout(function(){a.updateListOptions(b&&d.activeElement==a.input);a=null},0)},updateListOptions:function(h){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:b.curCSS(this.input,"fontSize"),fontFamily:b.curCSS(this.input,"fontFamily")});for(var a=[],e=[],g=[],c,d=b("option",this.datalist),j=0,x=b("option",this.datalist).length;j<x;j++){c=d[j];if(c.disabled)return;c={value:b(c).val()||"",text:b.trim(b.attr(c,"label")||c.textContent||c.innerText||
b.text([c])||""),className:c.className||"",style:b.attr(c,"style")||""};if(!c.text)c.text=c.value;e[j]=c.value;g[j]=c}this.storedOptions=m(this.input.name||this.input.id);this.storedOptions.forEach(function(a){-1==e.indexOf(a)&&g.push({value:a,text:a,className:"",style:""})});g.forEach(function(b,e){var f=-1!=b.value.indexOf('"')?"'"+b.value+"'":'"'+b.value+'"';a[e]="<li data-value="+f+' class="'+b.className+'" style="'+b.style+'" tabindex="-1" role="listitem">'+b.text+"</li>"});this.arrayOptions=
g;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+a.join("\n")+"</ul>");b.fn.bgIframe&&p&&this.shadowList.bgIframe();(h||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(){var c=b.prop(this.input,"value").toLowerCase();if(!(c===this.lastUpdatedValue||this.lastUnfoundValue&&0===c.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=c;var a=!1,e=b("li",this.shadowList);c?this.arrayOptions.forEach(function(g,d){if(!("lowerText"in
g))g.lowerText=g.text.toLowerCase(),g.lowerValue=g.value.toLowerCase();-1!==g.lowerText.indexOf(c)||-1!==g.lowerValue.indexOf(c)?(b(e[d]).removeClass("hidden-item"),a=!0):b(e[d]).addClass("hidden-item")}):(e.removeClass("hidden-item"),a=!0);(this.hasViewableData=a)?this.showList():(this.lastUnfoundValue=c,this.hideList())}},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return!1;var c=this,a=b(this.input).offset();
a.top+=b(this.input).outerHeight();a.width=b(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);p&&(this.shadowList.css("height","auto"),250<this.shadowList.height()&&this.shadowList.css("height",220));this.shadowList.css(a).addClass("datalist-visible");this.isListVisible=!0;b(d).bind("mousedown.datalist"+this.id+" focusin.datalist"+this.id,function(a){a.target===c.input||c.shadowList[0]===a.target||b.contains(c.shadowList[0],
a.target)?(clearTimeout(c.hideTimer),setTimeout(function(){clearTimeout(c.hideTimer)},0)):c.timedHide()});return!0},hideList:function(){if(!this.isListVisible)return!1;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=!1;b(this.input).removeAttr("aria-activedescendant");b(d).unbind(".datalist"+this.id);return!0},scrollIntoView:function(c){var a=b("> ul",this.shadowList),e=c.position();e.top-=
(parseInt(a.css("paddingTop"),10)||0)+(parseInt(a.css("marginTop"),10)||0)+(parseInt(a.css("borderTopWidth"),10)||0);0>e.top?this.shadowList.scrollTop(this.shadowList.scrollTop()+e.top-2):(e.top+=c.outerHeight(),c=this.shadowList.height(),e.top>c&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(e.top-c)+2))},markItem:function(c,a,e){e=e||b("li:not(.hidden-item)",this.shadowList);if(e.length)0>c?c=e.length-1:c>=e.length&&(c=0),e.removeClass("active-item"),this.shadowList.addClass("list-item-active"),
e=e.filter(":eq("+c+")").addClass("active-item"),a&&(b.prop(this.input,"value",e.attr("data-value")),b.attr(this.input,"aria-activedescendant",b.webshims.getID(e)),b(this.input).triggerHandler("updateInput"),this.scrollIntoView(e)),this.index=c}};(function(){c.defineNodeNameProperties("input",{list:{attr:{get:function(){var b=c.contentAttr(this,"list");return null==b?q:b},set:function(h){c.contentAttr(this,"list",h);c.objectCreate(s,q,{input:this,id:h,datalist:b.prop(this,"list")})}},initAttr:!0,
reflect:!0,propType:"element",propNodeName:"datalist"},selectedOption:{prop:{writeable:!1,get:function(){var c=b.prop(this,"list"),a=null,e;if(!c)return a;e=b.attr(this,"value");if(!e)return a;c=b.prop(c,"options");if(!c.length)return a;b.each(c,function(c,d){if(e==b.prop(d,"value"))return a=d,!1});return a}}},autocomplete:{attr:{get:function(){var c=b.data(this,"datalistWidget");return c?c._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(c){var a=
b.data(this,"datalistWidget");a?(a._autocomplete=c,"off"==c&&a.hideList()):"autocomplete"in this?this.autocomplete=c:this.setAttribute("autocomplete",c)}}}});c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c=b("select",this);return c[0]?c[0].options:[]}}});c.addReady(function(c,a){a.filter("select, option").each(function(){var a=this.parentNode,c=b.nodeName(a,"datalist");if(a&&!c)a=a.parentNode,c=b.nodeName(a,"datalist");a&&c&&b(a).triggerHandler("updateDatalist")})})})()}})()});
jQuery.webshims.register("form-extend",function(b,c,l,d,q,j){var n=l.Modernizr,l=n.inputtypes;if(n.formvalidation){var p=c.inputTypes,k={};c.addInputType=function(a,b){p[a]=b};c.addValidityRule=function(a,b){k[a]=b};c.addValidityRule("typeMismatch",function(a,b,c,f){if(""===b)return!1;f=f.typeMismatch;if(!("type"in c))c.type=(a[0].getAttribute("type")||"").toLowerCase();p[c.type]&&p[c.type].mismatch&&(f=p[c.type].mismatch(b,a));return f});var m=j.overrideMessages,s=!n.requiredSelect||!l.number||!l.time||
!l.range||m,h="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),j=m?["value","checked"]:["value"],a=m?["textarea"]:[],e=function(a,c){if(a){var e=(a.getAttribute&&a.getAttribute("type")||a.type||"").toLowerCase();if(m||!(n.requiredSelect||"select-one"!=e)||p[e])m&&!c&&"radio"==e&&a.name?b(d.getElementsByName(a.name)).each(function(){b.prop(this,"validity")}):b.prop(a,"validity")}},g={};["input","textarea","select"].forEach(function(a){var y=
c.defineNodeNameProperty(a,"setCustomValidity",{prop:{value:function(i){var i=i+"",f="input"==a?b(this).getNativeElement()[0]:this;y.prop._supvalue.call(f,i);c.bugs.validationMessage&&c.data(f,"customvalidationMessage",i);s&&(c.data(f,"hasCustomError",!!i),e(f))}}});g[a]=y.prop._supvalue});if(s||!n.input.valueAsNumber||m)j.push("min"),j.push("max"),j.push("step"),a.push("input");if(!n.requiredSelect||m)j.push("required"),a.push("select");if(s){var u;a.forEach(function(a){var e=c.defineNodeNameProperty(a,
"validity",{prop:{get:function(){if(!u){var i="input"==a?b(this).getNativeElement()[0]:this,f=e.prop._supget.call(i);if(!f)return f;var o={};h.forEach(function(a){o[a]=f[a]});if(!b.prop(i,"willValidate"))return o;u=!0;var d=b(i),A={type:(i.getAttribute&&i.getAttribute("type")||"").toLowerCase(),nodeName:(i.nodeName||"").toLowerCase()},j=d.val(),r=!!c.data(i,"hasCustomError"),t;u=!1;o.customError=r;if(o.valid&&o.customError)o.valid=!1;else if(!o.valid){var z=!0;b.each(o,function(a,b){if(b)return z=
!1});if(z)o.valid=!0}b.each(k,function(b,f){o[b]=f(d,j,A,o);if(o[b]&&(o.valid||!t))g[a].call(i,c.createValidationMessage(i,b)),o.valid=!1,t=!0});o.valid?(g[a].call(i,""),c.data(i,"hasCustomError",!1)):m&&!t&&!r&&b.each(o,function(b,f){if("valid"!==b&&f)return g[a].call(i,c.createValidationMessage(i,b)),!1});return o}},writeable:!1}})});j.forEach(function(b){c.onNodeNamesPropertyModify(a,b,function(){e(this)})});if(d.addEventListener){var v;d.addEventListener("change",function(a){clearTimeout(v);e(a.target)},
!0);d.addEventListener("input",function(a){clearTimeout(v);v=setTimeout(function(){e(a.target)},290)},!0)}var w=a.join(",");c.addReady(function(a,c){b(w,a).add(c.filter(w)).each(function(){b.prop(this,"validity")})});m&&c.ready("DOM form-message",function(){c.activeLang({register:"form-core",callback:function(){b("input, select, textarea").getNativeElement().each(function(){if(!c.data(this,"hasCustomError")){var a=this,e=b.prop(a,"validity")||{valid:!0},i;e.valid||(i=(a.nodeName||"").toLowerCase(),
b.each(e,function(b,e){if("valid"!==b&&e)return g[i].call(a,c.createValidationMessage(a,b)),!1}))}})}})})}}});
jQuery.webshims.register("form-number-date-api",function(b,c){c.getStep=function(a,c){var g=b.attr(a,"step");if("any"===g)return g;c=c||n(a);if(!d[c]||!d[c].step)return g;g=h.number.asNumber(g);return(!isNaN(g)&&0<g?g:d[c].step)*d[c].stepScaleFactor};c.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=d[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in d[c.type]&&(c[a+"AsNumber"]=d[c.type][a+"Default"]))};var l=parseInt("NaN",10),d=c.inputTypes,q=function(a){return"number"==
typeof a||a&&a==1*a},j=function(a){return Modernizr.input.valueAsNumber&&b('<input type="'+a+'" />').prop("type")===a},n=function(a){return(a.getAttribute("type")||"").toLowerCase()},p=c.addMinMaxNumberToCache,k=function(a,b){for(var a=""+a,b=b-a.length,c=0;c<b;c++)a="0"+a;return a};c.addValidityRule("stepMismatch",function(a,b,g,h){if(""===b)return!1;if(!("type"in g))g.type=n(a[0]);if("date"==g.type)return!1;h=(h||{}).stepMismatch;if(d[g.type]&&d[g.type].step){if(!("step"in g))g.step=c.getStep(a[0],
g.type);if("any"==g.step)return!1;if(!("valueAsNumber"in g))g.valueAsNumber=d[g.type].asNumber(b);if(isNaN(g.valueAsNumber))return!1;p("min",a,g);a=g.minAsNumber;isNaN(a)&&(a=d[g.type].stepBase||0);h=Math.abs((g.valueAsNumber-a)%g.step);h=!(1.0E-7>=h||1.0E-7>=Math.abs(h-g.step))}return h});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){c.addValidityRule(a.name,function(b,c,h,j){j=(j||{})[a.name]||!1;if(""===c)return j;if(!("type"in h))h.type=
n(b[0]);if(d[h.type]&&d[h.type].asNumber){if(!("valueAsNumber"in h))h.valueAsNumber=d[h.type].asNumber(c);if(isNaN(h.valueAsNumber))return!1;p(a.attr,b,h);if(isNaN(h[a.attr+"AsNumber"]))return j;j=h[a.attr+"AsNumber"]*a.factor<h.valueAsNumber*a.factor-1.0E-7}return j})});c.reflectProperties(["input"],["max","min","step"]);var m=c.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=n(this),a=d[a]&&d[a].asNumber?d[a].asNumber(b.prop(this,"value")):m.prop._supget&&m.prop._supget.apply(this,
arguments);null==a&&(a=l);return a},set:function(a){var e=n(this);d[e]&&d[e].numberToString?isNaN(a)?b.prop(this,"value",""):(e=d[e].numberToString(a),!1!==e?b.prop(this,"value",e):c.warn("INVALID_STATE_ERR: DOM Exception 11")):m.prop._supset&&m.prop._supset.apply(this,arguments)}}}),s=c.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=n(this);return d[a]&&d[a].asDate&&!d[a].noAsDate?d[a].asDate(b.prop(this,"value")):s.prop._supget&&s.prop._supget.call(this)||null},set:function(a){var e=
n(this);if(d[e]&&d[e].dateToString&&!d[e].noAsDate){if(null===a)return b.prop(this,"value",""),"";e=d[e].dateToString(a);if(!1!==e)return b.prop(this,"value",e),e;c.warn("INVALID_STATE_ERR: DOM Exception 11")}else return s.prop._supset&&s.prop._supset.apply(this,arguments)||null}}}),h={number:{mismatch:function(a){return!q(a)},step:1,stepScaleFactor:1,asNumber:function(a){return q(a)?1*a:l},numberToString:function(a){return q(a)?a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||
!a.split||!/\d$/.test(a))return!0;var c=a.split(/\u002D/);if(3!==c.length)return!0;var g=!1;b.each(c,function(a,b){if(!(q(b)||b&&b=="0"+1*b))return g=!0,!1});if(g)return g;if(4!==c[0].length||2!=c[1].length||12<c[1]||2!=c[2].length||33<c[2])g=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,b){var c=l;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-
1,a[2]);return c},numberToString:function(a){return q(a)?this.dateToString(new Date(1*a)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+k(a.getUTCMonth()+1,2)+"-"+k(a.getUTCDate(),2):!1}},time:{mismatch:function(a,c){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(2>a.length||3<a.length)return!0;var g=!1,d;a[2]&&(a[2]=a[2].split(/\u002E/),d=parseInt(a[2][1],10),a[2]=a[2][0]);b.each(a,function(a,b){if(!(q(b)||b&&b=="0"+1*b)||2!==b.length)return g=!0,!1});
if(g||23<a[0]||0>a[0]||59<a[1]||0>a[1]||a[2]&&(59<a[2]||0>a[2])||d&&isNaN(d))return!0;d&&(100>d?d*=100:10>d&&(d*=10));return!0===c?[a,d]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=l,a=this.mismatch(a,!0);!0!==a&&(b=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(b+=a[1]));return b},dateToString:function(a){if(a&&a.getUTCHours){var b=k(a.getUTCHours(),2)+":"+k(a.getUTCMinutes(),2),c=a.getSeconds();
"0"!=c&&(b+=":"+k(c,2));c=a.getUTCMilliseconds();"0"!=c&&(b+="."+k(c,3));return b}return!1}},"datetime-local":{mismatch:function(a,b){if(!a||!a.split||2!==(a+"special").split(/\u0054/).length)return!0;a=a.split(/\u0054/);return d.date.mismatch(a[0])||d.time.mismatch(a[1],b)},noAsDate:!0,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=l,c=this.mismatch(a,!0);!0!==c&&(a=a.split(/\u0054/)[0].split(/\u002D/),b=Date.UTC(a[0],a[1]-1,a[2],c[0][0],c[0][1],
c[0][2]||0),c[1]&&(b+=c[1]));return b},dateToString:function(a,b){return d.date.dateToString(a)+"T"+d.time.dateToString(a,b)}}};(c.bugs.valueAsNumberSet||!j("number"))&&c.addInputType("number",h.number);(c.bugs.valueAsNumberSet||!j("range"))&&c.addInputType("range",b.extend({},h.number,h.range));(c.bugs.valueAsNumberSet||!j("date"))&&c.addInputType("date",h.date);(c.bugs.valueAsNumberSet||!j("time"))&&c.addInputType("time",b.extend({},h.date,h.time));(c.bugs.valueAsNumberSet||!j("datetime-local"))&&
c.addInputType("datetime-local",b.extend({},h.date,h.time,h["datetime-local"]))});
jQuery.webshims.register("form-number-date-ui",function(b,c,l,d,q){var j=c.triggerInlineForm,n=Modernizr.inputtypes,p=function(){var a={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},b=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(c,e){var g,d,h;d="width";b&&(d=a[c.css(b)]||d);g=c[d]();d="width"==d;if(g){var r=parseInt(e.css("marginLeft"),10)||0,t=e.outerWidth();(h=parseInt(c.css("marginRight"),10)||0)&&c.css("marginRight",0);r<=-1*t?(e.css("marginRight",
Math.floor(Math.abs(t+r)+h)),c.css("paddingRight",(parseInt(c.css("paddingRight"),10)||0)+Math.abs(r)),d&&c.css("width",Math.floor(g+r))):(e.css("marginRight",h),c.css("width",Math.floor(g-r-t)))}}}(),k=b.webshims.cfg["forms-ext"],m={dateFormat:"yy-mm-dd"},s=b([]),h,a=function(e,i){b("input",e).add(i.filter("input")).each(function(){var f=b.prop(this,"type");if(a[f]&&!c.data(this,"shadowData"))a[f](b(this))})},e=function(a,c){if(k.lazyDate){var f=b.data(a[0],"setDateLazyTimer");f&&clearTimeout(f);
b.data(a[0],"setDateLazyTimer",setTimeout(function(){a.datepicker("setDate",c);b.removeData(a[0],"setDateLazyTimer");a=null},0))}else a.datepicker("setDate",c)};if(k.lazyDate===q)try{k.lazyDate=b.browser.msie&&9>c.browserVersion||500>b(l).width()&&500>b(l).height()}catch(g){}a.common=function(a,i,f){Modernizr.formvalidation&&a.bind("firstinvalid",function(b){(c.fromSubmit||!h)&&a.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",function(f){!b.isInvalidUIPrevented()&&!f.isDefaultPrevented()&&
(c.validityAlert.showFor(b.target),b.preventDefault(),f.preventDefault());a.unbind("invalid.replacedwidgetbubble")})});var e=a.attr("id"),e={css:{marginRight:a.css("marginRight"),marginLeft:a.css("marginLeft")},outerWidth:a.outerWidth(),label:e?b('label[for="'+e+'"]',a[0].form):s},d=c.getID(e.label);i.addClass(a[0].className);c.addShadowDom(a,i,{data:f||{},shadowFocusElement:b("input.input-datetime-local-date, span.ui-slider-handle",i)[0],shadowChilds:b("input, span.ui-slider-handle",i)});a.after(i).hide();
a[0].form&&b(a[0].form).bind("reset",function(b){b.originalEvent&&!b.isDefaultPrevented()&&setTimeout(function(){a.prop("value",a.prop("value"))},0)});1==i.length&&!b("*",i)[0]&&(i.attr("aria-labeledby",d),e.label.bind("click",function(){i.focus();return!1}));return e};Modernizr.formvalidation&&["input","form"].forEach(function(a){var b=c.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){h=!0;var a=b.prop._supvalue.apply(this,arguments);h=!1;return a}}})});if(!n["datetime-local"]||
k.replaceUI){var u=[0.595,0.395],v=[0.565,0.425],w=!b.browser.msie||6<c.browserVersion?0:0.45,x=function(a,i,f,e){var g,h,j=function(){r.dpDiv.unbind("mousedown.webshimsmousedownhandler");h=g=!1},r=i.bind("focusin",function(){j();r.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",function(){g=!0})}).bind("focusout blur",function(a){g&&(h=!0,a.stopImmediatePropagation())}).datepicker(b.extend({onClose:function(){h&&d.activeElement!==i[0]?(j(),i.trigger("focusout"),
i.triggerHandler("blur")):j()}},m,k.datepicker,a.data("datepicker"))).bind("change",f).data("datepicker");r.dpDiv.addClass("input-date-datepicker-control");e&&c.triggerDomUpdate(e[0]);["disabled","min","max","value","step"].forEach(function(b){var c=a.prop(b);""!==c&&("disabled"!=b||!c)&&a.prop(b,c)});return r};a["datetime-local"]=function(c){if(b.fn.datepicker){var i=b('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),
f=this.common(c,i,a["datetime-local"].attrs),e=b("input.input-datetime-local-date",i),d=x(c,e,function(f){var d=e.prop("value")||"",g="";if(k.lazyDate){var h=b.data(e[0],"setDateLazyTimer");h&&(clearTimeout(h),b.removeData(e[0],"setDateLazyTimer"))}if(d){g=b("input.input-datetime-local-time",i).prop("value")||"00:00";try{d=(d=b.datepicker.parseDate(e.datepicker("option","dateFormat"),d))?b.datepicker.formatDate("yy-mm-dd",d):e.prop("value")}catch(l){d=e.prop("value")}}a["datetime-local"].blockAttr=
!0;c.prop("value",!d&&!g?"":d+"T"+g);a["datetime-local"].blockAttr=!1;f.stopImmediatePropagation();j(c[0],"input");j(c[0],"change")},i);b("input.input-datetime-local-time",i).bind("change",function(f){var i=b.prop(this,"value"),d=["",""];if(i){d=c.prop("value").split("T");if(2>d.length||!d[0])d[0]=b.datepicker.formatDate("yy-mm-dd",new Date);if(d[1]=i)try{e.prop("value",b.datepicker.formatDate(e.datepicker("option","dateFormat"),b.datepicker.parseDate("yy-mm-dd",d[0])))}catch(g){}}d=!d[0]&&!d[1]?
"":d.join("T");a["datetime-local"].blockAttr=!0;c.prop("value",d);a["datetime-local"].blockAttr=!1;f.stopImmediatePropagation();j(c[0],"input");j(c[0],"change")});i.attr("aria-labeledby",f.label.attr("id"));f.label.bind("click",function(){e.focus();return!1});if(f.css&&(i.css(f.css),f.outerWidth)){i.outerWidth(f.outerWidth);var f=i.width(),g=d.trigger[0]?u:v;e.outerWidth(Math.floor(f*g[0]-w),!0);b("input.input-datetime-local-time",i).outerWidth(Math.floor(f*g[1]-w),!0);d.trigger[0]&&p(e,d.trigger)}}};
a["datetime-local"].attrs={disabled:function(a,c,f){b("input.input-datetime-local-date",c).prop("disabled",!!f);b("input.input-datetime-local-time",c).prop("disabled",!!f)},step:function(a,c,f){b("input.input-datetime-local-time",c).attr("step",f)},min:function(a,c,f){if(f){f=f.split?f.split("T"):[];try{f=b.datepicker.parseDate("yy-mm-dd",f[0])}catch(e){f=!1}}f||(f=null);b("input.input-datetime-local-date",c).datepicker("option","minDate",f)},max:function(a,c,f){if(f){f=f.split?f.split("T"):[];try{f=
b.datepicker.parseDate("yy-mm-dd",f[0])}catch(e){f=!1}}f||(f=null);b("input.input-datetime-local-date",c).datepicker("option","maxDate",f)},value:function(c,d,f){var g;if(f){f=f.split?f.split("T"):[];try{g=b.datepicker.parseDate("yy-mm-dd",f[0])}catch(h){g=!1}}g?(a["datetime-local"].blockAttr||e(b("input.input-datetime-local-date",d),g),b("input.input-datetime-local-time",d).prop("value",f[1]||"00:00")):(b("input.input-datetime-local-date",d).prop("value",f[0]||""),b("input.input-datetime-local-time",
d).prop("value",f[1]||""))}};a.date=function(c){if(b.fn.datepicker){var e=b('<input class="input-date" type="text" />'),f=this.common(c,e,a.date.attrs),d=x(c,e,function(f){a.date.blockAttr=!0;var d;if(k.lazyDate){var g=b.data(e[0],"setDateLazyTimer");g&&(clearTimeout(g),b.removeData(e[0],"setDateLazyTimer"))}try{d=(d=b.datepicker.parseDate(e.datepicker("option","dateFormat"),e.prop("value")))?b.datepicker.formatDate("yy-mm-dd",d):e.prop("value")}catch(h){d=e.prop("value")}c.prop("value",d);a.date.blockAttr=
!1;f.stopImmediatePropagation();j(c[0],"input");j(c[0],"change")});f.css&&(e.css(f.css),f.outerWidth&&e.outerWidth(f.outerWidth),d.trigger[0]&&p(e,d.trigger))}};a.date.attrs={disabled:function(a,c,f){b.prop(c,"disabled",!!f)},min:function(a,c,f){try{f=b.datepicker.parseDate("yy-mm-dd",f)}catch(e){f=!1}f&&b(c).datepicker("option","minDate",f)},max:function(a,c,f){try{f=b.datepicker.parseDate("yy-mm-dd",f)}catch(e){f=!1}f&&b(c).datepicker("option","maxDate",f)},value:function(c,d,f){if(!a.date.blockAttr){try{var g=
b.datepicker.parseDate("yy-mm-dd",f)}catch(h){g=!1}g?e(b(d),g):b.prop(d,"value",f)}}}}if(!n.range||k.replaceUI)a.range=function(c){if(b.fn.slider){var e=b('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),f=this.common(c,e,a.range.attrs);b("span",e).attr("aria-labeledby",f.label.attr("id"));f.label.bind("click",function(){b("span",e).focus();return!1});f.css&&(e.css(f.css),f.outerWidth&&e.outerWidth(f.outerWidth));e.slider(b.extend({},k.slider,c.data("slider"),
{slide:function(b,f){if(b.originalEvent)a.range.blockAttr=!0,c.prop("value",f.value),a.range.blockAttr=!1,j(c[0],"input"),j(c[0],"change")}}));["disabled","min","max","step","value"].forEach(function(a){var f=c.attr(a),e;"value"==a&&!f&&(e=c.getShadowElement())&&(f=(b(e).slider("option","max")-b(e).slider("option","min"))/2);null!=f&&c.attr(a,f)})}},a.range.attrs={disabled:function(a,c,f){f=!!f;b(c).slider("option","disabled",f);b("span",c).attr({"aria-disabled":f+"",tabindex:f?"-1":"0"})},min:function(a,
c,f){f=f?1*f||0:0;b(c).slider("option","min",f);b("span",c).attr({"aria-valuemin":f})},max:function(a,c,f){f=f||0===f?1*f||100:100;b(c).slider("option","max",f);b("span",c).attr({"aria-valuemax":f})},value:function(c,e,f){f=b(c).prop("valueAsNumber");isNaN(f)||(a.range.blockAttr||b(e).slider("option","value",f),b("span",e).attr({"aria-valuenow":f,"aria-valuetext":f}))},step:function(a,c,f){f=f&&b.trim(f)?1*f||1:1;b(c).slider("option","step",f)}};if(!c.bugs.valueAsNumberSet&&(k.replaceUI||!Modernizr.inputtypes.date||
!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))l=function(){c.data(this,"hasShadow")&&b.prop(this,"value",b.prop(this,"value"))},c.onNodeNamesPropertyModify("input","valueAsNumber",l),c.onNodeNamesPropertyModify("input","valueAsDate",l);b.each(["disabled","min","max","value","step"],function(a,b){c.onNodeNamesPropertyModify("input",b,function(a){var e=c.data(this,"shadowData");if(e&&e.data&&e.data[b]&&e.nativeElement===this)e.data[b](this,e.shadowElement,a)})});if(!k.availabeLangs)k.availabeLangs=
"af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");l=function(){b.datepicker&&(c.activeLang({langObj:b.datepicker.regional,module:"form-number-date-ui",callback:function(a){b("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",b.extend(m,a,k.datepicker))}}),b(d).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};
b(d).bind("jquery-uiReady.langchange input-widgetsReady.langchange",l);l();(function(){var a=function(){var a={};return function(c){return c in a?a[c]:a[c]=b('<input type="'+c+'" />')[0].type===c}}();if(!Modernizr.input.valueAsNumber||!a("number")||!a("time")){var e=c.cfg["forms-ext"],f=c.inputTypes,g=function(a,e,d){d=d||{};if(!("type"in d))d.type=b.prop(a,"type");if(!("step"in d))d.step=c.getStep(a,d.type);if(!("valueAsNumber"in d))d.valueAsNumber=f[d.type].asNumber(b.prop(a,"value"));var g="any"==
d.step?f[d.type].step*f[d.type].stepScaleFactor:d.step;c.addMinMaxNumberToCache("min",b(a),d);c.addMinMaxNumberToCache("max",b(a),d);if(isNaN(d.valueAsNumber))d.valueAsNumber=f[d.type].stepBase||0;if("any"!==d.step&&(a=Math.round(1E7*((d.valueAsNumber-(d.minAsnumber||0))%d.step))/1E7)&&Math.abs(a)!=d.step)d.valueAsNumber-=a;a=d.valueAsNumber+g*e;!isNaN(d.minAsNumber)&&a<d.minAsNumber?a=d.valueAsNumber*e<d.minAsNumber?d.minAsNumber:isNaN(d.maxAsNumber)?Number.MAX_VALUE:d.maxAsNumber:!isNaN(d.maxAsNumber)&&
a>d.maxAsNumber&&(a=d.valueAsNumber*e>d.maxAsNumber?d.maxAsNumber:isNaN(d.minAsNumber)?Number.MIN_VALUE:d.minAsNumber);return Math.round(1E7*a)/1E7};c.modules["form-number-date-ui"].getNextStep=g;var h=function(a,c,e){if(!a.disabled&&!a.readOnly&&!b(e).hasClass("step-controls")&&(b.prop(a,"value",f[c].numberToString(g(a,b(e).hasClass("step-up")?1:-1,{type:c}))),b(a).unbind("blur.stepeventshim"),j(a,"input"),d.activeElement)){if(d.activeElement!==a)try{a.focus()}catch(h){}setTimeout(function(){if(d.activeElement!==
a)try{a.focus()}catch(c){}b(a).one("blur.stepeventshim",function(){j(a,"change")})},0)}};if(e.stepArrows){var k={set:function(){var a=c.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};c.onNodeNamesPropertyModify("input","disabled",k);c.onNodeNamesPropertyModify("input","readonly",b.extend({},k))}var l={38:1,40:-1};c.addReady(function(d,k){e.stepArrows&&b("input",d).add(k.filter("input")).each(function(){var d=b.prop(this,"type");
if(f[d]&&f[d].asNumber&&e.stepArrows&&!(!0!==e.stepArrows&&!e.stepArrows[d]||a(d)||b(this).hasClass("has-step-controls"))){var k=this,m=b('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(this).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){h(k,d,a.target);return!1}).bind("mousepressstart mousepressend",function(a){b(a.target)["mousepressstart"==a.type?"addClass":"removeClass"]("mousepress-ui")}),
n=b(this).addClass("has-step-controls").attr({readonly:this.readOnly,disabled:this.disabled,autocomplete:"off",role:"spinbutton"}).bind(b.browser.msie?"keydown":"keypress",function(a){if(!this.disabled&&!this.readOnly&&l[a.keyCode])return b.prop(this,"value",f[d].numberToString(g(this,l[a.keyCode],{type:d}))),j(this,"input"),!1});c.data(this,"step-controls",m);e.calculateWidth&&(p(n,m),m.css("marginTop",(n.outerHeight()-m.outerHeight())/2))}})})}})();c.addReady(function(e,g){b(d).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",
function(){(b.datepicker||b.fn.slider)&&a(e,g);b.datepicker&&b.fn.slider?b(d).unbind(".initinputui"):c.modules["input-widgets"].src||c.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});