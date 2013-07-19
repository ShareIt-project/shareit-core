/**
 * Worker to hash and check existence of a file
 */
var lib_sha512 = '(function(e){function t(e){throw e}function r(e,t){this.a=e,this.b=t}function i(e,t){var n=[],r,i=[],s=0,o;if("UTF8"==t)for(o=0;o<e.length;o+=1){r=e.charCodeAt(o),i=[],2048<r?(i[0]=224|(r&61440)>>>12,i[1]=128|(r&4032)>>>6,i[2]=128|r&63):128<r?(i[0]=192|(r&1984)>>>6,i[1]=128|r&63):i[0]=r;for(r=0;r<i.length;r+=1)n[s>>>2]|=i[r]<<24-8*(s%4),s+=1}else if("UTF16"==t)for(o=0;o<e.length;o+=1)n[s>>>2]|=e.charCodeAt(o)<<16-8*(s%4),s+=2;return{value:n,binLen:8*s}}function s(e){var n=[],r=e.length,i,s;0!==r%2&&t("String of HEX type must be in byte increments");for(i=0;i<r;i+=2)s=parseInt(e.substr(i,2),16),isNaN(s)&&t("String of HEX type contains invalid characters"),n[i>>>3]|=s<<24-4*(i%8);return{value:n,binLen:4*r}}function o(e){var n=[],r=0,i,s,o,u,a;-1===e.search(/^[a-zA-Z0-9=+\/]+$/)&&t("Invalid character in base-64 string"),i=e.indexOf("="),e=e.replace(/\=/g,""),-1!==i&&i<e.length&&t("Invalid \'=\' found in base-64 string");for(s=0;s<e.length;s+=4){a=e.substr(s,4);for(o=u=0;o<a.length;o+=1)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[o]),u|=i<<18-6*o;for(o=0;o<a.length-1;o+=1)n[r>>2]|=(u>>>16-8*o&255)<<24-8*(r%4),r+=1}return{value:n,binLen:8*r}}function u(e,t){var n="",r=4*e.length,i,s;for(i=0;i<r;i+=1)s=e[i>>>2]>>>8*(3-i%4),n+="0123456789abcdef".charAt(s>>>4&15)+"0123456789abcdef".charAt(s&15);return t.outputUpper?n.toUpperCase():n}function a(e,t){var n="",r=4*e.length,i,s,o;for(i=0;i<r;i+=3){o=(e[i>>>2]>>>8*(3-i%4)&255)<<16|(e[i+1>>>2]>>>8*(3-(i+1)%4)&255)<<8|e[i+2>>>2]>>>8*(3-(i+2)%4)&255;for(s=0;4>s;s+=1)n=8*i+6*s<=32*e.length?n+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o>>>6*(3-s)&63):n+t.b64Pad}return n}function f(e){var n={outputUpper:!1,b64Pad:"="};try{e.hasOwnProperty("outputUpper")&&(n.outputUpper=e.outputUpper),e.hasOwnProperty("b64Pad")&&(n.b64Pad=e.b64Pad)}catch(r){}return"boolean"!=typeof n.outputUpper&&t("Invalid outputUpper formatting option"),"string"!=typeof n.b64Pad&&t("Invalid b64Pad formatting option"),n}function l(e,t){var i=n,i=new r(e.a,e.b);return i=32>=t?new r(i.a>>>t|i.b<<32-t&4294967295,i.b>>>t|i.a<<32-t&4294967295):new r(i.b>>>t-32|i.a<<64-t&4294967295,i.a>>>t-32|i.b<<64-t&4294967295)}function c(e,t){var i=n;return i=32>=t?new r(e.a>>>t,e.b>>>t|e.a<<32-t&4294967295):new r(0,e.a>>>t-32)}function h(e,t,n){return new r(e.a&t.a^~e.a&n.a,e.b&t.b^~e.b&n.b)}function p(e,t,n){return new r(e.a&t.a^e.a&n.a^t.a&n.a,e.b&t.b^e.b&n.b^t.b&n.b)}function d(e){var t=l(e,28),n=l(e,34);return e=l(e,39),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function v(e){var t=l(e,14),n=l(e,18);return e=l(e,41),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function m(e){var t=l(e,1),n=l(e,8);return e=c(e,7),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function g(e){var t=l(e,19),n=l(e,61);return e=c(e,6),new r(t.a^n.a^e.a,t.b^n.b^e.b)}function y(e,t){var n,i,s;return n=(e.b&65535)+(t.b&65535),i=(e.b>>>16)+(t.b>>>16)+(n>>>16),s=(i&65535)<<16|n&65535,n=(e.a&65535)+(t.a&65535)+(i>>>16),i=(e.a>>>16)+(t.a>>>16)+(n>>>16),new r((i&65535)<<16|n&65535,s)}function b(e,t,n,i){var s,o,u;return s=(e.b&65535)+(t.b&65535)+(n.b&65535)+(i.b&65535),o=(e.b>>>16)+(t.b>>>16)+(n.b>>>16)+(i.b>>>16)+(s>>>16),u=(o&65535)<<16|s&65535,s=(e.a&65535)+(t.a&65535)+(n.a&65535)+(i.a&65535)+(o>>>16),o=(e.a>>>16)+(t.a>>>16)+(n.a>>>16)+(i.a>>>16)+(s>>>16),new r((o&65535)<<16|s&65535,u)}function w(e,t,n,i,s){var o,u,a;return o=(e.b&65535)+(t.b&65535)+(n.b&65535)+(i.b&65535)+(s.b&65535),u=(e.b>>>16)+(t.b>>>16)+(n.b>>>16)+(i.b>>>16)+(s.b>>>16)+(o>>>16),a=(u&65535)<<16|o&65535,o=(e.a&65535)+(t.a&65535)+(n.a&65535)+(i.a&65535)+(s.a&65535)+(u>>>16),u=(e.a>>>16)+(t.a>>>16)+(n.a>>>16)+(i.a>>>16)+(s.a>>>16)+(o>>>16),new r((u&65535)<<16|o&65535,a)}function E(e,n,i){var s,o,u,a,f,l,c,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q=[],R,z;"SHA-384"===i||"SHA-512"===i?(T=80,s=(n+128>>>10<<5)+31,k=32,L=2,F=r,A=y,O=b,M=w,_=m,D=g,P=d,H=v,j=p,B=h,I=[new F(1116352408,3609767458),new F(1899447441,602891725),new F(3049323471,3964484399),new F(3921009573,2173295548),new F(961987163,4081628472),new F(1508970993,3053834265),new F(2453635748,2937671579),new F(2870763221,3664609560),new F(3624381080,2734883394),new F(310598401,1164996542),new F(607225278,1323610764),new F(1426881987,3590304994),new F(1925078388,4068182383),new F(2162078206,991336113),new F(2614888103,633803317),new F(3248222580,3479774868),new F(3835390401,2666613458),new F(4022224774,944711139),new F(264347078,2341262773),new F(604807628,2007800933),new F(770255983,1495990901),new F(1249150122,1856431235),new F(1555081692,3175218132),new F(1996064986,2198950837),new F(2554220882,3999719339),new F(2821834349,766784016),new F(2952996808,2566594879),new F(3210313671,3203337956),new F(3336571891,1034457026),new F(3584528711,2466948901),new F(113926993,3758326383),new F(338241895,168717936),new F(666307205,1188179964),new F(773529912,1546045734),new F(1294757372,1522805485),new F(1396182291,2643833823),new F(1695183700,2343527390),new F(1986661051,1014477480),new F(2177026350,1206759142),new F(2456956037,344077627),new F(2730485921,1290863460),new F(2820302411,3158454273),new F(3259730800,3505952657),new F(3345764771,106217008),new F(3516065817,3606008344),new F(3600352804,1432725776),new F(4094571909,1467031594),new F(275423344,851169720),new F(430227734,3100823752),new F(506948616,1363258195),new F(659060556,3750685593),new F(883997877,3785050280),new F(958139571,3318307427),new F(1322822218,3812723403),new F(1537002063,2003034995),new F(1747873779,3602036899),new F(1955562222,1575990012),new F(2024104815,1125592928),new F(2227730452,2716904306),new F(2361852424,442776044),new F(2428436474,593698344),new F(2756734187,3733110249),new F(3204031479,2999351573),new F(3329325298,3815920427),new F(3391569614,3928383900),new F(3515267271,566280711),new F(3940187606,3454069534),new F(4118630271,4000239992),new F(116418474,1914138554),new F(174292421,2731055270),new F(289380356,3203993006),new F(460393269,320620315),new F(685471733,587496836),new F(852142971,1086792851),new F(1017036298,365543100),new F(1126000580,2618297676),new F(1288033470,3409855158),new F(1501505948,4234509866),new F(1607167915,987167468),new F(1816402316,1246189591)],x="SHA-384"===i?[new F(3418070365,3238371032),new F(1654270250,914150663),new F(2438529370,812702999),new F(355462360,4144912697),new F(1731405415,4290775857),new F(41048885895,1750603025),new F(3675008525,1694076839),new F(1203062813,3204075428)]:[new F(1779033703,4089235720),new F(3144134277,2227873595),new F(1013904242,4271175723),new F(2773480762,1595750129),new F(1359893119,2917565137),new F(2600822924,725511199),new F(528734635,4215389547),new F(1541459225,327033209)]):t("Unexpected error in SHA-2 implementation"),e[n>>>5]|=128<<24-n%32,e[s]=n,R=e.length;for(N=0;N<R;N+=k){n=x[0],s=x[1],o=x[2],u=x[3],a=x[4],f=x[5],l=x[6],c=x[7];for(C=0;C<T;C+=1)q[C]=16>C?new F(e[C*L+N],e[C*L+N+1]):O(D(q[C-2]),q[C-7],_(q[C-15]),q[C-16]),E=M(c,H(a),B(a,f,l),I[C],q[C]),S=A(P(n),j(n,s,o)),c=l,l=f,f=a,a=A(u,E),u=o,o=s,s=n,n=A(E,S);x[0]=A(n,x[0]),x[1]=A(s,x[1]),x[2]=A(o,x[2]),x[3]=A(u,x[3]),x[4]=A(a,x[4]),x[5]=A(f,x[5]),x[6]=A(l,x[6]),x[7]=A(c,x[7])}return"SHA-384"===i?z=[x[0].a,x[0].b,x[1].a,x[1].b,x[2].a,x[2].b,x[3].a,x[3].b,x[4].a,x[4].b,x[5].a,x[5].b]:"SHA-512"===i?z=[x[0].a,x[0].b,x[1].a,x[1].b,x[2].a,x[2].b,x[3].a,x[3].b,x[4].a,x[4].b,x[5].a,x[5].b,x[6].a,x[6].b,x[7].a,x[7].b]:t("Unexpected error in SHA-2 implementation"),z}var n=null;e.jsSHA=function(e,r,l){var c=n,h=n,p=0,d=[0],v="",m=n,v="undefined"!=typeof l?l:"UTF8";"UTF8"===v||"UTF16"===v||t("encoding must be UTF8 or UTF16"),"HEX"===r?(0!==e.length%2&&t("srcString of HEX type must be in byte increments"),m=s(e),p=m.binLen,d=m.value):"ASCII"===r||"TEXT"===r?(m=i(e,v),p=m.binLen,d=m.value):"B64"===r?(m=o(e),p=m.binLen,d=m.value):t("inputFormat must be HEX, TEXT, ASCII, or B64"),this.getHash=function(e,r,i){var s=n,o=d.slice(),l="";switch(r){case"HEX":s=u;break;case"B64":s=a;break;default:t("format must be HEX or B64")}return"SHA-384"===e?(n===c&&(c=E(o,p,e)),l=s(c,f(i))):"SHA-512"===e?(n===h&&(h=E(o,p,e)),l=s(h,f(i))):t("Chosen SHA variant is not supported"),l},this.getHMAC=function(e,r,l,c,h){var m,g,y,b,w,S=[],x=[],T=n;switch(c){case"HEX":m=u;break;case"B64":m=a;break;default:t("outputFormat must be HEX or B64")}"SHA-384"===l?(y=128,w=384):"SHA-512"===l?(y=128,w=512):t("Chosen SHA variant is not supported"),"HEX"===r?(T=s(e),b=T.binLen,g=T.value):"ASCII"===r||"TEXT"===r?(T=i(e,v),b=T.binLen,g=T.value):"B64"===r?(T=o(e),b=T.binLen,g=T.value):t("inputFormat must be HEX, TEXT, ASCII, or B64"),e=8*y,r=y/4-1,y<b/8?(g=E(g,b,l),g[r]&=4294967040):y>b/8&&(g[r]&=4294967040);for(y=0;y<=r;y+=1)S[y]=g[y]^909522486,x[y]=g[y]^1549556828;return l=E(x.concat(E(S.concat(d),e+p,l)),e+w,l),m(l,f(h))}}})(this);'
var hasher_worker = 'function hashData(e,t){var n=new jsSHA(e,"TEXT"),r=n.getHash("SHA-512","B64").replace("/","-");t(r)}function hashFileentry(e){var t=new FileReader;t.onload=function(){hashData(this.result,function(t){e.hash=t,self.postMessage(["hashed",e])})},t.onerror=function(e){console.log(e)},t.readAsBinaryString(e.file)}jsSHA||importScripts("../lib/sha512.js"),self.onmessage=function(e){var t=e.data[1];switch(e.data[0]){case"hash":hashFileentry(t)}};'

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

  /**
   * Set a {Fileentry} as hashed and store it on the database
   * @param {Fileentry} fileentry {Fileentry} to be added to the database.
   */
  function fileentry_hashed(fileentry)
  {
    for(var index=0, q; q=queue[index]; index++)
      if(fileentry.sharedpoint == q.sharedpoint
      && fileentry.path        == q.path
      && fileentry.name        == q.name)
      {
        // Remove hashed file from the queue
        queue.splice(index);

//        // Dropbox plugin start
//        if(dropboxClient
//        && fileentry.sharedpoint == "Dropbox")
//        {
//          var options = {download: true, downloadHack: true}
//
//          dropboxClient.makeUrl(fileentry.path+'/'+name, options,
//          function(error, publicUrl)
//          {
//            if(publicUrl)
//              fileentry.dropbox = publicUrl.url
//
//            addFile(fileentry)
//          })
//        }
//        else
//        // Dropbox plugin end

        addFile(fileentry);

        return
      }
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

      addFile(fileentry);

      return
    }

    // Ignore files that are already on the queue
    for(var j = 0, q; q = queue[j]; j++)
      if(fileentry.sharedpoint == q.sharedpoint
      && fileentry.path        == q.path
      && fileentry.name        == q.name)
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
}