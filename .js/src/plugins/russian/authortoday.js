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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var filterInputs_1 = require("@libs/filterInputs");
var defaultCover_1 = require("@libs/defaultCover");
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var cheerio_1 = require("cheerio");
var storage_1 = require("@libs/storage");
var dayjs_1 = __importDefault(require("dayjs"));
var AuthorToday = /** @class */ (function () {
    function AuthorToday() {
        var _this = this;
        this.id = 'AT';
        this.name = 'Автор Тудей';
        this.icon = 'src/ru/authortoday/icon.png';
        this.site = 'https://author.today';
        this.apiSite = 'https://api.author.today/v1/';
        this.imageSite = 'https://cm.author.today/content/';
        this.version = '1.1.1';
        this.resolveUrl = function (path, isNovel) {
            return _this.site + (isNovel ? '/work/' : '/reader/') + path;
        };
        this.getUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var user, currentUser, result, loginUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = storage_1.storage.get('user') || { userId: '', token: 'guest' };
                        if (!(user && user.userId && user.token)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.apiSite + 'account/current-user', {
                                headers: {
                                    Authorization: 'Bearer ' + user.token || 'guest',
                                },
                            }).then(function (res) { return res.json(); })];
                    case 1:
                        currentUser = _a.sent();
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) && !currentUser.isDisabled)
                            return [2 /*return*/, user];
                        storage_1.storage.delete('user');
                        user = { userId: '', token: 'guest' };
                        _a.label = 2;
                    case 2: return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + '/account/bearer-token')];
                    case 3:
                        result = _a.sent();
                        if (result.url.includes('Login?ReturnUrl=')) {
                            return [2 /*return*/, user]; //It looks like the user has lost the session
                        }
                        return [4 /*yield*/, result.json()];
                    case 4:
                        loginUser = _a.sent();
                        user = { userId: loginUser.userId, token: loginUser.token };
                        storage_1.storage.set('user', user, //for some reason they're ending an hour early.
                        new Date(loginUser.expires).getTime() - 1 * 60 * 60 * 1000);
                        return [2 /*return*/, user]; //user authorized successfully
                }
            });
        }); };
        this.filters = {
            sort: {
                label: 'Сортировка',
                value: 'popular',
                options: [
                    { label: 'По популярности', value: 'popular' },
                    { label: 'По количеству лайков', value: 'likes' },
                    { label: 'По комментариям', value: 'comments' },
                    { label: 'По новизне', value: 'recent' },
                    { label: 'По просмотрам', value: 'views' },
                    { label: 'Набирающие популярность', value: 'trending' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            genre: {
                label: 'Жанры',
                value: '',
                options: [
                    { label: 'Все', value: '' },
                    { label: 'Альтернативная история', value: 'sf-history' },
                    { label: 'Антиутопия', value: 'dystopia' },
                    { label: 'Бизнес-литература', value: 'biznes-literatura' },
                    { label: 'Боевая фантастика', value: 'sf-action' },
                    { label: 'Боевик', value: 'action' },
                    { label: 'Боевое фэнтези', value: 'fantasy-action' },
                    { label: 'Бояръ-Аниме', value: 'boyar-anime' },
                    { label: 'Героическая фантастика', value: 'sf-heroic' },
                    { label: 'Героическое фэнтези', value: 'heroic-fantasy' },
                    { label: 'Городское фэнтези', value: 'urban-fantasy' },
                    { label: 'Детектив', value: 'detective' },
                    { label: 'Детская литература', value: 'detskaya-literatura' },
                    { label: 'Документальная проза', value: 'non-fiction' },
                    { label: 'Историческая проза', value: 'historical-fiction' },
                    { label: 'Исторические приключения', value: 'historical-adventure' },
                    { label: 'Исторический детектив', value: 'historical-mystery' },
                    { label: 'Исторический любовный роман', value: 'historical-romance' },
                    { label: 'Историческое фэнтези', value: 'historical-fantasy' },
                    { label: 'Киберпанк', value: 'cyberpunk' },
                    { label: 'Короткий любовный роман', value: 'short-romance' },
                    { label: 'Космическая фантастика', value: 'sf-space' },
                    { label: 'ЛитРПГ', value: 'litrpg' },
                    { label: 'Любовное фэнтези', value: 'love-fantasy' },
                    { label: 'Любовные романы', value: 'romance' },
                    { label: 'Мистика', value: 'paranormal' },
                    { label: 'Назад в СССР', value: 'back-to-ussr' },
                    { label: 'Научная фантастика', value: 'science-fiction' },
                    { label: 'Подростковая проза', value: 'teen-prose' },
                    { label: 'Политический роман', value: 'political-fiction' },
                    { label: 'Попаданцы', value: 'popadantsy' },
                    { label: 'Попаданцы в космос', value: 'popadantsy-v-kosmos' },
                    {
                        label: 'Попаданцы в магические миры',
                        value: 'popadantsy-v-magicheskie-miry',
                    },
                    { label: 'Попаданцы во времени', value: 'popadantsy-vo-vremeni' },
                    { label: 'Постапокалипсис', value: 'postapocalyptic' },
                    { label: 'Поэзия', value: 'poetry' },
                    { label: 'Приключения', value: 'adventure' },
                    { label: 'Публицистика', value: 'publicism' },
                    { label: 'Развитие личности', value: 'razvitie-lichnosti' },
                    { label: 'Разное', value: 'other' },
                    { label: 'РеалРПГ', value: 'realrpg' },
                    { label: 'Романтическая эротика', value: 'romantic-erotika' },
                    { label: 'Сказка', value: 'fairy-tale' },
                    { label: 'Современная проза', value: 'modern-prose' },
                    { label: 'Современный любовный роман', value: 'contemporary-romance' },
                    { label: 'Социальная фантастика', value: 'sf-social' },
                    { label: 'Стимпанк', value: 'steampunk' },
                    { label: 'Темное фэнтези', value: 'dark-fantasy' },
                    { label: 'Триллер', value: 'thriller' },
                    { label: 'Ужасы', value: 'horror' },
                    { label: 'Фантастика', value: 'sci-fi' },
                    {
                        label: 'Фантастический детектив',
                        value: 'detective-science-fiction',
                    },
                    { label: 'Фанфик', value: 'fanfiction' },
                    { label: 'Фэнтези', value: 'fantasy' },
                    { label: 'Шпионский детектив', value: 'spy-mystery' },
                    { label: 'Эпическое фэнтези', value: 'epic-fantasy' },
                    { label: 'Эротика', value: 'erotica' },
                    { label: 'Эротическая фантастика', value: 'sf-erotika' },
                    { label: 'Эротический фанфик', value: 'fanfiction-erotika' },
                    { label: 'Эротическое фэнтези', value: 'fantasy-erotika' },
                    { label: 'Юмор', value: 'humor' },
                    { label: 'Юмористическая фантастика', value: 'sf-humor' },
                    { label: 'Юмористическое фэнтези', value: 'ironical-fantasy' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            form: {
                label: 'Форма произведения',
                value: 'any',
                options: [
                    { label: 'Любой', value: 'any' },
                    { label: 'Перевод', value: 'translation' },
                    { label: 'Повесть', value: 'tale' },
                    { label: 'Рассказ', value: 'story' },
                    { label: 'Роман', value: 'novel' },
                    { label: 'Сборник поэзии', value: 'poetry' },
                    { label: 'Сборник рассказов', value: 'story-book' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            state: {
                label: 'Статус произведения',
                value: 'any',
                options: [
                    { label: 'Любой статус', value: 'any' },
                    { label: 'В процессе', value: 'in-progress' },
                    { label: 'Завершено', value: 'finished' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            series: {
                label: 'Статус цикла',
                value: 'any',
                options: [
                    { label: 'Не важно', value: 'any' },
                    { label: 'Вне цикла', value: 'out' },
                    { label: 'Цикл завершен', value: 'finished' },
                    { label: 'Цикл не завершен', value: 'unfinished' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            access: {
                label: 'Тип доступа',
                value: 'any',
                options: [
                    { label: 'Любой', value: 'any' },
                    { label: 'Платный', value: 'paid' },
                    { label: 'Бесплатный', value: 'free' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            promo: {
                label: 'Промо-фрагмент',
                value: 'hide',
                options: [
                    { label: 'Скрывать', value: 'hide' },
                    { label: 'Показывать', value: 'show' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    AuthorToday.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var url, result, novels;
            var _this = this;
            var _c, _d, _e, _f, _g, _h, _j, _k;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        url = this.apiSite + 'catalog/search?page=' + pageNo;
                        if ((_c = filters === null || filters === void 0 ? void 0 : filters.genre) === null || _c === void 0 ? void 0 : _c.value) {
                            url += '&genre=' + filters.genre.value;
                        }
                        url +=
                            '&sorting=' +
                                (showLatestNovels ? 'recent' : ((_d = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _d === void 0 ? void 0 : _d.value) || 'popular');
                        url += '&form=' + (((_e = filters === null || filters === void 0 ? void 0 : filters.form) === null || _e === void 0 ? void 0 : _e.value) || 'any');
                        url += '&state=' + (((_f = filters === null || filters === void 0 ? void 0 : filters.state) === null || _f === void 0 ? void 0 : _f.value) || 'any');
                        url += '&series=' + (((_g = filters === null || filters === void 0 ? void 0 : filters.series) === null || _g === void 0 ? void 0 : _g.value) || 'any');
                        url += '&access=' + (((_h = filters === null || filters === void 0 ? void 0 : filters.access) === null || _h === void 0 ? void 0 : _h.value) || 'any');
                        url += '&promo=' + (((_j = filters === null || filters === void 0 ? void 0 : filters.promo) === null || _j === void 0 ? void 0 : _j.value) || 'hide');
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url, {
                                headers: {
                                    Authorization: 'Bearer guest',
                                },
                            }).then(function (res) { return res.json(); })];
                    case 1:
                        result = _l.sent();
                        novels = [];
                        if (result.code === 'NotFound') {
                            return [2 /*return*/, novels];
                        }
                        (_k = result === null || result === void 0 ? void 0 : result.searchResults) === null || _k === void 0 ? void 0 : _k.forEach(function (novel) {
                            return novels.push({
                                name: novel.title,
                                cover: novel.coverUrl ? _this.imageSite + novel.coverUrl : defaultCover_1.defaultCover,
                                path: novel.id.toString(),
                            });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    AuthorToday.prototype.parseNovel = function (workID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, book, novel, chaptersJSON, chapters;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!!this.user) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getUser()];
                    case 1:
                        _a.user = _e.sent();
                        _e.label = 2;
                    case 2: return [4 /*yield*/, (0, fetch_1.fetchApi)(this.apiSite + 'work/' + workID + '/details', {
                            headers: {
                                Authorization: 'Bearer ' + ((_b = this.user) === null || _b === void 0 ? void 0 : _b.token) || 'guest',
                            },
                        }).then(function (res) { return res.json(); })];
                    case 3:
                        book = _e.sent();
                        novel = {
                            path: workID,
                            name: book.title,
                            cover: book.coverUrl ? book.coverUrl.split('?')[0] : defaultCover_1.defaultCover,
                            genres: (_c = book.tags) === null || _c === void 0 ? void 0 : _c.join(', '),
                            summary: '',
                            author: book.originalAuthor ||
                                book.authorFIO ||
                                book.coAuthorFIO ||
                                book.secondCoAuthorFIO ||
                                book.translator ||
                                '',
                            status: book.isFinished ? novelStatus_1.NovelStatus.Completed : novelStatus_1.NovelStatus.Ongoing,
                        };
                        if (book.annotation) {
                            novel.summary += book.annotation + '\n';
                        }
                        if (book.authorNotes) {
                            novel.summary += 'Примечания автора:\n' + book.authorNotes;
                        }
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.apiSite + 'work/' + workID + '/content', {
                                headers: {
                                    Authorization: 'Bearer ' + ((_d = this.user) === null || _d === void 0 ? void 0 : _d.token) || 'guest',
                                },
                            }).then(function (res) { return res.json(); })];
                    case 4:
                        chaptersJSON = _e.sent();
                        chapters = [];
                        chaptersJSON.forEach(function (chapter, chapterIndex) {
                            if (chapter.isAvailable && !chapter.isDraft) {
                                chapters.push({
                                    name: chapter.title || 'Глава ' + (chapterIndex + 1),
                                    path: workID + '/' + chapter.id,
                                    releaseTime: (0, dayjs_1.default)(chapter.publishTime || chapter.lastModificationTime).format('LLL'),
                                    chapterNumber: (chapter.sortOrder || chapterIndex) + 1,
                                });
                            }
                        });
                        novel.chapters = chapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    AuthorToday.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, workID, chapterID, _b, result, chapterText;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = chapterPath.split('/'), workID = _a[0], chapterID = _a[1];
                        if (!!this.user) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, this.getUser()];
                    case 1:
                        _b.user = _e.sent();
                        _e.label = 2;
                    case 2: return [4 /*yield*/, (0, fetch_1.fetchApi)(this.apiSite + "work/".concat(workID, "/chapter/").concat(chapterID, "/text"), {
                            headers: {
                                Authorization: 'Bearer ' + ((_c = this.user) === null || _c === void 0 ? void 0 : _c.token) || 'guest',
                            },
                        }).then(function (res) { return res.json(); })];
                    case 3:
                        result = _e.sent();
                        if (result.code) {
                            return [2 /*return*/, result.code + '\n' + (result === null || result === void 0 ? void 0 : result.message)];
                        }
                        chapterText = decrypt(result.text, result.key, (_d = this.user) === null || _d === void 0 ? void 0 : _d.userId);
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    AuthorToday.prototype.searchNovels = function (searchTerm_1) {
        return __awaiter(this, arguments, void 0, function (searchTerm, pageNo) {
            var url, result, loadedCheerio, novels;
            if (pageNo === void 0) { pageNo = 1; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.site + '/search?category=works&q=' + searchTerm + '&page=' + pageNo;
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        result = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(result);
                        novels = [];
                        loadedCheerio('a.work-row').each(function (index, element) {
                            var name = loadedCheerio(element)
                                .find('h4[class="work-title"]')
                                .text()
                                .trim();
                            var cover = loadedCheerio(element).find('img').attr('data-src');
                            var path = loadedCheerio(element).attr('href');
                            cover = cover ? cover.split('?')[0] : defaultCover_1.defaultCover;
                            if (!path)
                                return;
                            novels.push({ name: name, cover: cover, path: path.replace('/work/', '') });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    return AuthorToday;
}());
exports.default = new AuthorToday();
function decrypt(encrypt, encryptedKey, userId) {
    if (userId === void 0) { userId = ''; }
    var key = encryptedKey.split('').reverse().join('') + '@_@' + userId;
    var keyBytes = key.split('').map(function (char) { return char.charCodeAt(); });
    var keyLength = keyBytes.length;
    var text = '';
    for (var i = 0; i < encrypt.length; i++) {
        text += String.fromCharCode(encrypt.charCodeAt(i) ^ keyBytes[i % keyLength]);
    }
    return text;
}
