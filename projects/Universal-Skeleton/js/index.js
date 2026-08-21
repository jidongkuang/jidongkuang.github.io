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

const SOURCE_DATA = {
  ucla: {
    title: "Kinect v1",
    meta: "NW-UCLA · projected x-y coordinates",
    format: "kinect_v1_20",
    color: "#0b70ad",
    invertY: false,
    points: [
      [0.1460, 0.1249], [0.1428, 0.1927], [0.1210, 0.5332], [0.1993, 0.6864],
      [-0.0031, 0.4087], [-0.0944, 0.1501], [-0.1050, -0.0680], [-0.0945, -0.1476],
      [0.2512, 0.4655], [0.2743, 0.2475], [0.3129, 0.0278], [0.3781, -0.0206],
      [0.0911, 0.0540], [0.0969, -0.4015], [0.1133, -0.7766], [0.1721, -0.8567],
      [0.2090, 0.0647], [0.2538, -0.3598], [0.0210, -0.5750], [0.0572, -0.6798],
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7],
      [2, 8], [8, 9], [9, 10], [10, 11], [0, 12], [12, 13], [13, 14],
      [14, 15], [0, 16], [16, 17], [17, 18], [18, 19],
    ],
  },
  ntu: {
    title: "Kinect v2",
    meta: "NTU RGB+D · projected x-y coordinates",
    format: "kinect_v2_25",
    color: "#118664",
    invertY: false,
    points: [
      [0.3015, 0.2817], [0.3030, 0.5459], [0.3032, 0.8042], [0.2856, 0.9150],
      [0.1492, 0.7749], [-0.0656, 0.8682], [-0.0437, 1.0674], [-0.0190, 1.1465],
      [0.4202, 0.7061], [0.5122, 0.7559], [0.4585, 0.9429], [0.4392, 1.0312],
      [0.2418, 0.2837], [0.1688, -0.0047], [0.1270, -0.3718], [0.1098, -0.4612],
      [0.3557, 0.2744], [0.4165, -0.0204], [0.4387, -0.4075], [0.4292, -0.4978],
      [0.3032, 0.7407], [0.0135, 1.1943], [0.0116, 1.1309], [0.4321, 1.0908],
      [0.4143, 1.0352],
    ],
    edges: [
      [0, 1], [1, 20], [20, 2], [2, 3], [20, 4], [4, 5], [5, 6],
      [6, 7], [7, 21], [7, 22], [20, 8], [8, 9], [9, 10], [10, 11],
      [11, 23], [11, 24], [0, 12], [12, 13], [13, 14], [14, 15],
      [0, 16], [16, 17], [17, 18], [18, 19],
    ],
  },
  coco: {
    title: "COCO-17",
    meta: "NTU-2D · native x-y coordinates",
    format: "coco17",
    color: "#c9550a",
    invertY: true,
    points: [
      [1078.0, 429.5], [1086.0, 425.5], [1070.0, 421.25], [1098.0, 425.5],
      [1058.0, 421.25], [1102.0, 449.5], [1042.0, 453.5], [1146.0, 405.25],
      [1013.5, 417.25], [1134.0, 357.0], [1017.5, 353.0], [1106.0, 554.0],
      [1058.0, 558.0], [1102.0, 614.5], [1054.0, 618.5], [1098.0, 699.0],
      [1026.0, 683.0],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [0, 6], [5, 6],
      [5, 7], [7, 9], [6, 8], [8, 10], [5, 11], [6, 12], [11, 12],
      [11, 13], [13, 15], [12, 14], [14, 16],
    ],
  },
  smpl: {
    title: "SMPL-22",
    meta: "HumanML3D · projected x-y coordinates",
    format: "smpl22",
    color: "#b85587",
    invertY: false,
    points: [
      [-0.5855, 0.9661], [-0.5374, 0.8774], [-0.6607, 0.8884], [-0.5602, 1.0916],
      [-0.4581, 0.4921], [-0.8682, 0.5597], [-0.5325, 1.2209], [-0.4514, 0.0626],
      [-1.0247, 0.1649], [-0.5294, 1.2752], [-0.4095, 0.0010], [-1.1103, 0.0929],
      [-0.5237, 1.4940], [-0.4461, 1.3838], [-0.6034, 1.3980], [-0.5159, 1.5765],
      [-0.3195, 1.3478], [-0.7254, 1.3834], [-0.3079, 1.0920], [-0.7934, 1.1370],
      [-0.2893, 0.8376], [-0.8702, 0.8882],
    ],
    edges: [
      [0, 2], [2, 5], [5, 8], [8, 11], [0, 1], [1, 4], [4, 7], [7, 10],
      [0, 3], [3, 6], [6, 9], [9, 12], [12, 15], [9, 14], [14, 17],
      [17, 19], [19, 21], [9, 13], [13, 16], [16, 18], [18, 20],
    ],
  },
};

const SOURCE_TO_UNIFIED = {
  kinect_v1_20: [
    [0, 0], [1, 1], [2, 20], [3, 3], [4, 8], [5, 9], [6, 10], [7, 11],
    [8, 4], [9, 5], [10, 6], [11, 7], [12, 16], [13, 17], [14, 18],
    [15, 19], [16, 12], [17, 13], [18, 14], [19, 15],
  ],
  kinect_v2_25: Array.from({ length: 25 }, (_, index) => [index, index]),
  coco17: [
    [0, 25], [1, 26], [2, 27], [3, 28], [4, 29], [5, 4], [6, 8], [7, 5],
    [8, 9], [9, 6], [10, 10], [11, 12], [12, 16], [13, 13], [14, 17],
    [15, 14], [16, 18],
  ],
  smpl22: [
    [0, 0], [1, 12], [2, 16], [3, 1], [4, 13], [5, 17], [6, 30],
    [7, 14], [8, 18], [9, 20], [10, 15], [11, 19], [12, 2], [15, 3],
    [16, 4], [17, 8], [18, 5], [19, 9], [20, 6], [21, 10],
  ],
};

const UNIFIED_EDGES = [
  [0, 1], [1, 30], [30, 20], [20, 2], [2, 3], [20, 4], [4, 5], [5, 6],
  [6, 7], [7, 21], [7, 22], [20, 8], [8, 9], [9, 10], [10, 11],
  [11, 23], [11, 24], [4, 12], [8, 16], [0, 12], [12, 13], [13, 14],
  [14, 15], [0, 16], [16, 17], [17, 18], [18, 19], [3, 25], [25, 26],
  [25, 27], [26, 28], [27, 29],
];

function canonicalize(source) {
  const points = Array.from({ length: 31 }, () => [0, 0]);
  const observed = Array(31).fill(false);
  const imputed = Array(31).fill(false);

  SOURCE_TO_UNIFIED[source.format].forEach(([sourceIndex, targetIndex]) => {
    points[targetIndex] = [...source.points[sourceIndex]];
    observed[targetIndex] = true;
  });

  const valid = (index) => observed[index] || imputed[index];
  const write = (target, estimate, anchors) => {
    if (!valid(target) && anchors.every(valid)) {
      points[target] = estimate;
      imputed[target] = true;
    }
  };
  const midpoint = (target, first, second) => {
    write(target, [
      0.5 * (points[first][0] + points[second][0]),
      0.5 * (points[first][1] + points[second][1]),
    ], [first, second]);
  };
  const extend = (target, anchor, parent, ratio) => {
    write(target, [
      points[anchor][0] + ratio * (points[anchor][0] - points[parent][0]),
      points[anchor][1] + ratio * (points[anchor][1] - points[parent][1]),
    ], [anchor, parent]);
  };

  midpoint(0, 12, 16);
  midpoint(20, 4, 8);
  midpoint(1, 0, 20);
  midpoint(30, 1, 20);

  if (!valid(3)) {
    const face = [25, 26, 27, 28, 29].filter(valid);
    if (face.length > 0) {
      points[3] = [
        face.reduce((sum, index) => sum + points[index][0], 0) / face.length,
        face.reduce((sum, index) => sum + points[index][1], 0) / face.length,
      ];
      imputed[3] = true;
    }
  }

  midpoint(2, 20, 3);
  extend(7, 6, 5, 0.25);
  extend(11, 10, 9, 0.25);
  extend(15, 14, 13, 0.15);
  extend(19, 18, 17, 0.15);
  extend(21, 7, 6, 0.18);
  extend(22, 7, 6, 0.32);
  extend(23, 11, 10, 0.18);
  extend(24, 11, 10, 0.32);

  [25, 26, 27, 28, 29].forEach((target) => {
    if (!valid(target) && valid(3)) {
      points[target] = [...points[3]];
      imputed[target] = true;
    }
  });

  return { points, observed, imputed };
}

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(Math.round(rect.width), 1);
  const height = Math.max(Math.round(rect.height), 1);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height };
}

function projectPoints(points, invertY, width, height, padding) {
  const projected = points.map(([x, y]) => [x, invertY ? -y : y]);
  const minX = Math.min(...projected.map(([x]) => x));
  const maxX = Math.max(...projected.map(([x]) => x));
  const minY = Math.min(...projected.map(([, y]) => y));
  const maxY = Math.max(...projected.map(([, y]) => y));
  const spanX = Math.max(maxX - minX, 1e-6);
  const spanY = Math.max(maxY - minY, 1e-6);
  const scale = Math.min((width - 2 * padding) / spanX, (height - 2 * padding) / spanY);
  const centerX = 0.5 * (minX + maxX);
  const centerY = 0.5 * (minY + maxY);

  return projected.map(([x, y]) => [
    width / 2 + (x - centerX) * scale,
    height / 2 - (y - centerY) * scale,
  ]);
}

function drawSourceCanvas(canvas, source) {
  const { context, width, height } = prepareCanvas(canvas);
  const points = projectPoints(source.points, source.invertY, width, height, 45);

  context.lineWidth = 2.5;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = source.color;
  source.edges.forEach(([start, end]) => {
    context.beginPath();
    context.moveTo(...points[start]);
    context.lineTo(...points[end]);
    context.stroke();
  });

  points.forEach(([x, y]) => {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = source.color;
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = "#ffffff";
    context.stroke();
  });
}

function drawUnifiedCanvas(canvas, source, skeleton) {
  const { context, width, height } = prepareCanvas(canvas);
  const points = projectPoints(skeleton.points, source.invertY, width, height, 46);

  context.lineCap = "round";
  context.lineJoin = "round";
  UNIFIED_EDGES.forEach(([start, end]) => {
    const includesImputed = skeleton.imputed[start] || skeleton.imputed[end];
    context.beginPath();
    context.moveTo(...points[start]);
    context.lineTo(...points[end]);
    context.lineWidth = includesImputed ? 2 : 2.5;
    context.strokeStyle = includesImputed ? "#c9550a" : "#252a2f";
    context.setLineDash(includesImputed ? [5, 5] : []);
    context.stroke();
  });
  context.setLineDash([]);

  points.forEach(([x, y], index) => {
    const isImputed = skeleton.imputed[index];
    context.beginPath();
    context.arc(x, y, isImputed ? 5.3 : 4.6, 0, Math.PI * 2);
    context.fillStyle = isImputed ? "#ffffff" : "#252a2f";
    context.fill();
    context.lineWidth = isImputed ? 2.3 : 1.3;
    context.strokeStyle = isImputed ? "#c9550a" : "#ffffff";
    context.stroke();
  });
}

const explorer = document.querySelector("[data-skeleton-explorer]");

if (explorer) {
  const sourceCanvas = explorer.querySelector("[data-source-canvas]");
  const unifiedCanvas = explorer.querySelector("[data-unified-canvas]");
  const sourceTitle = explorer.querySelector("[data-source-title]");
  const sourceMeta = explorer.querySelector("[data-source-meta]");
  const unifiedMeta = explorer.querySelector("[data-unified-meta]");
  const sourceChoices = explorer.querySelectorAll("[data-source]");
  let activeSource = "coco";

  function renderExplorer() {
    const source = SOURCE_DATA[activeSource];
    const unified = canonicalize(source);
    const observedCount = unified.observed.filter(Boolean).length;
    const imputedCount = unified.imputed.filter(Boolean).length;

    sourceTitle.textContent = source.title;
    sourceMeta.textContent = source.meta;
    unifiedMeta.textContent = `${observedCount} observed · ${imputedCount} imputed`;
    drawSourceCanvas(sourceCanvas, source);
    drawUnifiedCanvas(unifiedCanvas, source, unified);
  }

  sourceChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      activeSource = choice.dataset.source;
      sourceChoices.forEach((button) => {
        button.setAttribute("aria-pressed", String(button === choice));
      });
      renderExplorer();
    });
  });

  const resizeObserver = new ResizeObserver(renderExplorer);
  resizeObserver.observe(explorer);
  renderExplorer();
}

function fitPointsToBox(points, invertY, box) {
  const projected = points.map(([x, y]) => [x, invertY ? -y : y]);
  const minX = Math.min(...projected.map(([x]) => x));
  const maxX = Math.max(...projected.map(([x]) => x));
  const minY = Math.min(...projected.map(([, y]) => y));
  const maxY = Math.max(...projected.map(([, y]) => y));
  const spanX = Math.max(maxX - minX, 1e-6);
  const spanY = Math.max(maxY - minY, 1e-6);
  const scale = Math.min(box.width / spanX, box.height / spanY);
  const centerX = 0.5 * (minX + maxX);
  const centerY = 0.5 * (minY + maxY);
  return projected.map(([x, y]) => [
    box.x + box.width / 2 + (x - centerX) * scale,
    box.y + box.height / 2 - (y - centerY) * scale,
  ]);
}

function drawHeroSkeleton(context, points, edges, color, alpha, box, invertY, emphasis = 0) {
  const fitted = fitPointsToBox(points, invertY, box);
  context.save();
  context.globalAlpha = alpha;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = color;
  context.lineWidth = 1.8 + 1.7 * emphasis;
  edges.forEach(([start, end]) => {
    context.beginPath();
    context.moveTo(...fitted[start]);
    context.lineTo(...fitted[end]);
    context.stroke();
  });
  fitted.forEach(([x, y]) => {
    context.beginPath();
    context.arc(x, y, 3.1 + 1.3 * emphasis, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  });
  context.restore();
}

const heroCanvas = document.querySelector("[data-hero-canvas]");

if (heroCanvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const unifiedSource = SOURCE_DATA.coco;
  const unified = canonicalize(unifiedSource);
  let heroFrame = null;

  function renderHero(time = 0) {
    const { context, width, height } = prepareCanvas(heroCanvas);
    const mobile = width < 700;
    const sources = mobile ? [SOURCE_DATA.ucla, SOURCE_DATA.coco] : Object.values(SOURCE_DATA);
    const sourceWidth = mobile ? width * 0.18 : width * 0.10;
    const sourceHeight = Math.min(height * 0.38, 245);
    const sourceXs = mobile ? [0.08, 0.34] : [0.035, 0.20, 0.35, 0.50];
    const sourceY = Math.max(78, height * 0.33);
    const cycle = reducedMotion ? 0.86 : ((time / 8500) % 1);
    const fade = cycle > 0.94 ? Math.max((1 - cycle) / 0.06, 0) : 1;
    const sourcePulseCenters = mobile ? [0.17, 0.43] : [0.08, 0.22, 0.36, 0.50];
    const pulseRadius = mobile ? 0.12 : 0.09;
    const pulseAt = (target) => (
      Math.max(0, 1 - Math.abs(cycle - target) / pulseRadius) * fade
    );

    sources.forEach((source, index) => {
      const emphasis = pulseAt(sourcePulseCenters[index]);
      drawHeroSkeleton(
        context,
        source.points,
        source.edges,
        source.color,
        (mobile ? 0.12 : 0.09) + 0.78 * emphasis,
        {
          x: width * sourceXs[index],
          y: sourceY,
          width: sourceWidth,
          height: sourceHeight,
        },
        source.invertY,
        emphasis,
      );
    });

    const arrivalLinear = Math.min(Math.max((cycle - 0.74) / 0.09, 0), 1);
    const arrival = arrivalLinear * arrivalLinear * (3 - 2 * arrivalLinear) * fade;
    drawHeroSkeleton(
      context,
      unified.points,
      UNIFIED_EDGES,
      "#242b31",
      (mobile ? 0.15 : 0.12) + 0.76 * arrival,
      {
        x: width * (mobile ? 0.72 : 0.82),
        y: sourceY - 12,
        width: width * (mobile ? 0.20 : 0.12),
        height: sourceHeight + 24,
      },
      unifiedSource.invertY,
      arrival,
    );

    const flowY = sourceY + sourceHeight * 0.52;
    const arrowStart = width * (mobile ? 0.56 : 0.63);
    const arrowEnd = width * (mobile ? 0.69 : 0.79);
    const arrowHeadLength = mobile ? 8 : 11;
    const arrowHeadHeight = mobile ? 5 : 7;
    const arrowProgressLinear = Math.min(Math.max((cycle - 0.59) / 0.15, 0), 1);
    const arrowProgress = arrowProgressLinear * arrowProgressLinear * (3 - 2 * arrowProgressLinear);
    const arrowDecay = cycle > 0.74 ? Math.max(1 - (cycle - 0.74) / 0.10, 0) : 1;
    const arrowGlow = arrowDecay * fade;
    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.globalAlpha = 0.18 * fade;
    context.strokeStyle = "#68727a";
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(arrowStart, flowY);
    context.lineTo(arrowEnd, flowY);
    context.moveTo(arrowEnd - arrowHeadLength, flowY - arrowHeadHeight);
    context.lineTo(arrowEnd, flowY);
    context.lineTo(arrowEnd - arrowHeadLength, flowY + arrowHeadHeight);
    context.stroke();

    if (arrowProgress > 0 && arrowGlow > 0) {
      const highlightedEnd = arrowStart + (arrowEnd - arrowStart) * arrowProgress;
      context.globalAlpha = 0.90 * arrowGlow;
      context.strokeStyle = "#c9550a";
      context.lineWidth = 2.2;
      context.beginPath();
      context.moveTo(arrowStart, flowY);
      context.lineTo(highlightedEnd, flowY);
      context.stroke();

      if (arrowProgress > 0.86) {
        context.globalAlpha = Math.min((arrowProgress - 0.86) / 0.14, 1) * arrowGlow;
        context.beginPath();
        context.moveTo(arrowEnd - arrowHeadLength, flowY - arrowHeadHeight);
        context.lineTo(arrowEnd, flowY);
        context.lineTo(arrowEnd - arrowHeadLength, flowY + arrowHeadHeight);
        context.stroke();
      }
    }
    context.restore();

    if (!reducedMotion) {
      heroFrame = window.requestAnimationFrame(renderHero);
    }
  }

  const heroObserver = new ResizeObserver(() => {
    if (heroFrame) {
      window.cancelAnimationFrame(heroFrame);
    }
    renderHero(performance.now());
  });
  heroObserver.observe(heroCanvas.parentElement);
  renderHero(performance.now());
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
