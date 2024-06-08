var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(a,l){function o(e){try{c(n.next(e))}catch(e){l(e)}}function i(e){try{c(n.throw(e))}catch(e){l(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}c((n=n.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var r,n,a,l,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return l={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function i(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;l&&(l=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&i[0]?n.return:i[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:0};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:1}}([i,c])}}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("cheerio"),n=require("@libs/fetch"),a=require("@libs/filterInputs"),l=function(){function l(){this.id="novelupdates",this.name="Novel Updates",this.version="0.5.4",this.icon="src/en/novelupdates/icon.png",this.site="https://www.novelupdates.com/",this.filters={sort:{label:"Sort Results By",value:"sdate",options:[{label:"Last Updated",value:"sdate"},{label:"Rating",value:"srate"},{label:"Rank",value:"srank"},{label:"Reviews",value:"sreview"},{label:"Chapters",value:"srel"},{label:"Title",value:"abc"},{label:"Readers",value:"sread"},{label:"Frequency",value:"sfrel"}],type:a.FilterTypes.Picker},order:{label:"Order",value:"desc",options:[{label:"Descending",value:"desc"},{label:"Ascending",value:"asc"}],type:a.FilterTypes.Picker},storyStatus:{label:"Story Status (Translation)",value:"",options:[{label:"All",value:""},{label:"Completed",value:"2"},{label:"Ongoing",value:"3"},{label:"Hiatus",value:"4"}],type:a.FilterTypes.Picker},language:{label:"Language",value:[],options:[{label:"Chinese",value:"495"},{label:"Filipino",value:"9181"},{label:"Indonesian",value:"9179"},{label:"Japanese",value:"496"},{label:"Khmer",value:"18657"},{label:"Korean",value:"497"},{label:"Malaysian",value:"9183"},{label:"Thai",value:"9954"},{label:"Vietnamese",value:"9177"}],type:a.FilterTypes.CheckboxGroup},novelType:{label:"Novel Type",value:[],options:[{label:"Light Novel",value:"2443"},{label:"Published Novel",value:"26874"},{label:"Web Novel",value:"2444"}],type:a.FilterTypes.CheckboxGroup},genres:{label:"Genres",type:a.FilterTypes.ExcludableCheckboxGroup,value:{include:[],exclude:[]},options:[{label:"Action",value:"8"},{label:"Adult",value:"280"},{label:"Adventure",value:"13"},{label:"Comedy",value:"17"},{label:"Drama",value:"9"},{label:"Ecchi",value:"292"},{label:"Fantasy",value:"5"},{label:"Gender Bender",value:"168"},{label:"Harem",value:"3"},{label:"Historical",value:"330"},{label:"Horror",value:"343"},{label:"Josei",value:"324"},{label:"Martial Arts",value:"14"},{label:"Mature",value:"4"},{label:"Mecha",value:"10"},{label:"Mystery",value:"245"},{label:"Psychoical",value:"486"},{label:"Romance",value:"15"},{label:"School Life",value:"6"},{label:"Sci-fi",value:"11"},{label:"Seinen",value:"18"},{label:"Shoujo",value:"157"},{label:"Shoujo Ai",value:"851"},{label:"Shounen",value:"12"},{label:"Shounen Ai",value:"1692"},{label:"Slice of Life",value:"7"},{label:"Smut",value:"281"},{label:"Sports",value:"1357"},{label:"Supernatural",value:"16"},{label:"Tragedy",value:"132"},{label:"Wuxia",value:"479"},{label:"Xianxia",value:"480"},{label:"Xuanhuan",value:"3954"},{label:"Yaoi",value:"560"},{label:"Yuri",value:"922"}]},genre_operator:{label:"Genre (AND/OR)",value:"and",options:[{label:"AND",value:"and"},{label:"OR",value:"or"}],type:a.FilterTypes.Picker}}}return l.prototype.parseNovels=function(e){var t=this,r=[];return e("div.search_main_box_nu").each((function(n,a){var l=e(a).find("img").attr("src"),o=e(a).find(".search_title > a").text(),i=e(a).find(".search_title > a").attr("href");if(i){var c={name:o,cover:l,path:i.replace(t.site,"")};r.push(c)}})),r},l.prototype.popularNovels=function(a,l){var o,i,c,s,u,h,p=l.showLatestNovels,v=l.filters;return e(this,void 0,void 0,(function(){var e,l,d;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site),v.language.value.length||v.novelType.value.length||(null===(o=v.genres.value.include)||void 0===o?void 0:o.length)||(null===(i=v.genres.value.exclude)||void 0===i?void 0:i.length)||""!==v.storyStatus.value?e+="series-finder/?sf=1":e+=p?"latest-series/?st=1":"series-ranking/?rank=week",v.language.value.length&&(e+="&org="+v.language.value.join(",")),v.novelType.value.length&&(e+="&nt="+v.novelType.value.join(",")),(null===(c=v.genres.value.include)||void 0===c?void 0:c.length)&&(e+="&gi="+v.genres.value.include.join(",")),(null===(s=v.genres.value.exclude)||void 0===s?void 0:s.length)&&(e+="&ge="+v.genres.value.exclude.join(",")),((null===(u=v.genres.value.include)||void 0===u?void 0:u.length)||(null===(h=v.genres.value.exclude)||void 0===h?void 0:h.length))&&(e+="&mgi="+v.genre_operator.value),v.storyStatus.value.length&&(e+="&ss="+v.storyStatus.value),e+="&sort="+v.sort.value,e+="&order="+v.order.value,e+="&pg="+a,[4,(0,n.fetchApi)(e).then((function(e){return e.text()}))];case 1:return l=t.sent(),d=(0,r.load)(l),[2,this.parseNovels(d)]}}))}))},l.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,l,o,i,c,s,u,h,p,v,d,b,f=this;return t(this,(function(t){switch(t.label){case 0:return e=this.site+a,[4,(0,n.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return l=t.sent(),o=(0,r.load)(l),(i={path:a,name:o(".seriestitlenu").text()||"Untitled",cover:o(".wpb_wrapper img").attr("src"),chapters:[]}).author=o("#authtag").map((function(e,t){return o(t).text().trim()})).toArray().join(", "),i.genres=o("#seriesgenre").children("a").map((function(e,t){return o(t).text()})).toArray().join(","),i.status=o("#editstatus").text().includes("Ongoing")?"Ongoing":"Completed",c=o("#showtype").text().trim(),s=o("#editdescription").text().trim(),i.summary=s+"\n\nType: ".concat(c),u=[],h=o("input#mypostid").attr("value"),(p=new FormData).append("action","nd_getchapters"),p.append("mygrr","0"),p.append("mypostid",h),v="".concat(this.site,"wp-admin/admin-ajax.php"),[4,(0,n.fetchApi)(v,{method:"POST",body:p}).then((function(e){return e.text()}))];case 3:return d=t.sent(),o=(0,r.load)(d),b={v:"volume ",c:" chapter ",part:"part ",ss:"SS"},o("li.sp_li_chp").each((function(e,t){var r=o(t).text();for(var n in b)r=r.replace(n,b[n]);r=r.replace(/\b\w/g,(function(e){return e.toUpperCase()})).trim();var a="https:"+o(t).find("a").first().next().attr("href");u.push({name:r,path:a.replace(f.site,"")})})),i.chapters=u.reverse(),[2,i]}}))}))},l.prototype.getLocation=function(e){var t=e.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return t&&"".concat(t[1],"//").concat(t[3])},l.prototype.getChapterBody=function(a,l,o,i){var c;return e(this,void 0,void 0,(function(){var e,i,s,u,h,p,v,d,b,f,m,g,y,x,w,_,C,k,S,T,A;return t(this,(function(t){switch(t.label){case 0:switch([],e="",i="",s="",u=["blogspot","wordpress","www"],h=l.find((function(e){return!u.includes(e)})),h){case"anotivereads":return[3,1];case"asuratls":return[3,2];case"helscans":return[3,3];case"hiraethtranslation":return[3,4];case"hostednovel":return[3,5];case"inoveltranslation":return[3,6];case"ko-fi":return[3,8];case"mirilu":return[3,9];case"novelplex":return[3,10];case"novelworldtranslations":return[3,11];case"raeitranslations":return[3,12];case"rainofsnow":return[3,14];case"sacredtexttranslations":return[3,15];case"scribblehub":return[3,16];case"skydemonorder":return[3,17];case"stabbingwithasyringe":return[3,18];case"tinytranslation":return[3,21];case"tumblr":return[3,22];case"wattpad":return[3,23];case"webnovel":return[3,24];case"wuxiaworld":return[3,25];case"zetrotranslation":return[3,26]}return[3,27];case 1:return e=a("#comic-nav-name").first().text(),i=a("#spliced-comic").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 2:return p=a(".post-body div b").first(),e=p.text(),p.remove(),i=a(".post-body").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 3:return e=a(".entry-title-main").first().text(),v="Chapter "+e.split("Chapter")[1].trim(),a("#readerarea.rdminimal").children().each((function(t,r){var n=a(r).text();if(n.includes(v))return e=n,a(r).remove(),0})),i=a("#readerarea.rdminimal").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 4:return e=a("li.active").first().text(),i=a(".text-left").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 5:return e=a("#chapter-title").first().text(),i=a("#chapter-content").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 6:return d="https://api."+o.slice(8),[4,(0,n.fetchApi)(d).then((function(e){return e.json()}))];case 7:return b=t.sent(),e="Chapter "+b.chapter+" | "+b.title,i=b.content.replace(/\n/g,"<br>"),b.notes&&(i+="<br><hr><br>TL Notes:<br>"+b.notes.replace(/\n/g,"<br>")),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 8:return s=null===(c=a('script:contains("shadowDom.innerHTML")').html())||void 0===c?void 0:c.match(/shadowDom\.innerHTML \+= '(<div.*?)';/)[1],[3,27];case 9:return["#jp-post-flair"].map((function(e){return a(e).remove()})),f=a(".entry-content p strong").first(),e=f.text(),f.remove(),i=a(".entry-content").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 10:return[".passingthrough_adreminder"].map((function(e){return a(e).remove()})),e=a(".halChap--jud").first().text(),i=a(".halChap--kontenInner ").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 11:return[".separator img"].map((function(e){return a(e).remove()})),a(".entry-content a").filter((function(e,t){var r;return(null===(r=a(t).attr("href"))||void 0===r?void 0:r.includes("https://novelworldtranslations.blogspot.com"))||0})).each((function(e,t){a(t).parent().remove()})),e=a(".entry-title").first().text(),i=a(".entry-content").html().replace(/&nbsp;/g,"").replace(/\n/g,"<br>"),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 12:return m=o.split("/"),g="".concat(m[0],"//api.").concat(m[2],"/api/chapters/?id=").concat(m[3],"&num=").concat(m[4]),[4,(0,n.fetchApi)(g).then((function(e){return e.json()}))];case 13:return y=t.sent(),e="Chapter "+y.currentChapter.num,i=(i=y.currentChapter.head+"<br><hr><br>"+y.currentChapter.body+"<br><hr><br>Translator's Note:<br>"+y.currentChapter.note).replace(/\n/g,"<br>"),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 14:return x=a(".bb-item").filter((function(){return"block"===a(this).css("display")})),w=(0,r.load)(x.html()),[".responsivevoice-button",".zoomdesc-cont p img",".zoomdesc-cont p noscript"].map((function(e){return w(e).remove()})),i=w(".zoomdesc-cont").html(),(_=w(".scroller h2").first()).length?(e=_.text(),_.remove(),i=w(".zoomdesc-cont").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i))):i&&(s=i),[3,27];case 15:return[".entry-content blockquote",".entry-content div",".reaction-buttons"].map((function(e){return a(e).remove()})),e=a(".entry-title").first().text(),i=a(".entry-content").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 16:return e=a(".chapter-title").first().text(),i=a("div.chp_raw").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 17:if(a("main").text().toLowerCase().includes("age verification required"))throw new Error("Age verification required, please open in webview.");return e="".concat(a(".pl-4 h1").first().text()," | ").concat(a(".pl-4 div").first().text()),(i=a("#startContainer + * > *").first().html())||(i="".concat(a("#chapter-body").html(),"<hr><br>There could be missing content, please check in webview.")),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 18:return C=a(".entry-content a").attr("href"),[4,(0,n.fetchApi)(C)];case 19:return[4,t.sent().text()];case 20:return k=t.sent(),S=(0,r.load)(k),[".wp-block-buttons","#jp-post-flair",".wpcnt"].map((function(e){return S(e).remove()})),i=S(".entry-content").html(),(T=S(".entry-content h3").first()).length?(e=T.text(),T.remove(),i=S(".entry-content").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i))):i&&(s=i),[3,27];case 21:return[".content noscript",".google_translate_element",".navigate",".post-views","br"].map((function(e){return a(e).remove()})),e=a(".title-content").first().text(),a(".title-content").first().remove(),i=a(".content").html(),e&&i&&(s="<h2>".concat(e,"</h2>").concat(i)),[3,27];case 22:return s=a(".post").html(),[3,27];case 23:return e=a(".h2").first().text(),i=a(".part-content pre").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 24:return e=a(".cha-tit .pr .dib").first().text(),(i=a(".cha-words").html())||(i=a("._content").html()),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 25:return[".MuiLink-root"].map((function(e){return a(e).remove()})),e=a("h4 span").first().text(),i=a(".chapter-content").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 26:return["hr",'p:contains(" ")'].map((function(e){return a(e).remove()})),i=a(".text-left").html(),(A=a(".text-left h2").first()).length?(e=A.text(),A.remove(),i=a(".text-left").html(),e&&i&&(s="<h2>".concat(e,"</h2><hr><br>").concat(i))):i&&(e=a(".active").first().text(),s="<h2>".concat(e,"</h2><hr><br>").concat(i)),[3,27];case 27:return[2,s]}}))}))},l.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,l,o,i,c,s,u,h,p,v,d,b,f,m,g,y;return t(this,(function(t){switch(t.label){case 0:return[],e="",l="",o="",[4,(0,n.fetchApi)(this.site+a)];case 1:return[4,(i=t.sent()).text()];case 2:if(c=t.sent(),s=i.url.toLowerCase(),u=s.split("/")[2].split("."),h=(0,r.load)(c),"bot verification"==(p=h("title").text().toLowerCase().trim())||"just a moment..."==p||"redirecting..."==p||"un instant..."==p||"you are being redirected..."==p)throw new Error("Captcha error, please open in webview.");if(!i.ok)throw new Error("Could not reach site (".concat(i.status,"), try to open in webview."));return v=h('meta[name="google-adsense-platform-domain"]').attr("content"),d=0,v&&(d=v.toLowerCase().includes("blogspot")),b=h("#dcl_comments-js-extra").html()||h('meta[name="generator"]').attr("content")||h("footer").text(),f=0,b&&(f=b.toLowerCase().includes("wordpress")||b.includes("Site Kit by Google")||h(".powered-by").text().toLowerCase().includes("wordpress")),m=["genesistls"],!f&&u.find((function(e){return m.includes(e)}))&&(f=1),g=["anotivereads","asuratls","helscans","mirilu","novelworldtranslations","sacredtexttranslations","stabbingwithasyringe","tinytranslation","zetrotranslation"],u.find((function(e){return g.includes(e)}))&&(f=0,d=0),f||d?[3,4]:[4,this.getChapterBody(h,u,s,i)];case 3:return o=t.sent(),[3,5];case 4:d?([".button-container",".separator"].map((function(e){return h(e).remove()})),e=h(".entry-title").first().text()||h(".post-title").first().text(),l=h(".entry-content").html()||h(".post-body").html(),e&&l&&(o="<h2>".concat(e,"</h2><hr><br>").concat(l))):f&&([".ad",".author-avatar",".chapter-warning",".entry-meta",".ezoic-ad",".genesistls-watermark",".mb-center",".modern-footnotes-footnote__note",".patreon-widget",".post-cats",".pre-bar",".sharedaddy",".sidebar",".wp-block-buttons",".wp-block-image",".wp-dark-mode-switcher",".wp-next-post-navi","#jp-post-flair","#textbox"].map((function(e){return h(e).remove()})),e=h(".entry-title").first().text()||h(".entry-title-main").first().text()||h(".chapter__title").first().text()||h(".sp-title").first().text()||h(".title-content").first().text()||h(".wp-block-post-title").first().text()||h(".title_story").first().text()||h(".active").first().text()||h("head title").first().text(),(y=h(".cat-series").first().text()||"")&&(e=y),l=h(".rdminimal").html()||h(".entry-content").html()||h(".chapter__content").html()||h(".prevent-select").html()||h(".text_story").html()||h(".contenta").html()||h(".single_post").html()||h(".post-entry").html()||h(".main-content").html()||h(".content").html()||h(".page-body").html()||h(".td-page-content").html()||h("#content").html()||h("article.post").html(),e&&l&&(o="<h2>".concat(e,"</h2><hr><br>").concat(l))),t.label=5;case 5:return o||(["nav","header","footer",".hidden"].map((function(e){return h(e).remove()})),o=h("body").html()),o&&(o=o.replace(/href="\//g,'href="'.concat(this.getLocation(i.url),"/"))),[2,o]}}))}))},l.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,l,o,i,c;return t(this,(function(t){switch(t.label){case 0:return e=a.split("*"),l=e.reduce((function(e,t){return e.length>t.length?e:t}),""),a=l.replace(/[‘’]/g,"'").replace(/\s+/g,"+"),o=this.site+"?s="+a+"&post_type=seriesplans",[4,(0,n.fetchApi)(o)];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),c=(0,r.load)(i),[2,this.parseNovels(c)]}}))}))},l.prototype.fetchImage=function(e){return(0,n.fetchFile)(e)},l}();exports.default=new l;