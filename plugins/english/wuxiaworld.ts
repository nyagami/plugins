import { fetchApi, fetchFile, fetchProto } from "@libs/fetch";
import { Plugin } from "@typings/plugin";
import { Filters } from "@libs/filterInputs";

interface NovelEntry {
    name: string;
    coverUrl: string;
    slug: string;
}

interface ChapterListing {
    name: string,
    slug: string;
    offset: number;
}

class WuxiaWorld implements Plugin.PluginBase {
    id = "wuxiaworld";
    name = "Wuxia World";
    icon = "src/en/wuxiaworld/icon.png";
    site = "https://www.wuxiaworld.com/";
    filters?: Filters | undefined;
    version = "0.5.0";

    parseNovels(data: {items: NovelEntry[]}){
        const novels: Plugin.NovelItem[] = [];

        data.items.map((novel: NovelEntry) => {
            const name = novel.name;
            const cover = novel.coverUrl;
            const path = novel.slug; /*novel/${novel.slug}/*/

            novels.push({
                name,
                cover,
                path,
            });
        });

        return novels;
    }

    async popularNovels(pageNo: number, options: Plugin.PopularNovelsOptions<Filters>): Promise<Plugin.NovelItem[]> {
        const link = `${this.site}api/novels`;

        const result = await fetchApi(link);
        const data = await result.json();

        return this.parseNovels(data)
    }


    async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
        const data = await fetchProto(
            {
                proto: this.proto,
                requestType: 'GetNovelRequest',
                responseType: 'GetNovelResponse',
                requestData: {slug: novelPath},
            },
            'https://api2.wuxiaworld.com/wuxiaworld.api.v2.Novels/GetNovel',
            {
                headers: {
                    "Content-Type": "application/grpc-web+proto",
                }
            }
        )
        
        const novelInfo = JSON.parse(data);

        const novel: Plugin.SourceNovel = {
            path: novelPath,
            name: novelInfo.item.name || "Untitled",
            cover: novelInfo.item.coverUrl.value,
            summary: novelInfo.item.description.value + '\n' + novelInfo.item.synopsis.value,
            author: novelInfo.item.authorName.value,
            genres: novelInfo.item.genres,
            chapters: [],
        };

        // novel.summary = loadedCheerio('.relative > .absolute:first')
  		// 	   .children('span')
  		// 	   .map((i,el) => loadedCheerio(el).text().trim())
        //     .toArray()
        //     .join('\n');

        // novel.genres = loadedCheerio("a.MuiLink-underlineNone")
  		// 	   .map((i,el) => loadedCheerio(el).text())
  		// 	   .toArray()
  		// 	   .join(',');

        // novel.status = loadedCheerio("div.font-set-b10").text();

        const list = await fetchProto(
            {
                proto: this.proto,
                requestType: 'GetChapterListRequest',
                responseType: 'GetChapterListResponse',
                requestData: {novelId: Number(novelInfo.item.id)},
            }, 
            'https://api2.wuxiaworld.com/wuxiaworld.api.v2.Chapters/GetChapterList',
            {
                headers: {
                    "Content-Type": "application/grpc-web+proto",
                }
            }
        )

        const listInfo = JSON.parse(list);

        const chapter: Plugin.ChapterItem[] = listInfo.items.flatMap((item: { chapterList: ChapterListing[]}) => 
            item.chapterList.map((chapterItem: ChapterListing) => ({
                name: chapterItem.name,
                path: novelPath + '/' + chapterItem.slug,
                chapterNumber: chapterItem.offset
            }))
        );

        novel.chapters = chapter;

        return novel;
    }

    async parseChapter(chapterPath: string): Promise<string> {
        const paths = chapterPath.split('/');
        const data = await fetchProto(
            {
                proto: this.proto,
                requestType: 'GetChapterRequest',
                responseType: 'GetChapterResponse',
                requestData: {
                    chapterProperty: {
                        slugs: {
                            novelSlug: paths[0],
                            chapterSlug: paths[1],
                        }
                    }
                },
            }, 
            'https://api2.wuxiaworld.com/wuxiaworld.api.v2.Chapters/GetChapter',
            {
                headers: {
                    "Content-Type": "application/grpc-web+proto",
                }
            }
        )
        // loadedCheerio(".chapter-nav").remove();
        // loadedCheerio("#chapter-content > script").remove();
        // const chapterText = loadedCheerio("#chapter-content").html() || '';

        const result = JSON.parse(data)
        const chapterText = result.item.content.value || "";
        return chapterText
    }

    async searchNovels(searchTerm: string, pageNo: number): Promise<Plugin.NovelItem[]> {
        const searchUrl = "https://www.wuxiaworld.com/api/novels/search?query=";

        const url = `${searchUrl}${searchTerm}`;

        const result = await fetchApi(url);
        const data = await result.json();

        return this.parseNovels(data);
    }

    fetchImage(url: string): Promise<string | undefined> {
        return fetchFile(url);
    }

    proto = `
    syntax = "proto3";
    option optimize_for = CODE_SIZE;
    package wuxiaworld.api.v2;

    import public "google/protobuf/wrappers.proto";
    import public "google/protobuf/timestamp.proto";
    
    message StringValue {
        // The string value.
        string value = 1;
    }
    
    message BoolValue {
        // The bool value.
        bool value = 1;
    }
    
    message Int32Value {
        // The int32 value.
        int32 value = 1;
    }
    
    message DecimalValue {
        // Whole units part of the amount
        int64 units = 1;
        // Nano units of the amount (10^-9)
        // Must be the same sign as units
        sfixed32 nanos = 2;
    }
    
    message Timestamp {
        int64 seconds = 1;
        int32 nanos = 2;
    }

    message ChapterNovelInfo {
        int32 id = 1;
        string name = 2;
        optional StringValue coverUrl = 3;
        string slug = 4;
    }
    
    message ChapterParagraph {
        string id = 1;
        int32 chapterId = 2;
        int32 totalComments = 3;
        optional StringValue content = 4;
    }

    message ChapterKarma {
        optional Int32Value karmaPrice = 1;
        bool isKarmaRequired = 2;
    }
    
    message ChapterItem {
        int32 entityId = 1;
        string name = 2;
        string slug = 3;
        optional DecimalValue number = 4;
        optional StringValue content = 5;
        int32 novelId = 6;
        bool visible = 7;
        bool isTeaser = 8;
        optional Timestamp whenToPublish = 9;
        bool spoilerTitle = 10;
        bool allowComments = 11;
        optional ChapterKarma karmaInfo = 13;
        optional ChapterNovelInfo novelInfo = 14;
        int32 offset = 17;
        optional Timestamp publishedAt = 18;
        optional StringValue translatorThoughts = 19;
        repeated ChapterParagraph paragraphs = 21;
    }
    
    message ChapterGroupCounts {
        int32 total = 1;
        int32 advance = 2;
        int32 normal = 3;
    }
    
    message ChapterGroupItem {
        int32 id = 1;
        string title = 2;
        int32 order = 3;
        optional DecimalValue fromChapterNumber = 4;
        optional DecimalValue toChapterNumber = 5;
        repeated ChapterItem chapterList = 6;
        optional ChapterGroupCounts counts = 7;
    }
    
    message GetChapterListRequest {
        int32 novelId = 1;
        message BaseChapterInfo {
            oneof chapterInfo {
                int32 chapterId = 1;
                string slug = 2;
                int32 offset = 3;
            }
        }
        message FilterChapters {
            optional Int32Value chapterGroupId = 1;
            optional BoolValue isAdvanceChapter = 2;
            optional BaseChapterInfo baseChapter = 3;
        }
        optional FilterChapters filter = 2;
        optional Int32Value count = 3;
    }
    
    message GetChapterListResponse {
        repeated ChapterGroupItem items = 1;
        optional ChapterNovelInfo novelInfo = 2;
    }

    message GetChapterByProperty {
        message ByNovelAndChapterSlug {
            string novelSlug = 1;
            string chapterSlug = 2;
        }
        oneof byProperty {
            int32 chapterId = 1;
            ByNovelAndChapterSlug slugs = 2;
        }
    }
    
    message GetChapterRequest {
        optional GetChapterByProperty chapterProperty = 1;
    }
    
    message GetChapterResponse {
        optional ChapterItem item = 1;
    }

    message NovelItem {
        int32 id = 1;
        string name = 2;
        string slug = 3;
        enum Status {
            Finished = 0;
            Active = 1;
            Hiatus = 2;
            All = -1;
        }
        Status status = 4;
        bool visible = 7;
        optional StringValue description = 8;
        optional StringValue synopsis = 9;
        optional StringValue coverUrl = 10;
        optional StringValue translatorName = 11;
        optional StringValue authorName = 13;
        repeated string genres = 16;
    }

    message GetNovelRequest {
        oneof selector {
            int32 id = 1;
            string slug = 2;
        }
    }
    
    message GetNovelResponse {
        optional NovelItem item = 1;
    }

    service Chapters {
        rpc GetChapterList(GetChapterListRequest) returns (GetChapterListResponse);
        rpc GetChapter(GetChapterRequest) returns (GetChapterResponse);
    }

    service Novels {
        rpc GetNovel(GetNovelRequest) returns (GetNovelResponse);
    }
    `
}

export default new WuxiaWorld();