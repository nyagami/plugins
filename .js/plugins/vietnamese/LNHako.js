Object.defineProperty(exports,"__esModule",{value:1});var e,t=require("htmlparser2"),n=require("@libs/novelStatus"),a=require("@libs/filterInputs");!function(e){e.Unknown="Unknown",e.GetName="GetName",e.GetSummary="GetSummary",e.GetInfos="GetInfos",e.GetGenres="GetGenres",e.GetCover="GetCover",e.GetVolumes="GetVolumes"}(e||(e={}));var i=function(){function i(){this.id="ln.hako",this.name="Hako",this.icon="src/vi/hakolightnovel/icon.png",this.site="https://ln.hako.vn",this.version="1.1.0",this.imageRequestInit={headers:{Referer:"https://ln.hako.vn"}},this.filters={alphabet:{type:a.FilterTypes.Picker,value:"",label:"Chữ cái",options:[{label:"Tất cả",value:""},{label:"Khác",value:"khac"},{label:"A",value:"a"},{label:"B",value:"b"},{label:"C",value:"c"},{label:"D",value:"d"},{label:"E",value:"e"},{label:"F",value:"f"},{label:"G",value:"g"},{label:"H",value:"h"},{label:"I",value:"i"},{label:"J",value:"j"},{label:"K",value:"k"},{label:"L",value:"l"},{label:"M",value:"m"},{label:"N",value:"n"},{label:"O",value:"o"},{label:"P",value:"p"},{label:"Q",value:"q"},{label:"R",value:"r"},{label:"S",value:"s"},{label:"T",value:"t"},{label:"U",value:"u"},{label:"V",value:"v"},{label:"W",value:"w"},{label:"X",value:"x"},{label:"Y",value:"y"},{label:"Z",value:"z"}]},type:{type:a.FilterTypes.CheckboxGroup,label:"Phân loại",value:[],options:[{label:"Truyện dịch",value:"truyendich"},{label:"Truyện sáng tác",value:"sangtac"},{label:"Convert",value:"convert"}]},status:{type:a.FilterTypes.CheckboxGroup,label:"Tình trạng",value:[],options:[{label:"Đang tiến hành",value:"dangtienhanh"},{label:"Tạm ngưng",value:"tamngung"},{label:"Đã hoàn thành",value:"hoanthanh"}]},sort:{type:a.FilterTypes.Picker,label:"Sắp xếp",value:"top",options:[{label:"A-Z",value:"tentruyen"},{label:"Z-A",value:"tentruyenza"},{label:"Mới cập nhật",value:"capnhat"},{label:"Truyện mới",value:"truyenmoi"},{label:"Theo dõi",value:"theodoi"},{label:"Top toàn thời gian",value:"top"},{label:"Top tháng",value:"topthang"},{label:"Số từ",value:"sotu"}]}}}return i.prototype.parseNovels=function(e){return fetch(e).then((function(e){return e.text()})).then((function(e){var n=[],a={},i=0,l=0,s=new t.Parser({onopentag:function(e,t){var s,o,r;(null===(s=t.class)||void 0===s?void 0:s.includes("thumb-item-flow"))&&(l=1),l&&((null===(o=t.class)||void 0===o?void 0:o.includes("series-title"))&&(i=1),(null===(r=t.class)||void 0===r?void 0:r.includes("img-in-ratio"))&&(a.cover=t["data-bg"]),i&&"a"===e&&(a.name=t.title,a.path=t.href,n.push(a),a={},i=0,l=0))}});return s.write(e),s.end(),n}))},i.prototype.popularNovels=function(e,t){t.showLatestNovels;var n=t.filters,a=this.site+"/danh-sach";if(n){n.alphabet.value&&(a+="/"+n.alphabet.value);for(var i=new URLSearchParams,l=0,s=n.type.value;l<s.length;l++){var o=s[l];i.append(o,"1")}for(var r=0,u=n.status.value;r<u.length;r++){var h=u[r];i.append(h,"1")}i.append("sapxep",n.sort.value),a+="?"+i.toString()+"&page="+e}else a+="?page="+e;return this.parseNovels(a)},i.prototype.parseNovel=function(a){var i,l={path:a,name:"",author:"",artist:"",summary:"",genres:"",status:""},s=[],o={isDone:0,isStarted:0,onopentag:function(e,t){"a"===e&&(this.isStarted=1)},ontext:function(e){l.name+=e},onclosetag:function(e){this.isStarted&&(this.isDone=1)}},r={newLine:0,ontext:function(e){this.newLine?(this.newLine=0,l.summary+="\n"+e):l.summary+=e},onclosetag:function(e){this.newLine=1}},u={ontext:function(e){l.genres+=e}};!function(e){e[e.Author=0]="Author",e[e.Artist=1]="Artist",e[e.Status=2]="Status",e[e.Unknown=3]="Unknown"}(i||(i={}));var h={isStarted:0,info:i.Unknown,onopentag:function(e,t){if("info-item"===t.class)switch(this.info){case i.Unknown:l.author||(this.info=i.Author);break;case i.Author:this.info=i.Artist;break;case i.Artist:this.info=i.Status;break;case i.Status:this.info=i.Unknown}"a"===e&&(this.isStarted=1)},ontext:function(e){if(this.isStarted)switch(this.info){case i.Author:l.author+=e;break;case i.Artist:l.artist+=e;break;case i.Status:l.status+=e}},onclosetag:function(e){this.isStarted&&(this.isStarted=0),"a"===e&&this.info===i.Status&&(this.isDone=1)}},c={currentVolume:"",num:0,part:1,isStarted:0,readingTime:0,tempChapter:{},onopentag:function(e,t){var n;if(this.isStarted)if("a"===e&&null!==t.title){var a=t.title,i=Number(null===(n=a.match(/Chương\s*(\d+)/i))||void 0===n?void 0:n[1]);i?this.num===i?(i=this.num+this.part/10,this.part+=1):(this.num=i,this.part=1):(i=this.num+this.part/10,this.part++),this.tempChapter={path:t.href,name:a,page:this.currentVolume,chapterNumber:i}}else"chapter-time"===t.class&&(this.readingTime=1)},ontext:function(e){if(this.readingTime){var t=e.split("/").map((function(e){return Number(e)}));this.tempChapter.releaseTime=new Date(t[2],t[1],t[0]).toISOString(),s.push(this.tempChapter),this.readingTime=0,this.tempChapter={}}},onclosetag:function(){this.readingTime&&(this.readingTime=0)}},v={handlers:{Unknown:void 0,GetName:o,GetCover:void 0,GetSummary:r,GetGenres:u,GetInfos:h,GetVolumes:{isStarted:0,isDone:0,isParsingChapterList:0,onopentag:function(e,t){var n;"sect-title"===t.class&&(this.isStarted=1,c.currentVolume=""),"ul"===e&&(c.isStarted=1,c.num=0,c.part=1),null===(n=c.onopentag)||void 0===n||n.call(c,e,t)},ontext:function(e){var t;this.isStarted&&(c.currentVolume+=e.trim()),null===(t=c.ontext)||void 0===t||t.call(c,e)},onclosetag:function(e,t){var n;null===(n=c.onclosetag)||void 0===n||n.call(c,e,t),this.isStarted=0,"ul"===e&&(c.isStarted=0)}}},action:e.Unknown,onopentag:function(t,n){var a,i;if("series-name"===n.class)this.action=e.GetName;else if(!l.cover&&(null===(a=n.class)||void 0===a?void 0:a.includes("img-in-ratio"))){var s=n.style;s&&(l.cover=s.substring(s.indexOf("http"),s.length-2))}else"summary-content"===n.class?this.action=e.GetSummary:"series-gerne-item"===n.class?this.action=e.GetGenres:"info-item"===n.class?this.action=e.GetInfos:(null===(i=n.class)||void 0===i?void 0:i.includes("volume-list"))&&(this.action=e.GetVolumes)},onclosetag:function(t){var n,a,i;switch(this.action){case e.GetName:(null===(n=this.handlers.GetName)||void 0===n?void 0:n.isDone)&&(this.action=e.Unknown);break;case e.GetSummary:"div"===t&&(this.action=e.Unknown);break;case e.GetGenres:this.action=e.Unknown,l.genres+=",";break;case e.GetInfos:(null===(a=this.handlers.GetInfos)||void 0===a?void 0:a.isDone)&&(this.action=e.Unknown);break;case e.GetVolumes:(null===(i=this.handlers.GetVolumes)||void 0===i?void 0:i.isDone)&&(this.action=e.Unknown)}}};return fetch(this.site+a).then((function(e){return e.text()})).then((function(e){var a,i,o,r=new t.Parser({onopentag:function(e,t){var n,a,i;null===(n=v.onopentag)||void 0===n||n.call(v,e,t),v.action&&(null===(i=null===(a=v.handlers[v.action])||void 0===a?void 0:a.onopentag)||void 0===i||i.call(a,e,t))},ontext:function(e){var t,n;v.action&&(null===(n=null===(t=v.handlers[v.action])||void 0===t?void 0:t.ontext)||void 0===n||n.call(t,e))},onclosetag:function(e,t){var n,a,i;v.action&&(null===(a=null===(n=v.handlers[v.action])||void 0===n?void 0:n.onclosetag)||void 0===a||a.call(n,e,t)),null===(i=v.onclosetag)||void 0===i||i.call(v,e,t)}});switch(r.write(e),r.end(),l.chapters=s,null===(a=l.status)||void 0===a?void 0:a.trim()){case"Đang tiến hành":l.status=n.NovelStatus.Ongoing;break;case"Tạm ngưng":l.status=n.NovelStatus.OnHiatus;break;case"Completed":l.status=n.NovelStatus.Completed;break;default:l.status=n.NovelStatus.Unknown}return l.genres=null===(i=l.genres)||void 0===i?void 0:i.replace(/,*\s*$/,""),l.name=l.name.trim(),l.summary=null===(o=l.summary)||void 0===o?void 0:o.trim(),l}))},i.prototype.parseChapter=function(e){return fetch(this.site+e).then((function(e){return e.text()})).then((function(e){var t;return(null===(t=e.match(/(<div id="chapter-content".+?>[^]+)<div style="text-align: center;/))||void 0===t?void 0:t[1])||"Không tìm thấy nội dung"}))},i.prototype.searchNovels=function(e,t){var n=this.site+"/tim-kiem?keywords="+e+"&page="+t;return this.parseNovels(n)},i}();exports.default=new i;