// import { matchPattern } from "url-matcher";
import { APIResponse } from "./APITypes";

chrome.runtime.sendMessage(
  { type: "get-sites-list" },
  (response: APIResponse | null) => {
    if (!response) return console.log("ERR TOO FAST");
    let host = location.host;
    if (host.startsWith("www.")) {
      host = host.slice(4);
    }

    const sites = response;
    const site = sites.find(
      (site) => site.domain === host || site.domain.endsWith(`.${host}`)
    );
    if (!site) return; // Hooray, not a repost site!
    const pathCorrect = site.path
      ? location.pathname.startsWith(site.path)
      : true;
    if (!pathCorrect) return;
    site.ext_redirFrom = location.href;
    chrome.runtime.sendMessage({
      type: "save-blocked-site",
      data: site,
    });
    chrome.runtime.sendMessage({
      type: "add-to-ignore",
      data: site,
    });
    chrome.runtime.sendMessage({
      type: "tab-update",
      data: chrome.runtime.getURL("/html/alert.html"),
    });
  }
);
