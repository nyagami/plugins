import { Plugin } from "@typings/plugin";
import nodeFetch from "node-fetch";

export type NodeFetchParams = Parameters<typeof nodeFetch>;

const fetch = (...args: NodeFetchParams) => nodeFetch(...args);

export const fetchFile: Plugin.fetchImage = async function (url, init) {
    if (!init) init = {};
    try {
        const res = await fetch(url, init);
        if (!res.ok) return undefined;
        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer).toString("base64");
    } catch (e) {
        return undefined;
    }
};
