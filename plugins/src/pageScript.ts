import { IllegalSite } from "./APITypes";

chrome.runtime.sendMessage(
  { type: "get-blocked-site" },
  (response: IllegalSite) => {
    console.log(response);
    const notes = document.getElementById("notes");
    const reason = document.getElementById("reason");
    const domain = document.getElementById("domain");
    const ignoreBtn = document.getElementById("ignoresite");
    if (!notes || !reason || !domain || !ignoreBtn || !response.ext_redirFrom)
      throw "up";

    domain.textContent = response.domain;
    reason.textContent = response.reason || "no reason found";
    notes.textContent = response.notes || "no notes found";

    ignoreBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "tab-update",
        data: response.ext_redirFrom,
      });
    });
  }
);
