var t=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(i,o){function s(t){try{c(n.next(t))}catch(t){o(t)}}function a(t){try{c(n.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var r,n,i,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=a(0),s.throw=a(1),s.return=a(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(a){return function(c){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,a[0]&&(o=0)),o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(t){a=[6,t],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("cheerio"),n=require("@libs/fetch"),i=require("@libs/novelStatus"),o=new(function(){function o(t){var e,r=this;this.filters=void 0,this.resolveUrl=function(t,e){return r.site+"/"+t+"/"},this.id=t.id,this.name=t.sourceName,this.icon="multisrc/fictioneer/".concat(t.id.toLowerCase(),"/icon.png"),this.site=t.sourceSite;var n=(null===(e=t.options)||void 0===e?void 0:e.versionIncrements)||0;this.version="1.0.".concat(0+n),this.options=t.options}return o.prototype.popularNovels=function(i,o){return t(this,arguments,void 0,(function(t,i){var o,s,a=this;i.showLatestNovels,i.filters;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+"/"+this.options.browsePage+"/"+(1===t?"":"page/"+t+"/"))];case 1:return[4,e.sent().text()];case 2:return o=e.sent(),[2,(s=(0,r.load)(o))("#featured-list > li > div > div, #list-of-stories > li > div > div").map((function(t,e){return{name:s(e).find("h3 > a").text(),cover:s(e).find("a.cell-img:has(img)").attr("href"),path:s(e).find("h3 > a").attr("href").replace(a.site+"/","").replace(/\/$/,"")}})).toArray()]}}))}))},o.prototype.parseNovel=function(o){return t(this,void 0,void 0,(function(){var t,s,a,c,u=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+"/"+o+"/")];case 1:return[4,e.sent().text()];case 2:return t=e.sent(),s=(0,r.load)(t),(a={path:o,name:s("h1.story__identity-title").text()}).author=s("div.story__identity-meta").text().split("|")[0].replace("Author: ","").replace("by ","").trim(),a.cover=s("figure.story__thumbnail > a").attr("href"),a.genres=s("div.tag-group > a, section.tag-group > a").map((function(t,e){return s(e).text()})).toArray().join(","),a.summary=s("section.story__summary").text(),a.chapters=s("li.chapter-group__list-item._publish").filter((function(t,e){return!e.attribs.class.includes("_password")})).filter((function(t,e){return!s(e).find("i").first().attr("class").includes("fa-lock")})).map((function(t,e){var r;return{name:s(e).find("a").text(),path:null===(r=s(e).find("a").attr("href"))||void 0===r?void 0:r.replace(u.site+"/","").replace(/\/$/,"")}})).toArray(),"Ongoing"===(c=s("span.story__status").text().trim())&&(a.status=i.NovelStatus.Ongoing),"Completed"===c&&(a.status=i.NovelStatus.Completed),"Cancelled"===c&&(a.status=i.NovelStatus.Cancelled),"Hiatus"===c&&(a.status=i.NovelStatus.OnHiatus),[2,a]}}))}))},o.prototype.parseChapter=function(i){return t(this,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+"/"+i+"/")];case 1:return[4,e.sent().text()];case 2:return t=e.sent(),[2,(0,r.load)(t)("section#chapter-content > div").html()||""]}}))}))},o.prototype.searchNovels=function(i,o){return t(this,void 0,void 0,(function(){var t,s,a=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+"/".concat(1===o?"":"page/"+o+"/","?s=").concat(encodeURIComponent(i),"&post_type=fcn_story"))];case 1:return[4,e.sent().text()];case 2:return t=e.sent(),[2,(s=(0,r.load)(t))("#search-result-list > li > div > div").map((function(t,e){return{name:s(e).find("h3 > a").text(),cover:s(e).find("a.cell-img:has(img)").attr("href"),path:s(e).find("h3 > a").attr("href").replace(a.site+"/","").replace(/\/$/,"")}})).toArray()]}}))}))},o}())({id:"daoistquest",sourceSite:"https://daoist.quest",sourceName:"Daoist Quest",options:{browsePage:"collection/novels",versionIncrements:1}});exports.default=o;