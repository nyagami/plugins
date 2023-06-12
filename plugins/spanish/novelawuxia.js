const fetchApi = require('@libs/fetchApi');
const fetchFile = require('@libs/fetchFile');
const cheerio = require('cheerio');

const pluginId = "awuxia.com"
const baseUrl = 'http://www.reinowuxia.com/';

function getNovelName(y) {
  return y.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

async function popularNovels  (page) {
  let url = baseUrl + 'p/todas-las-novelas.html';

  let headers ={
    'User-Agent':
      "'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
  };

  const result = await fetchApi(url, {
    method: 'GET',
    headers: headers,
  });
  const body = await result.text();

  let loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.post-body.entry-content')
    .find('a')
    .each(function () {
      let novelName = loadedCheerio(this)
        .attr('href')
        .split('/')
        .pop()
        .replace('.html', '');
      novelName = getNovelName(novelName);
      const novelCover = loadedCheerio(this).find('img').attr('src');

      let novelUrl = loadedCheerio(this).attr('href');

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

  let loadedCheerio = cheerio.load(body);

  let novel = {};

  novel.url = url;

  novel.name = loadedCheerio('h1.post-title').text().trim();

  novel.cover = loadedCheerio('div.separator').find('a').attr('href');

  novel.artist = '';
  novel.status = '';

  loadedCheerio('div > b').each(function () {
    const detailName = loadedCheerio(this).text();
    let detail = loadedCheerio(this)[0].nextSibling;

    if (detailName && detail) {
      detail = detail.nodeValue;

      if (detailName.includes('Autor')) {
        novel.author = detail.replace('Autor:', '');
      }

      if (detailName.includes('Estatus')) {
        novel.status = detail.replace('Estatus: ', '');
      }
      if (detailName.includes('Géneros:')) {
        novel.genres = detail.replace('Géneros: ', '').replace(/,\s/g, ',');
      }
    }
  });

  let novelChapters = [];

  loadedCheerio('div').each(function () {
    const detailName = loadedCheerio(this).text();
    if (detailName.includes('Sinopsis')) {
      novel.summary =
        loadedCheerio(this).next().text() !== ''
          ? loadedCheerio(this).next().text().replace('Sinopsis', '').trim()
          : loadedCheerio(this)
              .next()
              .next()
              .text()
              .replace('Sinopsis', '')
              .trim();
    }

    if (detailName.includes('Lista de Capítulos')) {
      loadedCheerio(this)
        .find('a')
        .each(function (res) {
          const chapterName = loadedCheerio(this).text();
          let chapterUrl = loadedCheerio(this).attr('href');
          const releaseDate = null;

          if (
            chapterName &&
            chapterUrl &&
            !novelChapters.some(chap => chap.name === chapterName)
          ) {
            const chapter = {
              name: chapterName,
              releaseTime: releaseDate,
              url: chapterUrl,
            };

            novelChapters.push(chapter);
          }
        });
    }
  });

  novel.chapters = novelChapters;

  return novel;
};

async function parseChapter  (chapterUrl)  {
  const url = chapterUrl;

  const result = await fetchApi(url);
  const body = await result.text();

  let loadedCheerio = cheerio.load(body);

  let chapterText = loadedCheerio('.post-body.entry-content').html();

  return chapterText;
};

const searchNovels = async searchTerm => {
  const url = `${baseUrl}search?q=${searchTerm}`;

  const result = await fetchApi(url);
  const body = await result.text();

  let loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.date-outer').each(function () {
    let novelName = loadedCheerio(this)
      .find('a')
      .attr('href')
      .split('/')
      .pop()
      .replace(/-capitulo(.*?).html/, '');

    const novelUrl = novelName + '.html/';

    novelName = getNovelName(novelName);

    const exists = novels.some(novel => novel.novelName === novelName);

    if (!exists) {
      const novelCover = null;
      const novel = {
        name: novelName,
        cover: novelCover,
        url: novelUrl,
      };

      novels.push(novel);
    }
  });

  return novels;
};

module.exports = {
    id: pluginId,
    name: "ReinoWuxia",
    site: baseUrl,
    version: '1.0.0',
    icon: 'src/es/novelawuxia/icon.png',
    popularNovels,
    parseNovelAndChapters,
    parseChapter,
    searchNovels,
    fetchImage: fetchFile,
};