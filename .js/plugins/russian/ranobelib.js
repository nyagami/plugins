var e=this&&this.__awaiter||function(e,l,a,t){return new(a||(a=Promise))((function(u,n){function i(e){try{v(t.next(e))}catch(e){n(e)}}function r(e){try{v(t.throw(e))}catch(e){n(e)}}function v(e){var l;e.done?u(e.value):(l=e.value,l instanceof a?l:new a((function(e){e(l)}))).then(i,r)}v((t=t.apply(e,l||[])).next())}))},l=this&&this.__generator||function(e,l){var a,t,u,n,i={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return n={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function r(r){return function(v){return function(r){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,r[0]&&(i=0)),i;)try{if(a=1,t&&(u=2&r[0]?t.return:r[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,r[1])).done)return u;switch(t=0,u&&(r=[2&r[0],u.value]),r[0]){case 0:case 1:u=r;break;case 4:return i.label++,{value:r[1],done:0};case 5:i.label++,t=r[1],r=[0];continue;case 7:r=i.ops.pop(),i.trys.pop();continue;default:if(!(u=i.trys,(u=u.length>0&&u[u.length-1])||6!==r[0]&&2!==r[0])){i=0;continue}if(3===r[0]&&(!u||r[1]>u[0]&&r[1]<u[3])){i.label=r[1];break}if(6===r[0]&&i.label<u[1]){i.label=u[1],u=r;break}if(u&&i.label<u[2]){i.label=u[2],i.ops.push(r);break}u[2]&&i.ops.pop(),i.trys.pop();continue}r=l.call(e,i)}catch(e){r=[6,e],t=0}finally{a=u=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:1}}([r,v])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var t=require("@libs/filterInputs"),u=require("@libs/defaultCover"),n=require("@libs/fetch"),i=require("@libs/novelStatus"),r=require("@libs/storage"),v=a(require("dayjs")),o={1:i.NovelStatus.Ongoing,2:i.NovelStatus.Completed,3:i.NovelStatus.OnHiatus,4:i.NovelStatus.Cancelled},s=function(){function a(){var e=this;this.id="RLIB",this.name="RanobeLib",this.site="https://ranobelib.me",this.apiSite="https://api.lib.social/api/manga/",this.version="2.0.0",this.icon="src/ru/ranobelib/icon.png",this.webStorageUtilized=1,this.fetchImage=n.fetchFile,this.resolveUrl=function(l,a){var t,u=(null===(t=e.user)||void 0===t?void 0:t.ui)?"ui="+e.user.ui:"";if(a)return e.site+"/ru/book/"+l+(u?"?"+u:"");var n=l.split("/"),i=n[0],r=n[1],v=n[2],o=n[3],s=i+"/read/v"+r+"/c"+v+(o?"?bid="+o:"");return e.site+"/ru/"+s+(u?(o?"&":"?")+u:"")},this.getUser=function(){var e,l,a=r.storage.get("user");if(a)return{token:{Authorization:"Bearer "+a.token},ui:a.id};var t=null===(e=r.localStorage.get())||void 0===e?void 0:e.auth;if(!t)return{};var u=JSON.parse(t);return(null===(l=null==u?void 0:u.token)||void 0===l?void 0:l.access_token)?(r.storage.set("user",{id:u.auth.id,token:u.token.access_token},u.token.timestamp+u.token.expires_in),{token:{Authorization:"Bearer "+u.token.access_token},ui:u.auth.id}):void 0},this.user=this.getUser(),this.filters={sort_by:{label:"Сортировка",value:"rating_score",options:[{label:"По рейтингу",value:"rate_avg"},{label:"По популярности",value:"rating_score"},{label:"По просмотрам",value:"views"},{label:"Количеству глав",value:"chap_count"},{label:"Дате обновления",value:"last_chapter_at"},{label:"Дате добавления",value:"created_at"},{label:"По названию (A-Z)",value:"name"},{label:"По названию (А-Я)",value:"rus_name"}],type:t.FilterTypes.Picker},sort_type:{label:"Порядок",value:"desc",options:[{label:"По убыванию",value:"desc"},{label:"По возрастанию",value:"asc"}],type:t.FilterTypes.Picker},types:{label:"Тип",value:[],options:[{label:"Япония",value:"10"},{label:"Корея",value:"11"},{label:"Китай",value:"12"},{label:"Английский",value:"13"},{label:"Авторский",value:"14"},{label:"Фанфик",value:"15"}],type:t.FilterTypes.CheckboxGroup},scanlateStatus:{label:"Статус перевода",value:[],options:[{label:"Продолжается",value:"1"},{label:"Завершен",value:"2"},{label:"Заморожен",value:"3"},{label:"Заброшен",value:"4"}],type:t.FilterTypes.CheckboxGroup},manga_status:{label:"Статус тайтла",value:[],options:[{label:"Онгоинг",value:"1"},{label:"Завершён",value:"2"},{label:"Анонс",value:"3"},{label:"Приостановлен",value:"4"},{label:"Выпуск прекращён",value:"5"}],type:t.FilterTypes.CheckboxGroup},genres:{label:"Жанры",value:{include:[],exclude:[]},options:[{label:"Арт",value:"32"},{label:"Безумие",value:"91"},{label:"Боевик",value:"34"},{label:"Боевые искусства",value:"35"},{label:"Вампиры",value:"36"},{label:"Военное",value:"89"},{label:"Гарем",value:"37"},{label:"Гендерная интрига",value:"38"},{label:"Героическое фэнтези",value:"39"},{label:"Демоны",value:"81"},{label:"Детектив",value:"40"},{label:"Детское",value:"88"},{label:"Дзёсэй",value:"41"},{label:"Драма",value:"43"},{label:"Игра",value:"44"},{label:"Исекай",value:"79"},{label:"История",value:"45"},{label:"Киберпанк",value:"46"},{label:"Кодомо",value:"76"},{label:"Комедия",value:"47"},{label:"Космос",value:"83"},{label:"Магия",value:"85"},{label:"Махо-сёдзё",value:"48"},{label:"Машины",value:"90"},{label:"Меха",value:"49"},{label:"Мистика",value:"50"},{label:"Музыка",value:"80"},{label:"Научная фантастика",value:"51"},{label:"Омегаверс",value:"77"},{label:"Пародия",value:"86"},{label:"Повседневность",value:"52"},{label:"Полиция",value:"82"},{label:"Постапокалиптика",value:"53"},{label:"Приключения",value:"54"},{label:"Психология",value:"55"},{label:"Романтика",value:"56"},{label:"Самурайский боевик",value:"57"},{label:"Сверхъестественное",value:"58"},{label:"Сёдзё",value:"59"},{label:"Сёдзё-ай",value:"60"},{label:"Сёнэн",value:"61"},{label:"Сёнэн-ай",value:"62"},{label:"Спорт",value:"63"},{label:"Супер сила",value:"87"},{label:"Сэйнэн",value:"64"},{label:"Трагедия",value:"65"},{label:"Триллер",value:"66"},{label:"Ужасы",value:"67"},{label:"Фантастика",value:"68"},{label:"Фэнтези",value:"69"},{label:"Хентай",value:"84"},{label:"Школа",value:"70"},{label:"Эротика",value:"71"},{label:"Этти",value:"72"},{label:"Юри",value:"73"},{label:"Яой",value:"74"}],type:t.FilterTypes.ExcludableCheckboxGroup},tags:{label:"Теги",value:{include:[],exclude:[]},options:[{label:"Авантюристы",value:"328"},{label:"Антигерой",value:"175"},{label:"Бессмертные",value:"333"},{label:"Боги",value:"218"},{label:"Борьба за власть",value:"309"},{label:"Брат и сестра",value:"360"},{label:"Ведьма",value:"339"},{label:"Видеоигры",value:"204"},{label:"Виртуальная реальность",value:"214"},{label:"Владыка демонов",value:"349"},{label:"Военные",value:"198"},{label:"Воспоминания из другого мира",value:"310"},{label:"Выживание",value:"212"},{label:"ГГ женщина",value:"294"},{label:"ГГ имба",value:"292"},{label:"ГГ мужчина",value:"295"},{label:"ГГ не ояш",value:"325"},{label:"ГГ не человек",value:"331"},{label:"ГГ ояш",value:"326"},{label:"Главный герой бог",value:"324"},{label:"Глупый ГГ",value:"298"},{label:"Горничные",value:"171"},{label:"Гуро",value:"306"},{label:"Гяру",value:"197"},{label:"Демоны",value:"157"},{label:"Драконы",value:"313"},{label:"Древний мир",value:"317"},{label:"Зверолюди",value:"163"},{label:"Зомби",value:"155"},{label:"Исторические фигуры",value:"323"},{label:"Кулинария",value:"158"},{label:"Культивация",value:"161"},{label:"ЛГБТ",value:"344"},{label:"ЛитРПГ",value:"319"},{label:"Лоли",value:"206"},{label:"Магия",value:"170"},{label:"Машинный перевод",value:"345"},{label:"Медицина",value:"159"},{label:"Межгалактическая война",value:"330"},{label:"Монстр Девушки",value:"207"},{label:"Монстры",value:"208"},{label:"Мрачный мир",value:"316"},{label:"Музыка",value:"358"},{label:"Музыка",value:"209"},{label:"Ниндзя",value:"199"},{label:"Обратный Гарем",value:"210"},{label:"Офисные Работники",value:"200"},{label:"Пираты",value:"341"},{label:"Подземелья",value:"314"},{label:"Политика",value:"311"},{label:"Полиция",value:"201"},{label:"Преступники / Криминал",value:"205"},{label:"Призраки / Духи",value:"196"},{label:"Призыватели",value:"329"},{label:"Прыжки между мирами",value:"321"},{label:"Путешествие в другой мир",value:"318"},{label:"Путешествие во времени",value:"213"},{label:"Рабы",value:"355"},{label:"Ранги силы",value:"312"},{label:"Реинкарнация",value:"154"},{label:"Самураи",value:"202"},{label:"Скрытие личности",value:"315"},{label:"Средневековье",value:"174"},{label:"Традиционные игры",value:"203"},{label:"Умный ГГ",value:"303"},{label:"Характерный рост",value:"332"},{label:"Хикикомори",value:"167"},{label:"Эволюция",value:"322"},{label:"Элементы РПГ",value:"327"},{label:"Эльфы",value:"217"},{label:"Якудза",value:"165"}],type:t.FilterTypes.ExcludableCheckboxGroup},require_chapters:{label:"Только проекты с главами",value:1,type:t.FilterTypes.Switch}}}return a.prototype.popularNovels=function(a,t){var i,r,v,o,s,b,c,d,h,p,f,g,m,_,y,k,x,S,w=t.showLatestNovels,j=t.filters;return e(this,void 0,void 0,(function(){var e,t,C;return l(this,(function(l){switch(l.label){case 0:return e=this.apiSite+"?site_id[0]=3&page="+a,e+="&sort_by="+(w?"last_chapter_at":(null===(i=null==j?void 0:j.sort_by)||void 0===i?void 0:i.value)||"rating_score"),e+="&sort_type="+((null===(r=null==j?void 0:j.sort_type)||void 0===r?void 0:r.value)||"desc"),(null===(v=null==j?void 0:j.require_chapters)||void 0===v?void 0:v.value)&&(e+="&chapters[min]=1"),(null===(s=null===(o=null==j?void 0:j.types)||void 0===o?void 0:o.value)||void 0===s?void 0:s.length)&&(e+="&types[]="+j.types.value.join("&types[]=")),(null===(c=null===(b=null==j?void 0:j.scanlateStatus)||void 0===b?void 0:b.value)||void 0===c?void 0:c.length)&&(e+="&scanlateStatus[]="+j.scanlateStatus.value.join("&scanlateStatus[]=")),(null===(h=null===(d=null==j?void 0:j.manga_status)||void 0===d?void 0:d.value)||void 0===h?void 0:h.length)&&(e+="&manga_status[]="+j.manga_status.value.join("&manga_status[]=")),(null==j?void 0:j.genres)&&((null===(f=null===(p=j.genres.value)||void 0===p?void 0:p.include)||void 0===f?void 0:f.length)&&(e+="&genres[]="+j.genres.value.include.join("&genres[]=")),(null===(m=null===(g=j.genres.value)||void 0===g?void 0:g.exclude)||void 0===m?void 0:m.length)&&(e+="&genres_exclude[]="+j.genres.value.exclude.join("&genres_exclude[]="))),(null==j?void 0:j.tags)&&((null===(y=null===(_=j.tags.value)||void 0===_?void 0:_.include)||void 0===y?void 0:y.length)&&(e+="&tags[]="+j.tags.value.include.join("&tags[]=")),(null===(x=null===(k=j.tags.value)||void 0===k?void 0:k.exclude)||void 0===x?void 0:x.length)&&(e+="&tags_exclude[]="+j.tags.value.exclude.join("&tags_exclude[]="))),[4,(0,n.fetchApi)(e,{headers:null===(S=this.user)||void 0===S?void 0:S.token}).then((function(e){return e.json()}))];case 1:return t=l.sent(),C=[],t.data instanceof Array&&t.data.forEach((function(e){var l;return C.push({name:e.rus_name||e.eng_name||e.name,cover:(null===(l=e.cover)||void 0===l?void 0:l.default)||u.defaultCover,path:e.slug_url||e.id+"--"+e.slug})})),[2,C]}}))}))},a.prototype.parseNovel=function(a){var t,r,s,b,c,d;return e(this,void 0,void 0,(function(){var e,h,p,f,g,m;return l(this,(function(l){switch(l.label){case 0:return[4,(0,n.fetchApi)(this.apiSite+a+"?fields[]=summary&fields[]=genres&fields[]=tags&fields[]=teams&fields[]=authors&fields[]=status_id&fields[]=artists",{headers:null===(t=this.user)||void 0===t?void 0:t.token}).then((function(e){return e.json()}))];case 1:return e=l.sent().data,h={path:a,name:e.rus_name||e.name,cover:(null===(r=e.cover)||void 0===r?void 0:r.default)||u.defaultCover,summary:e.summary},(null===(s=e.status)||void 0===s?void 0:s.id)&&(h.status=o[e.status.id]||i.NovelStatus.Unknown),(null===(b=e.authors)||void 0===b?void 0:b.length)&&(h.author=e.authors[0].name),(null===(c=e.artists)||void 0===c?void 0:c.length)&&(h.artist=e.artists[0].name),(p=[e.genres||[],e.tags||[]].flat().map((function(e){return null==e?void 0:e.name})).filter((function(e){return e}))).length&&(h.genres=p.join(", ")),f={},e.teams.length&&e.teams.forEach((function(e){var l=e.name,a=e.details;return f[(null==a?void 0:a.branch_id)||"0"]=l})),[4,(0,n.fetchApi)(this.apiSite+a+"/chapters",{headers:null===(d=this.user)||void 0===d?void 0:d.token}).then((function(e){return e.json()}))];case 2:return(g=l.sent()).data.length&&(m=[],g.data.forEach((function(e){var l;return m.push({name:"Том "+e.volume+" Глава "+e.number+(e.name?" "+e.name:""),path:a+"/"+e.volume+"/"+e.number+"/"+((null===(l=e.branches[0])||void 0===l?void 0:l.branch_id)||""),releaseTime:(0,v.default)(e.branches[0].created_at).format("LLL"),chapterNumber:e.index,page:f[e.branches[0].branch_id||"0"]})})),h.chapters=m),[2,h]}}))}))},a.prototype.parseChapter=function(a){var t,u,i,r;return e(this,void 0,void 0,(function(){var e,v,o,s,c,d,h;return l(this,(function(l){switch(l.label){case 0:return e=a.split("/"),v=e[0],o=e[1],s=e[2],c=e[3],d="",v&&o&&s?[4,(0,n.fetchApi)(this.apiSite+v+"/chapter?"+(c?"branch_id="+c+"&":"")+"number="+s+"&volume="+o,{headers:null===(t=this.user)||void 0===t?void 0:t.token}).then((function(e){return e.json()}))]:[3,2];case 1:h=l.sent(),d="doc"==(null===(i=null===(u=null==h?void 0:h.data)||void 0===u?void 0:u.content)||void 0===i?void 0:i.type)?b(h.data.content.content):null===(r=null==h?void 0:h.data)||void 0===r?void 0:r.content,l.label=2;case 2:return[2,d]}}))}))},a.prototype.searchNovels=function(a){var t;return e(this,void 0,void 0,(function(){var e,i,r;return l(this,(function(l){switch(l.label){case 0:return e=this.apiSite+"?site_id[0]=3&q="+a,[4,(0,n.fetchApi)(e,{headers:null===(t=this.user)||void 0===t?void 0:t.token}).then((function(e){return e.json()}))];case 1:return i=l.sent(),r=[],i.data instanceof Array&&i.data.forEach((function(e){var l;return r.push({name:e.rus_name||e.eng_name||e.name,cover:(null===(l=e.cover)||void 0===l?void 0:l.default)||u.defaultCover,path:e.slug_url||e.id+"--"+e.slug})})),[2,r]}}))}))},a}();function b(e,l){return void 0===l&&(l=""),e.forEach((function(e){switch(e.type){case"hardBreak":l+="<br>";break;case"horizontalRule":l+="<hr>";break;case"image":if(e.attrs){var a=Object.entries(e.attrs).filter((function(e){return null==e?void 0:e[1]})).map((function(e){return"".concat(e[0],'="').concat(e[1],'"')}));l+="<img "+a.join("; ")+">"}break;case"paragraph":l+="<p>"+(e.content?b(e.content):"<br>")+"</p>";break;case"text":l+=e.text;break;default:l+=JSON.stringify(e,null,"\t")}})),l}exports.default=new s;