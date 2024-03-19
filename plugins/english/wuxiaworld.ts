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
    
    import public "google/protobuf/any.proto";
    import public "google/protobuf/wrappers.proto";
    import public "google/protobuf/timestamp.proto";
    import public "google/protobuf/duration.proto";
    
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
    
    message Duration {
        int64 seconds = 1;
        int32 nanos = 2;
    }
    
    message Any {
        string type_url = 1;
        bytes value = 2;
    }
    
    message Timestamp {
        int64 seconds = 1;
        int32 nanos = 2;
    }
    
    message DoubleValue {
        double value = 1;
    }
    
    message ApiErrorDetailItem{
        string description = 1;
        repeated string errors = 2;
        map<string, string> metadata = 3;
    }
    
    message RelatedChapterUserInfo {
        optional BoolValue isChapterUnlocked = 1;
        optional BoolValue isNovelUnlocked = 2;
        optional BoolValue isChapterFavorite = 3;
        optional BoolValue isNovelOwned = 4;
        optional BoolValue isChapterOwned = 5;
        message UserUnlockInfo {
            bool isUnlockedNow = 1;
            UnlockItemMethod unlockNowMethod = 2;
        }
        optional UserUnlockInfo unlockInfo = 6;
        optional BoolValue isAudioUnlocked = 7;
    }
    
    message ChapterSponsor {
        bool advanceChapter = 1;
        optional Int32Value advanceChapterNumber = 2;
        message AdvanceChapterPlan {
            string name = 1;
            int32 advanceChapterCount = 2;
        }
        repeated AdvanceChapterPlan plans = 3;
    }
    
    message RelatedChapterInfo {
        optional ChapterItem previousChapter = 1;
        optional ChapterItem nextChapter = 2;
    }
    
    message ChapterKarma {
        optional Int32Value karmaPrice = 1;
        bool isKarmaRequired = 2;
    } 
    
    message ChapterPricing {
        bool isFree = 1;
        bool isLastHoldback = 2;
    }
    
    message ChapterParagraph {
        string id = 1;
        int32 chapterId = 2;
        int32 totalComments = 3;
        optional StringValue content = 4;
    }
    
    enum AudioSpeed {
        Normal = 0;
        Fast = 1;
        Slow = 2;
        VerySlow = 4;
        VeryFast = 5;
    }
    
    message ChapterAudioInfo {
        bool isAudioAvailable = 1;
        message ChapterAudioPartInfo {
            string voice = 1;
            AudioSpeed speed = 2;
        }
        ChapterAudioPartInfo partInfos = 2; 
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
        optional RelatedChapterInfo relatedChapterInfo = 12;
        optional ChapterKarma karmaInfo = 13;
        optional ChapterNovelInfo novelInfo = 14;
        optional ChapterSponsor sponsorInfo = 15;
        optional RelatedChapterUserInfo relatedUserInfo = 16;
        int32 offset = 17;
        optional Timestamp publishedAt = 18;
        optional StringValue translatorThoughts = 19;
        optional ChapterPricing pricingInfo = 20;
        repeated ChapterParagraph paragraphs = 21;
        optional ChapterAudioInfo audioInfo = 22;
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
    
    message NovelChapterInfo {
            optional ChapterItem firstChapter = 1;
            optional ChapterItem latestChapter = 2;
            optional Int32Value chapterCount = 3;
            repeated ChapterGroupItem chapterGroups = 4;
    }
    
    enum ProductPlatform {
        WebProduct = 0;
        AppleProduct = 1;
        AndroidProduct = 2;
    }
    
    message PlatformProductId {
        ProductPlatform platform = 1;
        string productId = 2;
    }
    
    enum ProductType {
        UnknownProduct = 0;
        KarmaProduct = 1;
        EbookProduct = 2;
        VipProduct = 3;
        AudiobookProduct = 4;
    }
    
    message ProductItem {
        int32 id = 1;
        string name = 2;
        optional DecimalValue price = 3;
        int32 quantity = 4;
        optional StringValue description  = 5;
        bool enabled = 6;
        ProductType type = 7;
        bool isSubscription = 8;
        repeated PlatformProductId productIds = 9;
        message ProductReviewInfo {
            int32 count = 1;
            optional DoubleValue rating = 2;
        }
        optional ProductReviewInfo reviewInfo = 10;
    }
    
    message SponsorPlanItem {
        int32 id = 1;
        string name = 2;
        optional StringValue description = 3;
        bool enabled = 4;
        bool visible = 5;
        int32 advanceChapterCount = 6;
        string planId = 7;
        optional DecimalValue price = 8;
        optional Int32Value karmaPrice = 9;
        bool paused = 10;
        message NovelInfo {
            int32 id = 1;
            string name = 2;
            string slug = 3;
            optional StringValue coverUrl = 4;
            optional StringValue coverBlurHash = 5;
            optional StringValue sponsorDescription = 6;
        }
        optional NovelInfo novelInfo = 11;
        optional ProductItem product = 12;
    }
    
    message NovelSponsorInfo {
            optional int32 advanceChapterCount = 1;
            optional StringValue description = 2;
            optional BoolValue hasAnyPlans = 3;
            repeated SponsorPlanItem plans = 4;
    }
    
    message Role {
        string name = 1;
    }
    
    enum ObjectType {
        UnknownObject = 0;
        NovelObject = 1;
    }
    
    message ObjectItem {
        ObjectType type = 1;
        int32 id = 2;
    }
    
    message UserPermissions {
        repeated Role roles = 1;
        repeated ObjectItem objects = 2;
    }
    
    message UserSettings {
        bool autoUnlockChapters = 1;
        bool is2faEnabled = 2 [json_name = "is2faEnabled"];
    }
    
    message SeriesPricingInfo {
        message WaitToUnlockInfo {
            optional Timestamp createdAt = 1;
            optional Timestamp timeLeft = 2;
            bool waitCompleted = 3;
            int32 unlocksLeft = 4;
        }
        oneof info {
            WaitToUnlockInfo waitToUnlock = 1;
        }
    }   
    
    message RelatedSeriesUserInfo {
        optional SeriesPricingInfo pricingInfo = 1;
        bool isUnlocked = 2;
        bool hasEbook = 3;
    }
    
    message PricingModelRotation {
        string id = 1;
        optional Timestamp startTime = 2;
        optional Timestamp endTime = 3;
    }
    
    message FreePricingModel {
        optional DecimalValue freeChapters = 1;
        bool requiresLogin = 2;
        optional Int32Value anonymousChaptersCount = 3;
    }
    
    message KarmaPricingModel {
        optional DecimalValue freeChapters = 1;
    }
    
    message WaitToUnlockPricingModel {
        optional Duration waitTime = 1;
        optional DecimalValue freeChapters = 2;
        int32 lastHoldBack = 3;
        int32 unlocksPerWaitTime = 4;
    }
    
    message PricingModel {
        int32 id = 1;
        int32 seriesId = 2;
        bool active = 3;
        oneof pricing {
            FreePricingModel free = 4;
            KarmaPricingModel karma = 5;
            WaitToUnlockPricingModel waitToUnlock = 6;
        }
        repeated PricingModelRotation rotations = 9;
        optional StringValue currentRotationId = 10;
    }
    
    enum GenreLevel {
        MainGenreLevel = 0;
        SubGenreLevel = 1;
        AllGenreLevels = -1;
    }
    
    enum GenreContent {
        NotSpecified = 0;
        NovelGenreContent = 1;
        ComicGenreContent = 2;
    }
    
    message GenreItem {
        int32 id = 1;
        string name = 2;
        GenreLevel level = 3;
        repeated GenreContent content = 4;
    }
    
    enum SeriesStatus {
        SeriesFinished = 0;
        SeriesActive = 1;
        SeriesHiatus = 2;
    }
    
    message SeriesItem {
        int32 id = 1;
        optional PricingModel pricingModel = 2;
        optional RelatedSeriesUserInfo relatedUserInfo = 3;
        SeriesStatus status = 4;
        string type = 5;
        repeated GenreItem genres = 6;
        repeated PricingModel activePricingModels = 7;
    }
    
    message UserItem {
        string id = 1;
        string userName = 2;
        StringValue avatarUrl = 3;
        optional StringValue email = 4;
        optional Timestamp joinDate = 5;
        bool isVipActive = 6;
        optional VipItem vip = 7;
        optional StringValue flair = 8;
        optional UserSettings settings = 9;
        optional UserPermissions permissions = 10;
        bool isLegacyVip = 12;
    }
    
    message NovelKarmaInfo {
        bool isActive = 1;
        bool isFree = 2;
        optional DecimalValue maxFreeChapter = 3;
        bool canUnlockWithVip = 4;
    }
    
    message NovelReviewInfo {
        int32 count = 1;
        optional DoubleValue rating = 2;
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
        string abbreviation = 5;
        optional StringValue language = 6;
        bool visible = 7;
        optional StringValue description = 8;
        optional StringValue synopsis = 9;
        optional StringValue coverUrl = 10;
        optional StringValue translatorName = 11;
        optional UserItem translator = 12;
        optional StringValue authorName = 13;
        optional NovelKarmaInfo karmaInfo = 14;
        repeated string tags = 15;
        repeated string genres = 16;
        optional NovelReviewInfo reviewInfo = 17;
        bool isSneakPeek = 18;
        optional NovelSponsorInfo sponsorInfo = 19;
        optional Timestamp createdAt = 20;
        optional StringValue coverBlurHash = 21;
        bool isFeatured = 22;
        optional NovelChapterInfo chapterInfo = 23;
        optional StringValue licensedFrom  = 24;
        optional SeriesItem series = 25;
        bool isTextToSpeechEnabled = 26;
    }
    
    enum UnlockItemMethod {
        UnlockMethodNone = 0;
        UnlockMethodKarma = 1;
        UnlockMethodVip = 2;
        UnlockMethodSponsor = 3;
        UnlockMethodWtu = 4;
    }
    
    message VipItem {
        int32 id = 1;
        string name = 2;
        string planId = 3;
        optional StringValue description = 4;
        optional DecimalValue price = 5;
        int32 interval = 6;
        bool enabled = 7;
        bool visible = 8;
        enum VipType {
            Silver = 0;
            Gold = 1;
            Diamond = 2;
        }
        VipType type = 9;
        enum VipBenefits {
            None = 0;
            NoAds = 1;
            FreeNovel = 2;
            CompletedNovels = 3;
            NovelVoucher = 4;
        }
        VipBenefits benefits = 10;
        ProductItem product = 11;
    }
    
    message BillingPeriod {
        optional Timestamp periodStart = 1;
        optional Timestamp periodEnd = 2;
    }
    
    enum PaymentMethodGateway {
        None = 0;
        Stripe = 1;
        Braintree = 2;
        Apple = 3;
        GooglePlay = 4;
        StripeCheckout = 5;
        Wuxiaworld = 6;
        AppleSK2 = 7;
    }
    
    enum SubscriptionType {
        VipSubscription = 0;
        SponsorSubscription = 1;
    }
    
    message SubscriptionItem {
        int32 id = 1;
        bool active = 2;
        message Plan {   
            oneof plan {
                VipItem vip = 1;
                SponsorPlanItem sponsor = 2;
            }
            optional Int32Value productId = 3;
        }
        optional Plan plan = 3;
        optional BillingPeriod billingPeriod = 4;
        optional Timestamp subscriptionEndedAt = 5;
        optional Plan pendingPlan = 6;
        PaymentMethodGateway paymentGateway = 7;
        SubscriptionType type = 8;
        optional StringValue gatewayId = 9;
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
    
    message GetNovelRequest {
        oneof selector {
            int32 id = 1;
            string slug = 2;
        }
    }
    
    message GetNovelResponse {
        optional NovelItem item = 1;
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
    
    message ChapterNovelTranslatorInfo {
        message UserInfo {
            string id = 1;
            string userName = 2;
            optional StringValue avatarUrl = 3;
            optional Timestamp joinDate = 4;
        }
        UserInfo userInfo = 1;
    }
    
    message ChapterNovelInfo {
        int32 id = 1;
        string name = 2;
        optional StringValue coverUrl = 3;
        string slug = 4;
        message KarmaInfo {
            bool isActive = 1;
            bool isFree = 2;
        }
        optional KarmaInfo karmaInfo = 5;
        bool isSneakPeek = 6;
        optional ChapterNovelTranslatorInfo translatorInfo = 7;
        optional StringValue language = 8;
        optional StringValue coverBlurHash = 9;
        optional StringValue translatorName = 10;
        optional SeriesItem series = 11;
    }
    
    message GetChapterListResponse {
        repeated ChapterGroupItem items = 1;
        optional ChapterNovelInfo novelInfo = 2;
    }
    
    message GetChapterRequest {
        optional GetChapterByProperty chapterProperty = 1;
    }
    
    message GetChapterResponse {
        optional ChapterItem item = 1;
    }
    
    message UnlockedItem {
        optional Any item = 1;
        oneof id {
            int32 chapterId = 2;
            int32 novelId = 3;
        }
        optional Timestamp unlockedAt = 4;
        UnlockItemMethod unlockMethod = 5;
    }
    
    message UnlockItemRequest {
        UnlockItemMethod unlockMethod = 1;
        optional UnlockedItem item = 2;
    }
    
    message UnlockItemResponse {
        optional UnlockedItem unlockedItem = 1;
    }
    
    message GetSubscriptionsRequest {
        enum Type {
            All = 0;
            Vip = 1;
            Sponsor = 2;
        }
        Type type = 1;
        oneof selector {
            int32 novelId = 2;
        }
    }
    
    message GetSubscriptionsResponse {
        repeated SubscriptionItem items = 1;
    }
    
    service Novels {
        rpc GetNovel(GetNovelRequest) returns (GetNovelResponse);
    }
    
    service Chapters {
        rpc GetChapterList(GetChapterListRequest) returns (GetChapterListResponse);
        rpc GetChapter(GetChapterRequest) returns (GetChapterResponse);
    }
    
    service Unlocks {
        rpc UnlockItem(UnlockItemRequest) returns (UnlockItemResponse);
    }
    
    service Subscriptions {
        rpc GetSubscriptions(GetSubscriptionsRequest) returns (GetSubscriptionsResponse);
    }
    `
}

export default new WuxiaWorld();