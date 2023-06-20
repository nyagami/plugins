"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlugin = exports.Filter = exports.Novel = void 0;
var Novel;
(function (Novel) {
    let Status;
    (function (Status) {
        Status["Unknown"] = "Unknown";
        Status["Ongoing"] = "Ongoing";
        Status["Completed"] = "Completed";
        Status["Licensed"] = "Licensed";
        Status["PublishingFinished"] = "Publishing Finished";
        Status["Cancelled"] = "Cancelled";
        Status["OnHiatus"] = "On Hiatus";
    })(Status = Novel.Status || (Novel.Status = {}));
})(Novel || (exports.Novel = Novel = {}));
var Filter;
(function (Filter) {
    let Inputs;
    (function (Inputs) {
        Inputs[Inputs["TextInput"] = 0] = "TextInput";
        Inputs[Inputs["Picker"] = 1] = "Picker";
        Inputs[Inputs["Checkbox"] = 2] = "Checkbox";
    })(Inputs = Filter.Inputs || (Filter.Inputs = {}));
})(Filter || (exports.Filter = Filter = {}));
const isPlugin = (pl) => {
    return (pl.popularNovels &&
        typeof pl.popularNovels === "function" &&
        pl.searchNovels &&
        typeof pl.searchNovels === "function" &&
        pl.parseNovelAndChapters &&
        typeof pl.parseNovelAndChapters === "function" &&
        pl.parseChapter &&
        typeof pl.parseChapter === "function" &&
        pl.fetchImage &&
        typeof pl.fetchImagetypeof === "function");
};
exports.isPlugin = isPlugin;
