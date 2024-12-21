(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
(() => {
  var _a, _b, _c;
  const menuRefs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    overlay: document.querySelector("[data-menu-overlay]"),
    menu: document.querySelector("[data-menu]")
  };
  (_a = menuRefs.openMenuBtn) == null ? void 0 : _a.addEventListener("click", toggleMenu);
  (_b = menuRefs.closeMenuBtn) == null ? void 0 : _b.addEventListener("click", toggleMenu);
  (_c = menuRefs.overlay) == null ? void 0 : _c.addEventListener("click", toggleMenu);
  function toggleMenu() {
    var _a2, _b2;
    (_a2 = menuRefs.menu) == null ? void 0 : _a2.classList.toggle("is-open");
    (_b2 = menuRefs.overlay) == null ? void 0 : _b2.classList.toggle("is-open");
  }
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header == null ? void 0 : header.classList.add("scrolled");
    } else {
      header == null ? void 0 : header.classList.remove("scrolled");
    }
  });
  const menuItems = document.querySelectorAll(".navigation-link");
  function setActiveMenu() {
    const currentHash = window.location.hash;
    menuItems.forEach((item) => {
      if (item.getAttribute("href") === currentHash) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
  window.addEventListener("hashchange", setActiveMenu);
  window.addEventListener("load", setActiveMenu);
})();
