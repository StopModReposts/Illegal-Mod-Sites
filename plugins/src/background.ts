import axios from "axios";
import { APIResponse, IllegalSite } from "./APITypes";

let cachedSites: APIResponse = [];
let ignoreList: string[] = [];
type ExtMessageType =
  | "get-sites-list"
  | "tab-update"
  | "save-blocked-site"
  | "get-blocked-site"
  | "add-to-ignore";
interface ExtMessage {
  type: ExtMessageType;
  data: any;
}

let lastBlockedSite: IllegalSite | null = null;

axios.get("https://api.stopmodreposts.org/sites.json").then((res) => {
  cachedSites = res.data;
});

chrome.runtime.onMessage.addListener(
  async (message: ExtMessage, sender, sendResponse) => {
    if (message.type === "get-sites-list") {
      if (cachedSites[0])
        return sendResponse(
          cachedSites.filter((site) => !ignoreList.includes(site.domain))
        );
      else return sendResponse(null);
    }
    if (message.type === "tab-update") {
      chrome.tabs.update({
        url: message.data,
      });
      return sendResponse(null);
    }
    if (message.type === "save-blocked-site") {
      lastBlockedSite = message.data;
      return sendResponse(null);
    }
    if (message.type === "get-blocked-site") {
      console.log(lastBlockedSite);
      return sendResponse(lastBlockedSite);
    }
    if (message.type === "add-to-ignore") {
      ignoreList.push(message.data.domain);
      return sendResponse(null);
    }
  }
);
