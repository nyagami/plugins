"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filters = exports.fetchImage = exports.searchNovels = exports.parseChapter = exports.parseNovelAndChapters = exports.popularNovels = exports.icon = exports.version = exports.site = exports.name = exports.id = void 0;
var filterInputs_1 = require("@libs/filterInputs");
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var cheerio_1 = require("cheerio");
var dayjs_1 = __importDefault(require("dayjs"));
exports.id = "RLIB";
exports.name = "RanobeLib";
exports.site = "https://ranobelib.me";
exports.version = "1.0.0";
exports.icon = "src/ru/ranobelib/icon.png";
var ui;
var popularNovels = function (page, _a) {
    var _b, _c, _d;
    var showLatestNovels = _a.showLatestNovels, filters = _a.filters;
    return __awaiter(this, void 0, void 0, function () {
        var url, result, body, loadedCheerio, novels;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    url = "".concat(exports.site, "/manga-list?sort=");
                    url += showLatestNovels ? "last_chapter_at" : (filters === null || filters === void 0 ? void 0 : filters.sort) || "rate";
                    url += "&dir=" + ((filters === null || filters === void 0 ? void 0 : filters.order) || "desc");
                    if (filters) {
                        if (Array.isArray(filters.type) && filters.type.length) {
                            url += filters.type.map(function (i) { return "&types[]=".concat(i); }).join("");
                        }
                        if (Array.isArray(filters.format) && ((_b = filters.format) === null || _b === void 0 ? void 0 : _b.length)) {
                            url += filters.format.map(function (i) { return "&format[include][]=".concat(i); }).join("");
                        }
                        if (Array.isArray(filters.status) && filters.status.length) {
                            url += filters.status.map(function (i) { return "&status[]=".concat(i); }).join("");
                        }
                        if (Array.isArray(filters.statuss) && filters.statuss.length) {
                            url += filters.statuss.map(function (i) { return "&manga_status[]=".concat(i); }).join("");
                        }
                        if (Array.isArray(filters.genres) && filters.genres.length) {
                            url += filters.genres.map(function (i) { return "&genres[include][]=".concat(i); }).join("");
                        }
                        if (Array.isArray(filters.tags) && filters.tags.length) {
                            url += filters.tags.map(function (i) { return "&tags[include][]=".concat(i); }).join("");
                        }
                    }
                    url += "&page=" + page;
                    return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                case 1:
                    result = _e.sent();
                    return [4 /*yield*/, result.text()];
                case 2:
                    body = _e.sent();
                    loadedCheerio = (0, cheerio_1.load)(body);
                    ui = (_d = (_c = loadedCheerio("a.header-right-menu__item")
                        .attr("href")) === null || _c === void 0 ? void 0 : _c.replace) === null || _d === void 0 ? void 0 : _d.call(_c, /[^0-9]/g, "");
                    novels = [];
                    loadedCheerio(".media-card-wrap").each(function () {
                        var name = loadedCheerio(this).find(".media-card__title").text();
                        var cover = loadedCheerio(this).find("a.media-card").attr("data-src");
                        var url = loadedCheerio(this).find("a.media-card").attr("href");
                        if (!url)
                            return;
                        novels.push({ name: name, cover: cover, url: url });
                    });
                    return [2 /*return*/, novels];
            }
        });
    });
};
exports.popularNovels = popularNovels;
var parseNovelAndChapters = function (novelUrl) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var result, body, loadedCheerio, novel, chapters, chaptersRaw, chaptersJson;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl)];
                case 1:
                    result = _h.sent();
                    return [4 /*yield*/, result.text()];
                case 2:
                    body = _h.sent();
                    loadedCheerio = (0, cheerio_1.load)(body);
                    novel = {
                        url: novelUrl,
                    };
                    novel.name = loadedCheerio(".media-name__main").text().trim();
                    novel.cover = loadedCheerio(".media-sidebar__cover img").attr("src");
                    novel.summary = loadedCheerio(".media-description__text").text().trim();
                    novel.genres = loadedCheerio('div[class="media-tags"]')
                        .text()
                        .trim()
                        .replace(/[\n\r]+/g, ", ")
                        .replace(/  /g, "");
                    loadedCheerio('div[class="media-info-list paper"] > [class="media-info-list__item"]').each(function () {
                        var name = loadedCheerio(this)
                            .find('div[class="media-info-list__title"]')
                            .text();
                        if (name === "Статус перевода") {
                            novel.status =
                                loadedCheerio(this).find("div:nth-child(2)").text().trim() ===
                                    "Продолжается"
                                    ? novelStatus_1.NovelStatus.Ongoing
                                    : novelStatus_1.NovelStatus.Completed;
                        }
                        else if (name === "Автор") {
                            novel.author = loadedCheerio(this)
                                .find("div:nth-child(2)")
                                .text()
                                .trim();
                        }
                    });
                    chapters = [];
                    chaptersRaw = body.match(/window.__DATA__ = [\s\S]*?window._SITE_COLOR_/gm);
                    chaptersRaw = (_d = (_c = (_b = (_a = chaptersRaw === null || chaptersRaw === void 0 ? void 0 : chaptersRaw[0]) === null || _a === void 0 ? void 0 : _a.replace("window.__DATA__ = ", "")) === null || _b === void 0 ? void 0 : _b.replace("window._SITE_COLOR_", "")) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.slice(0, -1);
                    chaptersJson = JSON.parse(chaptersRaw);
                    ui = (_e = chaptersJson === null || chaptersJson === void 0 ? void 0 : chaptersJson.user) === null || _e === void 0 ? void 0 : _e.id;
                    (_g = (_f = chaptersJson.chapters) === null || _f === void 0 ? void 0 : _f.list) === null || _g === void 0 ? void 0 : _g.forEach(function (chapter) {
                        var _a;
                        return chapters.push({
                            name: (_a = "\u0422\u043E\u043C ".concat(chapter.chapter_volume, " \u0413\u043B\u0430\u0432\u0430 ").concat(chapter.chapter_number, " ").concat(chapter.chapter_name)) === null || _a === void 0 ? void 0 : _a.trim(),
                            releaseTime: (0, dayjs_1.default)(chapter.chapter_created_at).format("LLL"),
                            url: "".concat(exports.site, "/").concat(chaptersJson.manga.slug, "/v").concat(chapter.chapter_volume, "/c").concat(chapter.chapter_number, "?bid=") +
                                ((chapter === null || chapter === void 0 ? void 0 : chapter.branch_id) || ""),
                        });
                    });
                    novel.chapters = chapters.reverse();
                    return [2 /*return*/, novel];
            }
        });
    });
};
exports.parseNovelAndChapters = parseNovelAndChapters;
var parseChapter = function (chapterUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var result, body, loadedCheerio, chapterText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl + (ui ? "&ui=".concat(ui) : ""))];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.text()];
                case 2:
                    body = _a.sent();
                    loadedCheerio = (0, cheerio_1.load)(body);
                    loadedCheerio(".reader-container img").each(function () {
                        var url = loadedCheerio(this).attr("data-src") || loadedCheerio(this).attr("src");
                        if (!(url === null || url === void 0 ? void 0 : url.startsWith("http"))) {
                            loadedCheerio(this).attr("src", exports.site + url);
                        }
                        else {
                            loadedCheerio(this).attr("src", url);
                        }
                        loadedCheerio(this).removeAttr("data-src");
                    });
                    chapterText = loadedCheerio(".reader-container").html();
                    return [2 /*return*/, chapterText];
            }
        });
    });
};
exports.parseChapter = parseChapter;
var searchNovels = function (searchTerm) {
    return __awaiter(this, void 0, void 0, function () {
        var result, body, novels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(exports.site, "/search?q=").concat(searchTerm, "&type=manga"))];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    body = (_a.sent());
                    novels = [];
                    body.forEach(function (novel) {
                        return novels.push({
                            name: (novel === null || novel === void 0 ? void 0 : novel.rus_name) || novel.name,
                            cover: novel === null || novel === void 0 ? void 0 : novel.coverImage,
                            url: (novel === null || novel === void 0 ? void 0 : novel.href) || exports.site + "/" + novel.slug,
                        });
                    });
                    return [2 /*return*/, novels];
            }
        });
    });
};
exports.searchNovels = searchNovels;
exports.fetchImage = fetch_1.fetchFile;
exports.filters = [
    {
        key: "sort",
        label: "Сортировка",
        values: [
            { label: "Рейтинг", value: "rate" },
            { label: "Имя", value: "name" },
            { label: "Просмотры", value: "views" },
            { label: "Дате добавления", value: "created_at" },
            { label: "Дате обновления", value: "last_chapter_at" },
            { label: "Количество глав", value: "chap_count" },
        ],
        inputType: filterInputs_1.FilterInputs.Picker,
    },
    {
        key: "order",
        label: "Порядок",
        values: [
            { label: "По убыванию", value: "desc" },
            { label: "По возрастанию", value: "asc" },
        ],
        inputType: filterInputs_1.FilterInputs.Picker,
    },
    {
        key: "type",
        label: "Тип",
        values: [
            { label: "Авторский", value: "14" },
            { label: "Английский", value: "13" },
            { label: "Китай", value: "12" },
            { label: "Корея", value: "11" },
            { label: "Фанфик", value: "15" },
            { label: "Япония", value: "10" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
    {
        key: "format",
        label: "Формат выпуска",
        values: [
            { label: "4-кома (Ёнкома)", value: "1" },
            { label: "В цвете", value: "4" },
            { label: "Веб", value: "6" },
            { label: "Вебтун", value: "7" },
            { label: "Додзинси", value: "3" },
            { label: "Сборник", value: "2" },
            { label: "Сингл", value: "5" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
    {
        key: "status",
        label: "Статус перевода",
        values: [
            { label: "Продолжается", value: "1" },
            { label: "Завершен", value: "2" },
            { label: "Заморожен", value: "3" },
            { label: "Заброшен", value: "4" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
    {
        key: "statuss",
        label: "Статус тайтла",
        values: [
            { label: "Онгоинг", value: "1" },
            { label: "Завершён", value: "2" },
            { label: "Анонс", value: "3" },
            { label: "Приостановлен", value: "4" },
            { label: "Выпуск прекращён", value: "5" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
    {
        key: "genres",
        label: "Жанры",
        values: [
            { label: "Арт", value: "32" },
            { label: "Безумие", value: "91" },
            { label: "Боевик", value: "34" },
            { label: "Боевые искусства", value: "35" },
            { label: "Вампиры", value: "36" },
            { label: "Военное", value: "89" },
            { label: "Гарем", value: "37" },
            { label: "Гендерная интрига", value: "38" },
            { label: "Героическое фэнтези", value: "39" },
            { label: "Демоны", value: "81" },
            { label: "Детектив", value: "40" },
            { label: "Детское", value: "88" },
            { label: "Дзёсэй", value: "41" },
            { label: "Драма", value: "43" },
            { label: "Игра", value: "44" },
            { label: "Исекай", value: "79" },
            { label: "История", value: "45" },
            { label: "Киберпанк", value: "46" },
            { label: "Кодомо", value: "76" },
            { label: "Комедия", value: "47" },
            { label: "Космос", value: "83" },
            { label: "Магия", value: "85" },
            { label: "Махо-сёдзё", value: "48" },
            { label: "Машины", value: "90" },
            { label: "Меха", value: "49" },
            { label: "Мистика", value: "50" },
            { label: "Музыка", value: "80" },
            { label: "Научная фантастика", value: "51" },
            { label: "Омегаверс", value: "77" },
            { label: "Пародия", value: "86" },
            { label: "Повседневность", value: "52" },
            { label: "Полиция", value: "82" },
            { label: "Постапокалиптика", value: "53" },
            { label: "Приключения", value: "54" },
            { label: "Психология", value: "55" },
            { label: "Романтика", value: "56" },
            { label: "Самурайский боевик", value: "57" },
            { label: "Сверхъестественное", value: "58" },
            { label: "Сёдзё", value: "59" },
            { label: "Сёдзё-ай", value: "60" },
            { label: "Сёнэн", value: "61" },
            { label: "Сёнэн-ай", value: "62" },
            { label: "Спорт", value: "63" },
            { label: "Супер сила", value: "87" },
            { label: "Сэйнэн", value: "64" },
            { label: "Трагедия", value: "65" },
            { label: "Триллер", value: "66" },
            { label: "Ужасы", value: "67" },
            { label: "Фантастика", value: "68" },
            { label: "Фэнтези", value: "69" },
            { label: "Школа", value: "70" },
            { label: "Эротика", value: "71" },
            { label: "Этти", value: "72" },
            { label: "Юри", value: "73" },
            { label: "Яой", value: "74" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
    {
        key: "tags",
        label: "Теги",
        values: [
            { label: "Авантюристы", value: "328" },
            { label: "Антигерой", value: "176" },
            { label: "Бессмертные", value: "333" },
            { label: "Боги", value: "218" },
            { label: "Борьба за власть", value: "309" },
            { label: "Брат и сестра", value: "360" },
            { label: "Ведьма", value: "339" },
            { label: "Видеоигры", value: "204" },
            { label: "Виртуальная реальность", value: "214" },
            { label: "Владыка демонов", value: "349" },
            { label: "Военные", value: "198" },
            { label: "Воспоминания из другого мира", value: "310" },
            { label: "Выживание", value: "212" },
            { label: "ГГ женщина", value: "294" },
            { label: "ГГ имба", value: "292" },
            { label: "ГГ мужчина", value: "295" },
            { label: "ГГ не ояш", value: "325" },
            { label: "ГГ не человек", value: "331" },
            { label: "ГГ ояш", value: "326" },
            { label: "Главный герой бог", value: "324" },
            { label: "Глупый ГГ", value: "298" },
            { label: "Горничные", value: "171" },
            { label: "Гуро", value: "306" },
            { label: "Гяру", value: "197" },
            { label: "Демоны", value: "157" },
            { label: "Драконы", value: "313" },
            { label: "Древний мир", value: "317" },
            { label: "Зверолюди", value: "163" },
            { label: "Зомби", value: "155" },
            { label: "Исторические фигуры", value: "323" },
            { label: "Кулинария", value: "158" },
            { label: "Культивация", value: "161" },
            { label: "ЛГБТ", value: "344" },
            { label: "ЛитРПГ", value: "319" },
            { label: "Лоли", value: "206" },
            { label: "Магия", value: "170" },
            { label: "Машинный перевод", value: "345" },
            { label: "Медицина", value: "159" },
            { label: "Межгалактическая война", value: "330" },
            { label: "Монстр Девушки", value: "207" },
            { label: "Монстры", value: "208" },
            { label: "Мрачный мир", value: "316" },
            { label: "Музыка", value: "358" },
            { label: "Музыка", value: "209" },
            { label: "Ниндзя", value: "199" },
            { label: "Обратный Гарем", value: "210" },
            { label: "Офисные Работники", value: "200" },
            { label: "Пираты", value: "341" },
            { label: "Подземелья", value: "314" },
            { label: "Политика", value: "311" },
            { label: "Полиция", value: "201" },
            { label: "Преступники / Криминал", value: "205" },
            { label: "Призраки / Духи", value: "196" },
            { label: "Призыватели", value: "329" },
            { label: "Прыжки между мирами", value: "321" },
            { label: "Путешествие в другой мир", value: "318" },
            { label: "Путешествие во времени", value: "213" },
            { label: "Рабы", value: "355" },
            { label: "Ранги силы", value: "312" },
            { label: "Реинкарнация", value: "154" },
            { label: "Самураи", value: "202" },
            { label: "Скрытие личности", value: "315" },
            { label: "Средневековье", value: "174" },
            { label: "Традиционные игры", value: "203" },
            { label: "Умный ГГ", value: "303" },
            { label: "Характерный рост", value: "332" },
            { label: "Хикикомори", value: "167" },
            { label: "Эволюция", value: "322" },
            { label: "Элементы РПГ", value: "327" },
            { label: "Эльфы", value: "217" },
            { label: "Якудза", value: "165" },
        ],
        inputType: filterInputs_1.FilterInputs.Checkbox,
    },
];
