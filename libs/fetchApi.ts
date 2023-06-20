import { NodeFetchParams, getNodeFetch } from "./nodeFetch";

const fetch = async (...args: NodeFetchParams) =>
    (await getNodeFetch())(...args);

const defaultUserAgentString =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

export const fetchApi = async function (
    url: string,
    init?: NodeFetchParams[1],
    pluginId?: string
) {
    const headers = {
        ...init?.headers,
        "User-Agent": defaultUserAgentString,
    };
    return await fetch(url, { ...init, headers });
};