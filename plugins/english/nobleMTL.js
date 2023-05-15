const cheerio = require('cheerio');
const languages = require('@libs/languages');
const fetchApi = require('@libs/fetchApi');
const fetchFile = require('@libs/fetchFile');

const pluginId = 'NobleMTL';
const baseUrl = 'https://www.noblemtl.com/';

async function popularNovels(page) {
    const link = `${baseUrl}series/?page=${page}&status=&order=popular`;

    const result = await fetchApi(link, {}, pluginId);
    const body = await result.text();

    const loadedCheerio = cheerio.load(body);

    const novels = [];

    loadedCheerio('article.bs').each(function () {
      const novelName = loadedCheerio(this).find('.ntitle').text().trim();
      let image = loadedCheerio(this).find('img');
      const novelCover = image.attr('data-src') || image.attr('src');

      const novelUrl = loadedCheerio(this).find('a').attr('href');

      const novel = {
        name: novelName,
        cover: novelCover,
        url: novelUrl,
      };

      novels.push(novel);
    });

    return novels;
};

async function parseNovelAndChapters(novelUrl) {
    const url = novelUrl;

    const result = await fetchApi(url, {}, pluginId);
    const body = await result.text();
    
    let loadedCheerio = cheerio.load(body);

    const novel = {
	url,
	chapters: [],
    };

    novel.name = loadedCheerio('.entry-title').text();

    novel.cover =
      loadedCheerio('img.wp-post-image').attr('data-src') ||
      loadedCheerio('img.wp-post-image').attr('src');

    loadedCheerio('div.spe > span').each(function () {
      const detailName = loadedCheerio(this).find('b').text().trim();
      const detail = loadedCheerio(this).find('b').next().text().trim();

      switch (detailName) {
        case 'Author:':
          novel.author = detail;
          break;
      }
      novel.status = loadedCheerio(this)
        .children('b') //select all the children
        .remove() //remove all the children
        .end() //again go back to selected element
        .text()
        .trim();
    });

    novel.genre = loadedCheerio('.genxed').text().trim().replace(/\s/g, ',');

    novel.summary = loadedCheerio('div[itemprop="description"]')
      .find('h3 , p.a')
      .remove()
      .end()
      .prop('innerHTML')
      .replace(/(<.*?>)/g, ' ')
      .replace(/(&.*;)/g, '\n');

    let chapter = [];

    loadedCheerio('.eplister')
      .find('li')
      .each(function () {
        const name =
          loadedCheerio(this).find('.epl-num').text() +
          ' - ' +
          loadedCheerio(this).find('.epl-title').text();

        const releaseTime = loadedCheerio(this).find('.epl-date').text().trim();

        const url = loadedCheerio(this).find('a').attr('href');

        chapter.push({ name, releaseTime, url });
      });

    novel.chapters = chapter.reverse();

    return novel;
};

async function parseChapter(chapterUrl) {
    const result = await fetchApi(chapterUrl, {}, pluginId);
    const body = await result.text();

    const loadedCheerio = cheerio.load(body);

    let chapterText = loadedCheerio('div.epcontent').html();

    return chapterText;
};

async function searchNovels(searchTerm) {
    const url = `${baseUrl}?s=${searchTerm}`;

    const result = await fetchApi(url, {}, pluginId);
    const body = await result.text();

    const loadedCheerio = cheerio.load(body);

    const novels = [];

    loadedCheerio('article.bs').each(function () {
      const novelName = loadedCheerio(this).find('.ntitle').text().trim();
      const novelCover = loadedCheerio(this).find('img').attr('src');
      const novelUrl = loadedCheerio(this).find('a').attr('href');

      novels.push({
        name: novelName,
        url: novelUrl,
        cover: novelCover,
      });
    });

    return novels;
};

async function fetchImage (url){
  const headers = {
    Referer: baseUrl,
  }
  return await fetchFile(url, {headers: headers});
};

module.exports = {
  id: pluginId,
  name: 'Noble Machine Translations',
  version: '1.0.0',
  icon: '',
  site: baseUrl,
  lang: languages.English,
  description: 'Korean and Chinese Machine Translated Novels',
  protected: false,
  fetchImage,
  popularNovels,
  parseNovelAndChapters,
  parseChapter,
  searchNovels,
};