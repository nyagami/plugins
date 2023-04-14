const cheerio = require('cheerio');
const fetchApi = require('@libs/fetchApi');
const fetchFile = require('@libs/fetchFile');
const languages = require('@libs/languages');

const pluginId = 'FWN.com';
const sourceName = "Web NOVEL";
const baseUrl = 'https://freewebnovel.com/';

async function popularNovels (page) {
  let url = baseUrl + 'completed-novel/' + page;

  const result = await fetchApi(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.li-row').each(function () {
    const novelName = loadedCheerio(this).find('.tit').text();
    const novelCover = loadedCheerio(this).find('img').attr('src');

    let novelUrl = 'https://freewebnovel.com' + loadedCheerio(this)
      .find('h3 > a')
      .attr('href')

    const novel = {
      name: novelName,
      cover: novelCover,
      url: novelUrl,
    };

    novels.push(novel);
  });

  return novels;
};

async function parseNovelAndChapters  (novelUrl) {
  const url = novelUrl;

  const result = await fetchApi(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novel = {};

  novel.url = url;

  novel.name = loadedCheerio('h1.tit').text();

  novel.cover = loadedCheerio('.pic > img').attr('src');

  novel.genres = loadedCheerio('[title=Genre]')
    .next()
    .text()
    .replace(/[\t\n]/g, '');

  novel.author = loadedCheerio('[title=Author]')
    .next()
    .text()
    .replace(/[\t\n]/g, '');

  novel.artist = null;

  novel.status = loadedCheerio('[title=Status]')
    .next()
    .text()
    .replace(/[\t\n]/g, '');

  let novelSummary = loadedCheerio('.inner').text().trim();
  novel.summary = novelSummary;

  let novelChapters = [];

  let latestChapter;

  loadedCheerio('h3.tit').each(function (res) {
    if (loadedCheerio(this).find('a').text() === novel.name) {
      latestChapter = loadedCheerio(this)
        .next()
        .find('span.s3')
        .text()
        .match(/\d+/);
    }
  });

  latestChapter = latestChapter[0];
  let prefixUrl = novelUrl.replace('.html', '/');

  for (let i = 1; i <= parseInt(latestChapter, 10); i++) {
    const chapterName = 'Chapter ' + i;

    const releaseDate = null;

    let chapterUrl = 'chapter-' + i;
    chapterUrl = `${prefixUrl}${chapterUrl}.html`
    const chapter = { name: chapterName, releaseTime: releaseDate, url: chapterUrl };

    novelChapters.push(chapter);
  }

  novel.chapters = novelChapters;

  return novel;
};

async function parseChapter  (chapterUrl) {
  const url = chapterUrl;
  const result = await fetchApi(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let chapterText = loadedCheerio('div.txt').html();

  return chapterText;
};

async function searchNovels  (searchTerm) {
  const url = baseUrl + 'search/';

  const formData = {
    searchkey: searchTerm,
  };

  const result = await fetchApi(url, {
    method: 'POST',
    body: formData,
  });
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.li-row > .li > .con').each(function () {
    const novelName = loadedCheerio(this).find('.tit').text();
    const novelCover = loadedCheerio(this)
      .find('.pic > a > img')
      .attr('data-cfsrc');

    let novelUrl = "https://freewebnovel.com" + loadedCheerio(this)
      .find('h3 > a')
      .attr('href')

    const novel = {
      name: novelName,
      cover: novelCover,
      url: novelUrl,
    };

    novels.push(novel);
  });

  return novels;
};

module.exports = {
    id: pluginId,
    name: sourceName,
    site: baseUrl,
    verison: '1.0.0',
    lang: languages.English,
    icon: 'src/en/freewebnovel/icon.png',
    popularNovels,
    parseNovelAndChapters,
    parseChapter,
    searchNovels,
    fetchImage: fetchFile,
};
