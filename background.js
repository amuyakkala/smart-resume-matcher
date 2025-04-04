chrome.runtime.onInstalled.addListener(() => {
      chrome.sidePanel.setOptions({ path: "panel.html", enabled: true });
    });