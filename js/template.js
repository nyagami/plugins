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
const cheerio = require('cheerio');
const fetchApi = require('@libs/fetchApi');
const fetchFile = require('@libs/fetchFile');
// const dayjs = require('dayjs');
// const FilterInputs = require('@libs/filterInputs');
// const novelStatus = require('@libs/novelStatus');
// const isUrlAbsolute = require('@libs/isAbsoluteUrl');
// const parseDate = require('@libs/parseDate');
function popularNovels(pageNo) {
    return __awaiter(this, void 0, void 0, function* () {
        const novels = [];
        /*
          Do something....
          novel = {
            name: '',
            url: '',      must be absolute
            cover: '',
          }
          novels.push(novel);
        */
        return novels;
    });
}
;
function parseNovelAndChapters(novelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const novel = {
            url: novelUrl,
            chapters: [],
        };
        /**
         * novel.name = '';
         * novel.cover = '';
         * novel.summary = '';
         * novel.author = '';
         * novel.artist = '';
         * novel.status = '';
         * novel.genres = '';   join by commas. For example: 'romcom, action, school'
         */
        /*
          Do something....
          chapter = {
            name: '',
            url: '',      must be absoulute
            releaseTime: '',
          }
          novel.chapters.push(chapter);
        */
        return novel;
    });
}
;
function parseChapter(chapterUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // Do something...
        const chapterText = '';
        return chapterText;
    });
}
;
function searchNovels(searchTerm, pageNo) {
    return __awaiter(this, void 0, void 0, function* () {
        const novels = [];
        /*
          Do something....
          novel = {
            name: '',
            url: '',      must be absolute
            cover: '',
          }
          novels.push(novel);
        */
        return novels;
    });
}
;
function fetchImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Some site cant fetch images normally (maybe need some headers)
        // Must return base64 of image
        return yield fetchFile(url, {});
    });
}
;
module.exports = {
    id,
    name: 'Source name',
    icon,
    version,
    site,
    protected: false,
    filters,
    fetchImage,
    popularNovels,
    parseNovelAndChapters,
    parseChapter,
    searchNovels,
};
