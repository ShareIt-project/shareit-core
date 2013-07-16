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
