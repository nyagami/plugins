var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(e){o(e)}}function l(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,r,a,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=l(0),i.throw=l(1),i.return=l(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(s){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&l[0]?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[2&l[0],a.value]),l[0]){case 0:case 1:a=l;break;case 4:return o.label++,{value:l[1],done:!1};case 5:o.label++,r=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!a||l[1]>a[0]&&l[1]<a[3])){o.label=l[1];break}if(6===l[0]&&o.label<a[1]){o.label=a[1],a=l;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(l);break}a[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],r=0}finally{n=a=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,s])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("@libs/fetch"),r=require("@libs/filterInputs"),a=function(){function a(){this.id="genesistudio",this.name="Genesis",this.icon="src/en/genesis/icon.png",this.customCSS="src/en/genesis/customCSS.css",this.site="https://genesistudio.com",this.version="1.1.2",this.imageRequestInit={headers:{referrer:this.site}},this.filters={sort:{label:"Sort Results By",value:"Popular",options:[{label:"Popular",value:"Popular"},{label:"Recent",value:"Recent"},{label:"Views",value:"Views"}],type:r.FilterTypes.Picker},storyStatus:{label:"Status",value:"All",options:[{label:"All",value:"All"},{label:"Ongoing",value:"Ongoing"},{label:"Completed",value:"Completed"}],type:r.FilterTypes.Picker},genres:{label:"Genres",value:[],options:[{label:"Action",value:"Action"},{label:"Comedy",value:"Comedy"},{label:"Drama",value:"Drama"},{label:"Fantasy",value:"Fantasy"},{label:"Harem",value:"Harem"},{label:"Martial Arts",value:"Martial Arts"},{label:"Modern",value:"Modern"},{label:"Mystery",value:"Mystery"},{label:"Psychological",value:"Psychological"},{label:"Romance",value:"Romance"},{label:"Slice of life",value:"Slice of Life"},{label:"Tragedy",value:"Tragedy"}],type:r.FilterTypes.CheckboxGroup}}}return a.prototype.parseNovels=function(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,n.map((function(e){return{name:e.novel_title,path:"/novels/".concat(e.abbreviation),cover:e.cover}}))]}))}))},a.prototype.popularNovels=function(r,a){return e(this,arguments,void 0,(function(e,r){var a,o,i=r.showLatestNovels,l=r.filters;return t(this,(function(t){switch(t.label){case 0:return 1!==e?[2,[]]:(a="".concat(this.site,"/api/novels/search?"),i?a+="serialization=All&sort=Recent":((null==l?void 0:l.genres.value.length)&&(a+="genres="+l.genres.value.join("&genres=")+"&"),(null==l?void 0:l.storyStatus.value)&&(a+="serialization="+"".concat(l.storyStatus.value)+"&"),(null==l?void 0:l.sort.value)&&(a+="sort="+"".concat(l.sort.value))),[4,(0,n.fetchApi)(a).then((function(e){return e.json()}))]);case 1:return o=t.sent(),[2,this.parseNovels(o)]}}))}))},a.prototype.extractData=function(e){return e.filter((function(e){return"data"===e.type})).map((function(e){return e.data}))[0]},a.prototype.parseNovel=function(r){return e(this,void 0,void 0,(function(){var e,a,o,i,l;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site).concat(r,"/__data.json?x-sveltekit-invalidated=001"),[4,(0,n.fetchApi)(e).then((function(e){return e.json()}))];case 1:return a=t.sent(),o=a.nodes,i=this.extractData(o),l={path:r,name:"",cover:"",summary:"",author:"",status:"Unknown",chapters:[]},this.populateNovelMetadata(l,i),l.chapters=this.extractChapters(i),[2,l]}}))}))},a.prototype.populateNovelMetadata=function(e,t){for(var n in t){var r=t[n];if("object"==typeof r&&null!==r&&"novel_title"in r){e.name=t[r.novel_title]||"Unknown Title",e.cover=t[r.cover]||"",e.summary=t[r.synopsis]||"",e.author=t[r.author]||"Unknown Author",e.genres=t[r.genres].map((function(e){return t[e]})).join(", ")||"Unknown Genre",e.status=r.release_days?"Ongoing":"Completed";break}}},a.prototype.extractChapters=function(e){var t=this,n="chapters",r=[];for(var a in e){var o=e[a];if(o&&"object"==typeof o&&n in o){var i=o[n],l=e[i];if(!l||"object"!=typeof l)continue;for(var s=[],u=0,c=Object.keys(l);u<c.length;u++){var p=c[u],h=e[l[p]];Array.isArray(h)&&(s=s.concat(h))}var f=s.map((function(t){return e[t]})).map((function(n){return t.formatChapter(n,e)})).filter((function(e){return null!==e}));r.push.apply(r,f)}}return r},a.prototype.formatChapter=function(e,t){var n=e.id,r=e.chapter_title,a=e.chapter_number,o=e.required_tier,i=e.date_created,l=t,s=l[n],u=l[r],c=l[a],p=l[o],h=l[i];if(s&&u&&c>=0&&null!==p&&h){var f=parseInt(String(c),10)||0;if(0===(parseInt(String(p),10)||0))return{name:"Chapter ".concat(f," - ").concat(u),path:"/viewer/".concat(s),releaseTime:h,chapterNumber:f}}return null},a.prototype.parseChapter=function(r){return e(this,void 0,void 0,(function(){var e,a,o,i,l,s,u,c,p,h,f,v;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site).concat(r,"/__data.json?x-sveltekit-invalidated=001"),[4,(0,n.fetchApi)(e).then((function(e){return e.json()}))];case 1:for(c in a=t.sent(),o=a.nodes,i=this.extractData(o),l="content",s="notes",u="footnotes",i)if((p=i[c])&&"object"==typeof p&&l in p&&s in p&&u in p)return h=i[p[l]],f=i[p[s]],v=i[p[u]],[2,h+(f?"<h2>Notes</h2><br>".concat(f):"")+(null!=v?v:"")];return[2,""]}}))}))},a.prototype.searchNovels=function(r,a){return e(this,void 0,void 0,(function(){var e,o;return t(this,(function(t){switch(t.label){case 0:return 1!==a?[2,[]]:(e="".concat(this.site,"/api/novels/search?serialization=All&sort=Popular&title=").concat(encodeURIComponent(r)),[4,(0,n.fetchApi)(e).then((function(e){return e.json()}))]);case 1:return o=t.sent(),[2,this.parseNovels(o)]}}))}))},a}();exports.default=new a;