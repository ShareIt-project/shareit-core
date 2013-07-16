/*! datachannel.js build:1.1.1, development. Copyright(c) 2013 Jesús Leganés Combarro "Piranna" <piranna@gmail.com> */
(function(exports){
/**
 * Custom ArrayBufferView for packet booleans
 * 
 * It can allow to access to an array of booleans structure but using far less
 * memory usage
 */

(function(module){

module.BoolArray = function(length)
{
  this.prototype = new Uint8Array(Math.ceil(length/8));


  this.get = function(index)
  {
    if(index >= length)
      throw INDEX_SIZE_ERR;

    var i = Math.floor(index/8);
    var j = index%8;

    return Boolean(this.prototype[i] & (1 << j));
  };

  this.set = function(index, value)
  {
    if(index >= length)
      throw INDEX_SIZE_ERR;

    var i = Math.floor(index/8);
    var j = index%8;

    if(value)
      this.prototype[i] |= 1 << j;
    else
      this.prototype[i] &= ~(1 << j);
  };


  this.__defineGetter__("length", function()
  {
    return length;
  });

  this.BYTES_PER_ELEMENT = 0.125;
};

})(this);/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.4.0
 * Copyright (C) 2013 Oliver Nightingale
 * MIT Licensed
 * @license
 */
var lunr=function(t){var e=new lunr.Index;return e.pipeline.add(lunr.stopWordFilter,lunr.stemmer),t&&t.call(e,e),e};lunr.version="0.4.0","undefined"!=typeof module&&(module.exports=lunr),lunr.utils={},lunr.utils.warn=function(t){return function(e){t.console&&console.warn&&console.warn(e)}}(this),lunr.utils.zeroFillArray=function(){var t=[0];return function(e){for(;e>t.length;)t=t.concat(t);return t.slice(0,e)}}(),lunr.EventEmitter=function(){this.events={}},lunr.EventEmitter.prototype.addListener=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=t;if("function"!=typeof e)throw new TypeError("last argument must be a function");n.forEach(function(t){this.hasHandler(t)||(this.events[t]=[]),this.events[t].push(e)},this)},lunr.EventEmitter.prototype.removeListener=function(t,e){if(this.hasHandler(t)){var n=this.events[t].indexOf(e);this.events[t].splice(n,1),this.events[t].length||delete this.events[t]}},lunr.EventEmitter.prototype.emit=function(t){if(this.hasHandler(t)){var e=Array.prototype.slice.call(arguments,1);this.events[t].forEach(function(t){t.apply(void 0,e)})}},lunr.EventEmitter.prototype.hasHandler=function(t){return t in this.events},lunr.tokenizer=function(t){if(!t)return[];if(Array.isArray(t))return t;for(var t=t.replace(/^\s+/,""),e=t.length-1;e>=0;e--)if(/\S/.test(t.charAt(e))){t=t.substring(0,e+1);break}return t.split(/\s+/).map(function(t){return t.replace(/^\W+/,"").replace(/\W+$/,"").toLowerCase()})},lunr.Pipeline=function(){this._stack=[]},lunr.Pipeline.registeredFunctions={},lunr.Pipeline.registerFunction=function(t,e){e in this.registeredFunctions&&lunr.utils.warn("Overwriting existing registered function: "+e),t.label=e,lunr.Pipeline.registeredFunctions[t.label]=t},lunr.Pipeline.warnIfFunctionNotRegistered=function(t){var e=t.label&&t.label in this.registeredFunctions;e||lunr.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",t)},lunr.Pipeline.load=function(t){var e=new lunr.Pipeline;return t.forEach(function(t){var n=lunr.Pipeline.registeredFunctions[t];if(!n)throw Error("Cannot load un-registered function: "+t);e.add(n)}),e},lunr.Pipeline.prototype.add=function(){var t=Array.prototype.slice.call(arguments);t.forEach(function(t){lunr.Pipeline.warnIfFunctionNotRegistered(t),this._stack.push(t)},this)},lunr.Pipeline.prototype.after=function(t,e){lunr.Pipeline.warnIfFunctionNotRegistered(e);var n=this._stack.indexOf(t)+1;this._stack.splice(n,0,e)},lunr.Pipeline.prototype.before=function(t,e){lunr.Pipeline.warnIfFunctionNotRegistered(e);var n=this._stack.indexOf(t);this._stack.splice(n,0,e)},lunr.Pipeline.prototype.remove=function(t){var e=this._stack.indexOf(t);this._stack.splice(e,1)},lunr.Pipeline.prototype.run=function(t){for(var e=[],n=t.length,r=this._stack.length,i=0;n>i;i++){for(var o=t[i],s=0;r>s&&(o=this._stack[s](o,i,t),void 0!==o);s++);void 0!==o&&e.push(o)}return e},lunr.Pipeline.prototype.toJSON=function(){return this._stack.map(function(t){return lunr.Pipeline.warnIfFunctionNotRegistered(t),t.label})},lunr.Vector=function(t){this.elements=t},lunr.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var t,e=0,n=this.elements,r=n.length,i=0;r>i;i++)t=n[i],e+=t*t;return this._magnitude=Math.sqrt(e)},lunr.Vector.prototype.dot=function(t){for(var e=this.elements,n=t.elements,r=e.length,i=0,o=0;r>o;o++)i+=e[o]*n[o];return i},lunr.Vector.prototype.similarity=function(t){return this.dot(t)/(this.magnitude()*t.magnitude())},lunr.Vector.prototype.toArray=function(){return this.elements},lunr.SortedSet=function(){this.length=0,this.elements=[]},lunr.SortedSet.load=function(t){var e=new this;return e.elements=t,e.length=t.length,e},lunr.SortedSet.prototype.add=function(){Array.prototype.slice.call(arguments).forEach(function(t){~this.indexOf(t)||this.elements.splice(this.locationFor(t),0,t)},this),this.length=this.elements.length},lunr.SortedSet.prototype.toArray=function(){return this.elements.slice()},lunr.SortedSet.prototype.map=function(t,e){return this.elements.map(t,e)},lunr.SortedSet.prototype.forEach=function(t,e){return this.elements.forEach(t,e)},lunr.SortedSet.prototype.indexOf=function(t,e,n){var e=e||0,n=n||this.elements.length,r=n-e,i=e+Math.floor(r/2),o=this.elements[i];return 1>=r?o===t?i:-1:t>o?this.indexOf(t,i,n):o>t?this.indexOf(t,e,i):o===t?i:void 0},lunr.SortedSet.prototype.locationFor=function(t,e,n){var e=e||0,n=n||this.elements.length,r=n-e,i=e+Math.floor(r/2),o=this.elements[i];if(1>=r){if(o>t)return i;if(t>o)return i+1}return t>o?this.locationFor(t,i,n):o>t?this.locationFor(t,e,i):void 0},lunr.SortedSet.prototype.intersect=function(t){for(var e=new lunr.SortedSet,n=0,r=0,i=this.length,o=t.length,s=this.elements,l=t.elements;;){if(n>i-1||r>o-1)break;s[n]!==l[r]?s[n]<l[r]?n++:s[n]>l[r]&&r++:(e.add(s[n]),n++,r++)}return e},lunr.SortedSet.prototype.clone=function(){var t=new lunr.SortedSet;return t.elements=this.toArray(),t.length=t.elements.length,t},lunr.SortedSet.prototype.union=function(t){var e,n,r;return this.length>=t.length?(e=this,n=t):(e=t,n=this),r=e.clone(),r.add.apply(r,n.toArray()),r},lunr.SortedSet.prototype.toJSON=function(){return this.toArray()},lunr.Index=function(){this._fields=[],this._ref="id",this.pipeline=new lunr.Pipeline,this.documentStore=new lunr.Store,this.tokenStore=new lunr.TokenStore,this.corpusTokens=new lunr.SortedSet,this.eventEmitter=new lunr.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},lunr.Index.prototype.on=function(){var t=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,t)},lunr.Index.prototype.off=function(t,e){return this.eventEmitter.removeListener(t,e)},lunr.Index.load=function(t){t.version!==lunr.version&&lunr.utils.warn("version mismatch: current "+lunr.version+" importing "+t.version);var e=new this;return e._fields=t.fields,e._ref=t.ref,e.documentStore=lunr.Store.load(t.documentStore),e.tokenStore=lunr.TokenStore.load(t.tokenStore),e.corpusTokens=lunr.SortedSet.load(t.corpusTokens),e.pipeline=lunr.Pipeline.load(t.pipeline),e},lunr.Index.prototype.field=function(t,e){var e=e||{},n={name:t,boost:e.boost||1};return this._fields.push(n),this},lunr.Index.prototype.ref=function(t){return this._ref=t,this},lunr.Index.prototype.add=function(t,e){var n={},r=new lunr.SortedSet,i=t[this._ref],e=void 0===e?!0:e;this._fields.forEach(function(e){var i=this.pipeline.run(lunr.tokenizer(t[e.name]));n[e.name]=i,lunr.SortedSet.prototype.add.apply(r,i)},this),this.documentStore.set(i,r),lunr.SortedSet.prototype.add.apply(this.corpusTokens,r.toArray());for(var o=0;r.length>o;o++){var s=r.elements[o],l=this._fields.reduce(function(t,e){var r=n[e.name].length;if(!r)return t;var i=n[e.name].filter(function(t){return t===s}).length;return t+i/r*e.boost},0);this.tokenStore.add(s,{ref:i,tf:l})}e&&this.eventEmitter.emit("add",t,this)},lunr.Index.prototype.remove=function(t,e){var n=t[this._ref],e=void 0===e?!0:e;if(this.documentStore.has(n)){var r=this.documentStore.get(n);this.documentStore.remove(n),r.forEach(function(t){this.tokenStore.remove(t,n)},this),e&&this.eventEmitter.emit("remove",t,this)}},lunr.Index.prototype.update=function(t,e){var e=void 0===e?!0:e;this.remove(t,!1),this.add(t,!1),e&&this.eventEmitter.emit("update",t,this)},lunr.Index.prototype.idf=function(t){if(this._idfCache[t])return this._idfCache[t];var e=this.tokenStore.count(t),n=1;return e>0&&(n=1+Math.log(this.tokenStore.length/e)),this._idfCache[t]=n},lunr.Index.prototype.search=function(t){var e=this.pipeline.run(lunr.tokenizer(t)),n=lunr.utils.zeroFillArray(this.corpusTokens.length),r=[],i=this._fields.reduce(function(t,e){return t+e.boost},0),o=e.some(function(t){return this.tokenStore.has(t)},this);if(!o)return[];e.forEach(function(t,e,o){var s=1/o.length*this._fields.length*i,l=this,u=this.tokenStore.expand(t).reduce(function(e,r){var i=l.corpusTokens.indexOf(r),o=l.idf(r),u=1,a=new lunr.SortedSet;if(r!==t){var h=Math.max(3,r.length-t.length);u=1/Math.log(h)}return i>-1&&(n[i]=s*o*u),Object.keys(l.tokenStore.get(r)).forEach(function(t){a.add(t)}),e.union(a)},new lunr.SortedSet);r.push(u)},this);var s=r.reduce(function(t,e){return t.intersect(e)}),l=new lunr.Vector(n);return s.map(function(t){return{ref:t,score:l.similarity(this.documentVector(t))}},this).sort(function(t,e){return e.score-t.score})},lunr.Index.prototype.documentVector=function(t){for(var e=this.documentStore.get(t),n=e.length,r=lunr.utils.zeroFillArray(this.corpusTokens.length),i=0;n>i;i++){var o=e.elements[i],s=this.tokenStore.get(o)[t].tf,l=this.idf(o);r[this.corpusTokens.indexOf(o)]=s*l}return new lunr.Vector(r)},lunr.Index.prototype.toJSON=function(){return{version:lunr.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},lunr.Store=function(){this.store={},this.length=0},lunr.Store.load=function(t){var e=new this;return e.length=t.length,e.store=Object.keys(t.store).reduce(function(e,n){return e[n]=lunr.SortedSet.load(t.store[n]),e},{}),e},lunr.Store.prototype.set=function(t,e){this.store[t]=e,this.length=Object.keys(this.store).length},lunr.Store.prototype.get=function(t){return this.store[t]},lunr.Store.prototype.has=function(t){return t in this.store},lunr.Store.prototype.remove=function(t){this.has(t)&&(delete this.store[t],this.length--)},lunr.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},lunr.stemmer=function(){var t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",r="[aeiouy]",i=n+"[^aeiouy]*",o=r+"[aeiou]*",s="^("+i+")?"+o+i,l="^("+i+")?"+o+i+"("+o+")?$",u="^("+i+")?"+o+i+o+i,a="^("+i+")?"+r;return function(n){var o,h,c,p,f,d,v;if(3>n.length)return n;if(c=n.substr(0,1),"y"==c&&(n=c.toUpperCase()+n.substr(1)),p=/^(.+?)(ss|i)es$/,f=/^(.+?)([^s])s$/,p.test(n)?n=n.replace(p,"$1$2"):f.test(n)&&(n=n.replace(f,"$1$2")),p=/^(.+?)eed$/,f=/^(.+?)(ed|ing)$/,p.test(n)){var m=p.exec(n);p=RegExp(s),p.test(m[1])&&(p=/.$/,n=n.replace(p,""))}else if(f.test(n)){var m=f.exec(n);o=m[1],f=RegExp(a),f.test(o)&&(n=o,f=/(at|bl|iz)$/,d=RegExp("([^aeiouylsz])\\1$"),v=RegExp("^"+i+r+"[^aeiouwxy]$"),f.test(n)?n+="e":d.test(n)?(p=/.$/,n=n.replace(p,"")):v.test(n)&&(n+="e"))}if(p=/^(.+?)y$/,p.test(n)){var m=p.exec(n);o=m[1],p=RegExp(a),p.test(o)&&(n=o+"i")}if(p=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,p.test(n)){var m=p.exec(n);o=m[1],h=m[2],p=RegExp(s),p.test(o)&&(n=o+t[h])}if(p=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,p.test(n)){var m=p.exec(n);o=m[1],h=m[2],p=RegExp(s),p.test(o)&&(n=o+e[h])}if(p=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,f=/^(.+?)(s|t)(ion)$/,p.test(n)){var m=p.exec(n);o=m[1],p=RegExp(u),p.test(o)&&(n=o)}else if(f.test(n)){var m=f.exec(n);o=m[1]+m[2],f=RegExp(u),f.test(o)&&(n=o)}if(p=/^(.+?)e$/,p.test(n)){var m=p.exec(n);o=m[1],p=RegExp(u),f=RegExp(l),d=RegExp("^"+i+r+"[^aeiouwxy]$"),(p.test(o)||f.test(o)&&!d.test(o))&&(n=o)}return p=/ll$/,f=RegExp(u),p.test(n)&&f.test(n)&&(p=/.$/,n=n.replace(p,"")),"y"==c&&(n=c.toLowerCase()+n.substr(1)),n}}(),lunr.Pipeline.registerFunction(lunr.stemmer,"stemmer"),lunr.stopWordFilter=function(t){return-1===lunr.stopWordFilter.stopWords.indexOf(t)?t:void 0},lunr.stopWordFilter.stopWords=new lunr.SortedSet,lunr.stopWordFilter.stopWords.length=119,lunr.stopWordFilter.stopWords.elements=["","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"],lunr.Pipeline.registerFunction(lunr.stopWordFilter,"stopWordFilter"),lunr.TokenStore=function(){this.root={docs:{}},this.length=0},lunr.TokenStore.load=function(t){var e=new this;return e.root=t.root,e.length=t.length,e},lunr.TokenStore.prototype.add=function(t,e,n){var n=n||this.root,r=t[0],i=t.slice(1);return r in n||(n[r]={docs:{}}),0===i.length?(n[r].docs[e.ref]=e,this.length+=1,void 0):this.add(i,e,n[r])},lunr.TokenStore.prototype.has=function(t){if(!t)return!1;for(var e=this.root,n=0;t.length>n;n++){if(!e[t[n]])return!1;e=e[t[n]]}return!0},lunr.TokenStore.prototype.getNode=function(t){if(!t)return{};for(var e=this.root,n=0;t.length>n;n++){if(!e[t[n]])return{};e=e[t[n]]}return e},lunr.TokenStore.prototype.get=function(t,e){return this.getNode(t,e).docs||{}},lunr.TokenStore.prototype.count=function(t,e){return Object.keys(this.get(t,e)).length},lunr.TokenStore.prototype.remove=function(t,e){if(t){for(var n=this.root,r=0;t.length>r;r++){if(!(t[r]in n))return;n=n[t[r]]}delete n.docs[e]}},lunr.TokenStore.prototype.expand=function(t,e){var n=this.getNode(t),r=n.docs||{},e=e||[];return Object.keys(r).length&&e.push(t),Object.keys(n).forEach(function(n){"docs"!==n&&e.concat(this.expand(t+n,e))},this),e},lunr.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}};/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


var zipjs_deflate = '(function(e){function A(){function n(n){var r=e.dyn_tree,i=e.stat_desc.static_tree,s=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,a=e.stat_desc.max_length,f,l,c,h,p,d,v=0;for(h=0;h<=t;h++)n.bl_count[h]=0;r[n.heap[n.heap_max]*2+1]=0;for(f=n.heap_max+1;f<u;f++){l=n.heap[f],h=r[r[l*2+1]*2+1]+1,h>a&&(h=a,v++),r[l*2+1]=h;if(l>e.max_code)continue;n.bl_count[h]++,p=0,l>=o&&(p=s[l-o]),d=r[l*2],n.opt_len+=d*(h+p),i&&(n.static_len+=d*(i[l*2+1]+p))}if(v===0)return;do{h=a-1;while(n.bl_count[h]===0)h--;n.bl_count[h]--,n.bl_count[h+1]+=2,n.bl_count[a]--,v-=2}while(v>0);for(h=a;h!==0;h--){l=n.bl_count[h];while(l!==0){c=n.heap[--f];if(c>e.max_code)continue;r[c*2+1]!=h&&(n.opt_len+=(h-r[c*2+1])*r[c*2],r[c*2+1]=h),l--}}}function r(e,t){var n=0;do n|=e&1,e>>>=1,n<<=1;while(--t>0);return n>>>1}function i(e,n,i){var s=[],o=0,u,a,f;for(u=1;u<=t;u++)s[u]=o=o+i[u-1]<<1;for(a=0;a<=n;a++){f=e[a*2+1];if(f===0)continue;e[a*2]=r(s[f]++,f)}}var e=this;e.build_tree=function(t){var r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.elems,a,f,l=-1,c;t.heap_len=0,t.heap_max=u;for(a=0;a<o;a++)r[a*2]!==0?(t.heap[++t.heap_len]=l=a,t.depth[a]=0):r[a*2+1]=0;while(t.heap_len<2)c=t.heap[++t.heap_len]=l<2?++l:0,r[c*2]=1,t.depth[c]=0,t.opt_len--,s&&(t.static_len-=s[c*2+1]);e.max_code=l;for(a=Math.floor(t.heap_len/2);a>=1;a--)t.pqdownheap(r,a);c=o;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],t.pqdownheap(r,1),f=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=f,r[c*2]=r[a*2]+r[f*2],t.depth[c]=Math.max(t.depth[a],t.depth[f])+1,r[a*2+1]=r[f*2+1]=c,t.heap[1]=c++,t.pqdownheap(r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],n(t),i(r,e.max_code,t.bl_count)}}function O(e,t,n,r,i){var s=this;s.static_tree=e,s.extra_bits=t,s.extra_base=n,s.elems=r,s.max_length=i}function D(e,t,n,r,i){var s=this;s.good_length=e,s.max_lazy=t,s.nice_length=n,s.max_chain=r,s.func=i}function et(e,t,n,r){var i=e[t*2],s=e[n*2];return i<s||i==s&&r[t]<=r[n]}function tt(){function qt(){var e;it=2*D,ot[at-1]=0;for(e=0;e<at-1;e++)ot[e]=0;Et=j[St].max_lazy,Tt=j[St].good_length,Nt=j[St].nice_length,wt=j[St].max_chain,mt=0,ht=0,yt=0,pt=bt=G-1,vt=0,ut=0}function Rt(){var t;for(t=0;t<o;t++)Ct[t*2]=0;for(t=0;t<n;t++)kt[t*2]=0;for(t=0;t<r;t++)Lt[t*2]=0;Ct[a*2]=1,e.opt_len=e.static_len=0,Pt=Bt=0}function Ut(){At.dyn_tree=Ct,At.stat_desc=O.static_l_desc,Ot.dyn_tree=kt,Ot.stat_desc=O.static_d_desc,Mt.dyn_tree=Lt,Mt.stat_desc=O.static_bl_desc,Ft=0,It=0,jt=8,Rt()}function zt(e,t){var n,r=-1,i,s=e[1],o=0,u=7,a=4;s===0&&(u=138,a=3),e[(t+1)*2+1]=65535;for(n=0;n<=t;n++){i=s,s=e[(n+1)*2+1];if(++o<u&&i==s)continue;o<a?Lt[i*2]+=o:i!==0?(i!=r&&Lt[i*2]++,Lt[l*2]++):o<=10?Lt[c*2]++:Lt[h*2]++,o=0,r=i,s===0?(u=138,a=3):i==s?(u=6,a=3):(u=7,a=4)}}function Wt(){var t;zt(Ct,At.max_code),zt(kt,Ot.max_code),Mt.build_tree(e);for(t=r-1;t>=3;t--)if(Lt[A.bl_order[t]*2+1]!==0)break;return e.opt_len+=3*(t+1)+5+5+4,t}function Xt(t){e.pending_buf[e.pending++]=t}function Vt(e){Xt(e&255),Xt(e>>>8&255)}function $t(e){Xt(e>>8&255),Xt(e&255&255)}function Jt(e,t){var n,r=t;It>p-r?(n=e,Ft|=n<<It&65535,Vt(Ft),Ft=n>>>p-It,It+=r-p):(Ft|=e<<It&65535,It+=r)}function Kt(e,t){var n=e*2;Jt(t[n]&65535,t[n+1]&65535)}function Qt(e,t){var n,r=-1,i,s=e[1],o=0,u=7,a=4;s===0&&(u=138,a=3);for(n=0;n<=t;n++){i=s,s=e[(n+1)*2+1];if(++o<u&&i==s)continue;if(o<a){do Kt(i,Lt);while(--o!==0)}else i!==0?(i!=r&&(Kt(i,Lt),o--),Kt(l,Lt),Jt(o-3,2)):o<=10?(Kt(c,Lt),Jt(o-3,3)):(Kt(h,Lt),Jt(o-11,7));o=0,r=i,s===0?(u=138,a=3):i==s?(u=6,a=3):(u=7,a=4)}}function Gt(e,t,n){var r;Jt(e-257,5),Jt(t-1,5),Jt(n-4,4);for(r=0;r<n;r++)Jt(Lt[A.bl_order[r]*2+1],3);Qt(Ct,e-1),Qt(kt,t-1)}function Yt(){It==16?(Vt(Ft),Ft=0,It=0):It>=8&&(Xt(Ft&255),Ft>>>=8,It-=8)}function Zt(){Jt(K<<1,3),Kt(a,O.static_ltree),Yt(),1+jt+10-It<9&&(Jt(K<<1,3),Kt(a,O.static_ltree),Yt()),jt=7}function en(t,r){var i,o,u;e.pending_buf[Ht+Pt*2]=t>>>8&255,e.pending_buf[Ht+Pt*2+1]=t&255,e.pending_buf[_t+Pt]=r&255,Pt++,t===0?Ct[r*2]++:(Bt++,t--,Ct[(A._length_code[r]+s+1)*2]++,kt[A.d_code(t)*2]++);if((Pt&8191)===0&&St>2){i=Pt*8,o=mt-ht;for(u=0;u<n;u++)i+=kt[u*2]*(5+A.extra_dbits[u]);i>>>=3;if(Bt<Math.floor(Pt/2)&&i<Math.floor(o/2))return!0}return Pt==Dt-1}function tn(t,n){var r,i,o=0,u,f;if(Pt!==0)do r=e.pending_buf[Ht+o*2]<<8&65280|e.pending_buf[Ht+o*2+1]&255,i=e.pending_buf[_t+o]&255,o++,r===0?Kt(i,t):(u=A._length_code[i],Kt(u+s+1,t),f=A.extra_lbits[u],f!==0&&(i-=A.base_length[u],Jt(i,f)),r--,u=A.d_code(r),Kt(u,n),f=A.extra_dbits[u],f!==0&&(r-=A.base_dist[u],Jt(r,f)));while(o<Pt);Kt(a,t),jt=t[a*2+1]}function nn(){It>8?Vt(Ft):It>0&&Xt(Ft&255),Ft=0,It=0}function rn(t,n,r){nn(),jt=8,r&&(Vt(n),Vt(~n)),e.pending_buf.set(rt.subarray(t,t+n),e.pending),e.pending+=n}function sn(e,t,n){Jt((J<<1)+(n?1:0),3),rn(e,t,!0)}function on(t,n,r){var i,s,o=0;St>0?(At.build_tree(e),Ot.build_tree(e),o=Wt(),i=e.opt_len+3+7>>>3,s=e.static_len+3+7>>>3,s<=i&&(i=s)):i=s=n+5,n+4<=i&&t!=-1?sn(t,n,r):s==i?(Jt((K<<1)+(r?1:0),3),tn(O.static_ltree,O.static_dtree)):(Jt((Q<<1)+(r?1:0),3),Gt(At.max_code+1,Ot.max_code+1,o+1),tn(Ct,kt)),Rt(),r&&nn()}function un(e){on(ht>=0?ht:-1,mt-ht,e),ht=mt,t.flush_pending()}function an(){var e,n,r,i;do{i=it-yt-mt;if(i===0&&mt===0&&yt===0)i=D;else if(i==-1)i--;else if(mt>=D+D-Z){rt.set(rt.subarray(D,D+D),0),gt-=D,mt-=D,ht-=D,e=at,r=e;do n=ot[--r]&65535,ot[r]=n>=D?n-D:0;while(--e!==0);e=D,r=e;do n=st[--r]&65535,st[r]=n>=D?n-D:0;while(--e!==0);i+=D}if(t.avail_in===0)return;e=t.read_buf(rt,mt+yt,i),yt+=e,yt>=G&&(ut=rt[mt]&255,ut=(ut<<ct^rt[mt+1]&255)&lt)}while(yt<Z&&t.avail_in!==0)}function fn(e){var n=65535,r;n>u-5&&(n=u-5);for(;;){if(yt<=1){an();if(yt===0&&e==y)return I;if(yt===0)break}mt+=yt,yt=0,r=ht+n;if(mt===0||mt>=r){yt=mt-r,mt=r,un(!1);if(t.avail_out===0)return I}if(mt-ht>=D-Z){un(!1);if(t.avail_out===0)return I}}return un(e==E),t.avail_out===0?e==E?R:I:e==E?U:q}function ln(e){var t=wt,n=mt,r,i,s=bt,o=mt>D-Z?mt-(D-Z):0,u=Nt,a=nt,f=mt+Y,l=rt[n+s-1],c=rt[n+s];bt>=Tt&&(t>>=2),u>yt&&(u=yt);do{r=e;if(rt[r+s]!=c||rt[r+s-1]!=l||rt[r]!=rt[n]||rt[++r]!=rt[n+1])continue;n+=2,r++;do;while(rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&rt[++n]==rt[++r]&&n<f);i=Y-(f-n),n=f-Y;if(i>s){gt=e,s=i;if(i>=u)break;l=rt[n+s-1],c=rt[n+s]}}while((e=st[e&a]&65535)>o&&--t!==0);return s<=yt?s:yt}function cn(e){var n=0,r;for(;;){if(yt<Z){an();if(yt<Z&&e==y)return I;if(yt===0)break}yt>=G&&(ut=(ut<<ct^rt[mt+(G-1)]&255)&lt,n=ot[ut]&65535,st[mt&nt]=ot[ut],ot[ut]=mt),n!==0&&(mt-n&65535)<=D-Z&&xt!=m&&(pt=ln(n));if(pt>=G){r=en(mt-gt,pt-G),yt-=pt;if(pt<=Et&&yt>=G){pt--;do mt++,ut=(ut<<ct^rt[mt+(G-1)]&255)&lt,n=ot[ut]&65535,st[mt&nt]=ot[ut],ot[ut]=mt;while(--pt!==0);mt++}else mt+=pt,pt=0,ut=rt[mt]&255,ut=(ut<<ct^rt[mt+1]&255)&lt}else r=en(0,rt[mt]&255),yt--,mt++;if(r){un(!1);if(t.avail_out===0)return I}}return un(e==E),t.avail_out===0?e==E?R:I:e==E?U:q}function hn(e){var n=0,r,i;for(;;){if(yt<Z){an();if(yt<Z&&e==y)return I;if(yt===0)break}yt>=G&&(ut=(ut<<ct^rt[mt+(G-1)]&255)&lt,n=ot[ut]&65535,st[mt&nt]=ot[ut],ot[ut]=mt),bt=pt,dt=gt,pt=G-1,n!==0&&bt<Et&&(mt-n&65535)<=D-Z&&(xt!=m&&(pt=ln(n)),pt<=5&&(xt==v||pt==G&&mt-gt>4096)&&(pt=G-1));if(bt>=G&&pt<=bt){i=mt+yt-G,r=en(mt-1-dt,bt-G),yt-=bt-1,bt-=2;do++mt<=i&&(ut=(ut<<ct^rt[mt+(G-1)]&255)&lt,n=ot[ut]&65535,st[mt&nt]=ot[ut],ot[ut]=mt);while(--bt!==0);vt=0,pt=G-1,mt++;if(r){un(!1);if(t.avail_out===0)return I}}else if(vt!==0){r=en(0,rt[mt-1]&255),r&&un(!1),mt++,yt--;if(t.avail_out===0)return I}else vt=1,mt++,yt--}return vt!==0&&(r=en(0,rt[mt-1]&255),vt=0),un(e==E),t.avail_out===0?e==E?R:I:e==E?U:q}function pn(t){return t.total_in=t.total_out=0,t.msg=null,e.pending=0,e.pending_out=0,i=X,L=y,Ut(),qt(),S}var e=this,t,i,u,f,L,D,tt,nt,rt,it,st,ot,ut,at,ft,lt,ct,ht,pt,dt,vt,mt,gt,yt,bt,wt,Et,St,xt,Tt,Nt,Ct,kt,Lt,At=new A,Ot=new A,Mt=new A;e.depth=[];var _t,Dt,Pt,Ht,Bt,jt,Ft,It;e.bl_count=[],e.heap=[],Ct=[],kt=[],Lt=[],e.pqdownheap=function(t,n){var r=e.heap,i=r[n],s=n<<1;while(s<=e.heap_len){s<e.heap_len&&et(t,r[s+1],r[s],e.depth)&&s++;if(et(t,i,r[s],e.depth))break;r[n]=r[s],n=s,s<<=1}r[n]=i},e.deflateInit=function(t,n,r,i,s,o){return i||(i=$),s||(s=_),o||(o=g),t.msg=null,n==d&&(n=6),s<1||s>M||i!=$||r<9||r>15||n<0||n>9||o<0||o>m?N:(t.dstate=e,tt=r,D=1<<tt,nt=D-1,ft=s+7,at=1<<ft,lt=at-1,ct=Math.floor((ft+G-1)/G),rt=new Uint8Array(D*2),st=[],ot=[],Dt=1<<s+6,e.pending_buf=new Uint8Array(Dt*4),u=Dt*4,Ht=Math.floor(Dt/2),_t=3*Dt,St=n,xt=o,f=i&255,pn(t))},e.deflateEnd=function(){return i!=W&&i!=X&&i!=V?N:(e.pending_buf=null,ot=null,st=null,rt=null,e.dstate=null,i==X?C:S)},e.deflateParams=function(e,t,n){var r=S;return t==d&&(t=6),t<0||t>9||n<0||n>m?N:(j[St].func!=j[t].func&&e.total_in!==0&&(r=e.deflate(b)),St!=t&&(St=t,Et=j[St].max_lazy,Tt=j[St].good_length,Nt=j[St].nice_length,wt=j[St].max_chain),xt=n,r)},e.deflateSetDictionary=function(e,t,n){var r=n,s,o=0;if(!t||i!=W)return N;if(r<G)return S;r>D-Z&&(r=D-Z,o=n-r),rt.set(t.subarray(o,o+r),0),mt=r,ht=r,ut=rt[0]&255,ut=(ut<<ct^rt[1]&255)&lt;for(s=0;s<=r-G;s++)ut=(ut<<ct^rt[s+(G-1)]&255)&lt,st[s&nt]=ot[ut],ot[ut]=s;return S},e.deflate=function(n,r){var s,o,u,a,f;if(r>E||r<0)return N;if(!n.next_out||!n.next_in&&n.avail_in!==0||i==V&&r!=E)return n.msg=F[T-N],N;if(n.avail_out===0)return n.msg=F[T-k],k;t=n,a=L,L=r,i==W&&(o=$+(tt-8<<4)<<8,u=(St-1&255)>>1,u>3&&(u=3),o|=u<<6,mt!==0&&(o|=z),o+=31-o%31,i=X,$t(o));if(e.pending!==0){t.flush_pending();if(t.avail_out===0)return L=-1,S}else if(t.avail_in===0&&r<=a&&r!=E)return t.msg=F[T-k],k;if(i==V&&t.avail_in!==0)return n.msg=F[T-k],k;if(t.avail_in!==0||yt!==0||r!=y&&i!=V){f=-1;switch(j[St].func){case P:f=fn(r);break;case H:f=cn(r);break;case B:f=hn(r);break;default:}if(f==R||f==U)i=V;if(f==I||f==R)return t.avail_out===0&&(L=-1),S;if(f==q){if(r==b)Zt();else{sn(0,0,!1);if(r==w)for(s=0;s<at;s++)ot[s]=0}t.flush_pending();if(t.avail_out===0)return L=-1,S}}return r!=E?S:x}}function nt(){var e=this;e.next_in_index=0,e.next_out_index=0,e.avail_in=0,e.total_in=0,e.avail_out=0,e.total_out=0}function rt(e){var t=this,n=new nt,r=512,i=y,s=new Uint8Array(r);typeof e=="undefined"&&(e=d),n.deflateInit(e),n.next_out=s,t.append=function(e,t){var o,u=[],a=0,f=0,l=0,c;if(!e.length)return;n.next_in_index=0,n.next_in=e,n.avail_in=e.length;do{n.next_out_index=0,n.avail_out=r,o=n.deflate(i);if(o!=S)throw"deflating: "+n.msg;n.next_out_index&&(n.next_out_index==r?u.push(new Uint8Array(s)):u.push(new Uint8Array(s.subarray(0,n.next_out_index)))),l+=n.next_out_index,t&&n.next_in_index>0&&n.next_in_index!=a&&(t(n.next_in_index),a=n.next_in_index)}while(n.avail_in>0||n.avail_out===0);return c=new Uint8Array(l),u.forEach(function(e){c.set(e,f),f+=e.length}),c},t.flush=function(){var e,t=[],i=0,o=0,u;do{n.next_out_index=0,n.avail_out=r,e=n.deflate(E);if(e!=x&&e!=S)throw"deflating: "+n.msg;r-n.avail_out>0&&t.push(new Uint8Array(s.subarray(0,n.next_out_index))),o+=n.next_out_index}while(n.avail_in>0||n.avail_out===0);return n.deflateEnd(),u=new Uint8Array(o),t.forEach(function(e){u.set(e,i),i+=e.length}),u}}var t=15,n=30,r=19,i=29,s=256,o=s+1+i,u=2*o+1,a=256,f=7,l=16,c=17,h=18,p=16,d=-1,v=1,m=2,g=0,y=0,b=1,w=3,E=4,S=0,x=1,T=2,N=-2,C=-3,k=-5,L=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];A._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],A.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],A.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],A.d_code=function(e){return e<256?L[e]:L[256+(e>>>7)]},A.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],A.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],A.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],O.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],O.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],O.static_l_desc=new O(O.static_ltree,A.extra_lbits,s+1,o,t),O.static_d_desc=new O(O.static_dtree,A.extra_dbits,0,n,t),O.static_bl_desc=new O(null,A.extra_blbits,0,r,f);var M=9,_=8,P=0,H=1,B=2,j=[new D(0,0,0,0,P),new D(4,4,8,4,H),new D(4,5,16,8,H),new D(4,6,32,32,H),new D(4,4,16,16,B),new D(8,16,32,32,B),new D(8,16,128,128,B),new D(8,32,128,256,B),new D(32,128,258,1024,B),new D(32,258,258,4096,B)],F=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],I=0,q=1,R=2,U=3,z=32,W=42,X=113,V=666,$=8,J=0,K=1,Q=2,G=3,Y=258,Z=Y+G+1;nt.prototype={deflateInit:function(e,n){var r=this;return r.dstate=new tt,n||(n=t),r.dstate.deflateInit(r,e,n)},deflate:function(e){var t=this;return t.dstate?t.dstate.deflate(t,e):N},deflateEnd:function(){var e=this;if(!e.dstate)return N;var t=e.dstate.deflateEnd();return e.dstate=null,t},deflateParams:function(e,t){var n=this;return n.dstate?n.dstate.deflateParams(n,e,t):N},deflateSetDictionary:function(e,t){var n=this;return n.dstate?n.dstate.deflateSetDictionary(n,e,t):N},read_buf:function(e,t,n){var r=this,i=r.avail_in;return i>n&&(i=n),i===0?0:(r.avail_in-=i,e.set(r.next_in.subarray(r.next_in_index,r.next_in_index+i),t),r.next_in_index+=i,r.total_in+=i,i)},flush_pending:function(){var e=this,t=e.dstate.pending;t>e.avail_out&&(t=e.avail_out);if(t===0)return;e.next_out.set(e.dstate.pending_buf.subarray(e.dstate.pending_out,e.dstate.pending_out+t),e.next_out_index),e.next_out_index+=t,e.dstate.pending_out+=t,e.total_out+=t,e.avail_out-=t,e.dstate.pending-=t,e.dstate.pending===0&&(e.dstate.pending_out=0)}};var it;e.zip?e.zip.Deflater=rt:(it=new rt,e.addEventListener("message",function(t){var n=t.data;n.init&&(it=new rt(n.level),e.postMessage({oninit:!0})),n.append&&e.postMessage({onappend:!0,data:it.append(n.data,function(t){e.postMessage({progress:!0,current:t})})}),n.flush&&e.postMessage({onflush:!0,data:it.flush()})},!1))})(this);'

zipjs_deflate = new Blob([zipjs_deflate], {type: "text/javascript"});
zipjs_deflate = URL.createObjectURL(zipjs_deflate);

var zipjs_inflate = '(function(e){function S(){function h(e,t,r,u,h,p,d,v,m,g,y){var b,w,S,x,T,N,C,k,L,A,O,M,_,D,P;A=0,T=r;do i[e[t+A]]++,A++,T--;while(T!==0);if(i[0]==r)return d[0]=-1,v[0]=0,n;k=v[0];for(N=1;N<=E;N++)if(i[N]!==0)break;C=N,k<N&&(k=N);for(T=E;T!==0;T--)if(i[T]!==0)break;S=T,k>T&&(k=T),v[0]=k;for(D=1<<N;N<T;N++,D<<=1)if((D-=i[N])<0)return o;if((D-=i[T])<0)return o;i[T]+=D,c[1]=N=0,A=1,_=2;while(--T!==0)c[_]=N+=i[A],_++,A++;T=0,A=0;do(N=e[t+A])!==0&&(y[c[N]++]=T),A++;while(++T<r);r=c[S],c[0]=T=0,A=0,x=-1,M=-k,f[0]=0,O=0,P=0;for(;C<=S;C++){b=i[C];while(b--!==0){while(C>M+k){x++,M+=k,P=S-M,P=P>k?k:P;if((w=1<<(N=C-M))>b+1){w-=b+1,_=C;if(N<P)while(++N<P){if((w<<=1)<=i[++_])break;w-=i[_]}}P=1<<N;if(g[0]+P>l)return o;f[x]=O=g[0],g[0]+=P,x!==0?(c[x]=T,s[0]=N,s[1]=k,N=T>>>M-k,s[2]=O-f[x-1]-N,m.set(s,(f[x-1]+N)*3)):d[0]=O}s[1]=C-M,A>=r?s[0]=192:y[A]<u?(s[0]=y[A]<256?0:96,s[2]=y[A++]):(s[0]=p[y[A]-u]+16+64,s[2]=h[y[A++]-u]),w=1<<C-M;for(N=T>>>M;N<P;N+=w)m.set(s,(O+N)*3);for(N=1<<C-1;(T&N)!==0;N>>>=1)T^=N;T^=N,L=(1<<M)-1;while((T&L)!=c[x])x--,M-=k,L=(1<<M)-1}}return D!==0&&S!=1?a:n}function p(e){var n;t||(t=[],r=[],i=new Int32Array(E+1),s=[],f=new Int32Array(E),c=new Int32Array(E+1)),r.length<e&&(r=[]);for(n=0;n<e;n++)r[n]=0;for(n=0;n<E+1;n++)i[n]=0;for(n=0;n<3;n++)s[n]=0;f.set(i.subarray(0,E),0),c.set(i.subarray(0,E+1),0)}var e=this,t,r,i,s,f,c;e.inflate_trees_bits=function(e,n,i,s,u){var f;p(19),t[0]=0,f=h(e,0,19,19,null,null,i,n,s,t,r);if(f==o)u.msg="oversubscribed dynamic bit lengths tree";else if(f==a||n[0]===0)u.msg="incomplete dynamic bit lengths tree",f=o;return f},e.inflate_trees_dynamic=function(e,i,s,f,l,c,d,v,m){var E;return p(288),t[0]=0,E=h(s,0,e,257,g,y,c,f,v,t,r),E!=n||f[0]===0?(E==o?m.msg="oversubscribed literal/length tree":E!=u&&(m.msg="incomplete literal/length tree",E=o),E):(p(288),E=h(s,e,i,0,b,w,d,l,v,t,r),E!=n||l[0]===0&&e>257?(E==o?m.msg="oversubscribed distance tree":E==a?(m.msg="incomplete distance tree",E=o):E!=u&&(m.msg="empty distance tree with lengths",E=o),E):n)}}function D(){function w(e,t,i,s,u,a,l,c){var h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k;y=c.next_in_index,b=c.avail_in,m=l.bitb,g=l.bitk,w=l.write,E=w<l.read?l.read-w-1:l.end-w,S=f[e],x=f[t];do{while(g<20)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;h=m&S,p=i,d=s,k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1],g-=p[k+1],l.window[w++]=p[k+2],E--;continue}do{m>>=p[k+1],g-=p[k+1];if((v&16)!==0){v&=15,T=p[k+2]+(m&f[v]),m>>=v,g-=v;while(g<15)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;h=m&x,p=u,d=a,k=(d+h)*3,v=p[k];do{m>>=p[k+1],g-=p[k+1];if((v&16)!==0){v&=15;while(g<v)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;N=p[k+2]+(m&f[v]),m>>=v,g-=v,E-=T;if(w>=N)C=w-N,w-C>0&&2>w-C?(l.window[w++]=l.window[C++],l.window[w++]=l.window[C++],T-=2):(l.window.set(l.window.subarray(C,C+2),w),w+=2,C+=2,T-=2);else{C=w-N;do C+=l.end;while(C<0);v=l.end-C;if(T>v){T-=v;if(w-C>0&&v>w-C){do l.window[w++]=l.window[C++];while(--v!==0)}else l.window.set(l.window.subarray(C,C+v),w),w+=v,C+=v,v=0;C=0}}if(w-C>0&&T>w-C){do l.window[w++]=l.window[C++];while(--T!==0)}else l.window.set(l.window.subarray(C,C+T),w),w+=T,C+=T,T=0;break}if((v&64)!==0)return c.msg="invalid distance code",T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,o;h+=p[k+2],h+=m&f[v],k=(d+h)*3,v=p[k]}while(!0);break}if((v&64)!==0)return(v&32)!==0?(T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,r):(c.msg="invalid literal/length code",T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,o);h+=p[k+2],h+=m&f[v],k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1],g-=p[k+1],l.window[w++]=p[k+2],E--;break}}while(!0)}while(E>=258&&b>=10);return T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,n}var e=this,t,i=0,u,a=0,l=0,c=0,h=0,p=0,d=0,v=0,m,g=0,y,b=0;e.init=function(e,n,r,i,s,o){t=x,d=e,v=n,m=r,g=i,y=s,b=o,u=null},e.proc=function(e,E,S){var D,P,H,B=0,j=0,F=0,I,q,R,U;F=E.next_in_index,I=E.avail_in,B=e.bitb,j=e.bitk,q=e.write,R=q<e.read?e.read-q-1:e.end-q;for(;;)switch(t){case x:if(R>=258&&I>=10){e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,S=w(d,v,m,g,y,b,e,E),F=E.next_in_index,I=E.avail_in,B=e.bitb,j=e.bitk,q=e.write,R=q<e.read?e.read-q-1:e.end-q;if(S!=n){t=S==r?O:_;break}}l=d,u=m,a=g,t=T;case T:D=l;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}P=(a+(B&f[D]))*3,B>>>=u[P+1],j-=u[P+1],H=u[P];if(H===0){c=u[P+2],t=A;break}if((H&16)!==0){h=H&15,i=u[P+2],t=N;break}if((H&64)===0){l=H,a=P/3+u[P+2];break}if((H&32)!==0){t=O;break}return t=_,E.msg="invalid literal/length code",S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case N:D=h;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}i+=B&f[D],B>>=D,j-=D,l=v,u=y,a=b,t=C;case C:D=l;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}P=(a+(B&f[D]))*3,B>>=u[P+1],j-=u[P+1],H=u[P];if((H&16)!==0){h=H&15,p=u[P+2],t=k;break}if((H&64)===0){l=H,a=P/3+u[P+2];break}return t=_,E.msg="invalid distance code",S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case k:D=h;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}p+=B&f[D],B>>=D,j-=D,t=L;case L:U=q-p;while(U<0)U+=e.end;while(i!==0){if(R===0){q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0){e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q,q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}}e.window[q++]=e.window[U++],R--,U==e.end&&(U=0),i--}t=x;break;case A:if(R===0){q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0){e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q,q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}}S=n,e.window[q++]=c,R--,t=x;break;case O:j>7&&(j-=8,I++,F--),e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q;if(e.read!=e.write)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);t=M;case M:return S=r,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case _:return S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);default:return S=s,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}},e.free=function(){}}function X(e,t){var i=this,u=H,c=0,h=0,p=0,d,v=[0],m=[0],g=new D,y=0,b=new Int32Array(l*3),w=0,E=new S;i.bitk=0,i.bitb=0,i.window=new Uint8Array(t),i.end=t,i.read=0,i.write=0,i.reset=function(e,t){t&&(t[0]=w),u==R&&g.free(e),u=H,i.bitk=0,i.bitb=0,i.read=i.write=0},i.reset(e,null),i.inflate_flush=function(e,t){var r,s,o;return s=e.next_out_index,o=i.read,r=(o<=i.write?i.write:i.end)-o,r>e.avail_out&&(r=e.avail_out),r!==0&&t==a&&(t=n),e.avail_out-=r,e.total_out+=r,e.next_out.set(i.window.subarray(o,o+r),s),s+=r,o+=r,o==i.end&&(o=0,i.write==i.end&&(i.write=0),r=i.write-o,r>e.avail_out&&(r=e.avail_out),r!==0&&t==a&&(t=n),e.avail_out-=r,e.total_out+=r,e.next_out.set(i.window.subarray(o,o+r),s),s+=r,o+=r),e.next_out_index=s,i.read=o,t},i.proc=function(e,t){var a,l,w,x,T,N,C,k;x=e.next_in_index,T=e.avail_in,l=i.bitb,w=i.bitk,N=i.write,C=N<i.read?i.read-N-1:i.end-N;for(;;)switch(u){case H:while(w<3){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}a=l&7,y=a&1;switch(a>>>1){case 0:l>>>=3,w-=3,a=w&7,l>>>=a,w-=a,u=B;break;case 1:var L=[],A=[],O=[[]],M=[[]];S.inflate_trees_fixed(L,A,O,M),g.init(L[0],A[0],O[0],0,M[0],0),l>>>=3,w-=3,u=R;break;case 2:l>>>=3,w-=3,u=F;break;case 3:return l>>>=3,w-=3,u=W,e.msg="invalid block type",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}break;case B:while(w<32){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}if((~l>>>16&65535)!=(l&65535))return u=W,e.msg="invalid stored block lengths",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);c=l&65535,l=w=0,u=c!==0?j:y!==0?U:H;break;case j:if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);if(C===0){N==i.end&&i.read!==0&&(N=0,C=N<i.read?i.read-N-1:i.end-N);if(C===0){i.write=N,t=i.inflate_flush(e,t),N=i.write,C=N<i.read?i.read-N-1:i.end-N,N==i.end&&i.read!==0&&(N=0,C=N<i.read?i.read-N-1:i.end-N);if(C===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}}t=n,a=c,a>T&&(a=T),a>C&&(a=C),i.window.set(e.read_buf(x,a),N),x+=a,T-=a,N+=a,C-=a;if((c-=a)!==0)break;u=y!==0?U:H;break;case F:while(w<14){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}h=a=l&16383;if((a&31)>29||(a>>5&31)>29)return u=W,e.msg="too many length or distance symbols",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);a=258+(a&31)+(a>>5&31);if(!d||d.length<a)d=[];else for(k=0;k<a;k++)d[k]=0;l>>>=14,w-=14,p=0,u=I;case I:while(p<4+(h>>>10)){while(w<3){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}d[P[p++]]=l&7,l>>>=3,w-=3}while(p<19)d[P[p++]]=0;v[0]=7,a=E.inflate_trees_bits(d,v,m,b,e);if(a!=n)return t=a,t==o&&(d=null,u=W),i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);p=0,u=q;case q:for(;;){a=h;if(!(p<258+(a&31)+(a>>5&31)))break;var _,D;a=v[0];while(w<a){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}a=b[(m[0]+(l&f[a]))*3+1],D=b[(m[0]+(l&f[a]))*3+2];if(D<16)l>>>=a,w-=a,d[p++]=D;else{k=D==18?7:D-14,_=D==18?11:3;while(w<a+k){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}l>>>=a,w-=a,_+=l&f[k],l>>>=k,w-=k,k=p,a=h;if(k+_>258+(a&31)+(a>>5&31)||D==16&&k<1)return d=null,u=W,e.msg="invalid bit length repeat",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);D=D==16?d[k-1]:0;do d[k++]=D;while(--_!==0);p=k}}m[0]=-1;var X=[],V=[],$=[],J=[];X[0]=9,V[0]=6,a=h,a=E.inflate_trees_dynamic(257+(a&31),1+(a>>5&31),d,X,V,$,J,b,e);if(a!=n)return a==o&&(d=null,u=W),t=a,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);g.init(X[0],V[0],b,$[0],b,J[0]),u=R;case R:i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N;if((t=g.proc(i,e,t))!=r)return i.inflate_flush(e,t);t=n,g.free(e),x=e.next_in_index,T=e.avail_in,l=i.bitb,w=i.bitk,N=i.write,C=N<i.read?i.read-N-1:i.end-N;if(y===0){u=H;break}u=U;case U:i.write=N,t=i.inflate_flush(e,t),N=i.write,C=N<i.read?i.read-N-1:i.end-N;if(i.read!=i.write)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);u=z;case z:return t=r,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);case W:return t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);default:return t=s,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}},i.free=function(e){i.reset(e,null),i.window=null,b=null},i.set_dictionary=function(e,t,n){i.window.set(e.subarray(t,t+n),0),i.read=i.write=n},i.sync_point=function(){return u==B?1:0}}function st(){function t(e){return!e||!e.istate?s:(e.total_in=e.total_out=0,e.msg=null,e.istate.mode=tt,e.istate.blocks.reset(e,null),n)}var e=this;e.mode=0,e.method=0,e.was=[0],e.need=0,e.marker=0,e.wbits=0,e.inflateEnd=function(t){return e.blocks&&e.blocks.free(t),e.blocks=null,n},e.inflateInit=function(r,i){return r.msg=null,e.blocks=null,i<8||i>15?(e.inflateEnd(r),s):(e.wbits=i,r.istate.blocks=new X(r,1<<i),t(r),n)},e.inflate=function(e,t){var u,f;if(!e||!e.istate||!e.next_in)return s;t=t==h?a:n,u=a;for(;;)switch(e.istate.mode){case J:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++;if(((e.istate.method=e.read_byte(e.next_in_index++))&15)!=$){e.istate.mode=rt,e.msg="unknown compression method",e.istate.marker=5;break}if((e.istate.method>>4)+8>e.istate.wbits){e.istate.mode=rt,e.msg="invalid window size",e.istate.marker=5;break}e.istate.mode=K;case K:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,f=e.read_byte(e.next_in_index++)&255;if(((e.istate.method<<8)+f)%31!==0){e.istate.mode=rt,e.msg="incorrect header check",e.istate.marker=5;break}if((f&V)===0){e.istate.mode=tt;break}e.istate.mode=Q;case Q:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need=(e.read_byte(e.next_in_index++)&255)<<24&4278190080,e.istate.mode=G;case G:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<16&16711680,e.istate.mode=Y;case Y:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<8&65280,e.istate.mode=Z;case Z:if(e.avail_in===0)return u;return u=t,e.avail_in--,e.total_in++,e.istate.need+=e.read_byte(e.next_in_index++)&255,e.istate.mode=et,i;case et:return e.istate.mode=rt,e.msg="need dictionary",e.istate.marker=0,s;case tt:u=e.istate.blocks.proc(e,u);if(u==o){e.istate.mode=rt,e.istate.marker=0;break}u==n&&(u=t);if(u!=r)return u;u=t,e.istate.blocks.reset(e,e.istate.was),e.istate.mode=nt;case nt:return r;case rt:return o;default:return s}},e.inflateSetDictionary=function(e,t,r){var i=0,o=r;return!e||!e.istate||e.istate.mode!=et?s:(o>=1<<e.istate.wbits&&(o=(1<<e.istate.wbits)-1,i=r-o),e.istate.blocks.set_dictionary(t,i,o),e.istate.mode=tt,n)},e.inflateSync=function(e){var r,i,u,f,l;if(!e||!e.istate)return s;e.istate.mode!=rt&&(e.istate.mode=rt,e.istate.marker=0);if((r=e.avail_in)===0)return a;i=e.next_in_index,u=e.istate.marker;while(r!==0&&u<4)e.read_byte(i)==it[u]?u++:e.read_byte(i)!==0?u=0:u=4-u,i++,r--;return e.total_in+=i-e.next_in_index,e.next_in_index=i,e.avail_in=r,e.istate.marker=u,u!=4?o:(f=e.total_in,l=e.total_out,t(e),e.total_in=f,e.total_out=l,e.istate.mode=tt,n)},e.inflateSyncPoint=function(e){return!e||!e.istate||!e.istate.blocks?s:e.istate.blocks.sync_point()}}function ot(){}function ut(){var e=this,t=new ot,i=512,s=c,o=new Uint8Array(i),u=!1;t.inflateInit(),t.next_out=o,e.append=function(e,f){var l,c=[],h=0,p=0,d=0,v;if(e.length===0)return;t.next_in_index=0,t.next_in=e,t.avail_in=e.length;do{t.next_out_index=0,t.avail_out=i,t.avail_in===0&&!u&&(t.next_in_index=0,u=!0),l=t.inflate(s);if(u&&l==a)return-1;if(l!=n&&l!=r)throw"inflating: "+t.msg;if(!(!u&&l!=r||t.avail_in!=e.length))return-1;t.next_out_index&&(t.next_out_index==i?c.push(new Uint8Array(o)):c.push(new Uint8Array(o.subarray(0,t.next_out_index)))),d+=t.next_out_index,f&&t.next_in_index>0&&t.next_in_index!=h&&(f(t.next_in_index),h=t.next_in_index)}while(t.avail_in>0||t.avail_out===0);return v=new Uint8Array(d),c.forEach(function(e){v.set(e,p),p+=e.length}),v},e.flush=function(){t.inflateEnd()}}var t=15,n=0,r=1,i=2,s=-2,o=-3,u=-4,a=-5,f=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],l=1440,c=0,h=4,p=9,d=5,v=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],m=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],g=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],b=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],w=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],E=15;S.inflate_trees_fixed=function(e,t,r,i){return e[0]=p,t[0]=d,r[0]=v,i[0]=m,n};var x=0,T=1,N=2,C=3,k=4,L=5,A=6,O=7,M=8,_=9,P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],H=0,B=1,j=2,F=3,I=4,q=5,R=6,U=7,z=8,W=9,V=32,$=8,J=0,K=1,Q=2,G=3,Y=4,Z=5,et=6,tt=7,nt=12,rt=13,it=[0,0,255,255];ot.prototype={inflateInit:function(e){var n=this;return n.istate=new st,e||(e=t),n.istate.inflateInit(n,e)},inflate:function(e){var t=this;return t.istate?t.istate.inflate(t,e):s},inflateEnd:function(){var e=this;if(!e.istate)return s;var t=e.istate.inflateEnd(e);return e.istate=null,t},inflateSync:function(){var e=this;return e.istate?e.istate.inflateSync(e):s},inflateSetDictionary:function(e,t){var n=this;return n.istate?n.istate.inflateSetDictionary(n,e,t):s},read_byte:function(e){var t=this;return t.next_in.subarray(e,e+1)[0]},read_buf:function(e,t){var n=this;return n.next_in.subarray(e,e+t)}};var at;e.zip?e.zip.Inflater=ut:(at=new ut,e.addEventListener("message",function(t){var n=t.data;n.append&&e.postMessage({onappend:!0,data:at.append(n.data,function(t){e.postMessage({progress:!0,current:t})})}),n.flush&&(at.flush(),e.postMessage({onflush:!0}))},!1))})(this);'

zipjs_inflate = new Blob([zipjs_inflate], {type: "text/javascript"});
zipjs_inflate = URL.createObjectURL(zipjs_inflate);


(function(obj) {

	var ERR_BAD_FORMAT = "File format is not recognized.";
	var ERR_ENCRYPTED = "File contains encrypted entry.";
	var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
	var ERR_READ = "Error while reading zip file.";
	var ERR_WRITE = "Error while writing zip file.";
	var ERR_WRITE_DATA = "Error while writing file data.";
	var ERR_READ_DATA = "Error while reading file data.";
	var ERR_DUPLICATED_NAME = "File already exists.";
	var CHUNK_SIZE = 512 * 1024;

	var INFLATE_JS = "inflate.js";
	var DEFLATE_JS = "deflate.js";

	var TEXT_PLAIN = "text/plain";

	var MESSAGE_EVENT = "message";

	var appendABViewSupported;
	try {
		appendABViewSupported = new Blob([ new DataView(new ArrayBuffer(0)) ]).size === 0;
	} catch (e) {
	}

	function Crc32() {
		var crc = -1, that = this;
		that.append = function(data) {
			var offset, table = that.table;
			for (offset = 0; offset < data.length; offset++)
				crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		};
		that.get = function() {
			return ~crc;
		};
	}
	Crc32.prototype.table = (function() {
		var i, j, t, table = [];
		for (i = 0; i < 256; i++) {
			t = i;
			for (j = 0; j < 8; j++)
				if (t & 1)
					t = (t >>> 1) ^ 0xEDB88320;
				else
					t = t >>> 1;
			table[i] = t;
		}
		return table;
	})();

	function blobSlice(blob, index, length) {
		if (blob.slice)
			return blob.slice(index, index + length);
		else if (blob.webkitSlice)
			return blob.webkitSlice(index, index + length);
		else if (blob.mozSlice)
			return blob.mozSlice(index, index + length);
		else if (blob.msSlice)
			return blob.msSlice(index, index + length);
	}

	function getDataHelper(byteLength, bytes) {
		var dataBuffer, dataArray;
		dataBuffer = new ArrayBuffer(byteLength);
		dataArray = new Uint8Array(dataBuffer);
		if (bytes)
			dataArray.set(bytes, 0);
		return {
			buffer : dataBuffer,
			array : dataArray,
			view : new DataView(dataBuffer)
		};
	}

	// Readers
	function Reader() {
	}

	function TextReader(text) {
		var that = this, blobReader;

		function init(callback, onerror) {
			var blob = new Blob([ text ], {
				type : TEXT_PLAIN
			});
			blobReader = new BlobReader(blob);
			blobReader.init(function() {
				that.size = blobReader.size;
				callback();
			}, onerror);
		}

		function readUint8Array(index, length, callback, onerror) {
			blobReader.readUint8Array(index, length, callback, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	TextReader.prototype = new Reader();
	TextReader.prototype.constructor = TextReader;

	function Data64URIReader(dataURI) {
		var that = this, dataStart;

		function init(callback) {
			var dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=")
				dataEnd--;
			dataStart = dataURI.indexOf(",") + 1;
			that.size = Math.floor((dataEnd - dataStart) * 0.75);
			callback();
		}

		function readUint8Array(index, length, callback) {
			var i, data = getDataHelper(length);
			var start = Math.floor(index / 3) * 4;
			var end = Math.ceil((index + length) / 3) * 4;
			var bytes = obj.atob(dataURI.substring(start + dataStart, end + dataStart));
			var delta = index - Math.floor(start / 4) * 3;
			for (i = delta; i < delta + length; i++)
				data.array[i - delta] = bytes.charCodeAt(i);
			callback(data.array);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	Data64URIReader.prototype = new Reader();
	Data64URIReader.prototype.constructor = Data64URIReader;

	function BlobReader(blob) {
		var that = this;

		function init(callback) {
			this.size = blob.size;
			callback();
		}

		function readUint8Array(index, length, callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(new Uint8Array(e.target.result));
			};
			reader.onerror = onerror;
			reader.readAsArrayBuffer(blobSlice(blob, index, length));
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	BlobReader.prototype = new Reader();
	BlobReader.prototype.constructor = BlobReader;

	// Writers

	function Writer() {
	}
	Writer.prototype.getData = function(callback) {
		callback(this.data);
	};

	function TextWriter(encoding) {
		var that = this, blob;

		function init(callback) {
			blob = new Blob([], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function getData(callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(e.target.result);
			};
			reader.onerror = onerror;
			reader.readAsText(blob, encoding);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	TextWriter.prototype = new Writer();
	TextWriter.prototype.constructor = TextWriter;

	function Data64URIWriter(contentType) {
		var that = this, data = "", pending = "";

		function init(callback) {
			data += "data:" + (contentType || "") + ";base64,";
			callback();
		}

		function writeUint8Array(array, callback) {
			var i, delta = pending.length, dataString = pending;
			pending = "";
			for (i = 0; i < (Math.floor((delta + array.length) / 3) * 3) - delta; i++)
				dataString += String.fromCharCode(array[i]);
			for (; i < array.length; i++)
				pending += String.fromCharCode(array[i]);
			if (dataString.length > 2)
				data += obj.btoa(dataString);
			else
				pending = dataString;
			callback();
		}

		function getData(callback) {
			callback(data + obj.btoa(pending));
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	Data64URIWriter.prototype = new Writer();
	Data64URIWriter.prototype.constructor = Data64URIWriter;

	function BlobWriter(contentType) {
		var blob, that = this;

		function init(callback) {
			blob = new Blob([], {
				type : contentType
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : contentType
			});
			callback();
		}

		function getData(callback) {
			callback(blob);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	BlobWriter.prototype = new Writer();
	BlobWriter.prototype.constructor = BlobWriter;

	// inflate/deflate core functions

	function launchWorkerProcess(worker, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize;

		function onflush() {
			worker.removeEventListener(MESSAGE_EVENT, onmessage, false);
			onend(outputSize);
		}

		function onmessage(event) {
			var message = event.data, data = message.data;

			if (message.onappend) {
				outputSize += data.length;
				writer.writeUint8Array(data, function() {
					onappend(false, data);
					step();
				}, onwriteerror);
			}
			if (message.onflush)
				if (data) {
					outputSize += data.length;
					writer.writeUint8Array(data, function() {
						onappend(false, data);
						onflush();
					}, onwriteerror);
				} else
					onflush();
			if (message.progress && onprogress)
				onprogress(index + message.current, size);
		}

		function step() {
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					worker.postMessage({
						append : true,
						data : array
					});
					chunkIndex++;
					if (onprogress)
						onprogress(index, size);
					onappend(true, array);
				}, onreaderror);
			else
				worker.postMessage({
					flush : true
				});
		}

		outputSize = 0;
		worker.addEventListener(MESSAGE_EVENT, onmessage, false);
		step();
	}

	function launchProcess(process, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize = 0;

		function step() {
			var outputData;
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(inputData) {
					var outputData = process.append(inputData, function() {
						if (onprogress)
							onprogress(offset + index, size);
					});
					outputSize += outputData.length;
					onappend(true, inputData);
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						chunkIndex++;
						setTimeout(step, 1);
					}, onwriteerror);
					if (onprogress)
						onprogress(index, size);
				}, onreaderror);
			else {
				outputData = process.flush();
				if (outputData) {
					outputSize += outputData.length;
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						onend(outputSize);
					}, onwriteerror);
				} else
					onend(outputSize);
			}
		}

		step();
	}

	function inflate(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function oninflateappend(sending, array) {
			if (computeCrc32 && !sending)
				crc32.append(array);
		}

		function oninflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		if (obj.zip.useWebWorkers) {
		  if(zipjs_inflate)
        worker = new Worker(zipjs_inflate);
		  else
		    worker = new Worker(obj.zip.workerScriptsPath + INFLATE_JS);

		  launchWorkerProcess(worker, reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		} else
			launchProcess(new obj.zip.Inflater(), reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		return worker;
	}

	function deflate(reader, writer, level, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function ondeflateappend(sending, array) {
			if (sending)
				crc32.append(array);
		}

		function ondeflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		function onmessage() {
			worker.removeEventListener(MESSAGE_EVENT, onmessage, false);
			launchWorkerProcess(worker, reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		}

		if (obj.zip.useWebWorkers) {
		  if(zipjs_deflate)
		    worker = new Worker(zipjs_deflate);
		  else
		    worker = new Worker(obj.zip.workerScriptsPath + DEFLATE_JS);

			worker.addEventListener(MESSAGE_EVENT, onmessage, false);
			worker.postMessage({
				init : true,
				level : level
			});
		} else
			launchProcess(new obj.zip.Deflater(), reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		return worker;
	}

	function copy(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var chunkIndex = 0, crc32 = new Crc32();

		function step() {
			var index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					if (computeCrc32)
						crc32.append(array);
					if (onprogress)
						onprogress(index, size, array);
					writer.writeUint8Array(array, function() {
						chunkIndex++;
						step();
					}, onwriteerror);
				}, onreaderror);
			else
				onend(size, crc32.get());
		}

		step();
	}

	// ZipReader

	function decodeASCII(str) {
		var i, out = "", charCode, extendedASCII = [ '\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB',
				'\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9',
				'\u00FF', '\u00D6', '\u00DC', '\u00F8', '\u00A3', '\u00D8', '\u00D7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1',
				'\u00AA', '\u00BA', '\u00BF', '\u00AE', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '_', '_', '_', '\u00A6', '\u00A6',
				'\u00C1', '\u00C2', '\u00C0', '\u00A9', '\u00A6', '\u00A6', '+', '+', '\u00A2', '\u00A5', '+', '+', '-', '-', '+', '-', '+', '\u00E3',
				'\u00C3', '+', '+', '-', '-', '\u00A6', '-', '+', '\u00A4', '\u00F0', '\u00D0', '\u00CA', '\u00CB', '\u00C8', 'i', '\u00CD', '\u00CE',
				'\u00CF', '+', '+', '_', '_', '\u00A6', '\u00CC', '_', '\u00D3', '\u00DF', '\u00D4', '\u00D2', '\u00F5', '\u00D5', '\u00B5', '\u00FE',
				'\u00DE', '\u00DA', '\u00DB', '\u00D9', '\u00FD', '\u00DD', '\u00AF', '\u00B4', '\u00AD', '\u00B1', '_', '\u00BE', '\u00B6', '\u00A7',
				'\u00F7', '\u00B8', '\u00B0', '\u00A8', '\u00B7', '\u00B9', '\u00B3', '\u00B2', '_', ' ' ];
		for (i = 0; i < str.length; i++) {
			charCode = str.charCodeAt(i) & 0xFF;
			if (charCode > 127)
				out += extendedASCII[charCode - 128];
			else
				out += String.fromCharCode(charCode);
		}
		return out;
	}

	function decodeUTF8(string) {
		return decodeURIComponent(escape(string));
	}

	function getString(bytes) {
		var i, str = "";
		for (i = 0; i < bytes.length; i++)
			str += String.fromCharCode(bytes[i]);
		return str;
	}

	function getDate(timeRaw) {
		var date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5,
					(time & 0x001F) * 2, 0);
		} catch (e) {
		}
	}

	function readCommonHeader(entry, data, index, centralDirectory, onerror) {
		entry.version = data.view.getUint16(index, true);
		entry.bitFlag = data.view.getUint16(index + 2, true);
		entry.compressionMethod = data.view.getUint16(index + 4, true);
		entry.lastModDateRaw = data.view.getUint32(index + 6, true);
		entry.lastModDate = getDate(entry.lastModDateRaw);
		if ((entry.bitFlag & 0x01) === 0x01) {
			onerror(ERR_ENCRYPTED);
			return;
		}
		if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
			entry.crc32 = data.view.getUint32(index + 10, true);
			entry.compressedSize = data.view.getUint32(index + 14, true);
			entry.uncompressedSize = data.view.getUint32(index + 18, true);
		}
		if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
			onerror(ERR_ZIP64);
			return;
		}
		entry.filenameLength = data.view.getUint16(index + 22, true);
		entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}

	function createZipReader(reader, onerror) {
		function Entry() {
		}

		Entry.prototype.getData = function(writer, onend, onprogress, checkCrc32) {
			var that = this, worker;

			function terminate(callback, param) {
				if (worker)
					worker.terminate();
				worker = null;
				if (callback)
					callback(param);
			}

			function testCrc32(crc32) {
				var dataCrc32 = getDataHelper(4);
				dataCrc32.view.setUint32(0, crc32);
				return that.crc32 == dataCrc32.view.getUint32(0);
			}

			function getWriterData(uncompressedSize, crc32) {
				if (checkCrc32 && !testCrc32(crc32))
					onreaderror();
				else
					writer.getData(function(data) {
						terminate(onend, data);
					});
			}

			function onreaderror() {
				terminate(onerror, ERR_READ_DATA);
			}

			function onwriteerror() {
				terminate(onerror, ERR_WRITE_DATA);
			}

			reader.readUint8Array(that.offset, 30, function(bytes) {
				var data = getDataHelper(bytes.length, bytes), dataOffset;
				if (data.view.getUint32(0) != 0x504b0304) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				readCommonHeader(that, data, 4, false, onerror);
				dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
				writer.init(function() {
					if (that.compressionMethod === 0)
						copy(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
					else
						worker = inflate(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
				}, onwriteerror);
			}, onreaderror);
		};

		function seekEOCDR(offset, entriesCallback) {
			reader.readUint8Array(reader.size - offset, offset, function(bytes) {
				var dataView = getDataHelper(bytes.length, bytes).view;
				if (dataView.getUint32(0) != 0x504b0506) {
					seekEOCDR(offset + 1, entriesCallback);
				} else {
					entriesCallback(dataView);
				}
			}, function() {
				onerror(ERR_READ);
			});
		}

		return {
			getEntries : function(callback) {
				if (reader.size < 22) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				// look for End of central directory record
				seekEOCDR(22, function(dataView) {
					var datalength, fileslength;
					datalength = dataView.getUint32(16, true);
					fileslength = dataView.getUint16(8, true);
					reader.readUint8Array(datalength, reader.size - datalength, function(bytes) {
						var i, index = 0, entries = [], entry, filename, comment, data = getDataHelper(bytes.length, bytes);
						for (i = 0; i < fileslength; i++) {
							entry = new Entry();
							if (data.view.getUint32(index) != 0x504b0102) {
								onerror(ERR_BAD_FORMAT);
								return;
							}
							readCommonHeader(entry, data, index + 6, true, onerror);
							entry.commentLength = data.view.getUint16(index + 32, true);
							entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
							entry.offset = data.view.getUint32(index + 42, true);
							filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
							entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
							if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/")
								entry.directory = true;
							comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46
									+ entry.filenameLength + entry.extraFieldLength + entry.commentLength));
							entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
							entries.push(entry);
							index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
						}
						callback(entries);
					}, function() {
						onerror(ERR_READ);
					});
				});
			},
			close : function(callback) {
				if (callback)
					callback();
			}
		};
	}

	// ZipWriter

	function encodeUTF8(string) {
		return unescape(encodeURIComponent(string));
	}

	function getBytes(str) {
		var i, array = [];
		for (i = 0; i < str.length; i++)
			array.push(str.charCodeAt(i));
		return array;
	}

	function createZipWriter(writer, onerror, dontDeflate) {
		var worker, files = {}, filenames = [], datalength = 0;

		function terminate(callback, message) {
			if (worker)
				worker.terminate();
			worker = null;
			if (callback)
				callback(message);
		}

		function onwriteerror() {
			terminate(onerror, ERR_WRITE);
		}

		function onreaderror() {
			terminate(onerror, ERR_READ_DATA);
		}

		return {
			add : function(name, reader, onend, onprogress, options) {
				var header, filename, date;

				function writeHeader(callback) {
					var data;
					date = options.lastModDate || new Date();
					header = getDataHelper(26);
					files[name] = {
						headerArray : header.array,
						directory : options.directory,
						filename : filename,
						offset : datalength,
						comment : getBytes(encodeUTF8(options.comment || ""))
					};
					header.view.setUint32(0, 0x14000808);
					if (options.version)
						header.view.setUint8(0, options.version);
					if (!dontDeflate && options.level !== 0 && !options.directory)
						header.view.setUint16(4, 0x0800);
					header.view.setUint16(6, (((date.getHours() << 6) | date.getMinutes()) << 5) | date.getSeconds() / 2, true);
					header.view.setUint16(8, ((((date.getFullYear() - 1980) << 4) | (date.getMonth() + 1)) << 5) | date.getDate(), true);
					header.view.setUint16(22, filename.length, true);
					data = getDataHelper(30 + filename.length);
					data.view.setUint32(0, 0x504b0304);
					data.array.set(header.array, 4);
					data.array.set(filename, 30);
					datalength += data.array.length;
					writer.writeUint8Array(data.array, callback, onwriteerror);
				}

				function writeFooter(compressedLength, crc32) {
					var footer = getDataHelper(16);
					datalength += compressedLength || 0;
					footer.view.setUint32(0, 0x504b0708);
					if (typeof crc32 != "undefined") {
						header.view.setUint32(10, crc32, true);
						footer.view.setUint32(4, crc32, true);
					}
					if (reader) {
						footer.view.setUint32(8, compressedLength, true);
						header.view.setUint32(14, compressedLength, true);
						footer.view.setUint32(12, reader.size, true);
						header.view.setUint32(18, reader.size, true);
					}
					writer.writeUint8Array(footer.array, function() {
						datalength += 16;
						terminate(onend);
					}, onwriteerror);
				}

				function writeFile() {
					options = options || {};
					name = name.trim();
					if (options.directory && name.charAt(name.length - 1) != "/")
						name += "/";
					if (files.hasOwnProperty(name)) {
						onerror(ERR_DUPLICATED_NAME);
						return;
					}
					filename = getBytes(encodeUTF8(name));
					filenames.push(name);
					writeHeader(function() {
						if (reader)
							if (dontDeflate || options.level === 0)
								copy(reader, writer, 0, reader.size, true, writeFooter, onprogress, onreaderror, onwriteerror);
							else
								worker = deflate(reader, writer, options.level, writeFooter, onprogress, onreaderror, onwriteerror);
						else
							writeFooter();
					}, onwriteerror);
				}

				if (reader)
					reader.init(writeFile, onreaderror);
				else
					writeFile();
			},
			close : function(callback) {
				var data, length = 0, index = 0, indexFilename, file;
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					length += 46 + file.filename.length + file.comment.length;
				}
				data = getDataHelper(length + 22);
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					data.view.setUint32(index, 0x504b0102);
					data.view.setUint16(index + 4, 0x1400);
					data.array.set(file.headerArray, index + 6);
					data.view.setUint16(index + 32, file.comment.length, true);
					if (file.directory)
						data.view.setUint8(index + 38, 0x10);
					data.view.setUint32(index + 42, file.offset, true);
					data.array.set(file.filename, index + 46);
					data.array.set(file.comment, index + 46 + file.filename.length);
					index += 46 + file.filename.length + file.comment.length;
				}
				data.view.setUint32(index, 0x504b0506);
				data.view.setUint16(index + 8, filenames.length, true);
				data.view.setUint16(index + 10, filenames.length, true);
				data.view.setUint32(index + 12, length, true);
				data.view.setUint32(index + 16, datalength, true);
				writer.writeUint8Array(data.array, function() {
					terminate(function() {
						writer.getData(callback);
					});
				}, onwriteerror);
			}
		};
	}

	obj.zip = {
		Reader : Reader,
		Writer : Writer,
		BlobReader : BlobReader,
		Data64URIReader : Data64URIReader,
		TextReader : TextReader,
		BlobWriter : BlobWriter,
		Data64URIWriter : Data64URIWriter,
		TextWriter : TextWriter,
		createReader : function(reader, callback, onerror) {
			reader.init(function() {
				callback(createZipReader(reader, onerror));
			}, onerror);
		},
		createWriter : function(writer, callback, onerror, dontDeflate) {
			writer.init(function() {
				callback(createZipWriter(writer, onerror, dontDeflate));
			}, onerror);
		},
		workerScriptsPath : "",
		useWebWorkers : true
	};

})(this);
/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {

	var CHUNK_SIZE = 512 * 1024;

	var TextWriter = zip.TextWriter, //
	BlobWriter = zip.BlobWriter, //
	Data64URIWriter = zip.Data64URIWriter, //
	Reader = zip.Reader, //
	TextReader = zip.TextReader, //
	BlobReader = zip.BlobReader, //
	Data64URIReader = zip.Data64URIReader, //
	createReader = zip.createReader, //
	createWriter = zip.createWriter;

	function ZipBlobReader(entry) {
		var that = this, blobReader;

		function init(callback) {
			this.size = entry.uncompressedSize;
			callback();
		}

		function getData(callback) {
			if (that.data)
				callback();
			else
				entry.getData(new BlobWriter(), function(data) {
					that.data = data;
					blobReader = new BlobReader(data);
					callback();
				}, null, that.checkCrc32);
		}

		function readUint8Array(index, length, callback, onerror) {
			getData(function() {
				blobReader.readUint8Array(index, length, callback, onerror);
			}, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	ZipBlobReader.prototype = new Reader();
	ZipBlobReader.prototype.constructor = ZipBlobReader;
	ZipBlobReader.prototype.checkCrc32 = false;

	function getTotalSize(entry) {
		var size = 0;

		function process(entry) {
			size += entry.uncompressedSize || 0;
			entry.children.forEach(process);
		}

		process(entry);
		return size;
	}

	function initReaders(entry, onend, onerror) {
		var index = 0;

		function next() {
			index++;
			if (index < entry.children.length)
				process(entry.children[index]);
			else
				onend();
		}

		function process(child) {
			if (child.directory)
				initReaders(child, next, onerror);
			else {
				child.reader = new child.Reader(child.data, onerror);
				child.reader.init(function() {
					child.uncompressedSize = child.reader.size;
					next();
				});
			}
		}

		if (entry.children.length)
			process(entry.children[index]);
		else
			onend();
	}

	function detach(entry) {
		var children = entry.parent.children;
		children.forEach(function(child, index) {
			if (child.id == entry.id)
				children.splice(index, 1);
		});
	}

	function exportZip(zipWriter, entry, onend, onprogress, totalSize) {
		var currentIndex = 0;

		function process(zipWriter, entry, onend, onprogress, totalSize) {
			var childIndex = 0;

			function exportChild() {
				var child = entry.children[childIndex];
				if (child)
					zipWriter.add(child.getFullname(), child.reader, function() {
						currentIndex += child.uncompressedSize || 0;
						process(zipWriter, child, function() {
							childIndex++;
							exportChild();
						}, onprogress, totalSize);
					}, function(index) {
						if (onprogress)
							onprogress(currentIndex + index, totalSize);
					}, {
						directory : child.directory,
						version : child.zipVersion
					});
				else
					onend();
			}

			exportChild();
		}

		process(zipWriter, entry, onend, onprogress, totalSize);
	}

	function addFileEntry(zipEntry, fileEntry, onend, onerror) {
		function getChildren(fileEntry, callback) {
			if (fileEntry.isDirectory)
				fileEntry.createReader().readEntries(callback);
			if (fileEntry.isFile)
				callback([]);
		}

		function process(zipEntry, fileEntry, onend) {
			getChildren(fileEntry, function(children) {
				var childIndex = 0;

				function addChild(child) {
					function nextChild(childFileEntry) {
						process(childFileEntry, child, function() {
							childIndex++;
							processChild();
						});
					}

					if (child.isDirectory)
						nextChild(zipEntry.addDirectory(child.name));
					if (child.isFile)
						child.file(function(file) {
							var childZipEntry = zipEntry.addBlob(child.name, file);
							childZipEntry.uncompressedSize = file.size;
							nextChild(childZipEntry);
						}, onerror);
				}

				function processChild() {
					var child = children[childIndex];
					if (child)
						addChild(child);
					else
						onend();
				}

				processChild();
			});
		}

		if (fileEntry.isDirectory)
			process(zipEntry, fileEntry, onend);
		else
			fileEntry.file(function(file) {
				zipEntry.addBlob(fileEntry.name, file);
				onend();
			}, onerror);
	}

	function getFileEntry(fileEntry, entry, onend, onprogress, onerror, totalSize, checkCrc32) {
		var currentIndex = 0;

		function process(fileEntry, entry, onend, onprogress, onerror, totalSize) {
			var childIndex = 0;

			function addChild(child) {
				function nextChild(childFileEntry) {
					currentIndex += child.uncompressedSize || 0;
					process(childFileEntry, child, function() {
						childIndex++;
						processChild();
					}, onprogress, onerror, totalSize);
				}

				if (child.directory)
					fileEntry.getDirectory(child.name, {
						create : true
					}, nextChild, onerror);
				else
					fileEntry.getFile(child.name, {
						create : true
					}, function(file) {
						child.getData(new zip.FileWriter(file, zip.getMimeType(child.name)), nextChild, function(index) {
							if (onprogress)
								onprogress(currentIndex + index, totalSize);
						}, checkCrc32);
					}, onerror);
			}

			function processChild() {
				var child = entry.children[childIndex];
				if (child)
					addChild(child);
				else
					onend();
			}

			processChild();
		}

		if (entry.directory)
			process(fileEntry, entry, onend, onprogress, onerror, totalSize);
		else
			entry.getData(new zip.FileWriter(fileEntry, zip.getMimeType(entry.name)), onend, onprogress, checkCrc32);
	}

	function resetFS(fs) {
		fs.entries = [];
		fs.root = new ZipDirectoryEntry(fs);
	}

	function bufferedCopy(reader, writer, onend, onprogress, onerror) {
		var chunkIndex = 0;

		function stepCopy() {
			var index = chunkIndex * CHUNK_SIZE;
			if (onprogress)
				onprogress(index, reader.size);
			if (index < reader.size)
				reader.readUint8Array(index, Math.min(CHUNK_SIZE, reader.size - index), function(array) {
					writer.writeUint8Array(new Uint8Array(array), function() {
						chunkIndex++;
						stepCopy();
					});
				}, onerror);
			else
				writer.getData(onend);
		}

		stepCopy();
	}

	function getEntryData(writer, onend, onprogress, onerror) {
		var that = this;
		if (!writer || (writer.constructor == that.Writer && that.data))
			onend(that.data);
		else {
			if (!that.reader)
				that.reader = new that.Reader(that.data, onerror);
			that.reader.init(function() {
				writer.init(function() {
					bufferedCopy(that.reader, writer, onend, onprogress, onerror);
				}, onerror);
			});
		}
	}

	function addChild(parent, name, params, directory) {
		if (parent.directory)
			return directory ? new ZipDirectoryEntry(parent.fs, name, params, parent) : new ZipFileEntry(parent.fs, name, params, parent);
		else
			throw "Parent entry is not a directory.";
	}

	function ZipEntry() {
	}

	ZipEntry.prototype = {
		init : function(fs, name, params, parent) {
			var that = this;
			if (fs.root && parent && parent.getChildByName(name))
				throw "Entry filename already exists.";
			if (!params)
				params = {};
			that.fs = fs;
			that.name = name;
			that.id = fs.entries.length;
			that.parent = parent;
			that.children = [];
			that.zipVersion = params.zipVersion || 0x14;
			that.uncompressedSize = 0;
			fs.entries.push(that);
			if (parent)
				that.parent.children.push(that);
		},
		getFileEntry : function(fileEntry, onend, onprogress, onerror, checkCrc32) {
			var that = this;
			initReaders(that, function() {
				getFileEntry(fileEntry, that, onend, onprogress, onerror, getTotalSize(that), checkCrc32);
			}, onerror);
		},
		moveTo : function(target) {
			var that = this;
			if (target.directory) {
				if (!target.isDescendantOf(that)) {
					if (that != target) {
						if (target.getChildByName(that.name))
							throw "Entry filename already exists.";
						detach(that);
						that.parent = target;
						target.children.push(that);
					}
				} else
					throw "Entry is a ancestor of target entry.";
			} else
				throw "Target entry is not a directory.";
		},
		getFullname : function() {
			var that = this, fullname = that.name, entry = that.parent;
			while (entry) {
				fullname = (entry.name ? entry.name + "/" : "") + fullname;
				entry = entry.parent;
			}
			return fullname;
		},
		isDescendantOf : function(ancestor) {
			var entry = this.parent;
			while (entry && entry.id != ancestor.id)
				entry = entry.parent;
			return !!entry;
		}
	};
	ZipEntry.prototype.constructor = ZipEntry;

	var ZipFileEntryProto;

	function ZipFileEntry(fs, name, params, parent) {
		var that = this;
		ZipEntry.prototype.init.call(that, fs, name, params, parent);
		that.Reader = params.Reader;
		that.Writer = params.Writer;
		that.data = params.data;
		that.getData = params.getData || getEntryData;
	}

	ZipFileEntry.prototype = ZipFileEntryProto = new ZipEntry();
	ZipFileEntryProto.constructor = ZipFileEntry;
	ZipFileEntryProto.getText = function(onend, onprogress, checkCrc32, encoding) {
		this.getData(new TextWriter(encoding), onend, onprogress, checkCrc32);
	};
	ZipFileEntryProto.getBlob = function(mimeType, onend, onprogress, checkCrc32) {
		this.getData(new BlobWriter(mimeType), onend, onprogress, checkCrc32);
	};
	ZipFileEntryProto.getData64URI = function(mimeType, onend, onprogress, checkCrc32) {
		this.getData(new Data64URIWriter(mimeType), onend, onprogress, checkCrc32);
	};

	var ZipDirectoryEntryProto;

	function ZipDirectoryEntry(fs, name, params, parent) {
		var that = this;
		ZipEntry.prototype.init.call(that, fs, name, params, parent);
		that.directory = true;
	}

	ZipDirectoryEntry.prototype = ZipDirectoryEntryProto = new ZipEntry();
	ZipDirectoryEntryProto.constructor = ZipDirectoryEntry;
	ZipDirectoryEntryProto.addDirectory = function(name) {
		return addChild(this, name, null, true);
	};
	ZipDirectoryEntryProto.addText = function(name, text) {
		return addChild(this, name, {
			data : text,
			Reader : TextReader,
			Writer : TextWriter
		});
	};
	ZipDirectoryEntryProto.addBlob = function(name, blob) {
		return addChild(this, name, {
			data : blob,
			Reader : BlobReader,
			Writer : BlobWriter
		});
	};
	ZipDirectoryEntryProto.addData64URI = function(name, dataURI) {
		return addChild(this, name, {
			data : dataURI,
			Reader : Data64URIReader,
			Writer : Data64URIWriter
		});
	};
	ZipDirectoryEntryProto.addFileEntry = function(fileEntry, onend, onerror) {
		addFileEntry(this, fileEntry, onend, onerror);
	};
	ZipDirectoryEntryProto.addData = function(name, params) {
		return addChild(this, name, params);
	};
	ZipDirectoryEntryProto.importBlob = function(blob, onend, onerror) {
		this.importZip(new BlobReader(blob), onend, onerror);
	};
	ZipDirectoryEntryProto.importText = function(text, onend, onerror) {
		this.importZip(new TextReader(text), onend, onerror);
	};
	ZipDirectoryEntryProto.importData64URI = function(dataURI, onend, onerror) {
		this.importZip(new Data64URIReader(dataURI), onend, onerror);
	};
	ZipDirectoryEntryProto.exportBlob = function(onend, onprogress, onerror) {
		this.exportZip(new BlobWriter("application/zip"), onend, onprogress, onerror);
	};
	ZipDirectoryEntryProto.exportText = function(onend, onprogress, onerror) {
		this.exportZip(new TextWriter(), onend, onprogress, onerror);
	};
	ZipDirectoryEntryProto.exportFileEntry = function(fileEntry, onend, onprogress, onerror) {
		this.exportZip(new zip.FileWriter(fileEntry, "application/zip"), onend, onprogress, onerror);
	};
	ZipDirectoryEntryProto.exportData64URI = function(onend, onprogress, onerror) {
		this.exportZip(new Data64URIWriter("application/zip"), onend, onprogress, onerror);
	};
	ZipDirectoryEntryProto.importZip = function(reader, onend, onerror) {
		var that = this;
		createReader(reader, function(zipReader) {
			zipReader.getEntries(function(entries) {
				entries.forEach(function(entry) {
					var parent = that, path = entry.filename.split("/"), name = path.pop();
					path.forEach(function(pathPart) {
						parent = parent.getChildByName(pathPart) || new ZipDirectoryEntry(that.fs, pathPart, null, parent);
					});
					if (!entry.directory)
						addChild(parent, name, {
							data : entry,
							Reader : ZipBlobReader
						});
				});
				onend();
			});
		}, onerror);
	};
	ZipDirectoryEntryProto.exportZip = function(writer, onend, onprogress, onerror) {
		var that = this;
		initReaders(that, function() {
			createWriter(writer, function(zipWriter) {
				exportZip(zipWriter, that, function() {
					zipWriter.close(onend);
				}, onprogress, getTotalSize(that));
			}, onerror);
		}, onerror);
	};
	ZipDirectoryEntryProto.getChildByName = function(name) {
		var childIndex, child, that = this;
		for (childIndex = 0; childIndex < that.children.length; childIndex++) {
			child = that.children[childIndex];
			if (child.name == name)
				return child;
		}
	};

	function FS() {
		resetFS(this);
	}
	FS.prototype = {
		remove : function(entry) {
			detach(entry);
			this.entries[entry.id] = null;
		},
		find : function(fullname) {
			var index, path = fullname.split("/"), node = this.root;
			for (index = 0; node && index < path.length; index++)
				node = node.getChildByName(path[index]);
			return node;
		},
		getById : function(id) {
			return this.entries[id];
		},
		importBlob : function(blob, onend, onerror) {
			resetFS(this);
			this.root.importBlob(blob, onend, onerror);
		},
		importText : function(text, onend, onerror) {
			resetFS(this);
			this.root.importText(text, onend, onerror);
		},
		importData64URI : function(dataURI, onend, onerror) {
			resetFS(this);
			this.root.importData64URI(dataURI, onend, onerror);
		},
		exportBlob : function(onend, onprogress, onerror) {
			this.root.exportBlob(onend, onprogress, onerror);
		},
		exportText : function(onend, onprogress, onerror) {
			this.root.exportText(onend, onprogress, onerror);
		},
		exportFileEntry : function(fileEntry, onend, onprogress, onerror) {
			this.root.exportFileEntry(fileEntry, onend, onprogress, onerror);
		},
		exportData64URI : function(onend, onprogress, onerror) {
			this.root.exportData64URI(onend, onprogress, onerror);
		}
	};

	zip.fs = {
		FS : FS,
		ZipDirectoryEntry : ZipDirectoryEntry,
		ZipFileEntry : ZipFileEntry
	};

	zip.getMimeType = function() {
		return "application/octet-stream";
	};

})();
/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
	var table = {
		"application" : {
			"andrew-inset" : "ez",
			"annodex" : "anx",
			"atom+xml" : "atom",
			"atomcat+xml" : "atomcat",
			"atomserv+xml" : "atomsrv",
			"bbolin" : "lin",
			"cap" : [ "cap", "pcap" ],
			"cu-seeme" : "cu",
			"davmount+xml" : "davmount",
			"dsptype" : "tsp",
			"ecmascript" : [ "es", "ecma" ],
			"futuresplash" : "spl",
			"hta" : "hta",
			"java-archive" : "jar",
			"java-serialized-object" : "ser",
			"java-vm" : "class",
			"javascript" : "js",
			"m3g" : "m3g",
			"mac-binhex40" : "hqx",
			"mathematica" : [ "nb", "ma", "mb" ],
			"msaccess" : "mdb",
			"msword" : [ "doc", "dot" ],
			"mxf" : "mxf",
			"oda" : "oda",
			"ogg" : "ogx",
			"pdf" : "pdf",
			"pgp-keys" : "key",
			"pgp-signature" : [ "asc", "sig" ],
			"pics-rules" : "prf",
			"postscript" : [ "ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3" ],
			"rar" : "rar",
			"rdf+xml" : "rdf",
			"rss+xml" : "rss",
			"rtf" : "rtf",
			"smil" : [ "smi", "smil" ],
			"xhtml+xml" : [ "xhtml", "xht" ],
			"xml" : [ "xml", "xsl", "xsd" ],
			"xspf+xml" : "xspf",
			"zip" : "zip",
			"vnd.android.package-archive" : "apk",
			"vnd.cinderella" : "cdy",
			"vnd.google-earth.kml+xml" : "kml",
			"vnd.google-earth.kmz" : "kmz",
			"vnd.mozilla.xul+xml" : "xul",
			"vnd.ms-excel" : [ "xls", "xlb", "xlt", "xlm", "xla", "xlc", "xlw" ],
			"vnd.ms-pki.seccat" : "cat",
			"vnd.ms-pki.stl" : "stl",
			"vnd.ms-powerpoint" : [ "ppt", "pps", "pot" ],
			"vnd.oasis.opendocument.chart" : "odc",
			"vnd.oasis.opendocument.database" : "odb",
			"vnd.oasis.opendocument.formula" : "odf",
			"vnd.oasis.opendocument.graphics" : "odg",
			"vnd.oasis.opendocument.graphics-template" : "otg",
			"vnd.oasis.opendocument.image" : "odi",
			"vnd.oasis.opendocument.presentation" : "odp",
			"vnd.oasis.opendocument.presentation-template" : "otp",
			"vnd.oasis.opendocument.spreadsheet" : "ods",
			"vnd.oasis.opendocument.spreadsheet-template" : "ots",
			"vnd.oasis.opendocument.text" : "odt",
			"vnd.oasis.opendocument.text-master" : "odm",
			"vnd.oasis.opendocument.text-template" : "ott",
			"vnd.oasis.opendocument.text-web" : "oth",
			"vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "xlsx",
			"vnd.openxmlformats-officedocument.spreadsheetml.template" : "xltx",
			"vnd.openxmlformats-officedocument.presentationml.presentation" : "pptx",
			"vnd.openxmlformats-officedocument.presentationml.slideshow" : "ppsx",
			"vnd.openxmlformats-officedocument.presentationml.template" : "potx",
			"vnd.openxmlformats-officedocument.wordprocessingml.document" : "docx",
			"vnd.openxmlformats-officedocument.wordprocessingml.template" : "dotx",
			"vnd.smaf" : "mmf",
			"vnd.stardivision.calc" : "sdc",
			"vnd.stardivision.chart" : "sds",
			"vnd.stardivision.draw" : "sda",
			"vnd.stardivision.impress" : "sdd",
			"vnd.stardivision.math" : [ "sdf", "smf" ],
			"vnd.stardivision.writer" : [ "sdw", "vor" ],
			"vnd.stardivision.writer-global" : "sgl",
			"vnd.sun.xml.calc" : "sxc",
			"vnd.sun.xml.calc.template" : "stc",
			"vnd.sun.xml.draw" : "sxd",
			"vnd.sun.xml.draw.template" : "std",
			"vnd.sun.xml.impress" : "sxi",
			"vnd.sun.xml.impress.template" : "sti",
			"vnd.sun.xml.math" : "sxm",
			"vnd.sun.xml.writer" : "sxw",
			"vnd.sun.xml.writer.global" : "sxg",
			"vnd.sun.xml.writer.template" : "stw",
			"vnd.symbian.install" : [ "sis", "sisx" ],
			"vnd.visio" : [ "vsd", "vst", "vss", "vsw" ],
			"vnd.wap.wbxml" : "wbxml",
			"vnd.wap.wmlc" : "wmlc",
			"vnd.wap.wmlscriptc" : "wmlsc",
			"vnd.wordperfect" : "wpd",
			"vnd.wordperfect5.1" : "wp5",
			"x-123" : "wk",
			"x-7z-compressed" : "7z",
			"x-abiword" : "abw",
			"x-apple-diskimage" : "dmg",
			"x-bcpio" : "bcpio",
			"x-bittorrent" : "torrent",
			"x-cbr" : [ "cbr", "cba", "cbt", "cb7" ],
			"x-cbz" : "cbz",
			"x-cdf" : [ "cdf", "cda" ],
			"x-cdlink" : "vcd",
			"x-chess-pgn" : "pgn",
			"x-cpio" : "cpio",
			"x-csh" : "csh",
			"x-debian-package" : [ "deb", "udeb" ],
			"x-director" : [ "dcr", "dir", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa" ],
			"x-dms" : "dms",
			"x-doom" : "wad",
			"x-dvi" : "dvi",
			"x-httpd-eruby" : "rhtml",
			"x-font" : "pcf.Z",
			"x-freemind" : "mm",
			"x-gnumeric" : "gnumeric",
			"x-go-sgf" : "sgf",
			"x-graphing-calculator" : "gcf",
			"x-gtar" : [ "gtar", "taz" ],
			"x-hdf" : "hdf",
			"x-httpd-php" : [ "phtml", "pht", "php" ],
			"x-httpd-php-source" : "phps",
			"x-httpd-php3" : "php3",
			"x-httpd-php3-preprocessed" : "php3p",
			"x-httpd-php4" : "php4",
			"x-httpd-php5" : "php5",
			"x-ica" : "ica",
			"x-info" : "info",
			"x-internet-signup" : [ "ins", "isp" ],
			"x-iphone" : "iii",
			"x-iso9660-image" : "iso",
			"x-java-jnlp-file" : "jnlp",
			"x-jmol" : "jmz",
			"x-killustrator" : "kil",
			"x-koan" : [ "skp", "skd", "skt", "skm" ],
			"x-kpresenter" : [ "kpr", "kpt" ],
			"x-kword" : [ "kwd", "kwt" ],
			"x-latex" : "latex",
			"x-lha" : "lha",
			"x-lyx" : "lyx",
			"x-lzh" : "lzh",
			"x-lzx" : "lzx",
			"x-maker" : [ "frm", "maker", "frame", "fm", "fb", "book", "fbdoc" ],
			"x-ms-wmd" : "wmd",
			"x-ms-wmz" : "wmz",
			"x-msdos-program" : [ "com", "exe", "bat", "dll" ],
			"x-msi" : "msi",
			"x-netcdf" : [ "nc", "cdf" ],
			"x-ns-proxy-autoconfig" : [ "pac", "dat" ],
			"x-nwc" : "nwc",
			"x-object" : "o",
			"x-oz-application" : "oza",
			"x-pkcs7-certreqresp" : "p7r",
			"x-python-code" : [ "pyc", "pyo" ],
			"x-qgis" : [ "qgs", "shp", "shx" ],
			"x-quicktimeplayer" : "qtl",
			"x-redhat-package-manager" : "rpm",
			"x-ruby" : "rb",
			"x-sh" : "sh",
			"x-shar" : "shar",
			"x-shockwave-flash" : [ "swf", "swfl" ],
			"x-silverlight" : "scr",
			"x-stuffit" : "sit",
			"x-sv4cpio" : "sv4cpio",
			"x-sv4crc" : "sv4crc",
			"x-tar" : "tar",
			"x-tcl" : "tcl",
			"x-tex-gf" : "gf",
			"x-tex-pk" : "pk",
			"x-texinfo" : [ "texinfo", "texi" ],
			"x-trash" : [ "~", "%", "bak", "old", "sik" ],
			"x-troff" : [ "t", "tr", "roff" ],
			"x-troff-man" : "man",
			"x-troff-me" : "me",
			"x-troff-ms" : "ms",
			"x-ustar" : "ustar",
			"x-wais-source" : "src",
			"x-wingz" : "wz",
			"x-x509-ca-cert" : [ "crt", "der", "cer" ],
			"x-xcf" : "xcf",
			"x-xfig" : "fig",
			"x-xpinstall" : "xpi",
			"applixware" : "aw",
			"atomsvc+xml" : "atomsvc",
			"ccxml+xml" : "ccxml",
			"cdmi-capability" : "cdmia",
			"cdmi-container" : "cdmic",
			"cdmi-domain" : "cdmid",
			"cdmi-object" : "cdmio",
			"cdmi-queue" : "cdmiq",
			"docbook+xml" : "dbk",
			"dssc+der" : "dssc",
			"dssc+xml" : "xdssc",
			"emma+xml" : "emma",
			"epub+zip" : "epub",
			"exi" : "exi",
			"font-tdpfr" : "pfr",
			"gml+xml" : "gml",
			"gpx+xml" : "gpx",
			"gxf" : "gxf",
			"hyperstudio" : "stk",
			"inkml+xml" : [ "ink", "inkml" ],
			"ipfix" : "ipfix",
			"json" : "json",
			"jsonml+json" : "jsonml",
			"lost+xml" : "lostxml",
			"mads+xml" : "mads",
			"marc" : "mrc",
			"marcxml+xml" : "mrcx",
			"mathml+xml" : "mathml",
			"mbox" : "mbox",
			"mediaservercontrol+xml" : "mscml",
			"metalink+xml" : "metalink",
			"metalink4+xml" : "meta4",
			"mets+xml" : "mets",
			"mods+xml" : "mods",
			"mp21" : [ "m21", "mp21" ],
			"mp4" : "mp4s",
			"oebps-package+xml" : "opf",
			"omdoc+xml" : "omdoc",
			"onenote" : [ "onetoc", "onetoc2", "onetmp", "onepkg" ],
			"oxps" : "oxps",
			"patch-ops-error+xml" : "xer",
			"pgp-encrypted" : "pgp",
			"pkcs10" : "p10",
			"pkcs7-mime" : [ "p7m", "p7c" ],
			"pkcs7-signature" : "p7s",
			"pkcs8" : "p8",
			"pkix-attr-cert" : "ac",
			"pkix-crl" : "crl",
			"pkix-pkipath" : "pkipath",
			"pkixcmp" : "pki",
			"pls+xml" : "pls",
			"prs.cww" : "cww",
			"pskc+xml" : "pskcxml",
			"reginfo+xml" : "rif",
			"relax-ng-compact-syntax" : "rnc",
			"resource-lists+xml" : "rl",
			"resource-lists-diff+xml" : "rld",
			"rls-services+xml" : "rs",
			"rpki-ghostbusters" : "gbr",
			"rpki-manifest" : "mft",
			"rpki-roa" : "roa",
			"rsd+xml" : "rsd",
			"sbml+xml" : "sbml",
			"scvp-cv-request" : "scq",
			"scvp-cv-response" : "scs",
			"scvp-vp-request" : "spq",
			"scvp-vp-response" : "spp",
			"sdp" : "sdp",
			"set-payment-initiation" : "setpay",
			"set-registration-initiation" : "setreg",
			"shf+xml" : "shf",
			"sparql-query" : "rq",
			"sparql-results+xml" : "srx",
			"srgs" : "gram",
			"srgs+xml" : "grxml",
			"sru+xml" : "sru",
			"ssdl+xml" : "ssdl",
			"ssml+xml" : "ssml",
			"tei+xml" : [ "tei", "teicorpus" ],
			"thraud+xml" : "tfi",
			"timestamped-data" : "tsd",
			"vnd.3gpp.pic-bw-large" : "plb",
			"vnd.3gpp.pic-bw-small" : "psb",
			"vnd.3gpp.pic-bw-var" : "pvb",
			"vnd.3gpp2.tcap" : "tcap",
			"vnd.3m.post-it-notes" : "pwn",
			"vnd.accpac.simply.aso" : "aso",
			"vnd.accpac.simply.imp" : "imp",
			"vnd.acucobol" : "acu",
			"vnd.acucorp" : [ "atc", "acutc" ],
			"vnd.adobe.air-application-installer-package+zip" : "air",
			"vnd.adobe.formscentral.fcdt" : "fcdt",
			"vnd.adobe.fxp" : [ "fxp", "fxpl" ],
			"vnd.adobe.xdp+xml" : "xdp",
			"vnd.adobe.xfdf" : "xfdf",
			"vnd.ahead.space" : "ahead",
			"vnd.airzip.filesecure.azf" : "azf",
			"vnd.airzip.filesecure.azs" : "azs",
			"vnd.amazon.ebook" : "azw",
			"vnd.americandynamics.acc" : "acc",
			"vnd.amiga.ami" : "ami",
			"vnd.anser-web-certificate-issue-initiation" : "cii",
			"vnd.anser-web-funds-transfer-initiation" : "fti",
			"vnd.antix.game-component" : "atx",
			"vnd.apple.installer+xml" : "mpkg",
			"vnd.apple.mpegurl" : "m3u8",
			"vnd.aristanetworks.swi" : "swi",
			"vnd.astraea-software.iota" : "iota",
			"vnd.audiograph" : "aep",
			"vnd.blueice.multipass" : "mpm",
			"vnd.bmi" : "bmi",
			"vnd.businessobjects" : "rep",
			"vnd.chemdraw+xml" : "cdxml",
			"vnd.chipnuts.karaoke-mmd" : "mmd",
			"vnd.claymore" : "cla",
			"vnd.cloanto.rp9" : "rp9",
			"vnd.clonk.c4group" : [ "c4g", "c4d", "c4f", "c4p", "c4u" ],
			"vnd.cluetrust.cartomobile-config" : "c11amc",
			"vnd.cluetrust.cartomobile-config-pkg" : "c11amz",
			"vnd.commonspace" : "csp",
			"vnd.contact.cmsg" : "cdbcmsg",
			"vnd.cosmocaller" : "cmc",
			"vnd.crick.clicker" : "clkx",
			"vnd.crick.clicker.keyboard" : "clkk",
			"vnd.crick.clicker.palette" : "clkp",
			"vnd.crick.clicker.template" : "clkt",
			"vnd.crick.clicker.wordbank" : "clkw",
			"vnd.criticaltools.wbs+xml" : "wbs",
			"vnd.ctc-posml" : "pml",
			"vnd.cups-ppd" : "ppd",
			"vnd.curl.car" : "car",
			"vnd.curl.pcurl" : "pcurl",
			"vnd.dart" : "dart",
			"vnd.data-vision.rdz" : "rdz",
			"vnd.dece.data" : [ "uvf", "uvvf", "uvd", "uvvd" ],
			"vnd.dece.ttml+xml" : [ "uvt", "uvvt" ],
			"vnd.dece.unspecified" : [ "uvx", "uvvx" ],
			"vnd.dece.zip" : [ "uvz", "uvvz" ],
			"vnd.denovo.fcselayout-link" : "fe_launch",
			"vnd.dna" : "dna",
			"vnd.dolby.mlp" : "mlp",
			"vnd.dpgraph" : "dpg",
			"vnd.dreamfactory" : "dfac",
			"vnd.ds-keypoint" : "kpxx",
			"vnd.dvb.ait" : "ait",
			"vnd.dvb.service" : "svc",
			"vnd.dynageo" : "geo",
			"vnd.ecowin.chart" : "mag",
			"vnd.enliven" : "nml",
			"vnd.epson.esf" : "esf",
			"vnd.epson.msf" : "msf",
			"vnd.epson.quickanime" : "qam",
			"vnd.epson.salt" : "slt",
			"vnd.epson.ssf" : "ssf",
			"vnd.eszigno3+xml" : [ "es3", "et3" ],
			"vnd.ezpix-album" : "ez2",
			"vnd.ezpix-package" : "ez3",
			"vnd.fdf" : "fdf",
			"vnd.fdsn.mseed" : "mseed",
			"vnd.fdsn.seed" : [ "seed", "dataless" ],
			"vnd.flographit" : "gph",
			"vnd.fluxtime.clip" : "ftc",
			"vnd.framemaker" : [ "fm", "frame", "maker", "book" ],
			"vnd.frogans.fnc" : "fnc",
			"vnd.frogans.ltf" : "ltf",
			"vnd.fsc.weblaunch" : "fsc",
			"vnd.fujitsu.oasys" : "oas",
			"vnd.fujitsu.oasys2" : "oa2",
			"vnd.fujitsu.oasys3" : "oa3",
			"vnd.fujitsu.oasysgp" : "fg5",
			"vnd.fujitsu.oasysprs" : "bh2",
			"vnd.fujixerox.ddd" : "ddd",
			"vnd.fujixerox.docuworks" : "xdw",
			"vnd.fujixerox.docuworks.binder" : "xbd",
			"vnd.fuzzysheet" : "fzs",
			"vnd.genomatix.tuxedo" : "txd",
			"vnd.geogebra.file" : "ggb",
			"vnd.geogebra.tool" : "ggt",
			"vnd.geometry-explorer" : [ "gex", "gre" ],
			"vnd.geonext" : "gxt",
			"vnd.geoplan" : "g2w",
			"vnd.geospace" : "g3w",
			"vnd.gmx" : "gmx",
			"vnd.grafeq" : [ "gqf", "gqs" ],
			"vnd.groove-account" : "gac",
			"vnd.groove-help" : "ghf",
			"vnd.groove-identity-message" : "gim",
			"vnd.groove-injector" : "grv",
			"vnd.groove-tool-message" : "gtm",
			"vnd.groove-tool-template" : "tpl",
			"vnd.groove-vcard" : "vcg",
			"vnd.hal+xml" : "hal",
			"vnd.handheld-entertainment+xml" : "zmm",
			"vnd.hbci" : "hbci",
			"vnd.hhe.lesson-player" : "les",
			"vnd.hp-hpgl" : "hpgl",
			"vnd.hp-hpid" : "hpid",
			"vnd.hp-hps" : "hps",
			"vnd.hp-jlyt" : "jlt",
			"vnd.hp-pcl" : "pcl",
			"vnd.hp-pclxl" : "pclxl",
			"vnd.hydrostatix.sof-data" : "sfd-hdstx",
			"vnd.ibm.minipay" : "mpy",
			"vnd.ibm.modcap" : [ "afp", "listafp", "list3820" ],
			"vnd.ibm.rights-management" : "irm",
			"vnd.ibm.secure-container" : "sc",
			"vnd.iccprofile" : [ "icc", "icm" ],
			"vnd.igloader" : "igl",
			"vnd.immervision-ivp" : "ivp",
			"vnd.immervision-ivu" : "ivu",
			"vnd.insors.igm" : "igm",
			"vnd.intercon.formnet" : [ "xpw", "xpx" ],
			"vnd.intergeo" : "i2g",
			"vnd.intu.qbo" : "qbo",
			"vnd.intu.qfx" : "qfx",
			"vnd.ipunplugged.rcprofile" : "rcprofile",
			"vnd.irepository.package+xml" : "irp",
			"vnd.is-xpr" : "xpr",
			"vnd.isac.fcs" : "fcs",
			"vnd.jam" : "jam",
			"vnd.jcp.javame.midlet-rms" : "rms",
			"vnd.jisp" : "jisp",
			"vnd.joost.joda-archive" : "joda",
			"vnd.kahootz" : [ "ktz", "ktr" ],
			"vnd.kde.karbon" : "karbon",
			"vnd.kde.kchart" : "chrt",
			"vnd.kde.kformula" : "kfo",
			"vnd.kde.kivio" : "flw",
			"vnd.kde.kontour" : "kon",
			"vnd.kde.kpresenter" : [ "kpr", "kpt" ],
			"vnd.kde.kspread" : "ksp",
			"vnd.kde.kword" : [ "kwd", "kwt" ],
			"vnd.kenameaapp" : "htke",
			"vnd.kidspiration" : "kia",
			"vnd.kinar" : [ "kne", "knp" ],
			"vnd.koan" : [ "skp", "skd", "skt", "skm" ],
			"vnd.kodak-descriptor" : "sse",
			"vnd.las.las+xml" : "lasxml",
			"vnd.llamagraphics.life-balance.desktop" : "lbd",
			"vnd.llamagraphics.life-balance.exchange+xml" : "lbe",
			"vnd.lotus-1-2-3" : "123",
			"vnd.lotus-approach" : "apr",
			"vnd.lotus-freelance" : "pre",
			"vnd.lotus-notes" : "nsf",
			"vnd.lotus-organizer" : "org",
			"vnd.lotus-screencam" : "scm",
			"vnd.lotus-wordpro" : "lwp",
			"vnd.macports.portpkg" : "portpkg",
			"vnd.mcd" : "mcd",
			"vnd.medcalcdata" : "mc1",
			"vnd.mediastation.cdkey" : "cdkey",
			"vnd.mfer" : "mwf",
			"vnd.mfmp" : "mfm",
			"vnd.micrografx.flo" : "flo",
			"vnd.micrografx.igx" : "igx",
			"vnd.mif" : "mif",
			"vnd.mobius.daf" : "daf",
			"vnd.mobius.dis" : "dis",
			"vnd.mobius.mbk" : "mbk",
			"vnd.mobius.mqy" : "mqy",
			"vnd.mobius.msl" : "msl",
			"vnd.mobius.plc" : "plc",
			"vnd.mobius.txf" : "txf",
			"vnd.mophun.application" : "mpn",
			"vnd.mophun.certificate" : "mpc",
			"vnd.ms-artgalry" : "cil",
			"vnd.ms-cab-compressed" : "cab",
			"vnd.ms-excel.addin.macroenabled.12" : "xlam",
			"vnd.ms-excel.sheet.binary.macroenabled.12" : "xlsb",
			"vnd.ms-excel.sheet.macroenabled.12" : "xlsm",
			"vnd.ms-excel.template.macroenabled.12" : "xltm",
			"vnd.ms-fontobject" : "eot",
			"vnd.ms-htmlhelp" : "chm",
			"vnd.ms-ims" : "ims",
			"vnd.ms-lrm" : "lrm",
			"vnd.ms-officetheme" : "thmx",
			"vnd.ms-powerpoint.addin.macroenabled.12" : "ppam",
			"vnd.ms-powerpoint.presentation.macroenabled.12" : "pptm",
			"vnd.ms-powerpoint.slide.macroenabled.12" : "sldm",
			"vnd.ms-powerpoint.slideshow.macroenabled.12" : "ppsm",
			"vnd.ms-powerpoint.template.macroenabled.12" : "potm",
			"vnd.ms-project" : [ "mpp", "mpt" ],
			"vnd.ms-word.document.macroenabled.12" : "docm",
			"vnd.ms-word.template.macroenabled.12" : "dotm",
			"vnd.ms-works" : [ "wps", "wks", "wcm", "wdb" ],
			"vnd.ms-wpl" : "wpl",
			"vnd.ms-xpsdocument" : "xps",
			"vnd.mseq" : "mseq",
			"vnd.musician" : "mus",
			"vnd.muvee.style" : "msty",
			"vnd.mynfc" : "taglet",
			"vnd.neurolanguage.nlu" : "nlu",
			"vnd.nitf" : [ "ntf", "nitf" ],
			"vnd.noblenet-directory" : "nnd",
			"vnd.noblenet-sealer" : "nns",
			"vnd.noblenet-web" : "nnw",
			"vnd.nokia.n-gage.data" : "ngdat",
			"vnd.nokia.n-gage.symbian.install" : "n-gage",
			"vnd.nokia.radio-preset" : "rpst",
			"vnd.nokia.radio-presets" : "rpss",
			"vnd.novadigm.edm" : "edm",
			"vnd.novadigm.edx" : "edx",
			"vnd.novadigm.ext" : "ext",
			"vnd.oasis.opendocument.chart-template" : "otc",
			"vnd.oasis.opendocument.formula-template" : "odft",
			"vnd.oasis.opendocument.image-template" : "oti",
			"vnd.olpc-sugar" : "xo",
			"vnd.oma.dd2+xml" : "dd2",
			"vnd.openofficeorg.extension" : "oxt",
			"vnd.openxmlformats-officedocument.presentationml.slide" : "sldx",
			"vnd.osgeo.mapguide.package" : "mgp",
			"vnd.osgi.dp" : "dp",
			"vnd.osgi.subsystem" : "esa",
			"vnd.palm" : [ "pdb", "pqa", "oprc" ],
			"vnd.pawaafile" : "paw",
			"vnd.pg.format" : "str",
			"vnd.pg.osasli" : "ei6",
			"vnd.picsel" : "efif",
			"vnd.pmi.widget" : "wg",
			"vnd.pocketlearn" : "plf",
			"vnd.powerbuilder6" : "pbd",
			"vnd.previewsystems.box" : "box",
			"vnd.proteus.magazine" : "mgz",
			"vnd.publishare-delta-tree" : "qps",
			"vnd.pvi.ptid1" : "ptid",
			"vnd.quark.quarkxpress" : [ "qxd", "qxt", "qwd", "qwt", "qxl", "qxb" ],
			"vnd.realvnc.bed" : "bed",
			"vnd.recordare.musicxml" : "mxl",
			"vnd.recordare.musicxml+xml" : "musicxml",
			"vnd.rig.cryptonote" : "cryptonote",
			"vnd.rn-realmedia" : "rm",
			"vnd.rn-realmedia-vbr" : "rmvb",
			"vnd.route66.link66+xml" : "link66",
			"vnd.sailingtracker.track" : "st",
			"vnd.seemail" : "see",
			"vnd.sema" : "sema",
			"vnd.semd" : "semd",
			"vnd.semf" : "semf",
			"vnd.shana.informed.formdata" : "ifm",
			"vnd.shana.informed.formtemplate" : "itp",
			"vnd.shana.informed.interchange" : "iif",
			"vnd.shana.informed.package" : "ipk",
			"vnd.simtech-mindmapper" : [ "twd", "twds" ],
			"vnd.smart.teacher" : "teacher",
			"vnd.solent.sdkm+xml" : [ "sdkm", "sdkd" ],
			"vnd.spotfire.dxp" : "dxp",
			"vnd.spotfire.sfs" : "sfs",
			"vnd.stepmania.package" : "smzip",
			"vnd.stepmania.stepchart" : "sm",
			"vnd.sus-calendar" : [ "sus", "susp" ],
			"vnd.svd" : "svd",
			"vnd.syncml+xml" : "xsm",
			"vnd.syncml.dm+wbxml" : "bdm",
			"vnd.syncml.dm+xml" : "xdm",
			"vnd.tao.intent-module-archive" : "tao",
			"vnd.tcpdump.pcap" : [ "pcap", "cap", "dmp" ],
			"vnd.tmobile-livetv" : "tmo",
			"vnd.trid.tpt" : "tpt",
			"vnd.triscape.mxs" : "mxs",
			"vnd.trueapp" : "tra",
			"vnd.ufdl" : [ "ufd", "ufdl" ],
			"vnd.uiq.theme" : "utz",
			"vnd.umajin" : "umj",
			"vnd.unity" : "unityweb",
			"vnd.uoml+xml" : "uoml",
			"vnd.vcx" : "vcx",
			"vnd.visionary" : "vis",
			"vnd.vsf" : "vsf",
			"vnd.webturbo" : "wtb",
			"vnd.wolfram.player" : "nbp",
			"vnd.wqd" : "wqd",
			"vnd.wt.stf" : "stf",
			"vnd.xara" : "xar",
			"vnd.xfdl" : "xfdl",
			"vnd.yamaha.hv-dic" : "hvd",
			"vnd.yamaha.hv-script" : "hvs",
			"vnd.yamaha.hv-voice" : "hvp",
			"vnd.yamaha.openscoreformat" : "osf",
			"vnd.yamaha.openscoreformat.osfpvg+xml" : "osfpvg",
			"vnd.yamaha.smaf-audio" : "saf",
			"vnd.yamaha.smaf-phrase" : "spf",
			"vnd.yellowriver-custom-menu" : "cmp",
			"vnd.zul" : [ "zir", "zirz" ],
			"vnd.zzazz.deck+xml" : "zaz",
			"voicexml+xml" : "vxml",
			"widget" : "wgt",
			"winhlp" : "hlp",
			"wsdl+xml" : "wsdl",
			"wspolicy+xml" : "wspolicy",
			"x-ace-compressed" : "ace",
			"x-authorware-bin" : [ "aab", "x32", "u32", "vox" ],
			"x-authorware-map" : "aam",
			"x-authorware-seg" : "aas",
			"x-blorb" : [ "blb", "blorb" ],
			"x-bzip" : "bz",
			"x-bzip2" : [ "bz2", "boz" ],
			"x-cfs-compressed" : "cfs",
			"x-chat" : "chat",
			"x-conference" : "nsc",
			"x-dgc-compressed" : "dgc",
			"x-dtbncx+xml" : "ncx",
			"x-dtbook+xml" : "dtb",
			"x-dtbresource+xml" : "res",
			"x-eva" : "eva",
			"x-font-bdf" : "bdf",
			"x-font-ghostscript" : "gsf",
			"x-font-linux-psf" : "psf",
			"x-font-otf" : "otf",
			"x-font-pcf" : "pcf",
			"x-font-snf" : "snf",
			"x-font-ttf" : [ "ttf", "ttc" ],
			"x-font-type1" : [ "pfa", "pfb", "pfm", "afm" ],
			"x-font-woff" : "woff",
			"x-freearc" : "arc",
			"x-gca-compressed" : "gca",
			"x-glulx" : "ulx",
			"x-gramps-xml" : "gramps",
			"x-install-instructions" : "install",
			"x-lzh-compressed" : [ "lzh", "lha" ],
			"x-mie" : "mie",
			"x-mobipocket-ebook" : [ "prc", "mobi" ],
			"x-ms-application" : "application",
			"x-ms-shortcut" : "lnk",
			"x-ms-xbap" : "xbap",
			"x-msbinder" : "obd",
			"x-mscardfile" : "crd",
			"x-msclip" : "clp",
			"x-msdownload" : [ "exe", "dll", "com", "bat", "msi" ],
			"x-msmediaview" : [ "mvb", "m13", "m14" ],
			"x-msmetafile" : [ "wmf", "wmz", "emf", "emz" ],
			"x-msmoney" : "mny",
			"x-mspublisher" : "pub",
			"x-msschedule" : "scd",
			"x-msterminal" : "trm",
			"x-mswrite" : "wri",
			"x-nzb" : "nzb",
			"x-pkcs12" : [ "p12", "pfx" ],
			"x-pkcs7-certificates" : [ "p7b", "spc" ],
			"x-research-info-systems" : "ris",
			"x-silverlight-app" : "xap",
			"x-sql" : "sql",
			"x-stuffitx" : "sitx",
			"x-subrip" : "srt",
			"x-t3vm-image" : "t3",
			"x-tads" : "gam",
			"x-tex" : "tex",
			"x-tex-tfm" : "tfm",
			"x-tgif" : "obj",
			"x-xliff+xml" : "xlf",
			"x-xz" : "xz",
			"x-zmachine" : [ "z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8" ],
			"xaml+xml" : "xaml",
			"xcap-diff+xml" : "xdf",
			"xenc+xml" : "xenc",
			"xml-dtd" : "dtd",
			"xop+xml" : "xop",
			"xproc+xml" : "xpl",
			"xslt+xml" : "xslt",
			"xv+xml" : [ "mxml", "xhvml", "xvml", "xvm" ],
			"yang" : "yang",
			"yin+xml" : "yin",
			"envoy" : "evy",
			"fractals" : "fif",
			"internet-property-stream" : "acx",
			"olescript" : "axs",
			"vnd.ms-outlook" : "msg",
			"vnd.ms-pkicertstore" : "sst",
			"x-compress" : "z",
			"x-compressed" : "tgz",
			"x-gzip" : "gz",
			"x-perfmon" : [ "pma", "pmc", "pml", "pmr", "pmw" ],
			"x-pkcs7-mime" : [ "p7c", "p7m" ],
			"ynd.ms-pkipko" : "pko"
		},
		"audio" : {
			"amr" : "amr",
			"amr-wb" : "awb",
			"annodex" : "axa",
			"basic" : [ "au", "snd" ],
			"flac" : "flac",
			"midi" : [ "mid", "midi", "kar", "rmi" ],
			"mpeg" : [ "mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a" ],
			"mpegurl" : "m3u",
			"ogg" : [ "oga", "ogg", "spx" ],
			"prs.sid" : "sid",
			"x-aiff" : [ "aif", "aiff", "aifc" ],
			"x-gsm" : "gsm",
			"x-ms-wma" : "wma",
			"x-ms-wax" : "wax",
			"x-pn-realaudio" : "ram",
			"x-realaudio" : "ra",
			"x-sd2" : "sd2",
			"x-wav" : "wav",
			"adpcm" : "adp",
			"mp4" : "mp4a",
			"s3m" : "s3m",
			"silk" : "sil",
			"vnd.dece.audio" : [ "uva", "uvva" ],
			"vnd.digital-winds" : "eol",
			"vnd.dra" : "dra",
			"vnd.dts" : "dts",
			"vnd.dts.hd" : "dtshd",
			"vnd.lucent.voice" : "lvp",
			"vnd.ms-playready.media.pya" : "pya",
			"vnd.nuera.ecelp4800" : "ecelp4800",
			"vnd.nuera.ecelp7470" : "ecelp7470",
			"vnd.nuera.ecelp9600" : "ecelp9600",
			"vnd.rip" : "rip",
			"webm" : "weba",
			"x-aac" : "aac",
			"x-caf" : "caf",
			"x-matroska" : "mka",
			"x-pn-realaudio-plugin" : "rmp",
			"xm" : "xm",
			"mid" : [ "mid", "rmi" ]
		},
		"chemical" : {
			"x-alchemy" : "alc",
			"x-cache" : [ "cac", "cache" ],
			"x-cache-csf" : "csf",
			"x-cactvs-binary" : [ "cbin", "cascii", "ctab" ],
			"x-cdx" : "cdx",
			"x-chem3d" : "c3d",
			"x-cif" : "cif",
			"x-cmdf" : "cmdf",
			"x-cml" : "cml",
			"x-compass" : "cpa",
			"x-crossfire" : "bsd",
			"x-csml" : [ "csml", "csm" ],
			"x-ctx" : "ctx",
			"x-cxf" : [ "cxf", "cef" ],
			"x-embl-dl-nucleotide" : [ "emb", "embl" ],
			"x-gamess-input" : [ "inp", "gam", "gamin" ],
			"x-gaussian-checkpoint" : [ "fch", "fchk" ],
			"x-gaussian-cube" : "cub",
			"x-gaussian-input" : [ "gau", "gjc", "gjf" ],
			"x-gaussian-log" : "gal",
			"x-gcg8-sequence" : "gcg",
			"x-genbank" : "gen",
			"x-hin" : "hin",
			"x-isostar" : [ "istr", "ist" ],
			"x-jcamp-dx" : [ "jdx", "dx" ],
			"x-kinemage" : "kin",
			"x-macmolecule" : "mcm",
			"x-macromodel-input" : [ "mmd", "mmod" ],
			"x-mdl-molfile" : "mol",
			"x-mdl-rdfile" : "rd",
			"x-mdl-rxnfile" : "rxn",
			"x-mdl-sdfile" : [ "sd", "sdf" ],
			"x-mdl-tgf" : "tgf",
			"x-mmcif" : "mcif",
			"x-mol2" : "mol2",
			"x-molconn-Z" : "b",
			"x-mopac-graph" : "gpt",
			"x-mopac-input" : [ "mop", "mopcrt", "mpc", "zmt" ],
			"x-mopac-out" : "moo",
			"x-ncbi-asn1" : "asn",
			"x-ncbi-asn1-ascii" : [ "prt", "ent" ],
			"x-ncbi-asn1-binary" : [ "val", "aso" ],
			"x-pdb" : [ "pdb", "ent" ],
			"x-rosdal" : "ros",
			"x-swissprot" : "sw",
			"x-vamas-iso14976" : "vms",
			"x-vmd" : "vmd",
			"x-xtel" : "xtel",
			"x-xyz" : "xyz"
		},
		"image" : {
			"gif" : "gif",
			"ief" : "ief",
			"jpeg" : [ "jpeg", "jpg", "jpe" ],
			"pcx" : "pcx",
			"png" : "png",
			"svg+xml" : [ "svg", "svgz" ],
			"tiff" : [ "tiff", "tif" ],
			"vnd.djvu" : [ "djvu", "djv" ],
			"vnd.wap.wbmp" : "wbmp",
			"x-canon-cr2" : "cr2",
			"x-canon-crw" : "crw",
			"x-cmu-raster" : "ras",
			"x-coreldraw" : "cdr",
			"x-coreldrawpattern" : "pat",
			"x-coreldrawtemplate" : "cdt",
			"x-corelphotopaint" : "cpt",
			"x-epson-erf" : "erf",
			"x-icon" : "ico",
			"x-jg" : "art",
			"x-jng" : "jng",
			"x-nikon-nef" : "nef",
			"x-olympus-orf" : "orf",
			"x-photoshop" : "psd",
			"x-portable-anymap" : "pnm",
			"x-portable-bitmap" : "pbm",
			"x-portable-graymap" : "pgm",
			"x-portable-pixmap" : "ppm",
			"x-rgb" : "rgb",
			"x-xbitmap" : "xbm",
			"x-xpixmap" : "xpm",
			"x-xwindowdump" : "xwd",
			"bmp" : "bmp",
			"cgm" : "cgm",
			"g3fax" : "g3",
			"ktx" : "ktx",
			"prs.btif" : "btif",
			"sgi" : "sgi",
			"vnd.dece.graphic" : [ "uvi", "uvvi", "uvg", "uvvg" ],
			"vnd.dwg" : "dwg",
			"vnd.dxf" : "dxf",
			"vnd.fastbidsheet" : "fbs",
			"vnd.fpx" : "fpx",
			"vnd.fst" : "fst",
			"vnd.fujixerox.edmics-mmr" : "mmr",
			"vnd.fujixerox.edmics-rlc" : "rlc",
			"vnd.ms-modi" : "mdi",
			"vnd.ms-photo" : "wdp",
			"vnd.net-fpx" : "npx",
			"vnd.xiff" : "xif",
			"webp" : "webp",
			"x-3ds" : "3ds",
			"x-cmx" : "cmx",
			"x-freehand" : [ "fh", "fhc", "fh4", "fh5", "fh7" ],
			"x-pict" : [ "pic", "pct" ],
			"x-tga" : "tga",
			"cis-cod" : "cod",
			"pipeg" : "jfif"
		},
		"message" : {
			"rfc822" : [ "eml", "mime", "mht", "mhtml", "nws" ]
		},
		"model" : {
			"iges" : [ "igs", "iges" ],
			"mesh" : [ "msh", "mesh", "silo" ],
			"vrml" : [ "wrl", "vrml" ],
			"x3d+vrml" : [ "x3dv", "x3dvz" ],
			"x3d+xml" : [ "x3d", "x3dz" ],
			"x3d+binary" : [ "x3db", "x3dbz" ],
			"vnd.collada+xml" : "dae",
			"vnd.dwf" : "dwf",
			"vnd.gdl" : "gdl",
			"vnd.gtw" : "gtw",
			"vnd.mts" : "mts",
			"vnd.vtu" : "vtu"
		},
		"text" : {
			"cache-manifest" : [ "manifest", "appcache" ],
			"calendar" : [ "ics", "icz", "ifb" ],
			"css" : "css",
			"csv" : "csv",
			"h323" : "323",
			"html" : [ "html", "htm", "shtml", "stm" ],
			"iuls" : "uls",
			"mathml" : "mml",
			"plain" : [ "txt", "text", "brf", "conf", "def", "list", "log", "in", "bas" ],
			"richtext" : "rtx",
			"scriptlet" : [ "sct", "wsc" ],
			"texmacs" : [ "tm", "ts" ],
			"tab-separated-values" : "tsv",
			"vnd.sun.j2me.app-descriptor" : "jad",
			"vnd.wap.wml" : "wml",
			"vnd.wap.wmlscript" : "wmls",
			"x-bibtex" : "bib",
			"x-boo" : "boo",
			"x-c++hdr" : [ "h++", "hpp", "hxx", "hh" ],
			"x-c++src" : [ "c++", "cpp", "cxx", "cc" ],
			"x-component" : "htc",
			"x-dsrc" : "d",
			"x-diff" : [ "diff", "patch" ],
			"x-haskell" : "hs",
			"x-java" : "java",
			"x-literate-haskell" : "lhs",
			"x-moc" : "moc",
			"x-pascal" : [ "p", "pas" ],
			"x-pcs-gcd" : "gcd",
			"x-perl" : [ "pl", "pm" ],
			"x-python" : "py",
			"x-scala" : "scala",
			"x-setext" : "etx",
			"x-tcl" : [ "tcl", "tk" ],
			"x-tex" : [ "tex", "ltx", "sty", "cls" ],
			"x-vcalendar" : "vcs",
			"x-vcard" : "vcf",
			"n3" : "n3",
			"prs.lines.tag" : "dsc",
			"sgml" : [ "sgml", "sgm" ],
			"troff" : [ "t", "tr", "roff", "man", "me", "ms" ],
			"turtle" : "ttl",
			"uri-list" : [ "uri", "uris", "urls" ],
			"vcard" : "vcard",
			"vnd.curl" : "curl",
			"vnd.curl.dcurl" : "dcurl",
			"vnd.curl.scurl" : "scurl",
			"vnd.curl.mcurl" : "mcurl",
			"vnd.dvb.subtitle" : "sub",
			"vnd.fly" : "fly",
			"vnd.fmi.flexstor" : "flx",
			"vnd.graphviz" : "gv",
			"vnd.in3d.3dml" : "3dml",
			"vnd.in3d.spot" : "spot",
			"x-asm" : [ "s", "asm" ],
			"x-c" : [ "c", "cc", "cxx", "cpp", "h", "hh", "dic" ],
			"x-fortran" : [ "f", "for", "f77", "f90" ],
			"x-opml" : "opml",
			"x-nfo" : "nfo",
			"x-sfv" : "sfv",
			"x-uuencode" : "uu",
			"webviewhtml" : "htt"
		},
		"video" : {
			"3gpp" : "3gp",
			"annodex" : "axv",
			"dl" : "dl",
			"dv" : [ "dif", "dv" ],
			"fli" : "fli",
			"gl" : "gl",
			"mpeg" : [ "mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2" ],
			"mp4" : [ "mp4", "mp4v", "mpg4" ],
			"quicktime" : [ "qt", "mov" ],
			"ogg" : "ogv",
			"vnd.mpegurl" : [ "mxu", "m4u" ],
			"x-flv" : "flv",
			"x-la-asf" : [ "lsf", "lsx" ],
			"x-mng" : "mng",
			"x-ms-asf" : [ "asf", "asx", "asr" ],
			"x-ms-wm" : "wm",
			"x-ms-wmv" : "wmv",
			"x-ms-wmx" : "wmx",
			"x-ms-wvx" : "wvx",
			"x-msvideo" : "avi",
			"x-sgi-movie" : "movie",
			"x-matroska" : [ "mpv", "mkv", "mk3d", "mks" ],
			"3gpp2" : "3g2",
			"h261" : "h261",
			"h263" : "h263",
			"h264" : "h264",
			"jpeg" : "jpgv",
			"jpm" : [ "jpm", "jpgm" ],
			"mj2" : [ "mj2", "mjp2" ],
			"vnd.dece.hd" : [ "uvh", "uvvh" ],
			"vnd.dece.mobile" : [ "uvm", "uvvm" ],
			"vnd.dece.pd" : [ "uvp", "uvvp" ],
			"vnd.dece.sd" : [ "uvs", "uvvs" ],
			"vnd.dece.video" : [ "uvv", "uvvv" ],
			"vnd.dvb.file" : "dvb",
			"vnd.fvt" : "fvt",
			"vnd.ms-playready.media.pyv" : "pyv",
			"vnd.uvvu.mp4" : [ "uvu", "uvvu" ],
			"vnd.vivo" : "viv",
			"webm" : "webm",
			"x-f4v" : "f4v",
			"x-m4v" : "m4v",
			"x-ms-vob" : "vob",
			"x-smv" : "smv"
		},
		"x-conference" : {
			"x-cooltalk" : "ice"
		},
		"x-world" : {
			"x-vrml" : [ "vrm", "vrml", "wrl", "flr", "wrz", "xaf", "xof" ]
		}
	};

	var mimeTypes = (function() {
		var type, subtype, val, index, mimeTypes = {};
		for (type in table) {
			if (table.hasOwnProperty(type)) {
				for (subtype in table[type]) {
					if (table[type].hasOwnProperty(subtype)) {
						val = table[type][subtype];
						if (typeof val == "string") {
							mimeTypes[val] = type + "/" + subtype;
						} else {
							for (index = 0; index < val.length; index++) {
								mimeTypes[val[index]] = type + "/" + subtype;
							}
						}
					}
				}
			}
		}
		return mimeTypes;
	})();

	zip.getMimeType = function(filename) {
		var defaultValue = "application/octet-stream";
		return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
	};

})();
/**
 * @classdesc Memory and band-width optimized Bitmap object with random access.
 * @constructor
 * @augments BoolArray
 * @param {Number} length Size of the {Bitmap}.
 */
function Bitmap(length)
{
  this.prototype = new BoolArray(length);

  /**
   * Return an array with the index of the setted or unsetted bits.
   * @param {Boolean} [setted] Returned indexes must be setted or unsetted.
   * @return {Array} Array with the index of the setted or unsetted bits.
   */
  this.indexes = function(setted)
  {
    var array = [];

    for(var i = 0; i < this.prototype.length; i++)
      if(this.prototype.get(i) == setted)
        array.push(i);

    return array;
  };

  /**
   * Get the index of a random setted or unsetted bit on the bitmap. If none is
   * available, return undefined
   * @param {Boolean} [setted] Returned index must be a setted or unsetted one.
   * @return {Number|undefined} Index of the setted or unsetted bit or
   * undefined if none is available.
   */
  this.getRandom = function(setted)
  {
    var array = this.indexes(setted);

    if(array.length)
      return array[Math.floor(Math.random() * array.length)];
  };

  /**
   * Set the value of a bit on the {Bitmap}
   * @param {Number} index Index of the bit to set.
   * @param {Boolean} value Value of the bit to set.
   */
  this.set = function(index, value)
  {
    this.prototype.set(index, value);
  };
}function CacheBackup(db, filesManager)
{
  zip.workerScriptsPath = 'js/shareit-core/lib/zip.js/';

  this.export = function(onfinish, onprogress, onerror)
  {
    db.files_getAll(null, function(error, fileslist)
    {
      if(error)
      {
        console.error(error)
        return
      }

      // Create a new filesystem inside the Zip file
      var fs = new zip.fs.FS();

      // Create folder to store the blobs
      var blobs = fs.root.addDirectory('blobs');

      // Run over all the cache-stored files and add them to the
      // corresponding folder and generate the JSON metadata file
      var files = [];

      for(var i=0, fileentry; fileentry=fileslist[i]; i++)
        if(fileentry.blob)
        {
          // Store blob on Zip file
          blobs.addBlob(fileentry.hash, fileentry.blob);

          // Generate file path
          var path = '';
          if(fileentry.sharedpoint)
          {
            path += fileentry.sharedpoint;
            if(fileentry.path != '')
              path += '/' + fileentry.path;
          }

          // Generate file metadata
          var file =
          {
            hash: fileentry.hash,
            path: path,
            name: fileentry.name
          };

          if(fileentry.bitmap)
            file.bitmap = bitmap;

          // Add file to files metadata list
          files.push(file);
        }

        // Export the cache if it has items
        if(files.length)
        {
          // Store the JSON metadata file inside the Zip file
          fs.root.addText('files.json', JSON.stringify(files));

          // Generate and export the cache backup in the Zip file
          fs.exportBlob(onfinish, onprogress, onerror);
        }

        // Cache has no files
        else if(onfinish)
          onfinish();
    });
  };

  this.import = function(blob, cb)
  {
    var fs = new zip.fs.FS();
    fs.importBlob(blob, function()
    {
      // Check blobs metadata
      var files = fs.root.getChildByName('files.json');

      files.getText(function(text)
      {
        // Get blobs folder from the zip file
        var blobs = fs.root.getChildByName('blobs');

        // Extract blobs data and add it to cache
        var files = JSON.parse(text);
        for(var i = 0, file; file = files[i]; i++)
          db.files_getAll_byHash(file.hash, function(error, fileentries)
          {
            if(error)
            {
              console.error(error)
              return
            }

            var blob = blobs.getChildByName(file.hash);

            function fileentry_update(file, fileentry)
            {
              // Fileentry is completed, do nothing
              if(fileentry.bitmap == undefined)
                return;

              // Fileentry is not completed, update it
              var chunks = fileentry.bitmap.indexes();

              for(var i = 0, chunk; chunk = chunks[i]; i++)
                if(blob.bitmap == undefined || blob.bitmap.get(chunk))
                {
                  var reader = new FileReader();
                  reader.onerror = function(evt)
                  {
                    console.error('CacheBackup.import('+file.hash+', '+chunk+
                                  ") = '" + evt.target.result + "'");
                  };
                  reader.onload = function(event)
                  {
                    var data = event.target.result;

                    filesManager.updateFile(fileentry, chunk, data);
                  };

                  var start = chunk * module.chunksize;
                  var stop = start + module.chunksize;

                  blob.getBlob(zip.getMimeType(file.name), function(blob)
                  {
                    var filesize = parseInt(blob.size);
                    if(stop > filesize)
                       stop = filesize;

                    reader.readAsBinaryString(blob.slice(start, stop));
                  });
                }
            }

            function fileentry_add(file)
            {
              blob.getBlob(zip.getMimeType(file.name), function(blob)
              {
                var fileentry =
                {
                  hash: file.hash,
                  path: file.path,
                  name: file.name,
                  blob: blob
                };
                if(file.bitmap)
                  fileentry.bitmap = file.bitmap;

                db.files_add(fileentry, function(error, fileentry)
                {
                  if(error)
                    console.error(error)

                  // File was not completed, notify update
                  else if(file.bitmap)
                  {
                    var pending_chunks = fileentry.bitmap.indexes(false).length;

                    filesManager.transfer_update(fileentry, pending_chunks);
                  }

                  // File was completed, notify finished
                  else
                    filesManager.transfer_end(fileentry);
                });
              });
            }

            // Fileentry exists on cache
            if(fileentries.length)
            {
              for(var i=0, fileentry; fileentry=fileentries[i]; i++)
                if(fileentry.blob)
                  fileentry_update(file, fileentry);
            }

            // Fileentry don't exists on cache, add it
            else
              fileentry_add(file);
          });
      });
    }, cb);
  };
}var indexedDB = indexedDB || webkitIndexedDB || mozIndexedDB || msIndexedDB;

/**
 * Initializes the database
 * @param {Function} callback Callback called when database is ready.
 */
function DB_init(callback)
{
  var version = 2;

  function upgradedb(db)
  {
    // Create an objectStore to hold information about the share points.
    db.createObjectStore('sharepoints',
    {
      keyPath: 'name'
    });

    // Create an objectStore to hold information about the shared files.
    // We're going to use "hash" as our key path because it's guaranteed to
    // be unique.
    var files = db.createObjectStore('files',
    {
      keyPath: ["peer", "sharedpoint", "path", "name"]
    });
    files.createIndex("byHash", "hash", {unique: false})
    files.createIndex("byPeer", "peer", {unique: false})
  }

  var request = indexedDB.open('ShareIt', version);
  request.onerror = function(event)
  {
    callback("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event)
  {
    var db = request.result;

    // Hack for old versions of Chrome/Chromium
    if(version != db.version)
    {
      var setVrequest = db.setVersion(version);
      setVrequest.onsuccess = function(e)
      {
        upgradedb(db);
      };
    }

    /**
     * Add an object to the specified {IDBObjectStore}
     * @param {String} objectStore Name of the {IDBObjectStore}.
     * @param {Object} data Object to be added to the {IDBObjectStore}.
     * @param {Function} onsuccess Callback called when object was added.
     * @param {Function} onerror Callback called when object was not
     * able to be added.
     */
    db._add = function(objectStore, data, callback)
    {
      var transaction = db.transaction(objectStore, 'readwrite');
      var objectStore = transaction.objectStore(objectStore);

      var request = objectStore.add(data);
      if(callback)
      {
        request.onsuccess = function(event)
        {
          callback(null, request.result);
        };
        request.onerror = function(event)
        {
          callback(event.target.errorCode);
        };
      }
    };

    /**
     * Delete an object from the specified {IDBObjectStore}
     * @param {String} objectStore Name of the {IDBObjectStore}.
     * @param {String} key Name of the key to deleted on the
     * {IDBObjectStore}.
     * @param {Function} onsuccess Callback called when object was
     * deleted.
     * @param {Function} onerror Callback called when key was not able
     * to be deleted.
     */
    db._delete = function(objectStore, key, callback)
    {
      var transaction = db.transaction(objectStore, 'readwrite');
      var objectStore = transaction.objectStore(objectStore);

      var request = objectStore.delete(key);
      if(callback)
      {
        request.onsuccess = function(event)
        {
          callback(null, request.result);
        };
        request.onerror = function(event)
        {
          callback(event.target.errorCode);
        };
      }
    };

    /**
     * Get an object from the specified {IDBObjectStore}
     * @param {String} objectStore Name of the {IDBObjectStore}.
     * @param {String} key Name of the key to be get from the
     * {IDBObjectStore}.
     * @param {Function} onsuccess Callback called when object was
     * gotten.
     * @param {Function} onerror Callback called when object was not
     * able to be gotten.
     */
    db._get = function(objectStore, key, callback)
    {
      var transaction = db.transaction(objectStore);
      var objectStore = transaction.objectStore(objectStore);

      var request = objectStore.get(key);
      if(callback)
      {
        request.onsuccess = function(event)
        {
          callback(null, request.result);
        };
        request.onerror = function(event)
        {
          callback(event.target.errorCode);
        };
      }
    };

    /**
     * Get all objects from the specified {IDBObjectStore}
     * @param {String} objectStore Name of the {IDBObjectStore}.
     * @param {?IDBRange} range Range to delimit keys to be gotten.
     * @param {Function} onsuccess Callback called when objects were
     * gotten.
     * @param {Function} onerror Callback called when object were not
     * able to be gotten.
     */
    db._getAll = function(objectStore, range, callback)
    {
      var result = [];

      var transaction = db.transaction(objectStore);
      var objectStore = transaction.objectStore(objectStore);

      var request = objectStore.openCursor(range);
      request.onsuccess = function(event)
      {
        var cursor = event.target.result;
        if(cursor)
        {
          result.push(cursor.value);
          cursor.continue();
        }
        else
          callback(null, result);
      };
      request.onerror = function(event)
      {
        callback(event.target.errorCode);
      };
    };

    /**
     * Update or add an object on the specified {IDBObjectStore}
     * @param {String} objectStore Name of the {IDBObjectStore}.
     * @param {Object} data Object to be added to the {IDBObjectStore}.
     * @param {Function} onsuccess Callback called when object was
     * updated or added.
     * @param {Function} onerror Callback called when object was not
     * able to be updated or added.
     */
    db._put = function(objectStore, data, callback)
    {
      var transaction = db.transaction(objectStore, 'readwrite');
      var objectStore = transaction.objectStore(objectStore);

      var request = objectStore.put(data);
      if(callback)
      {
        request.onsuccess = function(event)
        {
          callback(null, request.result);
        };
        request.onerror = function(event)
        {
          callback(event.target.errorCode);
        };
      }
    };

    /**
     * Add a {Sharedpoint}
     * @param {Sharedpoint} sharedpoint {Sharedpoint} to be added.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint} was added.
     * @param {Function} onerror Callback called when the {Sharedpoint}
     * was not able to be added.
     */
    db.sharepoints_add = function(sharedpoint, callback)
    {
      db._add('sharepoints', sharedpoint, callback);
    };

    /**
     * Delete a {Sharedpoint}
     * @param {String} key {Sharedpoint} to be deleted.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint} was deleted.
     * @param {Function} onerror Callback called when the {Sharedpoint}
     * was not able to be deleted.
     */
    db.sharepoints_delete = function(key, callback)
    {
      db._delete('sharepoints', key, callback);
    };

    /**
     * Get a {Sharedpoint}
     * @param {String} key {Sharedpoint} to be gotten.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint} was gotten.
     * @param {Function} onerror Callback called when the {Sharedpoint}
     * was not able to be gotten.
     */
    db.sharepoints_get = function(key, callback)
    {
      db._get('sharepoints', key, callback);
    };

    /**
     * Get all the {Sharedpoint}s
     * @param {?IDBRange} range Range of {Sharedpoint}s to be gotten.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint}s were gotten.
     * @param {Function} onerror Callback called when the {Sharedpoint}s
     * were not able to be gotten.
     */
    db.sharepoints_getAll = function(range, callback)
    {
      db._getAll('sharepoints', range, callback);
    };

    /**
     * Update or add a {Sharedpoint}
     * @param {Sharedpoint} sharedpoint {Sharedpoint} to be updated or
     * added.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint} was updated or added.
     * @param {Function} onerror Callback called when the {Sharedpoint}
     * was not able to be updated or added.
     */
    db.sharepoints_put = function(sharedpoint, callback)
    {
      db._put('sharepoints', sharedpoint, callback);
    };

    /**
     * Add a {Fileentry}
     * @param {Fileentry} fileentry {Fileentry} to be added.
     * @param {Function} onsuccess Callback called when the {Fileentry}
     * was added.
     * @param {Function} onerror Callback called when the {Fileentry}
     * was not able to be added.
     */
    db.files_add = function(fileentry, callback)
    {
      db._add('files', fileentry, callback);
    };

    /**
     * Delete a {Fileentry}
     * @param {String} key {Fileentry} to be deleted.
     * @param {Function} onsuccess Callback called when the {Fileentry}
     * was deleted.
     * @param {Function} onerror Callback called when the {Fileentry}
     * was not able to be deleted.
     */
    db.files_delete = function(key, callback)
    {
      db._delete('files', key, callback);
    };

    /**
     * Get a {Sharedpoint}
     * @param {String} key {Sharedpoint} to be gotten.
     * @param {Function} onsuccess Callback called when the
     * {Sharedpoint} was gotten.
     * @param {Function} onerror Callback called when the {Sharedpoint}
     * was not able to be gotten.
     */
    db.files_get = function(key, callback)
    {
      db._get('files', key, callback);
    };

    /**
     * Get all the {Fileentry}s
     * @param {?IDBRange} range Range of {Fileentry}s to be gotten.
     * @param {Function} onsuccess Callback called when the {Fileentry}s
     * were gotten.
     * @param {Function} onerror Callback called when the {Fileentry}
     * was not able to be gotten.
     */
    db.files_getAll = function(range, callback)
    {
      db._getAll('files', range, callback);
    };

    db.files_getAll_byHash = function(uid, callback)
    {
      var result = []

      var transaction = db.transaction('files', 'readonly');
      var objectStore = transaction.objectStore('files');
      var index = objectStore.index("byHash");

      var request = index.openCursor(uid);

      request.onsuccess = function(event)
      {
        var cursor = event.target.result;
        if(cursor)
        {
          result.push(cursor.value);
          cursor.continue();
        }
        else
          callback(null, result);
      };
      request.onerror = function(event)
      {
        callback(event.target.errorCode);
      };
    };

    db.files_getAll_byPeer = function(uid, callback)
    {
      var result = []

      var transaction = db.transaction('files', 'readonly');
      var objectStore = transaction.objectStore('files');
      var index = objectStore.index("byPeer");

      var request = index.openCursor(uid);

      request.onsuccess = function(event)
      {
        var cursor = event.target.result;
        if(cursor)
        {
          result.push(cursor.value);
          cursor.continue();
        }
        else
          callback(null, result);
      };
      request.onerror = function(event)
      {
        callback(event.target.errorCode);
      };
    };

    /**
     * Update or add a {Fileentry}
     * @param {Fileentry} fileentry {Fileentry} to be updated or added.
     * @param {Function} onsuccess Callback called when the {Fileentry}
     * was updated or added.
     * @param {Function} onerror Callback called when the {Fileentry}
     * was not able to be updated or added.
     */
    db.files_put = function(fileentry, callback)
    {
      db._put('files', fileentry, callback);
    };

    callback(null, db);
  };
  request.onupgradeneeded = function(event)
  {
    upgradedb(event.target.result);
  };
}var chunksize = 65536;


/**
 *
 * @param {IDBDatabase} db ShareIt! database.
 */
function FilesManager(db, webp2p)
{
  var self = this;

  // Init hasher
  var hasher = new Hasher(db, policy, this);
  hasher.onhashed = function(fileentry)
  {
    // Notify the other peers about the new hashed file
    var event = document.createEvent("Event");
        event.initEvent('file.added',true,true);
        event.fileentry = fileentry

    self.dispatchEvent(event);
  };

  /**
   * Notify to all peers that I have deleted a file (so it's not accesible)
   * @param {Fileentry} Fileentry of the file that have been deleted.
   */
  function send_file_deleted(fileentry)
  {
    var event = document.createEvent("Event");
        event.initEvent('file.deleted',true,true);
        event.fileentry = fileentry

    this.dispatchEvent(event);
  };

  // Notify the other peers about the deleted file
  hasher.ondeleted = send_file_deleted

  /**
   * Get the channel of one of the peers that have the file from its hash.
   *
   * @param {Fileentry} Fileentry of the file to be downloaded.
   * @return {RTCDataChannel} Channel where we can ask for data of the file.
   */
  function getChannel(hash, cb)
  {
    db.files_getAll_byHash(hash, function(error, fileentries)
    {
      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        if(fileentry.peer != "")
        {
          var peers = webp2p.getPeers()
          var peer = peers[fileentry.peer]
          var channel = peer.channels['transfer']

          cb(null, channel);
          return
        }

      cb("No available peers to finish downloading the file");
    })
  }

  /**
   * Request (more) data for a file
   * @param {Fileentry} Fileentry of the file to be requested.
   */
  function transfer_query(fileentry)
  {
    getChannel(fileentry.hash, function(error, channel)
    {
      if(error)
        console.error(error)

      else
      {
        var chunk = fileentry.bitmap.getRandom(false);

        channel.transfer_query(fileentry, chunk);
      }
    });
  }


  webp2p.addEventListener('peerconnection', function(event)
  {
    var peer = event.peerconnection
    var uid  = event.uid

    console.log('Created peerconnection: ' + uid);

    peer.addEventListener('datachannel', function(event)
    {
      var channel = event.channel
      console.log(channel.readyState)

      console.log('Created datachannel "' + uid + ':' + channel.label + '"');

      switch(channel.label)
      {
        case 'fileslist':
          Transport_Fileslist_init(channel, db, self, uid)
          break

//        case 'search':
//          initDataChannel_search(channel, uid)
//          break

        case 'transfer':
          Transport_Transfer_init(channel, db, self)
          break

        case webp2p.routingLabel:
          console.info("Ignoring WebP2P routing channel '"+channel.label+"'")
          break

        default:
          console.warn("Unknown channel '"+channel.label+"', clossing it")
//          channel.close()
      }
    })
  })


  /**
   * Start the download of a file
   * @param {Fileentry} Fileentry of the file to be downloaded.
   */
  this.transfer_begin = function(fileentry)
  {
    function onerror(errorCode)
    {
      console.error("Transfer begin: '" + fileentry.name + "' is already in database.");
    }

    // Create a new fileentry
    var new_fileentry =
    {
      peer: "",
      sharedpoint: "",
      path: fileentry.path,
      name: fileentry.name,

      hash: fileentry.hash
    }

    // Add a blob container to our file stub
    new_fileentry.blob = new Blob([''],
    {
      type: fileentry.type
    });

    // File size is zero, generate the file instead of request it
    if(!fileentry.size)
    {
      // Insert new empty "file" inside IndexedDB
      db.files_add(new_fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
          self.transfer_end(fileentry);
      });

      return;
    }

    // Calc number of necesary chunks to download
    // and add a bitmap to our file stub
    var chunks = fileentry.size / module.chunksize;
    if(chunks % 1 != 0)
       chunks = Math.floor(chunks) + 1;

    new_fileentry.bitmap = new Bitmap(chunks);

    // Insert new "file" inside IndexedDB
    db.files_add(new_fileentry, function(error, fileentry)
    {
      if(error)
        onerror(error)

      else
      {
        var event = document.createEvent("Event");
            event.initEvent('transfer.begin',true,true);
            event.fileentry = fileentry

        self.dispatchEvent(event);

        // Demand data from the begining of the file
        transfer_query(fileentry);
      }
    });
  };

  this.transfer_update = function(fileentry, pending_chunks)
  {
    var chunks = fileentry.blob.size / module.chunksize;
    if(chunks % 1 != 0)
       chunks = Math.floor(chunks) + 1;

    // Notify about transfer update
    var event = document.createEvent("Event");
        event.initEvent('transfer.update',true,true);
        event.fileentry = fileentry
        event.value = 1 - pending_chunks / chunks

    this.dispatchEvent(event);
  };

  this.transfer_end = function(fileentry)
  {
    // Auto-save downloaded file
    savetodisk(fileentry.blob, fileentry.name);

    // Notify about transfer end
    var event = document.createEvent("Event");
        event.initEvent('transfer.end',true,true);
        event.fileentry = fileentry

    this.dispatchEvent(event);

    console.log('Transfer of ' + fileentry.name + ' finished!');
  };


  /**
   * Update the data content of a {Fileentry}
   * @param {Fileentry} fileentry {Fileentry} to be updated.
   * @param {Number} chunk Chunk position to be updated.
   * @param data Data to be set.
   */
  this.updateFile = function(fileentry, chunk, data)
  {
    fileentry.bitmap.set(chunk, true);

    // Create new FileWriter
    var fw = new FileWriter(fileentry.blob);

    // Calc and set pos, and increase blob size if necessary
    var pos = chunk * module.chunksize;
    if(fw.length < pos)
       fw.truncate(pos);
    fw.seek(pos);

    // Write data to the blob
    var blob = fw.write(data);

    // This is not standard, but it's the only way to get out the
    // created blob
    if(blob != undefined)
      fileentry.blob = blob;

    // Check for pending chunks and require them or save the file
    var pending_chunks = fileentry.bitmap.indexes(false).length;

    if(pending_chunks)
    {
      // Demand more data from one of the pending chunks after update
      // the fileentry status on the database
      db.files_put(fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
        {
          self.transfer_update(fileentry, pending_chunks);

          transfer_query(fileentry);
        }
      });
    }
    else
    {
      // There are no more chunks, set file as fully downloaded
      delete fileentry.bitmap;

      db.files_put(fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
          self.transfer_end(fileentry);
      });
    }
  };


  this.files_downloading = function(cb)
  {
    db.files_getAll(null, function(error, filelist)
    {
      if(error)
        console(error)

      else
      {
        var downloading = [];

        for(var i = 0, fileentry; fileentry = filelist[i]; i++)
          if(fileentry.bitmap)
            downloading.push(fileentry);

        // Update Downloading files list
        cb(null, downloading);
      }
    });
  };

  this.files_sharing = function(cb)
  {
    db.files_getAll_byPeer("", function(error, fileslist)
    {
      if(error)
        console(error)

      else
      {
        var sharing = []

        // [ToDo] Use parallice
        for(var i=0, fileentry; fileentry=fileslist[i]; i++)
          if(!fileentry.bitmap)
            db.files_getAll_byHash(fileentry.hash, function(error, fileentries)
            {
              var duplicates = []

              // Only add local (shared) duplicates
              for(var i=0, entry; entry=fileentries[i]; i++)
                if(fileentry.peer        == entry.peer
                &&(fileentry.sharedpoint != entry.sharedpoint
                || fileentry.path        != entry.path
                || fileentry.name        != entry.name))
                  duplicates.push(entry)

              if(duplicates.length)
                fileentry.duplicates = duplicates

              sharing.push(fileentry)
            })

        // Update Sharing files list
        cb(null, sharing)
      }
    })
  }

  this.add = function(fileentry)
  {
    hasher.hash(fileentry)
  }

  this.delete = function(fileentry)
  {
    db.files_delete(fileentry)
    send_file_deleted(fileentry)
  }
}
FilesManager.prototype = new EventTarget();function SearchEngine(db, filesManager)
{
  var self = this

  // Init the search index
  var searchIndex = lunr(function()
  {
    this.field('sharedpoint')
    this.field('path', {boost: 10})
    this.field('name', {boost: 100})
  })

  // Add all files on IndexedDB to the index
  db.files_getAll(null, function(error, fileentries)
  {
    if(error)
      console.error("Error loading files from IndexedDB, search index couldn't be initialized")

    else
      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        self.add(fileentry)
  })

  this.add = function(fileentry)
  {
    var id = JSON.stringify([fileentry.peer, fileentry.sharedpoint,
                             fileentry.path, fileentry.name])

    searchIndex.add({id:          id,
                     sharedpoint: fileentry.sharedpoint,
                     path:        fileentry.path,
                     name:        fileentry.name})
  }

  this.remove = function(fileentry)
  {
    var id = JSON.stringify([fileentry.peer, fileentry.sharedpoint,
                             fileentry.path, fileentry.name])

    searchIndex.remove({id: id})
  }

  function update(fileentry)
  {
    var id = JSON.stringify([fileentry.peer, fileentry.sharedpoint,
                             fileentry.path, fileentry.name])

    searchIndex.update({id:          id,
                        sharedpoint: fileentry.sharedpoint,
                        path:        fileentry.path,
                        name:        fileentry.name})
  }

  this.search = function(query, callback)
  {
    var results = searchIndex.search(query)

    var entries = {}
    var index = 0

    function data()
    {
      var result = results[index]

      // There are (more) results, look for the real object and add the duplicates
      if(result)
        db.files_get(JSON.parse(result.ref), function(error, fileentry)
        {
          // There was an error getting the fileentry for this result, ignore it
          if(error)
            results.splice(index, 1)

          else
          {
            var entry = entries[fileentry.hash]

            // Hashed file was not checked previously, add it
            if(entry == undefined)
            {
              fileentry.score = result.score
              entries[fileentry.hash] = fileentry

              // Duplicates
              db.files_getAll_byHash(fileentry.hash, function(error, fileentries)
              {
                if(fileentries.length > 1)
                {
                  // Count copies
                  var copies = {}

                  for(var i=0, entry; entry=fileentries[i]; i++)
                  {
                    copies[entry.name] = copies[entry.name] || 0
                    copies[entry.name] += 1

                    // Check if some of the duplicates is being shared
                    if(entry.file)
                      fileentry.file = entry.file

                    else if(entry.blob)
                    {
                      fileentry.blob = entry.blob

                      if(entry.bitmap)
                        fileentry.bitmap = entry.bitmap
                    }
                  }

                  // Convert copies in a duplicates array
                  var duplicates = []

                  for(var name in copies)
                    duplicates.push({name: name, copies: copies[name]})

                  // Sort the duplicates by number of copies
                  duplicates.sort(function(a,b)
                  {
                    return b.copies - a.copies
                  })

                  // Set the fileentry as the most popular duplicate and remove it
                  var duplicate = duplicates.shift()
                  fileentry.name = duplicate.name
                  fileentry.copies = duplicate.copies

                  // Set the duplicates
                  fileentry.duplicates = duplicates
                }

                results[index] = fileentry
                index++

                data()
              })
              return
            }

            // Hashed file was checked previously, increase the score of the
            // first one and remove this duplicate
            else
            {
              entry.score += result.score

              results.splice(index, 1)
            }
          }

          data()
        })

      // There are no (more) results, sort the results array and return it
      else
      {
//        // Sort the results on score descending relevance
//        results.sort(function(a,b)
//        {
//          return b.score - a.score
//        })

        callback(null, results)
      }
    }

    data()
  }

  filesManager.addEventListener('file.added', function(event)
  {
    var fileentry = event.fileentry

    self.add(fileentry)
  })

  filesManager.addEventListener('file.deleted', function(event)
  {
    var fileentry = event.fileentry

    self.remove(fileentry)
  })

  filesManager.addEventListener('fileslist.updated', function(event)
  {
    var fileentries = event.fileslist

    // [ToDo] Use individiual events for add and remove
    for(var i=0, fileentry; fileentry=fileentries[i]; i++)
      update(fileentry)
  })
}function Local(handshake_servers, callback)
{
  var self = this


  function forwardEvent(event)
  {
    self.dispatchEvent(event);
  }


  var webp2p = new WebP2P(handshake_servers, ['fileslist','search','transfer'])

  // Init database
  DB_init(function(error, db)
  {
    if(error)
    {
      callback(error)
      return
    }

    // Init files manager
    var filesManager = new FilesManager(db, webp2p)

    // Init cache backup system
    var cacheBackup = new CacheBackup(db, filesManager)

    // Init sharedpoints manager
    var sharedpointsManager = new SharedpointsManager(db)

    // Init search engine
    var searchEngine = new SearchEngine(db, filesManager)


    self.cacheBackup_export = function(onfinish, onprogress, onerror)
    {
      cacheBackup.export(onfinish, onprogress, onerror)
    }

    self.cacheBackup_import = function(blob, callback)
    {
      cacheBackup.import(blob, callback)
    }

    /**
     * Connects to another peer based on its UID. If we are already connected,
     * it does nothing.
     * @param {UUID} uid Identifier of the other peer to be connected.
     * @param {MessageChannel} incomingChannel Optional channel where to
     * @param {Function} cb Callback.
     * send the offer. If not defined send it to all connected peers.
     */
    self.connectTo = function(uid, labels, incomingChannel, callback)
    {
      webp2p.connectTo(uid, labels, incomingChannel, callback)
    }

    self.files_downloading = function(callback)
    {
      filesManager.files_downloading(callback)
    }

    self.files_getAll_byHash = function(hash, callback)
    {
      db.files_getAll_byHash(hash, callback)
    }

    self.files_sharing = function(callback)
    {
      filesManager.files_sharing(callback)
    }

    self.fileslist_disableUpdates = function(uid, callback)
    {
      var peers = webp2p.getPeers()
      var peer = peers[uid]
      var channel = peer.channels['fileslist']

      channel.fileslist_disableUpdates()
    }

    self.fileslist_query = function(uid, flags, callback)
    {
      var peers = webp2p.getPeers()
      var peer = peers[uid]

      if(peer)
      {
        var channel = peer.channels['fileslist']

        if(channel)
           channel.fileslist_query(flags)

        else
          callback({msg: "No channel", uid: uid, channel: "shareit"})
      }
      else
        callback({msg: "No peer", uid: uid})
    }

    self.numPeers = function(callback)
    {
      callback(null, Object.keys(webp2p.getPeers()).length);
    }

    self.searchEngine_search = function(query, callback)
    {
      searchEngine.search(query, callback)
    }

    self.sharedpointsManager_add = function(type, root, callback)
    {
      var sharedpoint

      switch(type)
      {
        case 'Entry':
          sharedpoint = new Entry(root, db, filesManager)
          break

        case 'FileList':
          sharedpoint = new FileList(root, db, filesManager)
          break

        default:
          callback("Unknown sharedpoint type '"+type+"'")
          return
      }

      sharedpointsManager.add(sharedpoint, callback)
    }

    self.sharedpointsManager_getSharedpoints = function(callback)
    {
      sharedpointsManager.getSharedpoints(callback)
    }

    /**
     * Start the download of a file
     * @param {Fileentry} Fileentry of the file to be downloaded.
     */
    self.transfer_begin = function(fileentry)
    {
      filesManager.transfer_begin(fileentry)
    }


    webp2p.addEventListener('connected', function(event)
    {
//      // Restart downloads
//      db.files_getAll(null, function(error, filelist)
//      {
//        if(error)
//          console.error(error)
//
//        else if(filelist.length)
//          policy(function()
//          {
//            for(var i=0, fileentry; fileentry=filelist[i]; i++)
//              if(fileentry.bitmap)
//                self.transfer_query(fileentry)
//          })
//      })

      self.dispatchEvent(event);
    });
    webp2p.addEventListener('disconnected', forwardEvent);
    webp2p.addEventListener('error',        forwardEvent);

    filesManager.addEventListener('file.added',   forwardEvent);
    filesManager.addEventListener('file.deleted', forwardEvent);

    filesManager.addEventListener('fileslist.updated', forwardEvent);

    filesManager.addEventListener('transfer.begin',  forwardEvent);
    filesManager.addEventListener('transfer.end',    forwardEvent);
    filesManager.addEventListener('transfer.update', forwardEvent);

    filesManager.addEventListener('sharedpoints.update', forwardEvent);

    callback(null, self)
  })
}
Local.prototype = new EventTarget()

var shareit = shareit || {};
    shareit.Local = Local;

exports.shareit = shareit;// Based on code from https://github.com/jaredhanson/jsonrpc-postmessage

function Remote(channel, callback)
{
  var self = this


  function forwardEvent(event)
  {
    self.dispatchEvent(event);
  }


  var timeout = 5000
  var handlers = {}
  var requestID = 1


  channel.onmessage = function(event)
  {
    var ack = event.ack
    if(ack === null || ack === undefined)
    {
      forwardEvent(event)
      return
    }

    var handler = handlers[ack];
    if(handler)
      handler.call(self, event.error, event.result);

    delete handlers[ack];
  }


  function call(method)
  {
    var args = Array.prototype.slice.call(arguments, 1)
    var cb = (args.length && typeof args[args.length - 1] == 'function') ? args.pop() : null;

    var request =
    {
      id: requestID++,
      method: method,
      args: args
    }

    if(cb)
    {
      handlers[request.id] = cb

      setTimeout(function()
      {
        var handler = handlers[request.id];
        if(handler)
          handler.call(self, new Error('Timed Out'));

        delete handlers[request.id];
      }, timeout);
    }

    channel.send(request);
  }


  this.cacheBackup_export = function(onfinish, onprogress, onerror)
  {
  }

  this.cacheBackup_import = function(blob, callback)
  {
    call('cacheBackup_import', blob, callback)
  }

  /**
   * Connects to another peer based on its UID. If we are already connected,
   * it does nothing.
   * @param {UUID} uid Identifier of the other peer to be connected.
   * @param {MessageChannel} incomingChannel Optional channel where to
     * @param {Function} cb Callback.
   * send the offer. If not defined send it to all connected peers.
   */
  this.connectTo = function(uid, labels, incomingChannel, callback)
  {
    call('connectTo', uid, labels, incomingChannel, callback)
  }

  this.files_downloading = function(callback)
  {
    call('files_downloading', incomingChannel, callback)
  }

  this.files_getAll_byHash = function(hash, callback)
  {
    call('files_getAll_byHash', hash, callback)
  }

  this.files_sharing = function(callback)
  {
    call('files_sharing', callback)
  }

  this.fileslist_disableUpdates = function(uid, callback)
  {
    call('fileslist_disableUpdates', uid, callback)
  }

  this.fileslist_query = function(uid, flags, callback)
  {
    call('fileslist_query', uid, flags, callback)
  }

  this.numPeers = function(callback)
  {
    call('numPeers', callback)
  }

  this.searchEngine_search = function(query, callback)
  {
    call('searchEngine_search', query, callback)
  }

  this.sharedpointsManager_add = function(type, root, callback)
  {
    call('sharedpointsManager_add', type, root, callback)
  }

  this.sharedpointsManager_getSharedpoints = function(callback)
  {
    call('sharedpointsManager_getSharedpoints', callback)
  }

  /**
   * Start the download of a file
   * @param {Fileentry} Fileentry of the file to be downloaded.
   */
  this.transfer_begin = function(fileentry)
  {
    call('transfer_begin', fileentry)
  }

  callback(null, this)
}
Remote.prototype = new EventTarget();

var shareit = shareit || {};
    shareit.Remote = Remote;

exports.shareit = shareit;/**
 * Save a {Blob} to the user hard disk
 * @param {Blob} blob {Blob} to be saved.
 * @param {String} name Name that will have the saved file.
 */
function savetodisk(blob, name)
{
  // Auto-save downloaded file
  var save = document.createElement('A');

  save.href = URL.createObjectURL(blob);
  save.target = '_blank'; // This can give problems...
  save.download = name; // This force to download with a filename instead of navigate

  save.click();

  // Hack to remove the ObjectURL after it have been saved and not before
  setTimeout(function()
  {
    URL.revokeObjectURL(save.href);
  }, 1000);
}/**
 * Worker to hash and check existence of a file
 */
var lib_sha512 = '(function(e){function t(e){throw e}function r(e,t){this.a=e,this.b=t}function i(e,t){var n=[],r,i=[],s=0,o;if("UTF8"==t)for(o=0;o<e.length;o+=1){r=e.charCodeAt(o),i=[],2048<r?(i[0]=224|(r&61440)>>>12,i[1]=128|(r&4032)>>>6,i[2]=128|r&63):128<r?(i[0]=192|(r&1984)>>>6,i[1]=128|r&63):i[0]=r;for(r=0;r<i.length;r+=1)n[s>>>2]|=i[r]<<24-8*(s%4),s+=1}else if("UTF16"==t)for(o=0;o<e.length;o+=1)n[s>>>2]|=e.charCodeAt(o)<<16-8*(s%4),s+=2;return{value:n,binLen:8*s}}function s(e){var n=[],r=e.length,i,s;0!==r%2&&t("String of HEX type must be in byte increments");for(i=0;i<r;i+=2)s=parseInt(e.substr(i,2),16),isNaN(s)&&t("String of HEX type contains invalid characters"),n[i>>>3]|=s<<24-4*(i%8);return{value:n,binLen:4*r}}function o(e){var n=[],r=0,i,s,o,u,a;-1===e.search(/^[a-zA-Z0-9=+\/]+$/)&&t("Invalid character in base-64 string"),i=e.indexOf("="),e=e.replace(/\=/g,""),-1!==i&&i<e.length&&t("Invalid \'=\' found in base-64 string");for(s=0;s<e.length;s+=4){a=e.substr(s,4);for(o=u=0;o<a.length;o+=1)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[o]),u|=i<<18-6*o;for(o=0;o<a.length-1;o+=1)n[r>>2]|=(u>>>16-8*o&255)<<24-8*(r%4),r+=1}return{value:n,binLen:8*r}}function u(e,t){var n="",r=4*e.length,i,s;for(i=0;i<r;i+=1)s=e[i>>>2]>>>8*(3-i%4),n+="0123456789abcdef".charAt(s>>>4&15)+"0123456789abcdef".charAt(s&15);return t.outputUpper?n.toUpperCase():n}function a(e,t){var n="",r=4*e.length,i,s,o;for(i=0;i<r;i+=3){o=(e[i>>>2]>>>8*(3-i%4)&255)<<16|(e[i+1>>>2]>>>8*(3-(i+1)%4)&255)<<8|e[i+2>>>2]>>>8*(3-(i+2)%4)&255;for(s=0;4>s;s+=1)n=8*i+6*s<=32*e.length?n+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o>>>6*(3-s)&63):n+t.b64Pad}return n}function f(e){var n={outputUpper:!1,b64Pad:"="};try{e.hasOwnProperty("outputUpper")&&(n.outputUpper=e.outputUpper),e.hasOwnProperty("b64Pad")&&(n.b64Pad=e.b64Pad)}catch(r){}return"boolean"!=typeof n.outputUpper&&t("Invalid outputUpper formatting option"),"string"!=typeof n.b64Pad&&t("Invalid b64Pad formatting option"),n}function l(e,t){var i=n,i=new r(e.a,e.b);return i=32>=t?new r(i.a>>>t|i.b<<32-t&4294967295,i.b>>>t|i.a<<32-t&4294967295):new r(i.b>>>t-32|i.a<<64-t&4294967295,i.a>>>t-32|i.b<<64-t&4294967295)}function c(e,t){var i=n;return i=32>=t?new r(e.a>>>t,e.b>>>t|e.a<<32-t&4294967295):new r(0,e.a>>>t-32)}function h(e,t,n){return new r(e.a&t.a^~e.a&n.a,e.b&t.b^~e.b&n.b)}function p(e,t,n){return new r(e.a&t.a^e.a&n.a^t.a&n.a,e.b&t.b^e.b&n.b^t.b&n.b)}function d(e){var t=l(e,28),n=l(e,34);return e=l(e,39),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function v(e){var t=l(e,14),n=l(e,18);return e=l(e,41),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function m(e){var t=l(e,1),n=l(e,8);return e=c(e,7),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function g(e){var t=l(e,19),n=l(e,61);return e=c(e,6),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function y(e,t){var n,i,s;return n=(e.b&65535)+(t.b&65535),i=(e.b>>>16)+(t.b>>>16)+(n>>>16),s=(i&65535)<<16|n&65535,n=(e.a&65535)+(t.a&65535)+(i>>>16),i=(e.a>>>16)+(t.a>>>16)+(n>>>16),new r((i&65535)<<16|n&65535,s)}function b(e,t,n,i){var s,o,u;return s=(e.b&65535)+(t.b&65535)+(n.b&65535)+(i.b&65535),o=(e.b>>>16)+(t.b>>>16)+(n.b>>>16)+(i.b>>>16)+(s>>>16),u=(o&65535)<<16|s&65535,s=(e.a&65535)+(t.a&65535)+(n.a&65535)+(i.a&65535)+(o>>>16),o=(e.a>>>16)+(t.a>>>16)+(n.a>>>16)+(i.a>>>16)+(s>>>16),new r((o&65535)<<16|s&65535,u)}function w(e,t,n,i,s){var o,u,a;return o=(e.b&65535)+(t.b&65535)+(n.b&65535)+(i.b&65535)+(s.b&65535),u=(e.b>>>16)+(t.b>>>16)+(n.b>>>16)+(i.b>>>16)+(s.b>>>16)+(o>>>16),a=(u&65535)<<16|o&65535,o=(e.a&65535)+(t.a&65535)+(n.a&65535)+(i.a&65535)+(s.a&65535)+(u>>>16),u=(e.a>>>16)+(t.a>>>16)+(n.a>>>16)+(i.a>>>16)+(s.a>>>16)+(o>>>16),new r((u&65535)<<16|o&65535,a)}function E(e,n,i){var s,o,u,a,f,l,c,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q=[],R,z;"SHA-384"===i||"SHA-512"===i?(T=80,s=(n+128>>>10<<5)+31,k=32,L=2,F=r,A=y,O=b,M=w,_=m,D=g,P=d,H=v,j=p,B=h,I=[new F(1116352408,3609767458),new F(1899447441,602891725),new F(3049323471,3964484399),new F(3921009573,2173295548),new F(961987163,4081628472),new F(1508970993,3053834265),new F(2453635748,2937671579),new F(2870763221,3664609560),new F(3624381080,2734883394),new F(310598401,1164996542),new F(607225278,1323610764),new F(1426881987,3590304994),new F(1925078388,4068182383),new F(2162078206,991336113),new F(2614888103,633803317),new F(3248222580,3479774868),new F(3835390401,2666613458),new F(4022224774,944711139),new F(264347078,2341262773),new F(604807628,2007800933),new F(770255983,1495990901),new F(1249150122,1856431235),new F(1555081692,3175218132),new F(1996064986,2198950837),new F(2554220882,3999719339),new F(2821834349,766784016),new F(2952996808,2566594879),new F(3210313671,3203337956),new F(3336571891,1034457026),new F(3584528711,2466948901),new F(113926993,3758326383),new F(338241895,168717936),new F(666307205,1188179964),new F(773529912,1546045734),new F(1294757372,1522805485),new F(1396182291,2643833823),new F(1695183700,2343527390),new F(1986661051,1014477480),new F(2177026350,1206759142),new F(2456956037,344077627),new F(2730485921,1290863460),new F(2820302411,3158454273),new F(3259730800,3505952657),new F(3345764771,106217008),new F(3516065817,3606008344),new F(3600352804,1432725776),new F(4094571909,1467031594),new F(275423344,851169720),new F(430227734,3100823752),new F(506948616,1363258195),new F(659060556,3750685593),new F(883997877,3785050280),new F(958139571,3318307427),new F(1322822218,3812723403),new F(1537002063,2003034995),new F(1747873779,3602036899),new F(1955562222,1575990012),new F(2024104815,1125592928),new F(2227730452,2716904306),new F(2361852424,442776044),new F(2428436474,593698344),new F(2756734187,3733110249),new F(3204031479,2999351573),new F(3329325298,3815920427),new F(3391569614,3928383900),new F(3515267271,566280711),new F(3940187606,3454069534),new F(4118630271,4000239992),new F(116418474,1914138554),new F(174292421,2731055270),new F(289380356,3203993006),new F(460393269,320620315),new F(685471733,587496836),new F(852142971,1086792851),new F(1017036298,365543100),new F(1126000580,2618297676),new F(1288033470,3409855158),new F(1501505948,4234509866),new F(1607167915,987167468),new F(1816402316,1246189591)],x="SHA-384"===i?[new F(3418070365,3238371032),new F(1654270250,914150663),new F(2438529370,812702999),new F(355462360,4144912697),new F(1731405415,4290775857),new F(41048885895,1750603025),new F(3675008525,1694076839),new F(1203062813,3204075428)]:[new F(1779033703,4089235720),new F(3144134277,2227873595),new F(1013904242,4271175723),new F(2773480762,1595750129),new F(1359893119,2917565137),new F(2600822924,725511199),new F(528734635,4215389547),new F(1541459225,327033209)]):t("Unexpected error in SHA-2 implementation"),e[n>>>5]|=128<<24-n%32,e[s]=n,R=e.length;for(N=0;N<R;N+=k){n=x[0],s=x[1],o=x[2],u=x[3],a=x[4],f=x[5],l=x[6],c=x[7];for(C=0;C<T;C+=1)q[C]=16>C?new F(e[C*L+N],e[C*L+N+1]):O(D(q[C-2]),q[C-7],_(q[C-15]),q[C-16]),E=M(c,H(a),B(a,f,l),I[C],q[C]),S=A(P(n),j(n,s,o)),c=l,l=f,f=a,a=A(u,E),u=o,o=s,s=n,n=A(E,S);x[0]=A(n,x[0]),x[1]=A(s,x[1]),x[2]=A(o,x[2]),x[3]=A(u,x[3]),x[4]=A(a,x[4]),x[5]=A(f,x[5]),x[6]=A(l,x[6]),x[7]=A(c,x[7])}return"SHA-384"===i?z=[x[0].a,x[0].b,x[1].a,x[1].b,x[2].a,x[2].b,x[3].a,x[3].b,x[4].a,x[4].b,x[5].a,x[5].b]:"SHA-512"===i?z=[x[0].a,x[0].b,x[1].a,x[1].b,x[2].a,x[2].b,x[3].a,x[3].b,x[4].a,x[4].b,x[5].a,x[5].b,x[6].a,x[6].b,x[7].a,x[7].b]:t("Unexpected error in SHA-2 implementation"),z}var n=null;e.jsSHA=function(e,r,l){var c=n,h=n,p=0,d=[0],v="",m=n,v="undefined"!=typeof l?l:"UTF8";"UTF8"===v||"UTF16"===v||t("encoding must be UTF8 or UTF16"),"HEX"===r?(0!==e.length%2&&t("srcString of HEX type must be in byte increments"),m=s(e),p=m.binLen,d=m.value):"ASCII"===r||"TEXT"===r?(m=i(e,v),p=m.binLen,d=m.value):"B64"===r?(m=o(e),p=m.binLen,d=m.value):t("inputFormat must be HEX, TEXT, ASCII, or B64"),this.getHash=function(e,r,i){var s=n,o=d.slice(),l="";switch(r){case"HEX":s=u;break;case"B64":s=a;break;default:t("format must be HEX or B64")}return"SHA-384"===e?(n===c&&(c=E(o,p,e)),l=s(c,f(i))):"SHA-512"===e?(n===h&&(h=E(o,p,e)),l=s(h,f(i))):t("Chosen SHA variant is not supported"),l},this.getHMAC=function(e,r,l,c,h){var m,g,y,b,w,S=[],x=[],T=n;switch(c){case"HEX":m=u;break;case"B64":m=a;break;default:t("outputFormat must be HEX or B64")}"SHA-384"===l?(y=128,w=384):"SHA-512"===l?(y=128,w=512):t("Chosen SHA variant is not supported"),"HEX"===r?(T=s(e),b=T.binLen,g=T.value):"ASCII"===r||"TEXT"===r?(T=i(e,v),b=T.binLen,g=T.value):"B64"===r?(T=o(e),b=T.binLen,g=T.value):t("inputFormat must be HEX, TEXT, ASCII, or B64"),e=8*y,r=y/4-1,y<b/8?(g=E(g,b,l),g[r]&=4294967040):y>b/8&&(g[r]&=4294967040);for(y=0;y<=r;y+=1)S[y]=g[y]^909522486,x[y]=g[y]^1549556828;return l=E(x.concat(E(S.concat(d),e+p,l)),e+w,l),m(l,f(h))}}})(this);'
var hasher_worker = 'function hashData(e,t){var n=new jsSHA(e,"TEXT"),r=n.getHash("SHA-512","B64").replace("/","-");t(r)}function hashFileentry(e){var t=new FileReader;t.onload=function(){hashData(this.result,function(t){e.hash=t,self.postMessage(["hashed",e])})},t.readAsBinaryString(e.file)}jsSHA||importScripts("../lib/sha512.js"),self.onmessage=function(e){var t=e.data[1];switch(e.data[0]){case"hash":hashFileentry(t)}};'

hasher_worker = lib_sha512 + hasher_worker;

hasher_worker = new Blob([hasher_worker], {type: "text/javascript"});
hasher_worker = URL.createObjectURL(hasher_worker);


/**
 * Update the SharedPoints and hash its files
 * @param {IDBDatabase} db ShareIt! database.
 * @param {?Function} policy Function to manage the policy access.
 */
function Hasher(db, policy, sharedpointsManager)
{
  var queue = [];
  var timeout;

  var self = this;

  /**
   * Refresh hashes after one hour
   */
  function updateTimeout()
  {
    clearTimeout(timeout);
    timeout = setTimeout(function()
    {
      self.refresh();
//    }, 30*1000)
    }, 60 * 60 * 1000);
  }

  /**
   * Delete a {Fileentry} (mainly because it was removed from the filesystem)
   * @param {Fileentry} fileentry {Fileentry} to be removed from database.
   */
  function fileentry_delete(fileentry)
  {
    // Remove file from the database
    db.files_delete(fileentry.hash, function(error, result)
    {
      if(error)
        console.error(error)

      // Notify that the file have been deleted
      else if(self.ondeleted)
        self.ondeleted(fileentry);
    });
  }

  /**
   * Set a {Fileentry} as hashed and store it on the database
   * @param {Fileentry} fileentry {Fileentry} to be added to the database.
   */
  function fileentry_hashed(fileentry)
  {
    // Remove hashed file from the queue
    queue.splice(queue.indexOf(fileentry));

    /**
     * Add file to the database
     */
    function addFile(fileentry)
    {
      fileentry.peer = ""  // File is shared by us
      fileentry.name = fileentry.file.name

      db.files_put(fileentry, function(error, result)
      {
        if(error)
          console.error(error)

        // Notify that the file have been hashed
        else if(self.onhashed)
          self.onhashed(fileentry);
      });
    }

//    // Dropbox plugin start
//    if(dropboxClient
//    && fileentry.sharedpoint == "Dropbox")
//    {
//      var options = {download: true, downloadHack: true}
//
//      dropboxClient.makeUrl(fileentry.path+'/'+name, options,
//      function(error, publicUrl)
//      {
//        if(publicUrl)
//          fileentry.dropbox = publicUrl.url
//
//        addFile(fileentry)
//      })
//    }
//    else
//    // Dropbox plugin end
      addFile(fileentry);
  }

  var worker = new Worker(hasher_worker);
  worker.onmessage = function(event)
  {
    var fileentry = event.data[1];

    switch(event.data[0])
    {
      case 'delete':
        fileentry_delete(fileentry);
        break;

      case 'hashed':
        fileentry_hashed(fileentry);
    }

    // Update refresh timeout after each worker message
    updateTimeout();
  };

  /**
   * Hash the files from a {Sharedpoint}.
   * @param {Array} files List of files to be hashed.
   */
  this.hash = function(fileentry)
  {
    // File has zero size
    if(!fileentry.file.size)
    {
      // Precalculated hash for zero sized files
      fileentry.hash = 'z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',

      fileentry_hashed(fileentry);

      return
    }

    // Ignore files that are already on the queue
    for(var j = 0, q; q = queue[j]; j++)
      if(fileentry.file == q)
        return;

    // Hash the file
    queue.push(fileentry);
    worker.postMessage(['hash', fileentry]);
  };

  /**
   * Refresh the {Sharedpoint}s and {Fileentry}s on the database
   */
  this.refresh = function()
  {
    // Hasher is working, just return
    if(timeout == 'hashing')
      return;

    // Hasher is not working, start hashing files
    console.info('Starting hashing refresh');

    clearTimeout(timeout);
    timeout = 'hashing';

    sharedpointsManager.getSharedpoints(function(error, sharedpoints)
    {
      if(error)
      {
        console.error(error)
        return
      }

      db.files_getAll(null, function(error, fileentries)
      {
        if(error)
        {
          console.error(error)
          return
        }

        /**
         * Check if the sharedpoint of a file exists or have been removed
         */
        function sharedpoint_exist(name)
        {
          for(var i=0; i<sharedpoints.length; i++)
            if(sharedpoints[i].name == name)
              return true;
        }

        // Remove all unaccesible files
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.sharedpoint)
          {
            // Sharedpoint was removed, remove the file from database
            if(!sharedpoint_exist(fileentry.sharedpoint.name))
              fileentry_delete(fileentry);
          }

          // Update timeout for the next refresh walkabout
          if(sharedpoints.length & policy)
            policy(updateTimeout);
          else
            updateTimeout();
      });
    });
  };
}function Sharedpoint(db, filesManager)
{
  var self = this

  this.sort_pathName = function(a,b)
  {
    return a.path.localeCompare(b.path) || a.name.localeCompare(b.name)
  }

  this.hash = function()
  {
//    console.info("Hashing sharedpoint '"+this.name+"'...")

    var self = this

    // Get all files currently indexed to delete removed old ones
    db.files_getAll_byPeer("", function(error, fileentries)
    {
      // Get entries only for this sharedpoint
      var entries = []

      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        if(fileentry.sharedpoint == self.name)
          entries.push(fileentry)

      entries.sort(self.sort_pathName)

      // Get the file entries from the FileList
      var files = self.fileList()

      // Run over the old and new files looking for deleted and added ones
      var ai = bi= 0;
      while(ai < entries.length || bi < files.length)
      {
        var entry = entries[ai]
        var file  = files[bi]

        // Entry was removed
        if(entry < file || !file)
        {
          filesManager.delete(entry)

          ai++;
        }

        // File was added
        else if(entry > file || !entry)
        {
          filesManager.add(file)

          bi++;
        }

        // Both entry and file are equal, check the modification date
        else
        {
          // [Hack] When (re)moving the file from its original place, Chrome
          // show it with size = 0 and lastModifiedDate = null instead of
          // raising a NotFoundError error
          if(file.lastModifiedDate == null)
            filesManager.delete(entry)

          else if(entry.lastModifiedDate < file.lastModifiedDate)
            filesManager.add(file)

          ai++;
          bi++;
        }
      }

      setTimeout(function()
      {
        self.hash()
      },
      5*1000)
//      1*60*1000)
    })
  }

  filesManager.addEventListener('file.added', function(event)
  {
    var fileentry = event.fileentry

    if(fileentry.sharedpoint == self.name)
    {
      // Increase sharedpoint shared size
      self.size += fileentry.file.size;

      db.sharepoints_put(self, function(error, sharedpoint)
      {
        if(error)
          console.error(error)

        else
        {
          var event = document.createEvent("Event");
              event.initEvent('sharedpoints.update',true,true);

          filesManager.dispatchEvent(event);
        }
      });
    }
  });

  filesManager.addEventListener('file.deleted', function(event)
  {
    var fileentry = event.fileentry

    if(fileentry.sharedpoint == self.name)
    {
      // Increase sharedpoint shared size
      self.size -= fileentry.file.size;

      db.sharepoints_put(self, function(error, sharedpoint)
      {
        if(error)
          console.error(error)

        else
        {
          var event = document.createEvent("Event");
              event.initEvent('sharedpoints.update',true,true);

          filesManager.dispatchEvent(event);
        }
      });
    }
  });
}


SharedpointsManager = function(db)
{
  var self = this;

  this.getSharedpoints = function(callback)
  {
    db.sharepoints_getAll(null, callback);
  };

//  var sharedpoints = []
//
//  db.sharepoints_getAll(null, function(error, sharedpoints)
//  {
//    if(error)
//      console.error(error)
//
//    else
//      for(var i=0, sharedpoint; sharedpoint= sharedpoints[i]; i++)
//      {
//        switch(sharedpoint.type)
//        {
//          case 'dropbox':
//            break
//
//          case 'FileList':
//            break
//        }
//      }
//    })

  this.add = function(sharedpoint, cb)
  {
    db.sharepoints_getAll(null, function(error, sharedpoints)
    {
      if(error)
      {
        console.error(error)

        if(cb)
          cb(new Error("Error getting sharedpoints"));
      }

      else
      {
        // Check if we have already this sharedpoint (one with this name)
        for(var i=0, sp; sp=sharedpoints[i]; i++)
          if(sp.name == sharedpoint.name)
          {
            if(cb)
              cb(new Error('Sharedpoint '+sharedpoint.name+' already defined'));

            return;
          }

        // Sharedpoint is new, add it to database and start hashing its files
        db.sharepoints_put(sharedpoint);
        sharedpoint.hash();

        if(cb)
          cb();
      }
    });
  };

  this.delete = function(name, onsuccess)
  {
    db.sharepoints_delete(name, function(error, result)
    {
      if(error)
        console.error(error)

      else if(onsuccess)
        onsuccess(result)
    });
  };
};function Dropbox(db, options)
{
  var driver = new Dropbox.Drivers.Popup(
  {
    receiverFile: 'oauth_receiver.html'
  });

  var client = new Dropbox.Client(options);
  client.authDriver(driver);
  client.authenticate(function(error, client)
  {
    if(error)
    {
      console.error(error);
      dropboxClient = null;
    }
  });

  var versionTag = '';

  this.getFiles = function(onsuccess)
  {
    var files = [];

    client.readdir('/',
    {
      versionTag: versionTag
    },
    function(error, names, stat, entries)
    {
      versionTag = stat.versionTag;

      for(var i=0, entry; entry=entries[i]; i++)
        if(entry.isFile) files.push(
        {
          path: entry.path,
          name: entry.name,
          type: entry.mimeType,
          size: entry.size
        });

        onsuccess(files);
    });
  };

  // Start fetching files
  this.getFiles(function(files)
  {
    hasher.hash(files);
  });
}/**
 * Sharedpoint created by a Filesystem entry (for example Drag&Drop)
 */
function Entry(entry, db, filesManager)
{
  Sharedpoint.call(this, db, filesManager)

  this.name = entry.name;
  this.type = 'Entry'
  this.size = 0

  var self = this

  this.fileList = function(cb)
  {
    // Get the file entries from the FileList
    var files = []

    function readDirectory(entry, cb)
    {
      var dirReader = entry.createReader();
      var entries = []

      function readEntries()
      {
        dirReader.readEntries(function(results)
        {
          if(results.length)
          {
            entries = entries.concat(toArray(results));
            readEntries();
          }
          else
            cb(entries);
        },
        function(error)
        {
          console.error("readEntries error: "+error)
        });
      }
    }

    function addDirectory(entry, cb)
    {
      readDirectory(entry, function(results)
      {
        for(var i=0, result; result=results[i]; i++)
        {
          // File
          if(result.isFile)
            result.file(function(file)
            {
              // Generate the fileentry
              var fileentry =
              {
                sharedpoint: self.name,
                path: file.webkitRelativePath.split('/').slice(1, -1).join('/'),
                name: file.name,

                lastModifiedDate: file.lastModifiedDate,
                file: file
              }

              files.push(fileentry);
            })

          // Directory
          else if(result.isDirectory)
            addDirectory(result)

          // Unknown
          else
            console.warn("Unknown entry type for "+result.fullPath)
        }

        if(cb)
          cb(files)
      })
    }

    addDirectory(entry, function(files)
    {
      files.sort(self.sort_pathName)

      cb(files)
    })
  }
}/**
 * Sharedpoint created by an Input tag
 */
function FileList(fileList, db, filesManager)
{
  Sharedpoint.call(this, db, filesManager)

  this.name = fileList[0].webkitRelativePath.split('/')[0];
  this.type = 'FileList'
  this.size = 0

  this.fileList = function()
  {
    // Get the file entries from the FileList
    var files = []

    for(var i=0, file; file=fileList[i]; i++)
    {
      // Remove invalid entries
      if(file.name == '.')
        continue

      // Generate the fileentry
      var fileentry =
      {
        sharedpoint: this.name,
        path: file.webkitRelativePath.split('/').slice(1, -1).join('/'),
        name: file.name,

        lastModifiedDate: file.lastModifiedDate,
        file: file
      }

      files.push(fileentry)
    }

    files.sort(this.sort_pathName)

    return files
  }
}function Mega()
{

}/**
 * Init a channel as an event-based transport layer
 * @param transport
 */
function Transport_init(transport)
{
  /**
   *  Compose and send message
   */
  transport.emit = function()
  {
    var args = Array.prototype.slice.call(arguments, 0);

    transport.send(JSON.stringify(args))
  };

  /**
   *  Message received
   */
  transport.onmessage = function(message)
  {
    message = JSON.parse(message.data);

    var event = document.createEvent("Event");
        event.initEvent(message[0],true,true);
        event.data = message.slice(1)

    this.dispatchEvent(event);
  };
}
Transport_init.prototype = new EventTarget();function Transport_Fileslist_init(transport, db, filesManager, peer_uid)
{
  Transport_init(transport);

  var send_updates = false;

  // Host

  function generateFileObject(fileentry)
  {
    var path = '';
    if(fileentry.sharedpoint)
    {
      path += fileentry.sharedpoint;
      if(fileentry.path != '')
        path += '/' + fileentry.path;
    }
    var name = fileentry.file ? fileentry.file.name : fileentry.name
    var blob = fileentry.file || fileentry.blob || fileentry;

    var result =
    {
      path: path,
      name: name,

      hash: fileentry.hash,
      size: blob.size,
      type: blob.type
    };

    // Dropbox plugin start
    if(fileentry.dropbox)
      result.dropbox = fileentry.dropbox;
    // Dropbox plugin end

    return result;
  }


  var SEND_UPDATES = 1;

  /**
   * Catch request for our files list
   */
  transport.addEventListener('fileslist.query', function(event)
  {
    var flags = event.data[0];

    db.files_getAll(null, function(error, fileslist)
    {
      if(error)
        console.error(error)

      else
      {
        // Addapt and send to the other peer our list of shared files
        var files_send = [];

        for(var i = 0, fileentry; fileentry = fileslist[i]; i++)
          files_send.push(generateFileObject(fileentry));

        transport.emit('fileslist.send', files_send);
      };
    });

    send_updates = flags & SEND_UPDATES;
  });

  /**
   * Catch request to disable sending our files list updates
   */
  transport.addEventListener('fileslist.disableUpdates', function(event)
  {
    send_updates = false;
  });


  // Peer

  /**
   * Catch new sended data for the other peer fileslist
   */
  transport.addEventListener('fileslist.send', function(event)
  {
    var fileentries = event.data[0];

    // Update the fileslist for this peer
    db.files_getAll_byPeer(peer_uid, function(error, fileslist)
    {
      // Remove old peer fileslist
      for(var i = 0, fileentry; fileentry = fileslist[i]; i++)
      {
        var key = [fileentry.peer,
                   fileentry.sharedpoint,
                   fileentry.path,
                   fileentry.name]
        db.files_delete(key)
      }

      // Set new fileslist for this peer
      for(var i = 0, fileentry; fileentry = fileentries[i]; i++)
      {
        fileentry.peer = peer_uid
        fileentry.sharedpoint = ""

        db.files_put(fileentry)
      }

      // [ToDo] Use parallize
      for(var i = 0, fileentry; fileentry = fileentries[i]; i++)
        if(!fileentry.bitmap)
          db.files_getAll_byHash(fileentry.hash,
          function(error, fileentries)
          {
            if(fileentries.length)
            {
              var duplicates = []

              for(var i=0, entry; entry=fileentries[i]; i++)
                if(fileentry.peer        != entry.peer
                || fileentry.sharedpoint != entry.sharedpoint
                || fileentry.path        != entry.path
                || fileentry.name        != entry.name)
                  duplicates.push(entry)

              if(duplicates.length)
                fileentry.duplicates = duplicates
            }
          })

      // Notify about fileslist update
      var event = document.createEvent("Event");
          event.initEvent('fileslist._send',true,true);
          event.fileslist = fileentries
          event.uid = peer_uid

      transport.dispatchEvent(event);
    })
  });

  /**
   * Request the other peer fileslist
   */
  transport.fileslist_query = function(flags)
  {
    transport.emit('fileslist.query', flags);
  };

  /**
   * Request to the other peer don't send fileslist updates
   */
  transport.fileslist_disableUpdates = function()
  {
    transport.emit('fileslist.disableUpdates');
  };


  // fileslist updates

  /**
   * Catch when the other peer has added a new file
   */
  transport.addEventListener('fileslist.added', function(event)
  {
    var fileentry = event.data[0];
        fileentry.peer = peer_uid
        fileentry.sharedpoint = ""

    db.files_put(fileentry, function(error)
    {
      // [ToDo] Check if we have already the file from this peer in the index so
      // we don't dispatch the event twice


      db.files_getAll_byPeer(peer_uid, function(error, fileslist)
      {
        // Notify about fileslist update
        var event = document.createEvent("Event");
            event.initEvent('fileslist._added',true,true);
            event.fileslist = fileslist
            event.uid = peer_uid

        transport.dispatchEvent(event);
      })
    })
  });

  /**
   * Catch when the other peer has deleted a file
   */
  transport.addEventListener('fileslist.deleted', function(event)
  {
    var fileentry = event.data[0];
        fileentry.peer = peer_uid

    // Remove the fileentry from the fileslist
    db.files_delete(fileentry, function(error)
    {
      db.files_getAll_byPeer(peer_uid, function(error, fileslist)
      {
        // Notify about fileslist update
        var event = document.createEvent("Event");
            event.initEvent('fileslist._deleted',true,true);
            event.fileslist = fileslist
            event.uid = peer_uid

        transport.dispatchEvent(event);
      })
    })
  });


  transport.addEventListener('open', function(event)
  {
    console.log('Opened datachannel "' + peer_uid + ':' + transport.label + '"');

    /**
     * Notify to the other peer that we have added a new file
     */
    filesManager.addEventListener('file.added', function(event)
    {
      var fileentry = event.fileentry;

      if(send_updates)
        transport.emit('fileslist.added', generateFileObject(fileentry));
    });

    /**
       * Notify to the other peer that we have deleted a new file
       */
    filesManager.addEventListener('file.deleted', function(event)
    {
      var fileentry = event.fileentry;

      if(send_updates)
        transport.emit('fileslist.deleted', fileentry.hash);
    });

    function fileslist_updated(event)
    {
      var event2 = document.createEvent("Event");
          event2.initEvent('fileslist.updated',true,true);
          event2.fileslist = event.fileslist
          event2.uid = event.uid

      filesManager.dispatchEvent(event2);
    }

    transport.addEventListener('fileslist._send', fileslist_updated);
    transport.addEventListener('fileslist._added', fileslist_updated);
    transport.addEventListener('fileslist._deleted', fileslist_updated);

    // Quick hack for search
    var SEND_UPDATES = 1;
//    var SMALL_FILES_ACCELERATOR = 2
    var flags = SEND_UPDATES;
//    if()
//      flags |= SMALL_FILES_ACCELERATOR
    transport.fileslist_query(flags)
  })
}function Transport_Search_init(transport, db, webp2p)
{
  transport.search = function(text)
  {

  };

  transport.search_hash = function(hashes)
  {
    if(transport.isPubsub)
      route.push(webp2p.uid);

    console.debug('search.hash', hashes, route);
    transport.emit('search.hash', hashes, route);
  };


  transport.addEventListener('search', function(event)
  {

  });

  transport.addEventListener('search.hash', function(event)
  {
    var hashes = event.data[0];
    var route = event.data[1];

    // Check if we have answered this request
    for(var i = 0, uid; uid = route[i]; i++)
      if(uid == webp2p.uid)
        return;

      // Search hashes on own files
      db.files_getAll_byHash(hashes, function(error, fileslist)
      {

      });

    // Re-send the search over all the connected peers
    route.push(transport.uid);

    var peers = webp2p.getPeers();
    for(var uid in peers)
    {
      // Ignore peers already on the route path
      var routed = false;
      for(var i = 0, peer; peer = route[i]; i++)
        if(peer == uid)
        {
          routed = true;
          break;
        }

        // Send the search request to the other connected peers
        if(!routed)
          peers[uid].channels['search'].search_hash(hashes, route);
    }
  });

  transport.addEventListener('open', function(event)
  {
    console.log('Opened datachannel "' + channel.label + '"');
  })
}
Transport_Search_init.prototype = new EventTarget();// Filereader support (be able to host files from the filesystem)
if(typeof FileReader == 'undefined')
{
  console.warn("'Filereader' is not available, can't be able to host files");
  No_FileReader();
}


/**
 * Addapt a transport layer to be used as a host
 * @param transport
 * @param {IDBdatabase} db ShareIt! database.
 */
function Transport_Transfer_init(transport, db, filesManager)
{
  // Filereader support (be able to host files from the filesystem)
  if(typeof FileReader == 'undefined')
    return;

  Transport_init(transport);

  /**
   * Catch request of file data
   */
  transport.addEventListener('transfer.query', function(event)
  {
    // [ToDo] check when fragment is not available and return error

    var hash = event.data[0];
    var chunk = event.data[1];

    var reader = new FileReader();
    reader.onerror = function(evt)
    {
      console.error('host.transfer_query('+hash+', '+chunk+") = '"+
                    evt.target.result+"'");
    };
    reader.onload = function(evt)
    {
      transport.emit('transfer.send', hash, chunk, evt.target.result);
    };

    var start = chunk * module.chunksize;
    var stop = start + module.chunksize;

    function readSlice(blob)
    {
      var filesize = parseInt(blob.size);
      if(stop > filesize)
         stop = filesize;

      reader.readAsBinaryString(blob.slice(start, stop));
    }

    db.files_getAll_byHash(hash, function(error, fileentries)
    {
      if(error)
      {
        console.error(error)
        return
      }

      if(fileentries.length)
      {
        // Try to read from a file
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.file)
          {
            readSlice(fileentry.file)
            return
          }

        // Try to read from a blob
        // [ToDo] check when fragment is not available and return error
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.blob)
          {
            readSlice(fileentry.blob)
            return
          }
      }

      console.warn("File "+hash+" was not found to be readed")
    });
  });

  /**
   * Catch new sended data for a file
   */
  transport.addEventListener('transfer.send', function(event)
  {
    var hash  = event.data[0];
    var chunk = parseInt(event.data[1]);
    var data  = event.data[2];

    // Fix back data transmited as UTF-8 to binary
    var byteArray = new Uint8Array(data.length);
    for(var i = 0; i < data.length; i++)
      byteArray[i] = data.charCodeAt(i) & 0xff;

    data = byteArray;

    db.files_getAll_byHash(hash, function(error, fileentries)
    {
      if(error)
        console.error(error)

      else if(fileentries.length)
      {
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.blob)
          {
            var event = document.createEvent("Event");
                event.initEvent('transfer._send',true,true);
                event.fileentry = fileentry
                event.chunk = chunk
                event.data = data

            transport.dispatchEvent(event);
            return
          }
      }

      else
        console.warn("We are not downloading file "+hash)
    });
  });

  /**
   * Request (more) data for a file
   * @param {Fileentry} Fileentry of the file to be requested.
   * @param {Number} chunk Chunk of the file to be requested.
   */
  transport.transfer_query = function(fileentry, chunk)
  {
    transport.emit('transfer.query', fileentry.hash, chunk);
  };


  transport.addEventListener('open', function(event)
  {
    console.log('Opened datachannel "' + transport.label + '"');

    transport.addEventListener('transfer._send', function(event)
    {
      var fileentry = event.fileentry
      var chunk     = event.chunk
      var data      = event.data

      filesManager.updateFile(fileentry, chunk, data);
    });
  })
}
})(this);
