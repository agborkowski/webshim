jQuery.webshims.ready("es5",function(a,i,u,q,o){(function(){var e=[],d=a([]);a.extend(i,{getID:function(){var c=(new Date).getTime();return function(b){b=a(b);var h=b.attr("id");if(!h){c++;h="elem-id-"+c;b.attr("id",h)}return h}}(),addReady:function(c){var b=function(h,k){i.ready("DOM",function(){c(h,k)})};e.push(b);b(q,d)},triggerDomUpdate:function(c){if(c&&c.nodeType){var b=c.nodeType;if(!(b!=1&&b!=9)){var h=c!==q?a(c):d;e.forEach(function(k){k(c,h)})}}}});a.fn.htmlWebshim=function(c){c=a.fn.html.call(this,
c?i.fixHTML5(c):c);c===this&&a.isDOMReady&&this.each(function(){this.nodeType==1&&i.triggerDomUpdate(this)});return c};i.fn.html=a.fn.htmlWebshim;["after","before","append","prepend","replaceWith"].forEach(function(c){a.fn[c+"Webshim"]=function(b){b=a(i.fixHTML5(b));a.fn[c].call(this,b);a.isDOMReady&&b.each(function(){this.nodeType==1&&i.triggerDomUpdate(this)});return this};i.fn[c]=a.fn[c+"Webshim"]});a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},
function(c,b){i.fn[c]=function(h){var k=[];h=i(h);var j=this.length===1&&this[0].parentNode;if(j&&j.nodeType===11&&j.childNodes.length===1&&h.length===1){h[b](this[0]);return this}else{j=0;for(var m=h.length;j<m;j++){var s=(j>0?this.clone(true):this).get();i(h[j])[b](s);k=k.concat(s)}return this.pushStack(k,c,h.selector)}}})})();var r=i.modules,n=a.attr,l={},p={};a.attr=function(e,d,c,b,h){var k=(e.nodeName||"").toLowerCase();if(!k||e.nodeType!==1)return n(e,d,c,b,h);var j=l[k],m;if(j)j=j[d];if(!j)if(j=
l["*"])j=j[d];if(j)if(c===o)return j.get?j.get.call(e):j.value;else{if(j.set)m=j.set.call(e,c)}else m=n(e,d,c,b,h);c!==o&&p[k]&&p[k][d]&&a.each(p[k][d],function(s,v){v.call(e,c)});return m};var g=function(e,d,c){l[e]||(l[e]={});var b=l[e][d],h=function(k,j,m){if(j&&j[k])return j[k];if(m&&m[k])return m[k];return function(s){return n(this,d,s)}};l[e][d]=c;if(c.value===o){if(!c.set)c.set=c.writeable?h("set",c,b):function(){throw d+"is readonly on "+e;};if(!c.get)c.get=h("get",c,b)}a.each(["value","get",
"set"],function(k,j){if(c[j])c["_sup"+j]=h(j,b)})},f=function(){var e={},d;i.addReady(function(b,h){var k={},j=function(m){if(!k[m]){k[m]=a(b.getElementsByTagName(m));if(h[0]&&a.nodeName(h[0],m))k[m]=k[m].add(h)}};a.each(e,function(m,s){j(m);s.forEach(function(v){k[m].each(v)})});k=null;d=true});var c=function(b,h){if(e[b])e[b].push(h);else e[b]=[h];d&&a(q.getElementsByTagName(b)).each(h)};return{init:function(b,h,k){c(b,function(){var j=a(this);if(k!=="all")j=j.filter("["+h+"]");j.attr(h,function(m,
s){return s})})}}}();a.extend(i,{defineNodeNameProperty:function(e,d,c,b){c=a.extend({writeable:true,idl:true},c);b&&i.cfg.extendNative&&i.log("could not extend "+e+"["+d+"] fallback to jQuery extend");g(e,d,c);c.init&&i.warn("Error: "+e+"["+d+"] uses desc.init");if(c.content&&1||c.init)f.init(e,d);return c},defineNodeNamesProperty:function(e,d,c,b,h,k){if(typeof e=="string")e=e.split(/\s*,\s*/);e.forEach(function(j){i.defineNodeNameProperty(j,d,c,b,h,k)})},onNodeNamesPropertyModify:function(e,d,
c){if(typeof e=="string")e=e.split(/\s*,\s*/);if(a.isFunction(c))c={set:c};e.forEach(function(b){p[b]||(p[b]={});p[b][d]||(p[b][d]=[]);c.set&&p[b][d].push(c.set);c.init&&i.warn("Error: "+nodeName+"["+d+"] uses desc.init");if(c.content||c.init)f.init(b,d)})},defineNodeNamesBooleanProperty:function(e,d,c,b,h,k){i.defineNodeNamesProperty(e,d,{set:function(j){j=this.readyState==="loading"&&typeof j=="string"&&j===i.contentAttr(this,d)?true:!!j;i.contentAttr(this,d,j);c&&c.set.call(this,j);return j},get:function(){return i.contentAttr(this,
d)!=null}},b,h,k)},contentAttr:function(e,d,c){if(e.nodeName){if(c===o){c=(e.attributes[d]||{}).value;return c==null?o:c}if(typeof c=="boolean")c?e.setAttribute(d,d):e.removeAttribute(d);else e.setAttribute(d,c)}},activeLang:function(){var e=[navigator.browserLanguage||navigator.language||""],d=a("html").attr("lang"),c;d&&e.push(d);return function(b,h,k){if(b)if(!h||!k){if(b!==e[0]){e[0]=b;clearTimeout(c);c=setTimeout(function(){a(q).triggerHandler("webshimLocalizationReady",e)},0)}}else{var j=(h=
r[h].options)&&h.availabeLangs,m=function(s){if(a.inArray(s,j)!==-1){i.loader.loadScript(h.langSrc+s+".js",function(){b[s]&&k(b[s])});return true}return false};a.each(e,function(s,v){var t=v.split("-")[0];if(b[v]||b[t]){k(b[v]||b[t]);return false}if(j&&h.langSrc&&(m(v)||m(t)))return false})}return e}}()});i.isReady("webshimLocalization",true);i.isReady("dom-extend",true)});
(function(a){if(!navigator.geolocation){var i=function(){setTimeout(function(){throw"document.write is overwritten by geolocation shim. This method is incompatibel with this plugin";},1)},u=0,q=a.webshims.cfg.geolocation.options||{};navigator.geolocation=function(){var o,r={getCurrentPosition:function(n,l,p){var g=2,f,e,d,c=function(){if(!d)if(o){d=true;n(a.extend({timestamp:(new Date).getTime()},o));h();if(window.JSON&&window.sessionStorage)try{sessionStorage.setItem("storedGeolocationData654321",
JSON.stringify(o))}catch(m){}}else if(l&&!g){d=true;h();l({code:2,message:"POSITION_UNAVAILABLE"})}},b=function(){g--;k();c()},h=function(){a(document).unbind("google-loader",h);clearTimeout(e);clearTimeout(f)},k=function(){if(o||!window.google||!google.loader||!google.loader.ClientLocation)return false;var m=google.loader.ClientLocation;o={coords:{latitude:m.latitude,longitude:m.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:a.extend({streetNumber:"",
street:"",premises:"",county:"",postalCode:""},m.address)};return true};if(!o){k();if(!(o||!window.JSON||!window.sessionStorage))try{o=(o=sessionStorage.getItem("storedGeolocationData654321"))?JSON.parse(o):false;o.coords||(o=false)}catch(j){o=false}}if(o)setTimeout(c,1);else if(q.confirmText&&!confirm(q.confirmText.replace("{location}",location.hostname)))l&&l({code:1,message:"PERMISSION_DENIED"});else{a.ajax({url:"http://freegeoip.net/json/",dataType:"jsonp",cache:true,jsonp:"callback",success:function(m){g--;
if(m){o=o||{coords:{latitude:m.latitude,longitude:m.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:{city:m.city,country:m.country_name,countryCode:m.country_code,county:"",postalCode:m.zipcode,premises:"",region:m.region_name,street:"",streetNumber:""}};c()}},error:function(){g--;c()}});clearTimeout(e);if(!window.google||!window.google.loader)e=setTimeout(function(){if(q.destroyWrite){document.write=i;document.writeln=i}a(document).one("google-loader",
b);a.webshims.loader.loadScript("http://www.google.com/jsapi",false,"google-loader")},800);else g--;f=p&&p.timeout?setTimeout(function(){h();l&&l({code:3,message:"TIMEOUT"})},p.timeout):setTimeout(function(){g=0;c()},1E4)}},clearWatch:a.noop};r.watchPosition=function(n,l,p){r.getCurrentPosition(n,l,p);u++;return u};return r}()}})(jQuery);jQuery.webshims.gcEval=function(a,i){with(i&&i.form||window)with(i||window)return function(u){eval(u)}.call(i||window,a)};
jQuery.webshims.ready("es5",function(a,i,u,q,o){i.getVisualInput=function(b){b=a(b);return(b.data("inputUIReplace")||{visual:b}).visual};var r=i.getVisualInput,n={checkbox:1,radio:1},l=a([]),p=function(b){b=a(b);return n[b[0].type]&&b[0].name?a(q.getElementsByName(b[0].name)).not(b[0]):l},g={number:1,range:1,date:1,time:1,"datetime-local":1,datetime:1,month:1,week:1};a.extend(a.expr.filters,{"valid-element":function(b){return!!(a.attr(b,"willValidate")&&(a.attr(b,"validity")||{valid:true}).valid)},
"invalid-element":function(b){return!!(a.attr(b,"willValidate")&&!f(b))},"required-element":function(b){return!!(a.attr(b,"willValidate")&&a.attr(b,"required")===true)},"optional-element":function(b){return!!(a.attr(b,"willValidate")&&a.attr(b,"required")===false)},"in-range":function(b){if(!g[a.attr(b,"type")]||!a.attr(b,"willValidate"))return false;b=a.attr(b,"validity");return!!(b&&!b.rangeOverflow&&!b.rangeUnderflow)},"out-of-range":function(b){if(!g[a.attr(b,"type")]||!a.attr(b,"willValidate"))return false;
b=a.attr(b,"validity");return!!(b&&(b.rangeOverflow||b.rangeUnderflow))}});["valid","invalid","required","optional"].forEach(function(b){a.expr.filters[b]=a.expr.filters[b+"-element"]});var f=function(b){return(a.attr(b,"validity")||{valid:true}).valid},e=a.attr,d={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1},c;a.attr=function(b,h,k){if(b.form&&d[h]&&k!==o&&a(b).hasClass("form-ui-invalid")){var j=e.apply(this,arguments);if(f(b)){r(b).removeClass("form-ui-invalid");h=="checked"&&k&&p(b).removeClass("form-ui-invalid").removeAttr("aria-invalid")}return j}return e.apply(this,
arguments)};a(document).bind("focusout change refreshValidityStyle",function(b){if(!(c||!b.target||!b.target.form||b.target.type=="submit")){var h=a.attr(b.target,"html5element")||b.target;if(a.attr(h,"willValidate")){var k,j;if(f(b.target)){k="form-ui-valid";j="form-ui-invalid";n[b.target.type]&&b.target.checked&&p(h).removeClass(j).removeAttr("aria-invalid")}else{k="form-ui-invalid";j="form-ui-valid";n[b.target.type]&&!b.target.checked&&p(h).removeClass(j)}r(h).addClass(k).removeClass(j);c=true;
setTimeout(function(){c=false},9)}else r(h).removeClass("form-ui-invalid form-ui-valid")}});i.triggerInlineForm=function(b,h){var k=b["on"+h]||b.getAttribute("on"+h)||"",j;h=a.Event({type:h,target:b[0],currentTarget:b[0]});if(k&&typeof k=="string")j=i.gcEval(k,b);if(j===false){h.stopPropagation();h.preventDefault()}a(b).trigger(h);return j};u=function(){i.scrollRoot=a.browser.webkit||q.compatMode=="BackCompat"?a(q.body):a(q.documentElement)};u();a(u);i.validityAlert=function(){var b=!a.browser.msie||
parseInt(a.browser.version,10)>7?"span":"label",h={hideDelay:5E3,showFor:function(t,w,x){t=a(t);var y=r(t);v();h.clear();this.getMessage(t,w);this.position(y);k.css({fontSize:t.css("fontSize"),fontFamily:t.css("fontFamily")});this.show();if(this.hideDelay)j=setTimeout(m,this.hideDelay);x||this.setFocus(y,t[0])},setFocus:function(t,w){var x=a("input, select, textarea, .ui-slider-handle",t).filter(":visible:first");x[0]||(x=t);var y=i.scrollRoot.scrollTop(),z=x.offset().top,A;k.attr("for",i.getID(x));
if(y>z){if((A=w.id&&a('label[for="'+w.id+'"]',w.form).offset())&&A.top<z)z=A.top;i.scrollRoot.animate({scrollTop:z-5},{queue:false,duration:Math.max(Math.min(450,(y-z)*2),140)});A=true}try{x[0].focus()}catch(B){}A&&i.scrollRoot.scrollTop(y);a(q).bind("focusout.validityalert",m)},getMessage:function(t,w){a("> span.va-box",k).text(w||t.attr("x-moz-errormessage")||t.attr("data-errormessage")||t.attr("validationMessage"))},position:function(t){var w=t.offset();w.top+=t.outerHeight();k.css(w)},show:function(){k.css("display")===
"none"?k.fadeIn():k.fadeTo(400,1)},hide:function(){h.clear();k.fadeOut()},clear:function(){clearTimeout(j);a(q).unbind("focusout.validityalert");k.stop().removeAttr("for")},alert:a("<"+b+' class="validity-alert" role="alert"><span class="va-arrow"><span class="va-arrow-box" /></span><span class="va-box" /></'+b+">").css({position:"absolute",display:"none"})},k=h.alert,j=false,m=a.proxy(h,"hide"),s=false,v=function(){if(!s){s=true;a(function(){k.appendTo("body")})}};return h}();(function(){var b,h=
[],k;a(q).bind("invalid",function(j){var m=a(j.target).addClass("form-ui-invalid").removeClass("form-ui-valid");if(!b){b=a.Event("firstinvalid");m.trigger(b)}b&&b.isDefaultPrevented()&&j.preventDefault();h.push(j.target);j.extraData="fix";clearTimeout(k);k=setTimeout(function(){var s={type:"lastinvalid",cancelable:false,invalidlist:a(h)};b=false;h=[];a(void 0).unbind("submit.preventInvalidSubmit");m.trigger(s,s)},9)})})();i.isReady("form-core",true)});
jQuery.webshims.ready("form-core dom-extend",function(a,i,u,q){var o=i.validityMessages,r=i.cfg.forms;r=r.overrideMessages||r.customMessages?["customValidationMessage"]:[];o.en=o.en||o["en-US"]||{typeMismatch:{email:"{%value} is not a legal email address",url:"{%value} is not a valid web address",number:"{%value} is not a number!",date:"{%value} is not a date",time:"{%value} is not a time",range:"{%value} is not a number!","datetime-local":"{%value} is not a correct date-time format."},rangeUnderflow:"{%value} is too low. The lowest value you can use is {%min}.",
rangeOverflow:"{%value}  is too high. The highest value you can use is {%max}.",stepMismatch:"The value {%value} is not allowed for this form.",tooLong:"The entered text is too large! You used {%valueLen} letters and the limit is {%maxlength}.",patternMismatch:"{%value} is not in the format this page requires! {%title}",valueMissing:"You have to specify a value"};o["en-US"]=o["en-US"]||o.en;o[""]=o[""]||o["en-US"];o.de=o.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",
url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen.",rangeOverflow:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen.",stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",
tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Buchstaben eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr diese Seite ein falsches Format! {%title}",valueMissing:"Sie m\u00fcssen einen Wert eingeben"};var n=o[""];a(q).bind("webshimLocalizationReady",function(){i.activeLang(o,"form-message",function(l){n=l})});i.createValidationMessage=function(l,p){var g=n[p];if(g&&typeof g!=="string")g=g[(l.getAttribute("type")||"").toLowerCase()]||g.defaultMessage;
g&&["value","min","max","title","maxlength","label"].forEach(function(f){if(g.indexOf("{%"+f)!==-1){var e=(f=="label"?a.trim(a('label[for="'+l.id+'"]',l.form).text()).replace(/\*$|:$/,""):a.attr(l,f))||"";g=g.replace("{%"+f+"}",e);if("value"==f)g=g.replace("{%valueLen}",e.length)}});return g||""};if(!u.noHTMLExtFixes&&!Modernizr.validationmessage||!Modernizr.formvalidation)r.push("validationMessage");r.forEach(function(l){["input","select","textarea","fieldset","output","button"].forEach(function(p){var g=
i.defineNodeNameProperty(p,l,{get:function(){var f=this,e="";if(!a.attr(f,"willValidate"))return e;var d=a.attr(f,"validity")||{valid:1};if(d.valid)return e;if(e=f.getAttribute("x-moz-errormessage")||f.getAttribute("data-errormessage")||"")return e;if(d.customError&&f.nodeName)if(e=Modernizr.validationmessage&&g._supget?g._supget.call(f):a.data(f,"customvalidationMessage"))return e;a.each(d,function(c,b){if(!(c=="valid"||!b))if(e=i.createValidationMessage(f,c))return false});return e||""},set:a.noop},
l=="validationMessage","validity-base","form-message")})});i.isReady("form-message",true)});
jQuery.webshims.ready("form-core dom-extend",function(a,i,u){if(!Modernizr.formvalidation){i.inputTypes=i.inputTypes||{};var q=i.inputTypes,o={radio:1,checkbox:1};i.addInputType=function(g,f){q[g]=f};var r={customError:false,typeMismatch:false,rangeUnderflow:false,rangeOverflow:false,stepMismatch:false,tooLong:false,patternMismatch:false,valueMissing:false,valid:true},n={valueMissing:function(g,f,e){if(!g.attr("required"))return false;var d=false;if(!("type"in e))e.type=(g[0].getAttribute("type")||
g[0].type||"").toLowerCase();return d=e.nodeName=="select"?!f&&g[0].type=="select-one"&&g[0].size<2&&a("> option:first-child:not(:disabled)",g).attr("selected"):o[e.type]?!a(g[0].form&&g[0].name?g[0].form[g[0].name]:[]).filter(":checked")[0]:!f},tooLong:function(g,f,e){if(f===""||e.nodeName=="select")return false;g=g.attr("maxlength");e=false;var d=f.length;if(d&&g>=0&&f.replace&&(typeof g=="number"||g&&g==g*1))e=d>g;return e},typeMismatch:function(g,f,e){if(f===""||e.nodeName=="select")return false;
var d=false;if(!("type"in e))e.type=(g[0].getAttribute("type")||g[0].type||"").toLowerCase();if(q[e.type]&&q[e.type].mismatch)d=q[e.type].mismatch(f,g);return d},patternMismatch:function(g,f,e){if(f===""||e.nodeName=="select")return false;g=g.attr("pattern");if(!g)return false;return!RegExp("^(?:"+g+")$").test(f)}};i.addValidityRule=function(g,f){n[g]=f};i.defineNodeNamesProperty(["input","textarea","select","form","fieldset"],"checkValidity",{value:function(){var g,f=function(e){var d,c=a.attr(e,
"validity");if(c)a.data(e,"cachedValidity",c);else return true;if(!c.valid){d=a.Event("invalid");var b=a(e).trigger(d);if(!g&&!d.isDefaultPrevented()){i.validityAlert.showFor(b);g=true}}a.data(e,"cachedValidity",false);return c.valid};return function(){g=false;if(a.nodeName(this,"form")){for(var e=true,d=this.elements||a("input, textarea, select",this),c=0,b=d.length;c<b;c++)f(d[c])||(e=false);return e}else return this.form&&!a.nodeName(this,"fieldset")?f(this):true}}()},true);i.defineNodeNamesProperty(["input",
"textarea","select","fieldset","button","output"],"setCustomValidity",{value:function(g){a.data(this,"customvalidationMessage",""+g)}},true);a.event.special.invalid={add:function(){a.data(this,"invalidEventShim")||a.event.special.invalid.setup.call(this)},setup:function(){a(this).bind("submit",a.event.special.invalid.handler).data("invalidEventShim",true);var g=a(this).data("events").submit;g&&g.length>1&&g.unshift(g.pop())},teardown:function(){a(this).unbind("submit",a.event.special.invalid.handler).data("invalidEventShim",
false)},handler:function(g){if(!(g.type!="submit"||!a.nodeName(g.target,"form")||a.attr(g.target,"novalidate")!=null||a.data(g.target,"novalidate")))if(!a(g.target).checkValidity()){!g.originalEvent&&u.console&&console.log&&console.log("submit");g.stopImmediatePropagation();return false}}};i.addInputType("email",{mismatch:function(){var g=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|(\x22((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?\x22))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
return function(f){return!g.test(f)}}()});i.addInputType("url",{mismatch:function(){var g=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
return function(f){return!g.test(f)}}()});i.defineNodeNamesProperty(["input","select","textarea","fieldset","button","output"],"willValidate",{get:function(){var g={button:1,reset:1,add:1,remove:1,"move-up":1,"move-down":1,hidden:1},f={fieldset:1,button:1,output:1};return function(){return!!(this.form&&!this.disabled&&!this.readOnly&&!g[this.type]&&!f[(this.nodeName||"").toLowerCase()]&&a.attr(this.form,"novalidate")==null)}}()},true,"validity-base","form-extend");i.defineNodeNamesBooleanProperty(["input",
"textarea","select"],"required",{set:function(g){this.setAttribute("aria-required",g?"true":"false")},content:true},true,true,"form-extend");["input","select","textarea","fieldset","button","output"].forEach(function(g){i.defineNodeNameProperty(g,"validity",{set:a.noop,get:function(){var f=a.data(this,"cachedValidity");if(f)return f;f=a.extend({},r);if(!a.attr(this,"willValidate")||this.type=="submit")return f;var e=a(this),d=e.val(),c={nodeName:this.nodeName.toLowerCase()};this.getAttribute("aria-invalid");
f.customError=!!a.data(this,"customvalidationMessage");if(f.customError)f.valid=false;a.each(n,function(b,h){if(h(e,d,c)){f[b]=true;f.valid=false}});this.setAttribute("aria-invalid",f.valid?"false":"true");return f}},true,"validity-base","form-extend")});var l=function(){var g=this;if(g.form){a.data(g.form,"novalidate",true);setTimeout(function(){a.data(g.form,"novalidate",false)},1)}},p={submit:1,button:1};a(document).bind("click",function(g){g.target&&g.target.form&&p[g.target.type]&&a.attr(g.target,
"formnovalidate")!=null&&l.call(g.target)});i.addReady(function(g,f){var e=a("form",g).add(f.filter("form")).bind("invalid",a.noop).find("button[formnovalidate]").bind("click",l).end();setTimeout(function(){if(!document.activeElement||!document.activeElement.form){var d=true;a("input, select, textarea",e).each(function(){if(!d)return false;if(this.getAttribute("autofocus")!=null){d=false;var c=i.getVisualInput(this),b=a("input, select, textarea, .ui-slider-handle",c).filter(":visible:first");b[0]||
(b=c);try{b[0].focus()}catch(h){}}})}},9)});i.isReady("form-extend",true)}});
jQuery.webshims.ready("dom-extend",function(a,i,u,q,o){if(!Modernizr.input.placeholder){var r=i.cfg.forms.placeholderType=="over",n=function(e,d,c){if(!r&&e.type!="password"){if(c===false)c=a.attr(e,"value");e.value=c}d.box.removeClass("placeholder-visible")},l=function(e,d,c,b,h){if(!b){b=a.data(e,"placeHolder");if(!b)return}if(h=="focus"||!h&&e===document.activeElement){if(e.type=="password"||r||a(e).hasClass("placeholder-visible"))n(e,b,"")}else{if(d===false)d=a.attr(e,"value");if(d)n(e,b,d);else{if(c===
false)c=a.attr(e,"placeholder")||"";if(c&&!d){d=b;c=c;if(c===false)c=a.attr(e,"placeholder")||"";if(!r&&e.type!="password")e.value=c;d.box.addClass("placeholder-visible")}else n(e,b,d)}}},p=function(e){e=a(e);var d=e.attr("id"),c=!!(e.attr("title")||e.attr("aria-labeledby"));if(!c&&d)c=!!a('label[for="'+d+'"]',e[0].form)[0];return a(c?'<span class="placeholder-text"></span>':'<label for="'+(d||a.webshims.getID(e))+'" class="placeholder-text"></label>')},g=function(){var e={text:1,search:1,url:1,email:1,
password:1,tel:1};return{create:function(d){var c=a.data(d,"placeHolder");if(c)return c;c=a.data(d,"placeHolder",{text:p(d)});a(d).bind("focus.placeholder blur.placeholder",function(k){l(this,false,false,c,k.type)});d.form&&a(d.form).bind("reset.placeholder",function(k){setTimeout(function(){l(d,false,false,c,k.type)},0)});if(d.type=="password"||r){c.box=a(d).wrap('<span class="placeholder-box placeholder-box-'+(d.nodeName||"").toLowerCase()+'" />').parent();c.text.insertAfter(d).bind("mousedown.placeholder",
function(){l(this,false,false,c,"focus");d.focus();return false});a.each(["Left","Top"],function(k,j){var m=(parseInt(a.curCSS(d,"padding"+j),10)||0)+Math.max(parseInt(a.curCSS(d,"margin"+j),10)||0,0)+(parseInt(a.curCSS(d,"border"+j+"Width"),10)||0);c.text.css("padding"+j,m)});a.curCSS(d,"lineHeight");var b={width:a(d).width(),height:a(d).height()},h=a.curCSS(d,"float");a.each(["lineHeight","fontSize","fontFamily","fontWeight"],function(k,j){var m=a.curCSS(d,j);c.text.css(j)!=m&&c.text.css(j,m)});
b.width&&b.height&&c.text.css(b);h!=="none"&&c.box.addClass("placeholder-box-"+h)}else{b=function(k){if(a(d).hasClass("placeholder-visible")){n(d,c,"");k&&k.type=="submit"&&setTimeout(function(){k.isDefaultPrevented()&&l(d,false,false,c)},9)}};if(a.nodeName(c.text[0],"label"))c.text.hide()[a.browser.msie?"insertBefore":"insertAfter"](d);a(u).one("beforeunload",b);c.box=a(d);d.form&&a(d.form).submit(b)}return c},update:function(d,c){if(e[a.attr(d,"type")]||a.nodeName(d,"textarea")){var b=g.create(d);
b.text.text(c);l(d,false,c,b)}}}}();a.webshims.publicMethods={pHolder:g};["input","textarea"].forEach(function(e){i.defineNodeNameProperty(e,"placeholder",{set:function(d){i.contentAttr(this,"placeholder",d);g.update(this,d)},get:function(){return i.contentAttr(this,"placeholder")||""},content:true},true,true,"form-placeholder")});a.each(["input","textarea"],function(e,d){var c=i.defineNodeNameProperty(d,"value",{set:function(b){var h=i.contentAttr(this,"placeholder");h&&"value"in this&&l(this,b,
h);return c._supset.call(this,b)},get:function(){return a(this).hasClass("placeholder-visible")?"":c._supget.call(this)}})});var f=a.fn.val;a.fn.val=function(e){if(e!==o){this.each(e===""?function(){if(this.nodeType===1){var d=this.getAttribute("placeholder");if(a.nodeName(this,"select")||!d)f.call(a(this),"");else{d&&"value"in this&&l(this,e,d);if(this.type=="password"||r)f.call(a(this),"")}}}:function(){if(this.nodeType===1){var d=this.getAttribute("placeholder");d&&"value"in this&&l(this,e,d)}});
if(e==="")return this}else if(this[0]&&this[0].nodeType==1&&this.hasClass("placeholder-visible"))return"";return f.apply(this,arguments)};i.isReady("form-placeholder",true)}});
jQuery.webshims.ready("form-core dom-extend",function(a,i,u,q,o){(function(){var r={input:1,textarea:1},n={updateInput:1,input:1},l={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1},p=function(g){var f,e=g.attr("value"),d=function(b){if(g){var h=g.attr("value");if(h!==e){e=h;if(!b||!n[b.type])i.triggerInlineForm(g[0],"input")}}},c=function(){g.unbind("focusout",c).unbind("input",d).unbind("updateInput",d);clearInterval(f);d();g=null};clearInterval(f);f=setInterval(d,a.browser.mozilla?
250:111);setTimeout(d,9);g.bind("focusout",c).bind("input updateInput",d)};a(q).bind("focusin",function(g){if(g.target&&g.target.type&&!g.target.readonly&&!g.target.readOnly&&!g.target.disabled&&r[(g.target.nodeName||"").toLowerCase()]&&!l[g.target.type])p(a(g.target))})})();(function(){if(!("value"in q.createElement("output"))){var r=function(n){if(!n.getAttribute("aria-live")){n=a(n);var l=(n.text()||"").trim(),p=n.attr("id"),g=n.attr("for"),f=a('<input class="output-shim" type="hidden" name="'+
(n.attr("name")||"")+'" value="'+l+'" style="display: none" />').insertAfter(n),e=f[0].form||q,d=function(c){f[0].value=c;c=f[0].value;n.text(c);i.contentAttr(n[0],"value",c)};n[0].defaultValue=l;i.contentAttr(n[0],"value",l);n.attr({"aria-live":"polite"});if(p){f.attr("id",p);n.attr("aria-labeldby",i.getID(a('label[for="'+p+'"]',e)))}if(g){p=i.getID(n);g.split(" ").forEach(function(c){(c=e.getElementById(c))&&c.setAttribute("aria-controls",p)})}n.data("outputShim",d);f.data("outputShim",d);return d}};
i.defineNodeNameProperty("output","value",{set:function(n){var l=a.data(this,"outputShim");l||(l=r(this));l(n)},get:function(){return i.contentAttr(this,"value")||a(this).text()||""}},true,"output-props","form-output-datalist");i.addReady(function(n,l){a("output",n).add(l.filter("output")).each(function(){r(this)})})}})();(function(){if(!Modernizr.datalist){var r=0,n={submit:1,button:1,reset:1,hidden:1,range:1,date:1},l=a.browser.msie&&parseInt(a.browser.version,10)<7,p=function(f){if(!f)return[];
var e;try{e=JSON.parse(localStorage.getItem("storedDatalistOptions"+f))}catch(d){}return e||[]},g={_create:function(f){var e=f.datalist||f.id&&q.getElementById(f.id);if(!n[(f.input.getAttribute("type")||"").toLowerCase()||f.input.type]){var d=a.data(f.input,"datalistWidget");if(e&&d&&d.datalist!==e){d.datalist=e;d.id=f.id;d._resetListCached()}else if(e){r++;var c=this;this.timedHide=function(){clearTimeout(c.hideTimer);c.hideTimer=setTimeout(a.proxy(c,"hideList"),9)};this.datalist=e;this.id=f.id;
this.lazyIDindex=r;this.hasViewableData=true;this._autocomplete=a.attr(f.input,"autocomplete");a.data(f.input,"datalistWidget",this);this.shadowList=a('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=f.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(b){var h=a("li:not(.hidden-item)",c.shadowList),k=b.type=="mousedown"||b.type=="click";c.markItem(h.index(b.target),k,h);b.type=="click"&&
c.hideList();return b.type!="mousedown"}).bind("focusout",this.timedHide);f.input.setAttribute("autocomplete","off");a(f.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",a.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(b){var h=b.keyCode;if(h==40&&!c.showList()){c.markItem(c.index+1,true);return false}if(c.isListVisible){if(h==38){c.markItem(c.index-1,true);return false}if(!b.shiftKey&&(h==33||h==36)){c.markItem(0,true);return false}if(!b.shiftKey&&(h==34||
h==35)){b=a("li:not(.hidden-item)",c.shadowList);c.markItem(b.length-1,true,b);return false}if(h==13||h==27){c.hideList();return false}}}).bind("blur.datalistWidget",this.timedHide);a(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(this,"_resetListCached"));this._resetListCached();f.input.form&&f.input.id&&a(f.input.form).bind("submit.datalistWidget"+f.input.id,function(){var b=a.attr(f.input,"value");c.storedOptions=c.storedOptions||p(f.input.name||
f.input.id);if(b&&a.inArray(b,c.storedOptions)==-1){c.storedOptions.push(b);b=f.input.name||f.input.id;var h=c.storedOptions;if(b){h=h||[];try{localStorage.setItem("storedDatalistOptions"+b,JSON.stringify(h))}catch(k){}}}})}else d&&d.destroy()}},destroy:function(){var f=a.attr(this.input,"autocomplete");a(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();a(q).unbind(".datalist"+this.id);this.input.form&&this.input.id&&a(this.input.form).unbind("submit.datalistWidget"+
this.input.id);this.input.removeAttribute("aria-haspopup");f===o?this.input.removeAttribute("autocomplete"):a(this.input).attr("autocomplete",f)},_resetListCached:function(){var f=this;this.needsUpdate=true;this.lastUpdatedValue=false;this.lastUnfoundValue="";clearTimeout(this.updateTimer);this.updateTimer=setTimeout(function(){f.updateListOptions()},this.isListVisible?0:20*this.lazyIDindex)},updateListOptions:function(){this.needsUpdate=false;clearTimeout(this.updateTimer);this.shadowList.css({fontSize:a.curCSS(this.input,
"fontSize"),fontFamily:a.curCSS(this.input,"fontFamily")});var f='<ul role="list" class="'+(this.datalist.className||"")+'">',e=[],d=[];a("option",this.datalist).each(function(c){if(!this.disabled){var b={value:a(this).val(),text:a.trim(a.attr(this,"label")||this.textContent||this.innerText||a.text([this])||""),className:this.className||"",style:a.attr(this,"style")||""};if(!b.text)b.text=b.value;e[c]=b.value;d[c]=b}});this.storedOptions=this.storedOptions||p(this.input.name||this.input.id);this.storedOptions.forEach(function(c){a.inArray(c,
e)==-1&&d.push({value:c,text:c,className:"",style:""})});d.forEach(function(c){f+='<li data-value="'+c.value+'" class="'+c.className+'" style="'+c.style+'" tabindex="-1" role="listitem">'+c.text+"</li>"});f+="</ul>";this.arrayOptions=d;this.shadowList.html(f);this.isListVisible&&this.showHideOptions()},showHideOptions:function(){var f=a.attr(this.input,"value").toLowerCase();if(!(f===this.lastUpdatedValue||this.lastUnfoundValue&&f.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=f;var e=
false,d=a("li",this.shadowList);if(f)this.arrayOptions.forEach(function(c,b){if(!("lowerText"in c)){c.lowerText=c.text.toLowerCase();c.lowerValue=c.value.toLowerCase()}if(c.lowerText.indexOf(f)!==-1||c.lowerValue.indexOf(f)!==-1){a(d[b]).removeClass("hidden-item");e=true}else a(d[b]).addClass("hidden-item")});else{d.removeClass("hidden-item");e=true}if(this.hasViewableData=e)this.showList();else{this.lastUnfoundValue=f;this.hideList()}}},showList:function(){if(this.isListVisible)return false;this.needsUpdate&&
this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return false;var f=this,e=a(this.input).offset();e.top+=a(this.input).outerHeight();e.width=a(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);if(l){this.shadowList.css("height","auto");this.shadowList.height()>250&&this.shadowList.css("height",220)}this.shadowList.css(e).addClass("datalist-visible");this.isListVisible=true;a(q).bind("mousedown.datalist"+
this.id+" focusin.datalist"+this.id,function(d){if(d.target===f.input||f.shadowList[0]===d.target||a.contains(f.shadowList[0],d.target)){clearTimeout(f.hideTimer);setTimeout(function(){clearTimeout(f.hideTimer)},0)}else f.timedHide()});return true},hideList:function(){if(!this.isListVisible)return false;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=false;a(this.input).removeAttr("aria-activedescendant");
a(q).unbind(".datalist"+this.id);return true},scrollIntoView:function(f){var e=a("> ul",this.shadowList),d=f.position();d.top-=(parseInt(e.css("paddingTop"),10)||0)+(parseInt(e.css("marginTop"),10)||0)+(parseInt(e.css("borderTopWidth"),10)||0);if(d.top<0)this.shadowList.scrollTop(this.shadowList.scrollTop()+d.top-2);else{d.top+=f.outerHeight();f=this.shadowList.height();d.top>f&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(d.top-f)+2)}},markItem:function(f,e,d){if(!(f<0)){d=d||a("li:not(.hidden-item)",
this.shadowList);if(!(f>=d.length)){d.removeClass("active-item");this.shadowList.addClass("list-item-active");d=d.filter(":eq("+f+")").addClass("active-item");if(e){a.attr(this.input,"value",d.attr("data-value"));a.attr(this.input,"aria-activedescendant",a.webshims.getID(d));this.scrollIntoView(d)}this.index=f}}}};i.defineNodeNameProperty("input","list",{get:function(){var f=i.contentAttr(this,"list");if(typeof f=="string")f=q.getElementById(f);return f||null},set:function(f){var e;if(f&&f.getAttribute){e=
f;f=i.getID(f)}i.contentAttr(this,"list",f);g&&i.objectCreate(g,o,{input:this,id:f,datalist:e})},content:true},true,"input-datalist","form-output-datalist");i.defineNodeNameProperty("input","selectedOption",{get:function(){var f=a.attr(this,"list"),e=null,d;if(!f)return e;d=a.attr(this,"value");if(!d)return e;f=a.attr(f,"options");if(!f.length)return e;a.each(f,function(c,b){if(d==a.attr(b,"value")){e=b;return false}});return e}},true,"input-datalist","form-output-datalist");i.defineNodeNameProperty("input",
"autocomplete",{get:function(){var f=a.data(this,"datalistWidget");if(f)return f._autocomplete;return"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(f){var e=a.data(this,"datalistWidget");if(e){e._autocomplete=f;f=="off"&&e.hideList()}else if("autocomplete"in this)this.autocomplete=f;else this.setAttribute("autocomplete",f)}});i.defineNodeNameProperty("datalist","options",{get:function(){var f=a("select",this);return f[0]?f[0].options:[]}},true,"datalist-props",
"form-output-datalist");i.addReady(function(f,e){e.filter("select, option").each(function(){var d=this.parentNode;if(d&&!a.nodeName(d,"datalist"))d=d.parentNode;d&&a.nodeName(d,"datalist")&&a(d).triggerHandler("updateDatalist")})})}})();i.isReady("form-output-datalist",true)});
