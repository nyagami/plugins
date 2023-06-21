"use strict";
exports = module.exports = {"__esModule":true}
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
const isPlugin = (p) => {
    const pl = p;
    const errorOut = (key) => {
        console.error("=".repeat(6) +
            `Plugin doesn't have ${key}!` +
            "=".repeat(6) +
            "\n" +
            JSON.stringify(pl) +
            "=".repeat(6));
        return false;
    };
    const required_funcs = [
        "popularNovels",
        "parseNovelAndChapters",
        "parseChapter",
        "searchNovels",
        "fetchImage",
    ];
    for (let i = 0; i < required_funcs.length; i++) {
        const key = required_funcs[i];
        if (!pl[key] || typeof pl[key] !== "function")
            return errorOut(key);
    }
    const requireds_fields = [
        "id",
        "name",
        "version",
        "icon",
        "site",
        "protected",
    ];
    for (let i = 0; i < requireds_fields.length; i++) {
        const key = requireds_fields[i];
        if (pl[key] === undefined)
            return errorOut(key);
    }
    return true;
};
exports.isPlugin = isPlugin;
