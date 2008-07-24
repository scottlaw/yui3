YUI.add("node",function(D){var AC=0,U=1,E=2,o=3,W=4,w=5,AA=6,b=7,O=8,v=9,x=10,P=11,R=12;var T="ownerDocument",e="defaultView",l="parentWindow",AB="documentElement",B="tagName",u="nodeName",a="nodeType",q="compatMode",N="parentNode",M="previousSibling",A="nextSibling",Z="scrollTop",K="scrollLeft",F="compareDocumentPosition",h="contains";var V=/(?:string|boolean|number)/;var i=D.Selector;var L={};var p={};var t={};var S=null;var Q=[].slice;var I=function(AH){var AE=null,AF=(AH)?AH._yuid:null,Y=L[AF],AG=p[AF];if(AH){if(a in AH){if(Y&&AG&&AH===AG){AE=Y;}else{AE=new X(AH);}}else{if("item" in AH||"push" in AH){AE=new D.NodeList(AH);}}}return AE;};var C=function(AE,Y){if(Y){return function(){return Y(AE);}();}};var AD=function(Y){Y=p[Y._yuid];return(Y[a]===9)?Y:Y[T];};var s=function(Y){if(Y&&!Y.nodeType&&Y._yuid){Y=p[Y._yuid];}return Y||null;};var c=function(AI,AE,Y,AH,AG,AF){if(AE){AE=s(AE);if(Y){Y=s(Y);}}return I(p[this._yuid][AI](AE,Y,AH,AG,AF));};var H=function(AI,AE,Y,AH,AG,AF){return I(p[this._yuid][AI](AE,Y,AH,AG,AF));};var d=function(AI,AE,Y,AH,AG,AF){return p[this._yuid][AI](AE,Y,AH,AG,AF);};var z=function(AI,AE,Y,AH,AG,AF){p[this._yuid][AI](AE,Y,AH,AG,AF);return this;};var y={"parentNode":AC,"childNodes":AC,"children":function(AG){AG=p[AG._yuid];var AF=AG.children;if(AF===undefined){var AH=AG.childNodes;AF=[];for(var AE=0,Y=AH.length;AE<Y;++AE){if(AH[AE][B]){AF[AF.length]=AH[AE];}}}return AF;},"firstChild":AC,"lastChild":AC,"previousSibling":AC,"nextSibling":AC,"ownerDocument":AC,"offsetParent":U,"documentElement":v,"body":v,"elements":U,"rows":U,"cells":U,"tHead":U,"tFoot":U,"tBodies":U};var J={replaceChild:c,appendChild:c,insertBefore:c,removeChild:c,hasChildNodes:d,cloneNode:H,getAttribute:d,setAttribute:z,hasAttribute:d,scrollIntoView:z,getElementsByTagName:H,focus:z,blur:z,submit:z,reset:z};var g={"getBoundingClientRect":true};var X=function(AE){if(!AE||!AE[a]){return null;}var Y=D.guid();try{AE._yuid=Y;}catch(AF){}this._yuid=Y;p[Y]=AE;L[Y]=this;};var n={};var k={"text":function(Y){return Y.get("innerText")||Y.get("textContent")||"";},"options":function(Y){return(Y)?Y.getElementsByTagName("option"):[];}};X.setters=function(AE,Y){if(typeof AE=="string"){n[AE]=Y;}else{D.each(AE,function(AF,AG){X.setters(AG,AF);});}};X.getters=function(AE,Y){if(typeof AE=="string"){k[AE]=Y;}else{D.each(AE,function(AF,AG){X.getters(AG,AF);});}};X.methods=function(Y,AE){if(typeof Y=="string"){X.prototype[Y]=function(){var AG=Q.call(arguments);AG.unshift(this);var AF=AE.apply(null,AG);if(AF===undefined){AF=this;}return AF;};f(Y);}else{D.each(Y,function(AG,AF){X.methods(AF,AG);});}};var f=function(Y){j.prototype[Y]=function(){var AF=[],AG=t[this._yuid],AH;for(var AI=0,AE=AG.length;AI<AE;++AI){p[r._yuid]=AG[AI];AH=r[Y].apply(AG[AI],arguments);if(AH!==r){AF[AI]=AH;}}return AF.length?AF:this;};};X.getDOMNode=function(AE){var Y;if(AE.nodeType){Y=AE;}else{if(typeof AE==="string"){Y=i.query(AE,null,true);}else{Y=p[AE._yuid];}}return Y||null;};X.wrapDOMMethod=function(Y){return function(){var AE=Q.call(arguments);AE.unshift(D.Node.getDOMNode(AE.shift()));return D.DOM[Y].apply(D.DOM,AE);};};X.addDOMMethods=function(Y){var AE={};D.each(Y,function(AF,AG){AE[AF]=D.Node.wrapDOMMethod(AF);});D.Node.methods(AE);};X.prototype={set:function(AF,AE){var Y=p[this._yuid];if(AF in n){n[AF](this,AF,AE);}else{if(V.test(typeof Y[AF])){Y[AF]=AE;}}return this;},get:function(AF){var AE;var Y=p[this._yuid];if(AF in k){AE=k[AF](this,AF);}else{if(AF in y){if(typeof y[AF]==="function"){AE=y[AF](this);}else{AE=Y[AF];}if(S&&S[this._yuid]&&!D.DOM.contains(Y,AE)){AE=null;}else{AE=I(AE);}}else{if(V.test(typeof Y[AF])){AE=Y[AF];}}}return AE;},invoke:function(AJ,AE,Y,AI,AH,AG){if(AE){AE=(AE[a])?AE:s(AE);if(Y){Y=(Y[a])?Y:s(Y);}}var AF=p[this._yuid];if(AF&&g[AJ]&&AF[AJ]){return AF[AJ](AE,Y,AI,AH,AG);}return null;},hasMethod:function(Y){return !!(g[Y]&&p[this._yuid][Y]);},toString:function(){var Y=p[this._yuid]||{};return Y.id||Y[u]||"undefined node";},query:function(Y){return I(i.query(Y,p[this._yuid],true));},queryAll:function(Y){return I(i.query(Y,p[this._yuid]));},test:function(Y){return i.test(p[this._yuid],Y);},getStyle:function(Y){return D.DOM.getStyle(p[this._yuid],Y);},getComputedStyle:function(Y){return D.DOM.getComputedStyle(p[this._yuid],Y);},setStyle:function(Y,AE){D.DOM.setStyle(p[this._yuid],Y,AE);return this;},setStyles:function(Y){D.each(Y,function(AE,AF){this.setStyle(AF,AE);},this);return this;},compareTo:function(Y){Y=Y[a]?Y:p[Y._yuid];return p[this._yuid]===Y;},ancestor:function(Y){return I(D.DOM.elementByAxis(p[this._yuid],N,C(this,Y)));},previous:function(AE,Y){return I(D.DOM.elementByAxis(p[this._yuid],M,C(AE)),Y);},next:function(AE,Y){return I(D.DOM.elementByAxis(p[this._yuid],A,C(AE)),Y);},attach:function(AG,AF,Y){var AE=Q.call(arguments,0);AE.unshift(p[this._yuid]);return D.Event.addListener.apply(D.Event,AE);},on:function(AF,AE,Y){return this.attach.apply(this,arguments);},addEventListener:function(AF,AE,Y){return D.Event.nativeAdd(p[this._yuid],AF,AE,Y);},detach:function(AF,AE){var Y=Q.call(arguments,0);Y.unshift(p[this._yuid]);return D.Event.removeListener.apply(D.Event,Y);},removeEventListener:function(AE,Y){return D.Event.nativeRemove(p[this._yuid],AE,Y);},create:function(Y){return D.Node.create(Y);},contains:function(Y){return D.DOM.contains(p[this._yuid],s(Y));},plug:function(AE,Y){Y=Y||{};Y.owner=this;if(AE&&AE.NS){this[AE.NS]=new AE(Y);}return this;},inDoc:function(AE){var Y=p[this._yuid];AE=(AE)?AD(AE):Y.ownerDocument;if(AE.documentElement){return D.DOM.contains(AE.documentElement,Y);}}};D.each(J,function(Y,AE){X.prototype[AE]=function(){return Y.apply(this,[AE].concat(Q.call(arguments)));};});X.create=function(Y){return I(D.DOM.create(Y));};X.getById=function(AE,Y){Y=(Y&&Y[a])?Y:D.config.doc;return I(Y.getElementById(AE));};X.get=function(AE,AF,Y){if(AE instanceof X){return AE;}if(!AF){AF=D.config.doc;}else{if(AF._yuid&&p[AF._yuid]){AF=p[AF._yuid];}}if(AE&&typeof AE==="string"){switch(AE){case"document":AE=D.config.doc;
break;default:AE=D.Selector.query(AE,AF,true);}}AE=I(AE);if(Y){S=S||{};S[AE._yuid]=AE;}return AE;};X.all=function(Y,AE){if(Y instanceof j){return Y;}if(!AE){AE=D.config.doc;}else{if(AE._yuid&&p[AE._yuid]){AE=p[AE._yuid];}}if(Y&&typeof Y=="string"){Y=i.query(Y,AE);}return I(Y);};var j=function(Y){t[D.stamp(this)]=Y;};var r=X.create("<div></div>");j.prototype={};D.each(X.prototype,function(AE,Y){if(typeof X.prototype[Y]=="function"){f(Y);}});D.mix(j.prototype,{item:function(Y){var AE=t[this._yuid][Y];return(AE&&AE[B])?I(AE):(AE&&AE.get)?AE:null;},set:function(AF,AH){var AE=t[this._yuid];for(var AG=0,Y=AE.length;AG<Y;++AG){p[r._yuid]=AE[AG];r.set(AF,AH);}return this;},get:function(AG){if(AG=="length"){return t[this._yuid].length;}var AE=t[this._yuid];var AF=[];for(var AH=0,Y=AE.length;AH<Y;++AH){p[r._yuid]=AE[AH];AF[AH]=r.get(AG);}return AF;},filter:function(Y){return I(i.filter(t[this._yuid],Y));},each:function(AH,AG){AG=AG||this;var AE=t[this._yuid];for(var AF=0,Y=AE.length;AF<Y;++AF){AH.call(AG,D.Node.get(AE[AF]),AF,this);}return this;},size:function(){return t[this._yuid].length;},toString:function(){var Y=t[this._yuid]||[];return"NodeList ("+Y.length+" items)";}},true);D.Node=X;D.NodeList=j;D.all=D.Node.all;D.get=D.Node.get;D.Node.addDOMMethods(["hasClass","addClass","removeClass","replaceClass","toggleClass"]);D.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(Y,AE){D.Node.getters(Y,D.Node.wrapDOMMethod(Y));});D.Node.addDOMMethods(["getXY","setXY"]);var m=["region","viewportRegion"],G=D.Node.getDOMNode;D.each(m,function(Y,AE){D.Node.getters(Y,D.Node.wrapDOMMethod(Y));});D.Node.addDOMMethods(["inViewportRegion"]);D.Node.methods({intersect:function(AE,Y,AF){if(Y instanceof D.Node){Y=G(Y);}return D.DOM.intersect(G(AE),Y,AF);},inRegion:function(AE,Y,AF,AG){if(Y instanceof D.Node){Y=G(Y);}return D.DOM.inRegion(G(AE),Y,AF,AG);}});},"@VERSION@",{requires:["dom"]});