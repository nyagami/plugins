var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,a){function s(t){try{c(r.next(t))}catch(t){a(t)}}function o(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,i,a,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function o(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,o[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:0};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,c])}}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("@libs/fetch"),r=require("cheerio"),i=function(){function i(){this.id="oasistranslations",this.name="Oasis Translations",this.site="https://oasistranslations.wordpress.com/",this.version="1.0.0",this.icon="src/es/oasistranslations/icon.png"}return i.prototype.popularNovels=function(i,a){return t(this,void 0,void 0,(function(){var t,i,a,s,o=this;return e(this,(function(e){switch(e.label){case 0:return t=this.site,[4,(0,n.fetchApi)(t)];case 1:return[4,e.sent().text()];case 2:return i=e.sent(),a=(0,r.load)(i),s=[],a(".menu-item-1819").find(".sub-menu > li").each((function(t,e){var n=a(e).text();if(!n.match(/Activas|Finalizadas|Dropeadas/)){var r=a(e).find("img").attr("src"),i=a(e).find("a").attr("href");if(!i)return;var c={name:n,cover:r,path:i.replace(o.site,"")};s.push(c)}})),[2,s]}}))}))},i.prototype.parseNovel=function(i){return t(this,void 0,void 0,(function(){var t,a,s,o,c,u=this;return e(this,(function(e){switch(e.label){case 0:return t=this.site+i,[4,(0,n.fetchApi)(t)];case 1:return[4,e.sent().text()];case 2:return a=e.sent(),s=(0,r.load)(a),(o={path:i,name:s("h1.entry-title").text().replace(/[\t\n]/g,"").trim()}).cover=s('img[loading="lazy"]').attr("src"),s(".entry-content > p").each((function(t){var e,n;if(s(this).text().includes("Autor")){var r=null===(n=null===(e=s(this).html())||void 0===e?void 0:e.match(/<\/strong>(.|\n)*?<br>/g))||void 0===n?void 0:n.map((function(t){return t.replace(/<strong>|<\/strong>|<br>|:\s/g,"")}));o.genres="",r&&(o.author=r[2],o.genres=r[4].replace(/\s|&nbsp;/g,""))}})),o.summary="",c=[],s(".entry-content").find("a").each((function(t,e){var n=s(e).attr("href");if(n&&n.includes(u.site)){var r={name:s(e).text(),releaseTime:null,path:n.replace(u.site,"")};c.push(r)}})),o.chapters=c,[2,o]}}))}))},i.prototype.parseChapter=function(i){return t(this,void 0,void 0,(function(){var t,a,s;return e(this,(function(e){switch(e.label){case 0:return t=this.site+i,[4,(0,n.fetchApi)(t)];case 1:return[4,e.sent().text()];case 2:return a=e.sent(),(s=(0,r.load)(a))("div#jp-post-flair").remove(),[2,s(".entry-content").html()||""]}}))}))},i.prototype.searchNovels=function(i,a){return t(this,void 0,void 0,(function(){var t,a,s,o,c=this;return e(this,(function(e){switch(e.label){case 0:return i=i.toLowerCase(),t=this.site,[4,(0,n.fetchApi)(t)];case 1:return[4,e.sent().text()];case 2:return a=e.sent(),s=(0,r.load)(a),o=[],s(".menu-item-1819").find(".sub-menu > li").each((function(t,e){var n=s(e).text();if(!n.match(/Activas|Finalizadas|Dropeadas/)){var r=s(e).find("img").attr("src"),i=s(e).find("a").attr("href");if(!i)return;var a={name:n,cover:r,path:i.replace(c.site,"")};o.push(a)}})),[2,o=o.filter((function(t){return t.name.toLowerCase().includes(i)}))]}}))}))},i.prototype.fetchImage=function(r){return t(this,void 0,void 0,(function(){return e(this,(function(t){return[2,(0,n.fetchFile)(r)]}))}))},i}();exports.default=new i;