const cheerio = require('cheerio');
const languages = require('@libs/languages');
const fetchApi = require('@libs/fetchApi');
const fetchFile = require('@libs/fetchFile');

const pluginId = 'wuxiaworld';
const baseUrl = 'https://www.wuxiaworld.com/';

async function popularNovels(page) {
  const link = `${baseUrl}api/novels`;

  const result = await fetchApi(link, {}, pluginId);
  const data = await result.json();

  let novels = [];

  data.items.map(novel => {
    let name = novel.name;
    let cover = novel.cover;
    let url = baseUrl + 'novel/' + novel.slug + '/';

    novels.push({
      name,
      cover,
      url,
    });
  });
  console.log(novels);
  return  novels;
};

async function parseNovelAndChapters(novelUrl) {
  const url = novelUrl;

  const result = await fetchApi(url, {}, pluginId);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  const novel = {
    url,
    chapters: [],
  };

  novel.name = loadedCheerio('h2').text();

  novel.cover = loadedCheerio('img.img-thumbnail').attr('src');

  novel.summary = loadedCheerio('h3')
    .filter(function () {
      return loadedCheerio(this).text().trim() === 'Synopsis';
    })
    .next()
    .text()
    .trim();

  novel.author = loadedCheerio('div > dt')
    .filter(function () {
      return loadedCheerio(this).text().trim() === 'Author:';
    })
    .next()
    .text();

  let genres = [];

  loadedCheerio('.genres')
    .find('div')
    .each(function (res) {
      genres.push(loadedCheerio(this).find('a').text());
    });

  novel.genre = genres.join(',');

  novel.status = null;

  novel.status = loadedCheerio('div.fr-view.pt-10').text().includes('Complete');

  let chapter = [];

  loadedCheerio('.chapter-item').each(function () {
    let name = loadedCheerio(this).text();
    name = name.replace(/[\t\n]/g, '');

    const releaseTime = null;

    let url = loadedCheerio(this).find('a').attr('href');

    chapter.push({ name, releaseTime, url });
  });

  novel.chapters = chapter;
  console.log(novel);
  return novel;
};

async function parseChapter(chapterUrl) {
  const result = await fetchApi(chapterUrl, {}, pluginId);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  loadedCheerio('.chapter-nav').remove();

  loadedCheerio('#chapter-content > script').remove();

  let chapterText = loadedCheerio('#chapter-content').html();

  return chapterText;
};

async function searchNovels(searchTerm) {
  const searchUrl = 'https://www.wuxiaworld.com/api/novels/search?query=';

  const url = `${searchUrl}${searchTerm}`;

  const result = await fetchApi(url);
  const data = await result.json();

  const novels = [];

  data.items.map(novel => {
    let name = novel.name;
    let cover = novel.cover;
    let url = baseUrl + 'novel/' + novel.slug + '/';

    novels.push({
      name,
      url,
      cover,
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
    name: 'Wuxia World',
    version: '0.1.0',
    icon: 'src/en/wuxiaworld/icon.png',
    site: baseUrl,
    lang: languages.English,
    description: 'Foremost English Publisher of Chinese and Korean Fantasy Web Novels and Light Novels',
    protected: false,
    fetchImage,
    popularNovels,
    parseNovelAndChapters,
    parseChapter,
    searchNovels,
};
