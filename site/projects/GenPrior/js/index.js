const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const progress = document.querySelector("[data-progress]");

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

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const motionViewer = document.querySelector("[data-motion-viewer]");

if (motionViewer) {
  const motionVideo = motionViewer.querySelector("[data-motion-video]");
  const motionLabel = motionViewer.querySelector("[data-motion-caption]");
  const motionChoices = motionViewer.querySelectorAll("[data-motion-src]");

  motionVideo.defaultPlaybackRate = 0.8;
  motionVideo.playbackRate = 0.8;

  motionChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const source = choice.dataset.motionSrc;
      const label = choice.dataset.motionLabel;

      motionChoices.forEach((button) => {
        button.setAttribute("aria-pressed", String(button === choice));
      });

      if (motionVideo.getAttribute("src") !== source) {
        motionVideo.pause();
        motionVideo.src = source;
        motionVideo.load();
        motionVideo.playbackRate = 0.8;
      }

      motionVideo.setAttribute("aria-label", `${label} generated motion`);
      motionLabel.textContent = label;
      motionVideo.play().catch(() => {});
    });
  });
}

const copyButton = document.querySelector("[data-copy-citation]");
const copyLabel = document.querySelector("[data-copy-label]");
const copyStatus = document.querySelector("[data-copy-status]");
const citationElement = document.querySelector("#citation code");

copyButton.addEventListener("click", async () => {
  const citation = citationElement.textContent;

  try {
    await navigator.clipboard.writeText(citation);
    copyLabel.textContent = "Copied";
    copyStatus.textContent = "BibTeX copied to clipboard";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citationElement);
    selection.removeAllRanges();
    selection.addRange(range);
    copyLabel.textContent = "Selected";
    copyStatus.textContent = "BibTeX selected";
  }

  window.setTimeout(() => {
    copyLabel.textContent = "Copy";
    copyStatus.textContent = "";
  }, 1800);
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".hero-motions video").forEach((video) => video.pause());
}
