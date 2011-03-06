//DOM-Extension helper
jQuery.webshims.ready('es5', function($, webshims, window, document, undefined){
	"use strict";
	
	
	//shortcus
	var modules = webshims.modules;
	
	
	//proxying attribute
	var oldAttr = $.attr;
	var extendedProps = {};
	var modifyProps = {};
		
	$.attr = function(elem, name, value, arg1, arg3){
		var nodeName = (elem.nodeName || '').toLowerCase();
		if(!nodeName || elem.nodeType !== 1){return oldAttr(elem, name, value, arg1, arg3);}
		var desc = extendedProps[nodeName];
		var ret;
						
		if(desc){
			desc = desc[name];
		}
		if(!desc){
			desc = extendedProps['*'];
			if(desc){
				desc = desc[name];
			}
		}
		
		// we got a winner
		if(desc){
			if(value === undefined){
				return (desc.get) ? 
					desc.get.call(elem) : 
					desc.value
				;
			} else if(desc.set) {
				ret = desc.set.call(elem, value);
			}
		} else {
			ret = oldAttr(elem, name, value, arg1, arg3);
		}
		if(value !== undefined && modifyProps[nodeName] && modifyProps[nodeName][name]){
			$.each(modifyProps[nodeName][name], function(i, fn){
				fn.call(elem, value);
			});
		}
		return ret;
	};
	
	var extendQAttr =  function(nodeName, prop, desc){
		if(!extendedProps[nodeName]){
			extendedProps[nodeName] = {};
		}
		var oldDesc = extendedProps[nodeName][prop];
		var getSup = function(propType, descriptor, oDesc){
			if(descriptor && descriptor[propType]){
				return descriptor[propType];
			}
			if(oDesc && oDesc[propType]){
				return oDesc[propType];
			}
			return function(value){
				return oldAttr(this, prop, value);
			};
		};
		extendedProps[nodeName][prop] = desc;
		if(desc.value === undefined){
			if(!desc.set){
				desc.set = desc.writeable ? getSup('set', desc, oldDesc) : function(){throw(prop +'is readonly on '+ nodeName);};
			}
			if(!desc.get){
				desc.get = getSup('get', desc, oldDesc);
			}
			
		}
		
		$.each(['value', 'get', 'set'], function(i, descProp){
			if(desc[descProp]){
				desc['_sup'+descProp] = getSup(descProp, oldDesc);
			}
		});
	};
	

	var initProp = (function(){
		
		var initProps = {};
		
		webshims.addReady(function(context, contextElem){
			var nodeNameCache = {};
			var getElementsByName = function(name){
				if(!nodeNameCache[name]){
					nodeNameCache[name] = $(context.getElementsByTagName(name));
					if(contextElem[0] && $.nodeName(contextElem[0], name)){
						nodeNameCache[name] = nodeNameCache[name].add(contextElem);
					}
				}
			};
			
			
			$.each(initProps, function(name, fns){
				getElementsByName(name);
				fns.forEach(function(fn){
					nodeNameCache[name].each(fn);
				});
			});
			nodeNameCache = null;
		});
		

		var createNodeNameInit = function(nodeName, fn){
			if(!initProps[nodeName]){
				initProps[nodeName] = [fn];
			} else {
				initProps[nodeName].push(fn);
			}
			if($.isDOMReady){
				$( document.getElementsByTagName(nodeName) ).each(fn);
			}
		};
		
		var elementExtends = {};
		return {
			content: function(nodeName, prop){
				createNodeNameInit(nodeName, function(){
					$(this).filter('['+ prop +']').attr(prop, function(i, val){
						return val;
					});
				});
			},
			extendValue: function(nodeName, prop, value){
				createNodeNameInit(nodeName, function(){
					$(this).each(function(){
						var data = $.data(this, '_polyfilledValue') || $.data(this, '_polyfilledValue', {});
						data[prop] = this[prop];
						this[prop] = value;
					});
				});
			}
		};
	})();
	
	var extendNativeValue = function(nodeName, prop, desc){
		desc._supvalue = function(){
			var data = $.data(this, '_polyfilledValue');
			if(data && data[prop].apply){
				return data[prop].apply(this, arguments);
			}
			return data && data[prop];
		};
		initProp.extendValue(nodeName, prop, desc.value);
	};
	
	
	$.extend(webshims, {

		getID: (function(){
			var ID = new Date().getTime();
			return function(elem){
				elem = $(elem);
				var id = elem.attr('id');
				if(!id){
					ID++;
					id = 'elem-id-'+ ID;
					elem.attr('id', id);
				}
				return id;
			};
		})(),
		defineNodeNameProperty: function(nodeName, prop, desc){
			desc = $.extend({writeable: true, idl: true}, desc);
			
			if(false && webshims.cfg.extendNative && desc.value && $.isFunction(desc.value)){
				extendNativeValue(nodeName, prop, desc);
			} else {
				extendQAttr(nodeName, prop, desc);
			}
			
			
			if(desc.content){
				initProp.content(nodeName, prop);
			}
			return desc;
		},
		defineNodeNamesProperty: function(names, prop, desc){
			if(typeof names == 'string'){
				names = names.split(/\s*,\s*/);
			}
			var retDesc = {};
			names.forEach(function(nodeName){
				retDesc[nodeName] = webshims.defineNodeNameProperty(nodeName, prop, desc);
			});
			return retDesc;
		},
		defineNodeNameProperties: function(name, descs){
			for(var prop in descs){
				descs[prop] = webshims.defineNodeNameProperty(name, prop, descs[prop]);
			}
			return descs;
		},
		defineNodeNamesProperties: function(names, descs){
			if(typeof names == 'string'){
				names = names.split(/\s*,\s*/);
			}
			var retDesc = {};
			names.forEach(function(nodeName){
				var desc = $.extend({}, descs);
				retDesc[nodeName] = webshims.defineNodeNameProperties(nodeName, desc);
			});
			return retDesc;
		},
//		createElement: function(nodeName, create, descs){
//			
//			return webshims.defineNodeNameProperties(nodeName, desces);
//		},
		onNodeNamesPropertyModify: function(nodeNames, prop, desc){
			if(typeof nodeNames == 'string'){
				nodeNames = nodeNames.split(/\s*,\s*/);
			}
			if($.isFunction(desc)){
				desc = {set: desc};
			}
			nodeNames.forEach(function(name){
				if(!modifyProps[name]){
					modifyProps[name] = {};
				}
				if(!modifyProps[name][prop]){
					modifyProps[name][prop] = [];
				}
				if(desc.set){
					modifyProps[name][prop].push(desc.set);
				}
				
				if(desc.content){
					initProp.content(name, prop);
				}
			});
		},
		defineNodeNamesBooleanProperty: function(elementNames, prop, setDesc, extend, htc, feature){
			var desc = {
				set: function(val){
					var elem = this;
					if(elem.readyState === 'loading' && typeof val == 'string' && val === webshims.contentAttr(this, prop)){
						val = true;
					} else {
						val = !!val;
					}
					webshims.contentAttr(elem, prop, val);
					if(setDesc){
						setDesc.set.call(elem, val);
					}
					
					return val;
				},
				get: function(){
					return webshims.contentAttr(this, prop) != null;
				}
			};
			webshims.defineNodeNamesProperty(elementNames, prop, desc, extend, htc, feature);
		},
		contentAttr: function(elem, name, val){
			if(!elem.nodeName){return;}
			if(val === undefined){
				val = (elem.attributes[name] || {}).value;
				return (val == null) ? undefined : val;
			}
			
			if(typeof val == 'boolean'){
				if(!val){
					elem.removeAttribute(name);
				} else {
					elem.setAttribute(name, name);
				}
			} else {
				elem.setAttribute(name, val);
			}
		},
				
		activeLang: (function(){
			var langs = [navigator.browserLanguage || navigator.language || ''];
			var paLang = $('html').attr('lang');
			var timer;
			
			if(paLang){
				langs.push(paLang);
			}
			return function(lang, module, fn){
				if(lang){
					if(!module || !fn){
						if(lang !== langs[0]){
							langs[0] = lang;
							clearTimeout(timer);
							timer = setTimeout(function(){
								$(document).triggerHandler('webshimLocalizationReady', langs);
							}, 0);
						}
					} else {
						module = modules[module].options;
						var langObj = lang,
							remoteLangs = module && module.availabeLangs,
							loadRemoteLang = function(lang){
								if($.inArray(lang, remoteLangs) !== -1){
									webshims.loader.loadScript(module.langSrc+lang+'.js', function(){
										if(langObj[lang]){
											fn(langObj[lang]);
										}
									});
									return true;
								}
								return false;
							}
						;
						
						$.each(langs, function(i, lang){
							var shortLang = lang.split('-')[0];
							if(langObj[lang] || langObj[shortLang]){
								fn(langObj[lang] || langObj[shortLang]);
								return false;
							}
							if(remoteLangs && module.langSrc && (loadRemoteLang(lang) || loadRemoteLang(shortLang))){
								return false;
							}
						});
					}
				}
				return langs;
			};
		})()
	});
	
	webshims.isReady('webshimLocalization', true);
	webshims.isReady('dom-extend', true);
});