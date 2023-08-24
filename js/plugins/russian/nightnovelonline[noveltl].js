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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchImage = exports.searchNovels = exports.parseChapter = exports.parseNovelAndChapters = exports.popularNovels = exports.filters = exports.site = exports.version = exports.icon = exports.name = exports.id = void 0;
const cheerio_1 = require("cheerio");
const dayjs_1 = __importDefault(require("dayjs"));
const fetch_1 = require("@libs/fetch");
// import { parseMadaraDate } from "@libs/parseMadaraDate";
// import { isUrlAbsolute } from '@libs/isAbsoluteUrl';
// import { showToast } from "@libs/showToast";
const filterInputs_1 = require("@libs/filterInputs");
const novelStatus_1 = require("@libs/novelStatus");
const defaultCover_1 = require("@libs/defaultCover");
exports.id = "nightnovel";
exports.name = "Nightnovel";
exports.icon = "";
exports.version = "1.0.0";
exports.site = "https://nightnovel.online";
exports.filters = [{ "key": "tags", "label": "Тэги", "values": [{ "label": "Альтернативная реальность", "value": 30 }, { "label": "Амнезия", "value": 31 }, { "label": "Анал", "value": 33 }, { "label": "Ангелы", "value": 38 }, { "label": "Аристократия", "value": 51 }, { "label": "Артефакты", "value": 58 }, { "label": "Ассасины", "value": 61 }, { "label": "Банды", "value": 302 }, { "label": "БДСМ", "value": 77 }, { "label": "Беременность", "value": 551 }, { "label": "Боги", "value": 318 }, { "label": "Богини", "value": 316 }, { "label": "Боевая академия", "value": 75 }, { "label": "Божественная сила", "value": 317 }, { "label": "Влияние прошлого", "value": 517 }, { "label": "Враги становятся союзниками", "value": 238 }, { "label": "Вынужденные условия проживания", "value": 287 }, { "label": "Герои", "value": 341 }, { "label": "Героиня красавица", "value": 81 }, { "label": "R-18", "value": 571 }], "inputType": filterInputs_1.FilterInputs.Checkbox }];
const baseUrl = exports.site;
const domain = baseUrl.split('//')[1];
const popularNovels = function (page, { filters }) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, fetch_1.fetchApi)('https://api.novel.tl/api/site/v2/graphql', {
            method: 'post',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Alt-Used': 'api.novel.tl',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            referrer: baseUrl,
            body: JSON.stringify({
                operationName: 'Projects',
                query: 'query Projects($hostname:String! $filter:SearchFilter $page:Int $limit:Int){projects(section:{fullUrl:$hostname}filter:$filter page:{pageSize:$limit,pageNumber:$page}){content{title url covers{url}}}}',
                variables: {
                    filter: ((_b = (_a = filters === null || filters === void 0 ? void 0 : filters.tags) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 > 0) ? { tags: filters === null || filters === void 0 ? void 0 : filters.tags } : {},
                    hostname: domain,
                    limit: 40,
                    page,
                },
            }),
        });
        const json = yield result.json();
        const novels = (_e = (_d = (_c = json.data) === null || _c === void 0 ? void 0 : _c.projects) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.map((novel) => {
            var _a;
            return ({
                name: novel.title,
                url: baseUrl + '/r/' + novel.url,
                cover: ((_a = novel.covers[0]) === null || _a === void 0 ? void 0 : _a.url)
                    ? baseUrl + novel.covers[0].url
                    : defaultCover_1.defaultCover,
            });
        });
        return novels;
    });
};
exports.popularNovels = popularNovels;
const parseNovelAndChapters = function (novelUrl) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, fetch_1.fetchApi)('https://api.novel.tl/api/site/v2/graphql', {
            method: 'post',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Alt-Used': 'api.novel.tl',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            referrer: baseUrl,
            body: JSON.stringify({
                operationName: 'Book',
                query: 'query Book($url:String){project(project:{fullUrl:$url}){title translationStatus url covers{url}persons(langs:["ru","en","*"]roles:["author","illustrator","original_story","original_design"]){role name{firstName lastName}}genres{nameRu nameEng}tags{nameRu nameEng}annotation{text}subprojects{content{title volumes{content{url shortName chapters{title publishDate url published}}}}}}}',
                variables: {
                    hostname: domain,
                    project: novelUrl,
                    url: novelUrl,
                },
            }),
        });
        const json = yield result.json();
        const novel = {
            url: novelUrl,
            name: json.data.project.title,
            cover: ((_a = json.data.project.covers[0]) === null || _a === void 0 ? void 0 : _a.url)
                ? baseUrl + json.data.project.covers[0].url
                : defaultCover_1.defaultCover,
            summary: (0, cheerio_1.load)((_b = json.data.project.annotation) === null || _b === void 0 ? void 0 : _b.text).text(),
            author: json.data.project.persons[0].name.firstName +
                ' ' +
                json.data.project.persons[0].name.lastName,
            status: json.data.project.translationStatus === 'active'
                ? novelStatus_1.NovelStatus.Ongoing
                : novelStatus_1.NovelStatus.Completed,
        };
        let genres = []
            .concat(json.data.project.tags, json.data.project.genres)
            .map((item) => (item === null || item === void 0 ? void 0 : item.nameRu) || (item === null || item === void 0 ? void 0 : item.nameEng))
            .filter(item => item);
        if (genres.length > 0) {
            novel.genres = genres.join(',');
        }
        let novelChapters = [];
        json.data.project.subprojects.content.forEach((work) => work.volumes.content.forEach((volume) => volume.chapters.forEach((chapter) => (chapter === null || chapter === void 0 ? void 0 : chapter.published) &&
            novelChapters.push({
                name: volume.shortName + ' ' + chapter.title,
                url: novelUrl + '/' + volume.url + '/' + chapter.url,
                releaseTime: (0, dayjs_1.default)(chapter.publishDate).format('LLL'),
            }))));
        novel.chapters = novelChapters;
        return novel;
    });
};
exports.parseNovelAndChapters = parseNovelAndChapters;
const parseChapter = function (chapterUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, fetch_1.fetchApi)('https://api.novel.tl/api/site/v2/graphql', {
            method: 'post',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Alt-Used': 'api.novel.tl',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            referrer: baseUrl,
            body: JSON.stringify({
                operationName: 'EReaderData',
                query: 'query EReaderData($url:String!,$chapterSelector:Selector!){project(project:{fullUrl:$url}){title url}chapter(chapter:$chapterSelector){title text{text}}}',
                variables: {
                    chapterSelector: {
                        fullUrl: chapterUrl,
                    },
                    url: chapterUrl,
                },
            }),
        });
        const json = yield result.json();
        return (0, cheerio_1.load)(json.data.chapter.text.text).html();
    });
};
exports.parseChapter = parseChapter;
const searchNovels = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const result = yield (0, fetch_1.fetchApi)('https://api.novel.tl/api/site/v2/graphql', {
        method: 'post',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'Content-Type': 'application/json',
            'Alt-Used': 'api.novel.tl',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
        },
        referrer: baseUrl,
        body: JSON.stringify({
            operationName: 'Projects',
            query: 'query Projects($hostname:String! $filter:SearchFilter $page:Int $limit:Int){projects(section:{fullUrl:$hostname}filter:$filter page:{pageSize:$limit,pageNumber:$page}){content{title url covers{url}}}}',
            variables: {
                filter: {
                    query: searchTerm,
                },
                hostname: domain,
                limit: 40,
                page: 1,
            },
        }),
    });
    const json = yield result.json();
    const novels = [];
    (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json.data) === null || _a === void 0 ? void 0 : _a.projects) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.forEach((novel) => {
        var _a;
        return novels.push({
            name: novel.title,
            url: baseUrl + '/r/' + novel.url,
            cover: ((_a = novel.covers[0]) === null || _a === void 0 ? void 0 : _a.url)
                ? baseUrl + novel.covers[0].url
                : defaultCover_1.defaultCover,
        });
    });
    return novels;
});
exports.searchNovels = searchNovels;
const fetchImage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, fetch_1.fetchFile)(url, {});
});
exports.fetchImage = fetchImage;
