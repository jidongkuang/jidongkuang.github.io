"use strict";

const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const progress = document.querySelector("[data-progress]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setNavigation(open) {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("nav-open", open);
}

navToggle.addEventListener("click", () => {
  setNavigation(navToggle.getAttribute("aria-expanded") !== "true");
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavigation(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const wasOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavigation(false);
    if (wasOpen) navToggle.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) setNavigation(false);
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
window.addEventListener("load", updateProgress);

const tabs = Array.from(document.querySelectorAll("[data-result-tab]"));
const panels = Array.from(document.querySelectorAll("[data-result-panel]"));

function selectResult(name, moveFocus = false) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.resultTab === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.resultPanel !== name;
  });
  updateProgress();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectResult(tab.dataset.resultTab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectResult(tabs[nextIndex].dataset.resultTab, true);
  });
});
document.querySelectorAll("[data-select-result]").forEach((link) => {
  link.addEventListener("click", () => selectResult(link.dataset.selectResult));
});
document.querySelector("[data-result-tabs]").hidden = false;
selectResult("generation");

const videos = Array.from(document.querySelectorAll("[data-motion-video]"));
const motionToggle = document.querySelector("[data-toggle-motion]");
const visibleVideos = new Set();
let autoPlay = !reducedMotion.matches;

function updateMotionButton() {
  motionToggle.textContent = autoPlay ? "Pause videos" : "Play videos";
  motionToggle.setAttribute("aria-pressed", String(!autoPlay));
}
function syncVideos() {
  videos.forEach((video) => {
    if (autoPlay && visibleVideos.has(video) && !document.hidden) {
      video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    } else {
      video.pause();
    }
  });
}

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
    });
    syncVideos();
  }, { threshold: 0.15 });
  videos.forEach((video) => videoObserver.observe(video));
  motionToggle.hidden = false;
  updateMotionButton();
  motionToggle.addEventListener("click", () => {
    autoPlay = !autoPlay;
    updateMotionButton();
    syncVideos();
  });
  reducedMotion.addEventListener("change", (event) => {
    autoPlay = !event.matches;
    updateMotionButton();
    syncVideos();
  });
  document.addEventListener("visibilitychange", syncVideos);
}

const copyButton = document.querySelector("[data-copy-citation]");
const copyLabel = document.querySelector("[data-copy-label]");
const copyStatus = document.querySelector("[data-copy-status]");
const citationElement = document.querySelector("#citation code");
let copyReset;
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(citationElement.textContent);
    copyLabel.textContent = "Copied";
    copyStatus.textContent = "BibTeX copied to clipboard";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citationElement);
    selection.removeAllRanges();
    selection.addRange(range);
    copyLabel.textContent = "Selected";
    copyStatus.textContent = "BibTeX selected; press Ctrl+C or Command+C to copy";
  }
  window.clearTimeout(copyReset);
  copyReset = window.setTimeout(() => {
    copyLabel.textContent = "Copy";
    copyStatus.textContent = "";
  }, 2000);
});

document.querySelector(".qualitative-details").addEventListener("toggle", updateProgress);
