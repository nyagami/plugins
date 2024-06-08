var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(a,i){function o(t){try{c(r.next(t))}catch(t){i(t)}}function s(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,s)}c((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:0};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(t){s=[6,t],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:1}}([s,c])}}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("cheerio"),r=require("@libs/fetch"),a=require("@libs/novelStatus"),i=function(){function i(){this.id="truyenfull",this.name="Truyện Full",this.icon="src/vi/truyenfull/icon.png",this.site="https://truyenfull.vn",this.version="1.0.0"}return i.prototype.parseNovels=function(t){var e=this,n=[];return t(".list-truyen .row").each((function(r,a){var i=t(a).find("h3.truyen-title > a").text(),o=t(a).find("div[data-classname='cover']").attr("data-image"),s=t(a).find("h3.truyen-title > a").attr("href");s&&n.push({name:i,cover:o,path:s.replace(e.site,"")})})),n},i.prototype.parseChapters=function(t){var e=this;return t("ul.list-chapter > li > a").toArray().map((function(n){var r,a=n.attribs.href.replace(e.site,"");return{name:t(n).text().trim(),path:a,chapterNumber:Number(null===(r=a.match(/\/chuong-(\d+)\//))||void 0===r?void 0:r[1])}}))},i.prototype.popularNovels=function(r,a){return t(this,void 0,void 0,(function(){var t,a,i;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"/danh-sach/truyen-hot/trang-").concat(r,"/"),[4,fetch(t)];case 1:return[4,e.sent().text()];case 2:return a=e.sent(),i=(0,n.load)(a),[2,this.parseNovels(i)]}}))}))},i.prototype.parseNovel=function(r){return t(this,void 0,void 0,(function(){var t,i,o,s,c;return e(this,(function(e){switch(e.label){case 0:return t=this.site+r,[4,fetch(t)];case 1:return[4,e.sent().text()];case 2:return i=e.sent(),o=(0,n.load)(i),s=1,o("ul.pagination.pagination-sm > li > a").each((function(){var t,e=Number(null===(t=this.attribs.href.match(/\/trang-(\d+)\//))||void 0===t?void 0:t[1]);e&&e>s&&(s=e)})),(c={path:r,name:o("div.book > img").attr("alt")||"Không có tiêu đề",chapters:[],totalPages:s}).cover=o("div.book > img").attr("src"),c.summary=o("div.desc-text").text().trim(),c.author=o('h3:contains("Tác giả:")').parent().contents().text().replace("Tác giả:",""),c.genres=o('h3:contains("Thể loại")').siblings().map((function(t,e){return o(e).text()})).toArray().join(","),c.status=o('h3:contains("Trạng thái")').next().text(),"Full"===c.status?c.status=a.NovelStatus.Completed:"Đang ra"===c.status?c.status=a.NovelStatus.Ongoing:c.status=a.NovelStatus.Unknown,c.chapters=this.parseChapters(o),[2,c]}}))}))},i.prototype.parsePage=function(r,a){return t(this,void 0,void 0,(function(){var t,i,o;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site).concat(r,"trang-").concat(a,"/#list-chapter"),[4,fetch(t)];case 1:return[4,e.sent().text()];case 2:return i=e.sent(),o=(0,n.load)(i),[2,{chapters:this.parseChapters(o)}]}}))}))},i.prototype.parseChapter=function(r){return t(this,void 0,void 0,(function(){var t,a;return e(this,(function(e){switch(e.label){case 0:return[4,fetch(this.site+r)];case 1:return[4,e.sent().text()];case 2:return t=e.sent(),a=(0,n.load)(t),[2,(a(".chapter-title").html()||"")+(a("#chapter-c").html()||"")]}}))}))},i.prototype.searchNovels=function(r,a){return t(this,void 0,void 0,(function(){var t,i,o;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"/tim-kiem?tukhoa=").concat(r,"&page=").concat(a),[4,fetch(t)];case 1:return[4,e.sent().text()];case 2:return i=e.sent(),o=(0,n.load)(i),[2,this.parseNovels(o)]}}))}))},i.prototype.fetchImage=function(n){return t(this,void 0,void 0,(function(){return e(this,(function(t){return[2,(0,r.fetchFile)(n)]}))}))},i}();exports.default=new i;