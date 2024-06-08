var e=this&&this.__awaiter||function(e,a,t,l){return new(t||(t=Promise))((function(s,r){function i(e){try{n(l.next(e))}catch(e){r(e)}}function o(e){try{n(l.throw(e))}catch(e){r(e)}}function n(e){var a;e.done?s(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(i,o)}n((l=l.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var t,l,s,r,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(n){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(t=1,l&&(s=2&o[0]?l.return:o[0]?l.throw||((s=l.return)&&s.call(l),0):l.next)&&!(s=s.call(l,o[1])).done)return s;switch(l=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=a.call(e,i)}catch(e){o=[6,e],l=0}finally{t=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,n])}}};Object.defineProperty(exports,"__esModule",{value:1});var t=require("cheerio"),l=require("htmlparser2"),s=require("@libs/fetch"),r=require("@libs/novelStatus"),i=require("@libs/defaultCover");function o(e,a){var t=e.match(/(\d+)$/);t&&t[0]&&(a.chapterNumber=parseInt(t[0]))}var n=new(function(){function n(e){var a,t;this.fetchImage=s.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var l=(null===(a=e.options)||void 0===a?void 0:a.versionIncrements)||0;this.version="1.1.".concat(1+l),this.options=null!==(t=e.options)&&void 0!==t?t:{},this.filters=e.filters}return n.prototype.getHostname=function(e){var a=(e=e.split("/")[2]).split(".");return a.pop(),a.join(".")},n.prototype.safeFecth=function(t,l){var r,i;return e(this,void 0,void 0,(function(){var e,o,n;return a(this,(function(a){switch(a.label){case 0:return[4,(0,s.fetchApi)(t)];case 1:if(!(e=a.sent()).ok&&1!=l)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return[4,e.text()];case 2:if(o=a.sent(),n=null===(i=null===(r=o.match(/<title>(.*?)<\/title>/))||void 0===r?void 0:r[1])||void 0===i?void 0:i.trim(),this.getHostname(t)!=this.getHostname(e.url)||n&&("Bot Verification"==n||"You are being redirected..."==n||"Un instant..."==n||"Just a moment..."==n||"Redirecting..."==n))throw new Error("Captcha error, please open in webview");return[2,o]}}))}))},n.prototype.parseNovels=function(e){var a=this,t=[];return(e.match(/<article([\s\S]*?)<\/article>/g)||[]).forEach((function(e){var l,s,r=null===(l=e.match(/<a.*title="(.*?)"/))||void 0===l?void 0:l[1],o=null===(s=e.match(/<a href="(.*?)"/))||void 0===s?void 0:s[1];if(r&&o){var n=e.match(/<img.*src="(.*?)"(?:\sdata-src="(.*?)")?.*\/>/)||[];t.push({name:r,cover:n[2]||n[1]||i.defaultCover,path:o.replace(a.site,"")})}})),t},n.prototype.popularNovels=function(t,l){var s,r,i=l.filters,o=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,n,u,c,v,h;return a(this,(function(a){switch(a.label){case 0:for(n in e=null!==(r=null===(s=this.options)||void 0===s?void 0:s.seriesPath)&&void 0!==r?r:"series/",l=this.site+e+"?page="+t,i||(i=this.filters||{}),o&&(l+="&order=latest"),i)if("object"==typeof i[n].value)for(u=0,c=i[n].value;u<c.length;u++)v=c[u],l+="&".concat(n,"=").concat(v);else i[n].value&&(l+="&".concat(n,"=").concat(i[n].value));return[4,this.safeFecth(l,0)];case 1:return h=a.sent(),[2,this.parseNovels(h)]}}))}))},n.prototype.parseNovel=function(t){var s;return e(this,void 0,void 0,(function(){var e,n,u,c,v,h,p,d,f,b,m,y,g,k,w,S,x,N;return a(this,(function(a){switch(a.label){case 0:return e=this.site,[4,this.safeFecth(e+t,0)];case 1:return n=a.sent(),u={path:t,name:"",genres:"",summary:"",author:"",artist:"",status:"",chapters:[]},c=0,v=0,h=0,p=0,d=0,f=0,b=0,m=0,y=0,g=0,k=0,w=0,S=[],x={},N=new l.Parser({onopentag:function(a,t){var l;!u.cover&&(null===(l=t.class)||void 0===l?void 0:l.includes("ts-post-image"))?(u.name=t.title,u.cover=t["data-src"]||t.src||i.defaultCover):"genxed"===t.class||"sertogenre"===t.class?c=1:c&&"a"===a?v=1:"div"!==a||"entry-content"!==t.class&&"description"!==t.itemprop?"spe"===t.class||"serl"===t.class?p=1:p&&"span"===a?d=1:"div"===a&&"sertostat"===t.class?(p=1,d=1,m=1):"eplister eplisterfull"===t.class?y=1:y&&"li"===a?g=1:g&&("a"===a?x.path=t.href.replace(e,"").trim():"epl-num"===t.class?k=1:"epl-title"===t.class?k=2:"epl-date"===t.class?k=3:"epl-price"===t.class&&(k=4)):h=1},ontext:function(e){var a,t;if(c)v&&(u.genres+=e+", ");else if(h)u.summary+=e.trim();else if(p){if(d){var l=e.toLowerCase().replace(":","").trim();if(f)u.author+=e||"Unknown";else if(b)u.artist+=e||"Unknown";else if(m)switch(l){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":u.status=r.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":u.status=r.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":u.status=r.NovelStatus.OnHiatus;break;default:u.status=r.NovelStatus.Unknown}switch(l){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":f=1;break;case"الحالة":case"status":case"statut":case"estado":case"durum":m=1;break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":b=1}}}else if(y&&g)if(1===k)o(e,x);else if(2===k)x.name=(null===(t=null===(a=e.match(RegExp("^".concat(u.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"\\s*(.+)"))))||void 0===a?void 0:a[1])||void 0===t?void 0:t.trim())||e.trim(),x.chapterNumber||o(e,x);else if(3===k)x.releaseTime=e;else if(4===k){switch(l=e.toLowerCase().trim()){case"free":case"gratuit":case"مجاني":case"livre":case"":w=0;break;default:w=1}}},onclosetag:function(e){var a,t,l;c?v?v=0:(c=0,u.genres=null===(a=u.genres)||void 0===a?void 0:a.slice(0,-2)):h?"br"===e?u.summary+="\n":"div"===e&&(h=0):p?d?"span"===e&&(d=0,f&&u.author?f=0:b&&u.artist?b=0:m&&""!==u.status&&(m=0)):"div"===e&&(p=0,u.author=null===(t=u.author)||void 0===t?void 0:t.trim(),u.artist=null===(l=u.artist)||void 0===l?void 0:l.trim()):y&&(g?1===k||2===k||3===k||4===k?k=0:"li"===e&&(g=0,x.chapterNumber||(x.chapterNumber=0),w||S.push(x),x={}):"ul"===e&&(y=0))}}),N.write(n),N.end(),S.length&&((null===(s=this.options)||void 0===s?void 0:s.reverseChapters)&&S.reverse(),u.chapters=S),[2,u]}}))}))},n.prototype.parseChapter=function(l){var s,r,i;return e(this,void 0,void 0,(function(){var e,o;return a(this,(function(a){switch(a.label){case 0:return[4,this.safeFecth(this.site+l,0)];case 1:if(e=a.sent(),null===(s=this.options)||void 0===s?void 0:s.customJs)try{o=(0,t.load)(e),e=o.html()}catch(e){throw console.error("Error executing customJs:",e),e}return[2,(null===(i=null===(r=e.match(/<div.*class="epcontent ([\s\S]*?)<div.*class="bottomnav"/g))||void 0===r?void 0:r[0].match(/<p.*>([\s\S]*?)<\/p>/g))||void 0===i?void 0:i.join("\n"))||""]}}))}))},n.prototype.searchNovels=function(t,l){return e(this,void 0,void 0,(function(){var e,s;return a(this,(function(a){switch(a.label){case 0:return e=this.site+"page/"+l+"/?s="+t,[4,this.safeFecth(e,1)];case 1:return s=a.sent(),[2,this.parseNovels(s)]}}))}))},n}())({id:"noveltr",sourceSite:"https://noveltr.com/",sourceName:"NovelTR",options:{lang:"Turkish"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Aksiyon",value:"aksiyon"},{label:"Bilim Kurgu",value:"bilim-kurgu"},{label:"Büyü",value:"buyu"},{label:"Comedy",value:"comedy"},{label:"Doğaüstü",value:"dogaustu"},{label:"dövüş sanatları",value:"dovus-sanatlari"},{label:"Dram",value:"dram"},{label:"Drama",value:"drama"},{label:"ecchi",value:"ecchi"},{label:"fantastik",value:"fantastik"},{label:"Fantasy",value:"fantasy"},{label:"gizem",value:"gizem"},{label:"Harem",value:"harem"},{label:"isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Komedi",value:"komedi"},{label:"korku",value:"korku"},{label:"macera",value:"macera"},{label:"Mecha",value:"mecha"},{label:"okul",value:"okul"},{label:"oyun",value:"oyun"},{label:"psikoloji",value:"psikoloji"},{label:"Psychological",value:"psychological"},{label:"reenkarnasyon",value:"reenkarnasyon"},{label:"Romance",value:"romance"},{label:"Romantik",value:"romantik"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"süper kahraman",value:"super-kahraman"},{label:"Supernatural",value:"supernatural"},{label:"tarih",value:"tarih"},{label:"trajedi",value:"trajedi"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"yetişkin",value:"yetiskin"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Tür",value:[],options:[{label:"Web Novel",value:"web-novel"}]},status:{type:"Picker",label:"Durum",value:"",options:[{label:"Hepsi",value:""},{label:"Devam Ediyor",value:"ongoing"},{label:"Askıda",value:"hiatus"},{label:"Tamamlanmış",value:"completed"}]},order:{type:"Picker",label:"Sıralama",value:"",options:[{label:"Varsayılan",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"}]}}});exports.default=n;