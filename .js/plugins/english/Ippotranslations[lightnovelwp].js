var e=this&&this.__awaiter||function(e,t,a,s){return new(a||(a=Promise))((function(r,i){function o(e){try{n(s.next(e))}catch(e){i(e)}}function l(e){try{n(s.throw(e))}catch(e){i(e)}}function n(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(o,l)}n((s=s.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,s,r,i,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(n){return function(l){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(o=0)),o;)try{if(a=1,s&&(r=2&l[0]?s.return:l[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,l[1])).done)return r;switch(s=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return o.label++,{value:l[1],done:0};case 5:o.label++,s=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){o.label=l[1];break}if(6===l[0]&&o.label<r[1]){o.label=r[1],r=l;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(l);break}r[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],s=0}finally{a=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:1}}([l,n])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),s=require("htmlparser2"),r=require("@libs/fetch"),i=require("@libs/novelStatus"),o=require("@libs/defaultCover");function l(e,t){var a=e.match(/(\d+)$/);a&&a[0]&&(t.chapterNumber=parseInt(a[0]))}var n=new(function(){function n(e){var t,a;this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var s=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.1.".concat(1+s),this.options=null!==(a=e.options)&&void 0!==a?a:{},this.filters=e.filters}return n.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},n.prototype.safeFecth=function(a,s){var i,o;return e(this,void 0,void 0,(function(){var e,l,n;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=s)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return[4,e.text()];case 2:if(l=t.sent(),n=null===(o=null===(i=l.match(/<title>(.*?)<\/title>/))||void 0===i?void 0:i[1])||void 0===o?void 0:o.trim(),this.getHostname(a)!=this.getHostname(e.url)||n&&("Bot Verification"==n||"You are being redirected..."==n||"Un instant..."==n||"Just a moment..."==n||"Redirecting..."==n))throw new Error("Captcha error, please open in webview");return[2,l]}}))}))},n.prototype.parseNovels=function(e){var t=this,a=[];return(e.match(/<article([\s\S]*?)<\/article>/g)||[]).forEach((function(e){var s,r,i=null===(s=e.match(/<a.*title="(.*?)"/))||void 0===s?void 0:s[1],l=null===(r=e.match(/<a href="(.*?)"/))||void 0===r?void 0:r[1];if(i&&l){var n=e.match(/<img.*src="(.*?)"(?:\sdata-src="(.*?)")?.*\/>/)||[];a.push({name:i,cover:n[2]||n[1]||o.defaultCover,path:l.replace(t.site,"")})}})),a},n.prototype.popularNovels=function(a,s){var r,i,o=s.filters,l=s.showLatestNovels;return e(this,void 0,void 0,(function(){var e,s,n,c,u,v,p;return t(this,(function(t){switch(t.label){case 0:for(n in e=null!==(i=null===(r=this.options)||void 0===r?void 0:r.seriesPath)&&void 0!==i?i:"series/",s=this.site+e+"?page="+a,o||(o=this.filters||{}),l&&(s+="&order=latest"),o)if("object"==typeof o[n].value)for(c=0,u=o[n].value;c<u.length;c++)v=u[c],s+="&".concat(n,"=").concat(v);else o[n].value&&(s+="&".concat(n,"=").concat(o[n].value));return[4,this.safeFecth(s,0)];case 1:return p=t.sent(),[2,this.parseNovels(p)]}}))}))},n.prototype.parseNovel=function(a){var r;return e(this,void 0,void 0,(function(){var e,n,c,u,v,p,h,d,f,m,b,g,y,w,k,N,S,C;return t(this,(function(t){switch(t.label){case 0:return e=this.site,[4,this.safeFecth(e+a,0)];case 1:return n=t.sent(),c={path:a,name:"",genres:"",summary:"",author:"",artist:"",status:"",chapters:[]},u=0,v=0,p=0,h=0,d=0,f=0,m=0,b=0,g=0,y=0,w=0,k=0,N=[],S={},C=new s.Parser({onopentag:function(t,a){var s;!c.cover&&(null===(s=a.class)||void 0===s?void 0:s.includes("ts-post-image"))?(c.name=a.title,c.cover=a["data-src"]||a.src||o.defaultCover):"genxed"===a.class||"sertogenre"===a.class?u=1:u&&"a"===t?v=1:"div"!==t||"entry-content"!==a.class&&"description"!==a.itemprop?"spe"===a.class||"serl"===a.class?h=1:h&&"span"===t?d=1:"div"===t&&"sertostat"===a.class?(h=1,d=1,b=1):"eplister eplisterfull"===a.class?g=1:g&&"li"===t?y=1:y&&("a"===t?S.path=a.href.replace(e,"").trim():"epl-num"===a.class?w=1:"epl-title"===a.class?w=2:"epl-date"===a.class?w=3:"epl-price"===a.class&&(w=4)):p=1},ontext:function(e){var t,a;if(u)v&&(c.genres+=e+", ");else if(p)c.summary+=e.trim();else if(h){if(d){var s=e.toLowerCase().replace(":","").trim();if(f)c.author+=e||"Unknown";else if(m)c.artist+=e||"Unknown";else if(b)switch(s){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":c.status=i.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":c.status=i.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":c.status=i.NovelStatus.OnHiatus;break;default:c.status=i.NovelStatus.Unknown}switch(s){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":f=1;break;case"الحالة":case"status":case"statut":case"estado":case"durum":b=1;break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":m=1}}}else if(g&&y)if(1===w)l(e,S);else if(2===w)S.name=(null===(a=null===(t=e.match(RegExp("^".concat(c.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"\\s*(.+)"))))||void 0===t?void 0:t[1])||void 0===a?void 0:a.trim())||e.trim(),S.chapterNumber||l(e,S);else if(3===w)S.releaseTime=e;else if(4===w){switch(s=e.toLowerCase().trim()){case"free":case"gratuit":case"مجاني":case"livre":case"":k=0;break;default:k=1}}},onclosetag:function(e){var t,a,s;u?v?v=0:(u=0,c.genres=null===(t=c.genres)||void 0===t?void 0:t.slice(0,-2)):p?"br"===e?c.summary+="\n":"div"===e&&(p=0):h?d?"span"===e&&(d=0,f&&c.author?f=0:m&&c.artist?m=0:b&&""!==c.status&&(b=0)):"div"===e&&(h=0,c.author=null===(a=c.author)||void 0===a?void 0:a.trim(),c.artist=null===(s=c.artist)||void 0===s?void 0:s.trim()):g&&(y?1===w||2===w||3===w||4===w?w=0:"li"===e&&(y=0,S.chapterNumber||(S.chapterNumber=0),k||N.push(S),S={}):"ul"===e&&(g=0))}}),C.write(n),C.end(),N.length&&((null===(r=this.options)||void 0===r?void 0:r.reverseChapters)&&N.reverse(),c.chapters=N),[2,c]}}))}))},n.prototype.parseChapter=function(s){var r,i,o;return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return[4,this.safeFecth(this.site+s,0)];case 1:if(e=t.sent(),null===(r=this.options)||void 0===r?void 0:r.customJs)try{l=(0,a.load)(e),e=l.html()}catch(e){throw console.error("Error executing customJs:",e),e}return[2,(null===(o=null===(i=e.match(/<div.*class="epcontent ([\s\S]*?)<div.*class="bottomnav"/g))||void 0===i?void 0:i[0].match(/<p.*>([\s\S]*?)<\/p>/g))||void 0===o?void 0:o.join("\n"))||""]}}))}))},n.prototype.searchNovels=function(a,s){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+s+"/?s="+a,[4,this.safeFecth(e,1)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},n}())({id:"ippotranslations",sourceSite:"https://ippotranslations.com/",sourceName:"Ippotranslations",options:{lang:"English"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Seinen",value:"seinen"},{label:"Slice of Life",value:"slice-of-life"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[{label:"Dropped",value:"dropped"},{label:"Web Novel",value:"web-novel"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}]}}});exports.default=n;