var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{o(l.next(e))}catch(e){r(e)}}function u(e){try{o(l.throw(e))}catch(e){r(e)}}function o(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,u)}o((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=u(0),i.throw=u(1),i.return=u(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(u){return function(o){return function(u){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,u[0]&&(r=0)),r;)try{if(a=1,l&&(n=2&u[0]?l.return:u[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,u[1])).done)return n;switch(l=0,n&&(u=[2&u[0],n.value]),u[0]){case 0:case 1:n=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,l=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(!(n=r.trys,(n=n.length>0&&n[n.length-1])||6!==u[0]&&2!==u[0])){r=0;continue}if(3===u[0]&&(!n||u[1]>n[0]&&u[1]<n[3])){r.label=u[1];break}if(6===u[0]&&r.label<n[1]){r.label=n[1],n=u;break}if(n&&r.label<n[2]){r.label=n[2],r.ops.push(u);break}n[2]&&r.ops.pop(),r.trys.pop();continue}u=t.call(e,r)}catch(e){u=[6,e],l=0}finally{a=n=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,o])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var l=require("@libs/fetch"),n=require("cheerio"),r=require("@libs/defaultCover"),i=require("@libs/novelStatus"),u=a(require("dayjs")),o=require("@libs/storage"),s=function(e,t){return new RegExp(t.join("|")).test(e)},c=new(function(){function a(e){var t,a;this.hideLocked=o.storage.get("hideLocked"),this.parseData=function(e){var t,a=(0,u.default)(),l=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(l,10);if(!l)return e;if(s(e,["detik","segundo","second","วินาที"]))a=a.subtract(n,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a=a.subtract(n,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a=a.subtract(n,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a=a.subtract(n,"days");else if(s(e,["week","semana"]))a=a.subtract(n,"week");else if(s(e,["month","mes"]))a=a.subtract(n,"month");else{if(!s(e,["year","año"]))return"Invalid Date"!==(0,u.default)(e).format("LL")?(0,u.default)(e).format("LL"):e;a=a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var l=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(7+l),this.options=e.options,this.filters=e.filters,(null===(a=this.options)||void 0===a?void 0:a.hasLocked)&&(this.pluginSettings={hideLocked:{value:"",label:"Hide locked chapters",type:"Switch"}})}return a.prototype.translateDragontea=function(e){var t;if("dragontea"!==this.id)return e;var a=(0,n.load)((null===(t=e.html())||void 0===t?void 0:t.replace("\n","").replace(/<br\s*\/?>/g,"\n"))||"");return e.html(a.html()),e.find("*").addBack().contents().filter((function(e,t){return 3===t.nodeType})).each((function(e,t){var l=a(t),n=l.text().normalize("NFD").split("").map((function(e){var t=e.normalize("NFC"),a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(t);return a>=0?"zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA"[a]+e.slice(t.length):e})).join("");l.replaceWith(n.replace("\n","<br>"))})),e},a.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},a.prototype.getCheerio=function(a,r){return e(this,void 0,void 0,(function(){var e,i,u,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=r)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return u=n.load,[4,e.text()];case 2:if(i=u.apply(void 0,[t.sent()]),o=i("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},a.prototype.parseNovels=function(e){var t=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(a,l){var n=e(l).find(".post-title").text().trim(),i=e(l).find(".post-title").find("a").attr("href")||"";if(n&&i){var u=e(l).find("img"),o={name:n,cover:u.attr("data-src")||u.attr("src")||u.attr("data-lazy-srcset")||r.defaultCover,path:i.replace(/https?:\/\/.*?\//,"/")};t.push(o)}})),t},a.prototype.popularNovels=function(a,l){return e(this,arguments,void 0,(function(e,a){var l,n,r,i,u,o,s=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(n in l=this.site+"/page/"+e+"/?s=&post_type=wp-manga",s||(s=this.filters||{}),c&&(l+="&m_orderby=latest"),s)if("object"==typeof s[n].value)for(r=0,i=s[n].value;r<i.length;r++)u=i[r],l+="&".concat(n,"=").concat(u);else s[n].value&&(l+="&".concat(n,"=").concat(s[n].value));return[4,this.getCheerio(l,1!=e)];case 1:return o=t.sent(),[2,this.parseNovels(o)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,o,s,c,v,b,h,p,d=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,!1)];case 1:return(e=t.sent())(".manga-title-badges, #manga-title span").remove(),(o={path:a,name:e(".post-title h1").text().trim()||e("#manga-title h1").text().trim()}).cover=e(".summary_image > a > img").attr("data-lazy-src")||e(".summary_image > a > img").attr("data-src")||e(".summary_image > a > img").attr("src")||r.defaultCover,e(".post-content_item, .post-content").each((function(){var t=e(this).find("h5").text().trim(),a=e(this).find(".summary-content");switch(t){case"Genre(s)":case"Genre":case"Tags(s)":case"Tag(s)":case"Tags":case"Género(s)":case"التصنيفات":o.genres?o.genres+=", "+a.find("a").map((function(t,a){return e(a).text()})).get().join(", "):o.genres=a.find("a").map((function(t,a){return e(a).text()})).get().join(", ");break;case"Author(s)":case"Author":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":o.author=a.text().trim();break;case"Status":case"Novel":case"Estado":o.status=a.text().trim().includes("OnGoing")||a.text().trim().includes("مستمرة")?i.NovelStatus.Ongoing:i.NovelStatus.Completed;break;case"Artist(s)":o.artist=a.text().trim()}})),o.author||(o.author=e(".manga-authors").text().trim()),e("div.summary__content .code-block,script,noscript").remove(),o.summary=this.translateDragontea(e("div.summary__content")).text().trim()||e("#tab-manga-about").text().trim()||e('.post-content_item h5:contains("Summary")').next().find("span").map((function(t,a){return e(a).text()})).get().join("\n\n").trim()||e(".manga-summary p").map((function(t,a){return e(a).text()})).get().join("\n\n").trim()||e(".manga-excerpt p").map((function(t,a){return e(a).text()})).get().join("\n\n").trim(),s=[],c="",(null===(p=this.options)||void 0===p?void 0:p.useNewChapterEndpoint)?[4,(0,l.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST",referrer:this.site+a}).then((function(e){return e.text()}))]:[3,3];case 2:return c=t.sent(),[3,5];case 3:return v=e(".rating-post-id").attr("value")||e("#manga-chapters-holder").attr("data-id")||"",(b=new FormData).append("action","manga_get_chapters"),b.append("manga",v),[4,(0,l.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:b}).then((function(e){return e.text()}))];case 4:c=t.sent(),t.label=5;case 5:return"0"!==c&&(e=(0,n.load)(c)),h=e(".wp-manga-chapter").length,e(".wp-manga-chapter").each((function(t,a){var l=e(a).find("a").text().trim(),n=a.attribs.class.includes("premium-block");n&&(l="🔒 "+l);var r=e(a).find("span.chapter-release-date").text().trim();r=r?d.parseData(r):(0,u.default)().format("LL");var i=e(a).find("a").attr("href")||"";!i||"#"==i||n&&d.hideLocked||s.push({name:l,path:i.replace(/https?:\/\/.*?\//,"/"),releaseTime:r||null,chapterNumber:h-t})})),o.chapters=s.reverse(),[2,o]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,l,n;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,!1)];case 1:return e=t.sent(),l=e(".text-left")||e(".text-right")||e(".entry-content")||e(".c-blog-post > div > div:nth-child(2)"),null===(n=this.options)||void 0===n||n.customJs,[2,this.translateDragontea(l).html()||""]}}))}))},a.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"/page/"+l+"/?s="+encodeURIComponent(a)+"&post_type=wp-manga",[4,this.getCheerio(e,!0)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},a}())({id:"olaoe",sourceSite:"https://olaoe.cyou/",sourceName:"Olaoe.cyou",options:{useNewChapterEndpoint:!0,lang:"Arabic"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"+13",value:"13"},{label:"+16",value:"16"},{label:"+17",value:"17"},{label:"أكشن",value:"أكشن"},{label:"إنتقام",value:"إنتقام"},{label:"إيتشي",value:"إيتشي"},{label:"اثارة",value:"اثارة"},{label:"اثاره",value:"اثاره"},{label:"اشباح",value:"اشباح"},{label:"اقتباس مانهوا",value:"اقتباس-مانهوا"},{label:"اقتباس مانهوا",value:"اقتباس-مانهوا-انمي"},{label:"اكشن",value:"اكشن"},{label:"الحياة المدرسيه",value:"الحياة-المدرسيه"},{label:"الحياة اليومية",value:"الحياة-اليومية"},{label:"العاب فيديو",value:"العاب-فيديو"},{label:"النجاة",value:"النجاة"},{label:"امرأة شريرة",value:"امرأة-شريرة"},{label:"انتقام",value:"انتقام"},{label:"انمي",value:"انمي"},{label:"انمي ياباني",value:"انمي-ياباني"},{label:"ايسكاى",value:"ايسكاى"},{label:"بالغ",value:"بالغ"},{label:"بطل خارق",value:"بطل-خارق"},{label:"تاريخى",value:"تاريخى"},{label:"تاريخي",value:"تاريخي"},{label:"تجسيد",value:"تجسيد"},{label:"تراجيدي",value:"تراجيدي"},{label:"ترجمة جوجل",value:"ترجمة-جوجل"},{label:"جريمة",value:"جريمة"},{label:"جريمه",value:"جريمه"},{label:"جندر اسواب",value:"جندر-اسواب"},{label:"جوسى",value:"جوسى"},{label:"جوسيه",value:"جوسيه"},{label:"حائز على جائزة",value:"حائز-على-جائزة"},{label:"حائز علي جائزة",value:"حائز-علي-جائزة"},{label:"حديث",value:"حديث"},{label:"حربى",value:"حربى"},{label:"حربي",value:"حربي"},{label:"حريم",value:"حريم"},{label:"حياة",value:"حياة"},{label:"حياة مدرسية",value:"حياة-مدرسية"},{label:"حياة يومية",value:"حياة-يومية"},{label:"خارق لطبيعية",value:"خارق-لطبيعية"},{label:"خارق للطبيعة",value:"خارق-للطبيعة"},{label:"خارق للطبيعه",value:"خارق-للطبيعه"},{label:"خيال",value:"خيال"},{label:"خيال علمى",value:"خيال-علمى"},{label:"خيال علمي",value:"خيال-علمي"},{label:"دراما",value:"دراما"},{label:"دموى",value:"دموى"},{label:"راشد",value:"راشد"},{label:"رعب",value:"رعب"},{label:"رومانسى",value:"رومانسى"},{label:"رومانسي",value:"رومانسي"},{label:"رياضة",value:"رياضة"},{label:"رياضه",value:"رياضه"},{label:"زمكانى",value:"زمكانى"},{label:"زمكاني",value:"زمكاني"},{label:"زمنكاني",value:"زمنكاني"},{label:"زومبي",value:"زومبي"},{label:"ساموراي",value:"ساموراي"},{label:"سحر",value:"سحر"},{label:"سينين",value:"سينين"},{label:"شريحة من الحياة",value:"شريحة-من-الحياة"},{label:"شوجو",value:"شوجو"},{label:"شونين",value:"شونين"},{label:"شياطين",value:"شياطين"},{label:"طبخ",value:"طبخ"},{label:"ّعامل مكتبي",value:"ّعامل-مكتبي"},{label:"عسكري",value:"عسكري"},{label:"علم نفس",value:"علم-نفس"},{label:"عنف",value:"عنف"},{label:"غموض",value:"غموض"},{label:"فنتازيا",value:"فنتازيا"},{label:"فنون قتال",value:"فنون-قتال"},{label:"فنون قتاليه",value:"فنون-قتاليه"},{label:"قوة خارقة",value:"قوة-خارقة"},{label:"قوى خارقة",value:"قوى-خارقة"},{label:"كوميدى",value:"كوميدى"},{label:"كوميديا",value:"كوميديا"},{label:"لعبه",value:"لعبه"},{label:"مأساة",value:"مأساة"},{label:"ماساة",value:"ماساة"},{label:"مافيا",value:"مافيا"},{label:"مانجا",value:"مانجا"},{label:"مانجا على الانترنت",value:"مانجا-على-الانترنت"},{label:"مانها",value:"مانها"},{label:"مانهوا",value:"مانهوا"},{label:"مجموعة قصص",value:"مجموعة-قصص"},{label:"محاكاة ساخرة",value:"محاكاة-ساخرة"},{label:"مدرسي",value:"مدرسي"},{label:"مصاصى الدماء",value:"مصاصى-الدماء"},{label:"مغامرات",value:"مغامرات"},{label:"مغامرة",value:"مغامرة"},{label:"مقتبسة",value:"مقتبسة"},{label:"نظام",value:"نظام"},{label:"نفسى",value:"نفسى"},{label:"نفسي",value:"نفسي"},{label:"نينجا",value:"نينجا"},{label:"وحوش",value:"وحوش"},{label:"ويب تون",value:"ويب-تون"}]},op:{type:"Switch",label:"having all selected genres",value:!1},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"مستمر",value:"on-going"},{label:"مكتمل",value:"end"},{label:"ملغى",value:"canceled"},{label:"في الانتظار",value:"on-hold"},{label:"قادم قريبا",value:"upcoming"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=c;