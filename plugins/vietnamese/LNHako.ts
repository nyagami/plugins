import { CheerioAPI, load as parseHTML } from "cheerio";
import { fetchApi, fetchFile } from "@libs/fetch";
import { Plugin } from "@typings/plugin";
import { isUrlAbsolute } from "@libs/isAbsoluteUrl";
import { Filter, FilterInputs } from "@libs/filterInputs";
class HakoPlugin implements Plugin.PluginBase {
    id: string;
    name: string;
    icon: string;
    site: string;
    version: string;
    userAgent: string;
    cookieString: string;
    constructor(){
        this.id = "ln.hako";
        this.name = "Hako";
        this.icon = "src/vi/hakolightnovel/icon.png";
        this.site = "https://ln.hako.vn";
        this.version = "1.0.0";
        this.userAgent = "";
        this.cookieString = "";
    }
    parseNovels(loadedCheerio: CheerioAPI){
        const novels: Plugin.NovelItem[] = [];
        loadedCheerio(".row > .thumb-item-flow").each((index, ele) => {
            let url = loadedCheerio(ele)
                .find("div.thumb_attr.series-title > a")
                .attr("href");

            if (url && !isUrlAbsolute(url)) {
                url = this.site + url;
            }

            if (url) {
                const name = loadedCheerio(ele)
                    .find(".series-title")
                    .text()
                    .trim();
                let cover = loadedCheerio(ele)
                    .find(".img-in-ratio")
                    .attr("data-bg");

                if (cover && !isUrlAbsolute(cover)) {
                    cover = this.site + cover;
                }

                const novel = {name, url, cover};

                novels.push(novel);
            }
        });
        return novels;
    }
    async popularNovels(pageNo: number, {filters}: Plugin.PopularNovelsOptions): Promise<Plugin.NovelItem[]> {
        let link = this.site;

        if(!filters?.genre){
            link += '/danh-sach/' + (filters?.az ? filters.az : "") + '?';
        } else {
            link += '/the-loai/' + filters.genre + '?';
        }
        
        if (Array.isArray(filters?.type) && filters?.type.length) {
                link += filters.type.map((i) => `${i}=1`).join("&");
        }
        if (Array.isArray(filters?.status) && filters?.status.length) {
            link += filters.status.map((i) => `${i}=1`).join("&");
        }

        link += "&sapxep=" + (filters?.sort ? filters.sort : "topthang");

        link += "&page=" + pageNo;

        console.log(link);

        const result = await fetch(link);
        const body = await result.text();
        const loadedCheerio = parseHTML(body);
        return this.parseNovels(loadedCheerio);
    }
    async parseNovelAndChapters(novelUrl: string): Promise<Plugin.SourceNovel> {
        const novel: Plugin.SourceNovel = {
            url: novelUrl,
        };
        const result = await fetch(novelUrl);
        const body = await result.text();
    
        let loadedCheerio = parseHTML(body);
    
        novel.name = loadedCheerio(".series-name").text();
    
        const background =
            loadedCheerio(".series-cover > .a6-ratio > div").attr("style") || "";
        const novelCover = background.substring(
            background.indexOf("http"),
            background.length - 2
        );
    
        novel.cover = novelCover
            ? isUrlAbsolute(novelCover)
                ? novelCover
                : this.site + novelCover
            : "";
    
        novel.summary = loadedCheerio(".summary-content").text().trim();
    
        novel.author = loadedCheerio(
            "#mainpart > div:nth-child(2) > div > div:nth-child(1) > section > main > div.top-part > div > div.col-12.col-md-9 > div.series-information > div:nth-child(2) > span.info-value > a"
        )
            .text()
            .trim();
    
        novel.genres = loadedCheerio(".series-gernes")
            .text()
            .trim()
            .replace(/ +/g, " ")
            .split("\n")
            .filter((e) => e.trim())
            .join(", ");
    
        novel.status = loadedCheerio(
            "#mainpart > div:nth-child(2) > div > div:nth-child(1) > section > main > div.top-part > div > div.col-12.col-md-9 > div.series-information > div:nth-child(4) > span.info-value > a"
        )
            .text()
            .trim();
    
        const chapters: Plugin.ChapterItem[] = [];
        loadedCheerio(".list-chapters li").each((index, ele) => {
            let chapterUrl = loadedCheerio(ele).find("a").attr("href");
    
            if (chapterUrl && !isUrlAbsolute(chapterUrl)) {
                chapterUrl = this.site + chapterUrl;
            }
    
            if (chapterUrl) {
                const chapterName = loadedCheerio(ele)
                    .find(".chapter-name")
                    .text()
                    .trim();
                const releaseTime = loadedCheerio(ele)
                    .find(".chapter-time")
                    .text();
    
                const chapter = {
                    name: chapterName,
                    releaseTime: releaseTime,
                    url: chapterUrl,
                };
    
                chapters.push(chapter);
            }
        });
        novel.chapters = chapters;
        return novel;
    }
    async parseChapter(chapterUrl: string): Promise<string> {
        const result = await fetch(chapterUrl);
        const body = await result.text();

        const loadedCheerio = parseHTML(body);

        const chapterText = loadedCheerio("#chapter-content").html() || "";

        return chapterText;
    }
    async searchNovels(searchTerm: string, pageNo?: number | undefined): Promise<Plugin.NovelItem[]> {
        const url = this.site + "/tim-kiem?keywords=" + searchTerm;
        const result = await fetch(url);
        const body = await result.text();
        const loadedCheerio = parseHTML(body);
        return this.parseNovels(loadedCheerio);
    }
    async fetchImage(url: string): Promise<string | undefined> {
        const headers = {
            Referer: "https://ln.hako.vn",
        };
        return await fetchFile(url, { headers: headers });
    }

    filters = [
        {
            key: "sort",
            label: "Sắp xếp",
            values: [
                { label: "A - Z", value: "tentruyen" },

                { label: "Z - A", value: "tentruyenza" },
            
                { label: "Mới cập nhật", value: "capnhat" },
            
                { label: "Truyện mới", value: "truyenmoi" },
            
                { label: "Theo dõi", value: "theodoi" },
            
                { label: "Top toàn thời gian", value: "top" },
            
                { label: "Top tháng", value: "topthang" },
            
                { label: "Số từ", value: "sotu" }
            ],
            inputType: FilterInputs.Picker,
        },
        {
            key: "az",
            label: "Chữ cái",
            values: [
                { label: "Tất cả", value: "" },

                { label: "#", value: "khac" },

                { label: "A", value: "a" },

                { label: "B", value: "b" },

                { label: "C", value: "c" },

                { label: "D", value: "d" },

                { label: "E", value: "e" },

                { label: "F", value: "f" },

                { label: "G", value: "g" },

                { label: "H", value: "h" },

                { label: "I", value: "i" },

                { label: "J", value: "j" },

                { label: "K", value: "k" },

                { label: "L", value: "l" },

                { label: "M", value: "m" },

                { label: "N", value: "n" },

                { label: "O", value: "o" },

                { label: "P", value: "p" },

                { label: "Q", value: "q" },

                { label: "R", value: "r" },

                { label: "S", value: "s" },

                { label: "T", value: "t" },

                { label: "U", value: "u" },

                { label: "V", value: "v" },

                { label: "W", value: "w" },

                { label: "X", value: "x" },

                { label: "Y", value: "y" },

                { label: "Z", value: "z" }
            ],
            inputType: FilterInputs.Picker,
        },
        {
            key: "genre",
            label: "Thể loại",
            values: [
                { label: "Action", value: "action" },

                { label: "Adapted to Anime", value: "adapted-to-anime" },
            
                { label: "Adapted to Drama CD", value: "adapted-to-drama-cd" },
            
                { label: "Adapted to Manga", value: "adapted-to-manga" },
            
                { label: "Adult", value: "adult" },
            
                { label: "Adventure", value: "adventure" },
            
                { label: "Age Gap", value: "age-gap" },
            
                { label: "Boys Love", value: "boys-love" },
            
                { label: "Character Growth", value: "character-growth" },
            
                { label: "Chinese Novel", value: "chinese-novel" },
            
                { label: "Comedy", value: "comedy" },
            
                { label: "Cooking", value: "cooking" },
            
                { label: "Different Social Status", value: "different-social-status" },
            
                { label: "Drama", value: "drama" },
            
                { label: "Ecchi", value: "ecchi" },
            
                { label: "English Novel", value: "english-novel" },
            
                { label: "Fantasy", value: "fantasy" },
            
                { label: "Female Protagonist", value: "female-protagonist" },
            
                { label: "Game", value: "game" },
            
                { label: "Gender Bender", value: "gender-bender" },
            
                { label: "Harem", value: "harem" },
            
                { label: "Historical", value: "historical" },
            
                { label: "Horror", value: "horror" },
            
                { label: "Incest", value: "incest" },
            
                { label: "Isekai", value: "isekai" },
            
                { label: "Josei", value: "josei" },
            
                { label: "Korean Novel", value: "korean-novel" },
            
                { label: "Magic", value: "magic" },
            
                { label: "Martial Arts", value: "martial-arts" },
            
                { label: "Mature", value: "mature" },
            
                { label: "Mecha", value: "mecha" },
            
                { label: "Military", value: "military" },
            
                { label: "Misunderstanding", value: "misunderstanding" },
            
                { label: "Mystery", value: "mystery" },
            
                { label: "Netorare", value: "netorare" },
            
                { label: "One shot", value: "one-shot" },
            
                { label: "Otome Game", value: "otome-game" },
            
                { label: "Parody", value: "parody" },
            
                { label: "Psychological", value: "psychological" },
            
                { label: "Reverse Harem", value: "reverse-harem" },
            
                { label: "Romance", value: "romance" },
            
                { label: "School Life", value: "school-life" },
            
                { label: "Science Fiction", value: "science-fiction" },
            
                { label: "Seinen", value: "seinen" },
            
                { label: "Shoujo", value: "shoujo" },
            
                { label: "Shoujo ai", value: "shoujo-ai" },
            
                { label: "Shounen", value: "shounen" },
            
                { label: "Shounen ai", value: "shounen-ai" },
            
                { label: "Slice of Life", value: "slice-of-life" },
            
                { label: "Slow Life", value: "slow-life" },
            
                { label: "Sports", value: "sports" },
            
                { label: "Super Power", value: "super-power" },
            
                { label: "Supernatural", value: "supernatural" },
            
                { label: "Suspense", value: "suspense" },
            
                { label: "Tragedy", value: "tragedy" },
            
                { label: "Wars", value: "wars" },
            
                { label: "Web Novel", value: "web-novel" },
            
                { label: "Workplace", value: "workplace" },
            
                { label: "Yuri", value: "yuri" }
            ],
            inputType: FilterInputs.Picker,
        },
        {
            key: "type",
            label: "Loại truyện",
            values: [
                { label: "Truyện dịch", value: "truyendich" },

                { label: "Truyện sáng tác", value: "sangtac" },

                { label: "Convert", value: "convert" },
            ],
            inputType: FilterInputs.Checkbox,
        },
        {
            key: "status",
            label: "Trạng thái",
            values: [
                { label: "Đang tiến hành", value: "dangtienhanh" },

                { label: "Tạm ngưng", value: "tamngung" },

                { label: "Đã hoàn thành", value: "hoanthanh" },
            ],
            inputType: FilterInputs.Checkbox,
        },
    ];
}

export default new HakoPlugin();
