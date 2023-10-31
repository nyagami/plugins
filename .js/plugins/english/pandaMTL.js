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
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var PandaMTL = /** @class */ (function () {
    function PandaMTL() {
        this.id = "PandaMTL";
        this.name = "PandaMTL";
        this.icon = "src/en/wordpress/icon.png";
        this.site = "https://www.pandamtl.com/";
        this.version = "1.1.0";
        this.userAgent = "";
        this.cookieString = "";
        this.filters = [
            {
                key: "order",
                label: "Sort By",
                values: [
                    { label: "Default", value: "" },
                    { label: "A-Z", value: "title" },
                    { label: "Z-A", value: "titlereverse" },
                    { label: "Latest Update", value: "update" },
                    { label: "Latest Added", value: "latest" },
                    { label: "Popular", value: "popular" },
                ],
                inputType: filterInputs_1.FilterInputs.Picker,
            },
            {
                key: "status",
                label: "Status",
                values: [
                    { label: "All", value: "" },
                    { label: "Ongoing", value: "ongoing" },
                    { label: "Hiatus", value: "hiatus" },
                    { label: "Completed", value: "completed" },
                ],
                inputType: filterInputs_1.FilterInputs.Picker,
            },
            {
                key: "type",
                label: "Type",
                values: [
                    { label: "Light Novel (KR)", value: "light-novel-kr" },
                    { label: "Web Novel", value: "web-novel" },
                ],
                inputType: filterInputs_1.FilterInputs.Checkbox,
            },
            {
                key: "genres",
                label: "Genres",
                values: [
                    { label: "Action", value: "action" },
                    { label: "Adult", value: "adult" },
                    { label: "Adventure", value: "adventure" },
                    { label: "Comedy", value: "comedy" },
                    { label: "Ecchi", value: "ecchi" },
                    { label: "Fantasy", value: "fantasy" },
                    { label: "Harem", value: "harem" },
                    { label: "Josei", value: "josei" },
                    { label: "Martial Arts", value: "martial-arts" },
                    { label: "Mature", value: "mature" },
                    { label: "Romance", value: "romance" },
                    { label: "School Life", value: "school-life" },
                    { label: "Sci-fi", value: "sci-fi" },
                    { label: "Seinen", value: "seinen" },
                    { label: "Slice of Life", value: "slice-of-life" },
                    { label: "Smut", value: "smut" },
                    { label: "Sports", value: "sports" },
                    { label: "Supernatural", value: "supernatural" },
                    { label: "Tragedy", value: "tragedy" },
                ],
                inputType: filterInputs_1.FilterInputs.Checkbox,
            },
        ];
    }
    PandaMTL.prototype.popularNovels = function (pageNo, _a) {
        var filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var link, headers, body, loadedCheerio, novels;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        link = "".concat(this.site, "series/?page=").concat(pageNo);
                        if (filters) {
                            if (Array.isArray(filters.genres) && filters.genres.length) {
                                link += filters.genres.map(function (i) { return "&genre[]=".concat(i); }).join("");
                            }
                            if (Array.isArray(filters.type) && filters.type.length)
                                link += filters.type.map(function (i) { return "&lang[]=".concat(i); }).join("");
                        }
                        link += "&status=" + ((filters === null || filters === void 0 ? void 0 : filters.status) ? filters.status : "");
                        link += "&order=" + ((filters === null || filters === void 0 ? void 0 : filters.order) ? filters.order : "popular");
                        headers = new Headers();
                        if (this.cookieString) {
                            headers.append("cookie", this.cookieString);
                        }
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(link, { headers: headers }).then(function (result) {
                                return result.text();
                            })];
                    case 1:
                        body = _b.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio("article.maindet").each(function () {
                            var novelName = loadedCheerio(this).find("h2").text();
                            var image = loadedCheerio(this).find("img");
                            var novelCover = image.attr("data-src") || image.attr("src");
                            var novelUrl = loadedCheerio(this).find("h2 a").attr("href");
                            if (!novelUrl)
                                return;
                            var novel = {
                                name: novelName,
                                cover: novelCover,
                                url: novelUrl,
                            };
                            novels.push(novel);
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    PandaMTL.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, result, body, loadedCheerio, novel, chapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = novelUrl;
                        headers = new Headers();
                        if (this.cookieString) {
                            headers.append("cookie", this.cookieString);
                        }
                        return [4 /*yield*/, fetch(url, { headers: headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            url: url,
                            chapters: [],
                        };
                        novel.name = loadedCheerio("h1.entry-title").text();
                        novel.cover =
                            loadedCheerio("img.wp-post-image").attr("data-src") ||
                                loadedCheerio("img.wp-post-image").attr("src");
                        loadedCheerio(".serl:nth-child(3) > span").each(function () {
                            var detailName = loadedCheerio(this).text().trim();
                            var detail = loadedCheerio(this).next().text().trim();
                            switch (detailName) {
                                case "Author":
                                    novel.author = detail;
                                    break;
                            }
                        });
                        novel.status = loadedCheerio(".sertostat > span").attr("class");
                        novel.genres = loadedCheerio(".sertogenre")
                            .children("a")
                            .map(function (i, el) { return loadedCheerio(el).text(); })
                            .toArray()
                            .join(",");
                        novel.summary = loadedCheerio(".sersys")
                            .find("br")
                            .replaceWith("\n")
                            .end()
                            .text();
                        chapter = [];
                        loadedCheerio(".eplister")
                            .find("li")
                            .each(function () {
                            var chapterName = loadedCheerio(this).find(".epl-num").text() +
                                " - " +
                                loadedCheerio(this).find(".epl-title").text();
                            var releaseDate = loadedCheerio(this)
                                .find(".epl-date")
                                .text()
                                .trim();
                            var chapterUrl = loadedCheerio(this).find("a").attr("href");
                            if (!chapterUrl)
                                return;
                            chapter.push({
                                name: chapterName,
                                releaseTime: releaseDate,
                                url: chapterUrl,
                            });
                        });
                        novel.chapters = chapter.reverse();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    PandaMTL.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, result, body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new Headers();
                        if (this.cookieString) {
                            headers.append("cookie", this.cookieString);
                        }
                        return [4 /*yield*/, fetch(chapterUrl, { headers: headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterText = loadedCheerio(".epcontent").html() || "";
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    PandaMTL.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, result, body, loadedCheerio, novels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "?s=").concat(searchTerm);
                        headers = new Headers();
                        if (this.cookieString) {
                            headers.append("cookie", this.cookieString);
                        }
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url, { headers: headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio("article.maindet").each(function () {
                            var novelName = loadedCheerio(this).find("h2").text();
                            var image = loadedCheerio(this).find("img");
                            var novelCover = image.attr("data-src") || image.attr("src");
                            var novelUrl = loadedCheerio(this).find("h2 a").attr("href");
                            if (!novelUrl)
                                return;
                            novels.push({
                                name: novelName,
                                url: novelUrl,
                                cover: novelCover,
                            });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    PandaMTL.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchFile)(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PandaMTL;
}());
exports.default = new PandaMTL();
