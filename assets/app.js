import { siteData } from "./site-data.js";

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

const commandCache = new Map();
async function loadCommandInto(id, path) {
  if (!path) return;
  setText(id, "Loading…");
  try {
    let text;
    if (commandCache.has(path)) {
      text = await commandCache.get(path);
    } else {
      const promise = fetch(path).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      });
      commandCache.set(path, promise);
      text = await promise;
    }
    setText(id, text.replace(/\n+$/, ""));
  } catch (e) {
    setText(id, `# Failed to load ${path}: ${e.message}`);
    console.error(`Failed to load command ${path}:`, e);
  }
}

function clear(node) {
  if (node) node.innerHTML = "";
}

function renderMediaSlot(slot, label) {
  const wrapper = create("div", "media-slot");
  wrapper.append(create("span", "slot-label", label));

  if (slot.src) {
    const video = create("video", "slot-video");
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = "metadata";
    video.dataset.lazySrc = slot.src;
    wrapper.append(video);
  } else {
    wrapper.append(create("strong", "slot-title", slot.title || "Media slot"));
    wrapper.append(create("p", "slot-placeholder", "Placeholder"));
  }

  if (slot.note) {
    wrapper.append(create("p", "slot-note", slot.note));
  }

  return wrapper;
}

function parseRate(s) {
  if (!s) return { pct: 0, fraction: "—" };
  const m = String(s).match(/(\d+\s*\/\s*\d+)\s*=\s*([\d.]+)/);
  if (!m) return { pct: 0, fraction: String(s) };
  return { pct: parseFloat(m[2]), fraction: m[1].replace(/\s+/g, "") };
}

function renderResultsChart(results) {
  const chart = create("div", "results-chart");

  const header = create("div", "results-chart-header");
  header.innerHTML = `
    <span class="chart-axis-label">Success rate <span class="chart-axis-meta">&middot; n = 30 trials</span></span>
    <div class="chart-legend">
      <span class="chart-legend-item"><span class="legend-swatch tactile"></span>Tactile + Vision</span>
      <span class="chart-legend-item"><span class="legend-swatch baseline"></span>Vision only</span>
    </div>`;
  chart.append(header);

  const plot = create("div", "chart-plot");
  const yAxis = create("div", "chart-y-axis");
  ["100%", "75%", "50%", "25%", "0%"].forEach((v) => {
    yAxis.append(create("span", "chart-y-tick", v));
  });
  plot.append(yAxis);

  const groups = create("div", "chart-groups");
  const labels = create("div", "chart-x-labels");
  results.forEach((row) => {
    const t = parseRate(row.tactile);
    const b = parseRate(row.baseline);
    const group = create("div", "chart-group");
    group.innerHTML = `
      <div class="chart-bars-pair">
        <div class="chart-bar-col" title="Tactile + Vision: ${t.fraction}">
          <div class="chart-bar-track-v">
            <div class="chart-bar-fill-v tactile" data-target="${t.pct}" style="height:0%">
              <span class="chart-bar-label">${(t.pct * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <div class="chart-bar-col" title="Vision only: ${b.fraction}">
          <div class="chart-bar-track-v">
            <div class="chart-bar-fill-v baseline" data-target="${b.pct}" style="height:0%">
              <span class="chart-bar-label">${(b.pct * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>`;
    groups.append(group);
    labels.append(create("div", "chart-x-label", row.policy));
  });

  plot.append(groups);
  plot.append(labels);
  chart.append(plot);
  return chart;
}

function setupChartAnimation() {
  const fills = document.querySelectorAll(".chart-bar-fill-v[data-target], .chart-bar-fill[data-target]");
  if (!fills.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = parseFloat(entry.target.dataset.target);
        const pct = (target * 100).toFixed(1);
        const idx = Number(entry.target.dataset.idx || 0);
        entry.target.style.transitionDelay = `${idx * 70}ms`;
        if (entry.target.classList.contains("chart-bar-fill-v")) {
          entry.target.style.height = `${pct}%`;
        } else {
          entry.target.style.width = `${pct}%`;
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );
  fills.forEach((f, i) => {
    f.dataset.idx = i;
    observer.observe(f);
  });
}

function renderLanding() {
  const taskList = document.getElementById("task-list");
  if (!taskList) return;

  clear(taskList);

  siteData.featured.tasks.forEach((task, index) => {
    const panel = create("article", "featured-panel task-panel");

    const copy = create("div", "featured-copy");
    copy.append(create("p", "featured-label", `Task ${index + 1}`));
    copy.append(create("h3", "", task.name));
    copy.append(create("p", "featured-summary", task.summary));

    if (task.results && task.results.length) {
      copy.append(renderResultsChart(task.results));
    }

    if (task.note) {
      copy.append(create("p", "featured-note", task.note));
    }

    const triple = create("div", "video-triple");
    const longCard = create("div", "video-card");
    longCard.append(renderMediaSlot(task.tactileLong, task.tactileLong.title));
    triple.append(longCard);

    const pairRow = create("div", "video-pair-row");
    const shortCard = create("div", "video-card");
    const failureCard = create("div", "video-card");
    shortCard.append(renderMediaSlot(task.tactileShort, task.tactileShort.title));
    failureCard.append(renderMediaSlot(task.baselineFailure, task.baselineFailure.title));
    pairRow.append(shortCard, failureCard);
    triple.append(pairRow);

    panel.append(copy, triple);
    taskList.append(panel);
  });
}

function setupLazyVideos() {
  const videos = document.querySelectorAll("video[data-lazy-src]");
  if (!videos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded) return;
    const source = document.createElement("source");
    source.src = video.dataset.lazySrc;
    video.append(source);
    video.load();
    video.dataset.loaded = "true";
  };

  const unloadVideo = (video) => {
    if (!video.dataset.loaded) return;
    video.pause();
    video.removeAttribute("src");
    const source = video.querySelector("source");
    if (source) source.remove();
    video.load();
    delete video.dataset.loaded;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          loadVideo(video);
          video.play().catch(() => {});
        } else if (video.dataset.loaded) {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach((v) => observer.observe(v));

  const abortAll = () => videos.forEach(unloadVideo);
  window.addEventListener("pagehide", abortAll);
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    if (link.target === "_blank") return;
    abortAll();
  }, true);
}

function renderDocs() {
  const reproSteps = document.getElementById("repro-steps");
  if (!reproSteps) return;

  const tipsGrid = document.getElementById("tips-grid");
  const referenceList = document.getElementById("docs-reference-list");

  const hookByName = {};
  siteData.modelHooks.forEach((h) => {
    hookByName[h.model] = h;
  });
  const normalizeName = (name) => {
    if (name === "Diffusion") return "Diffusion Policy";
    return name;
  };

  siteData.reproductionSteps.forEach((step, index) => {
    const card = create("article", "step-card");
    let html = `<span class="step-index">0${index + 1}</span><h3>${step.title}</h3><p>${step.body}</p>`;

    if (step.link) {
      html += `<a class="inline-link" href="${step.link.url}" target="_blank" rel="noreferrer">${step.link.label}</a>`;
    }

    if (step.image?.src) {
      const caption = step.image.caption
        ? `<figcaption class="step-image-caption">${step.image.caption}</figcaption>`
        : "";
      const alt = step.image.caption || step.title || "Step image";
      html += `<figure class="step-image"><img class="step-image-el" src="${step.image.src}" alt="${alt}" loading="lazy">${caption}</figure>`;
    }

    if (step.command) {
      const cmdId = `step-cmd-${index}`;
      html += `<div class="step-command"><div class="card-header"><span>Command</span><button class="copy-button" type="button" data-copy-target="${cmdId}">Copy</button></div><pre class="code-block"><code id="${cmdId}"></code></pre></div>`;
    }

    if (step.models) {
      const gid = `model-tabs-${index}`;
      html += `<div class="model-tab-group" id="${gid}"><div class="model-tabs">`;
      step.models.forEach((m, mi) => {
        html += `<button class="model-tab${mi === 0 ? " active" : ""}" data-tab-index="${mi}">${m.name}</button>`;
      });
      html += `</div>`;
      step.models.forEach((m, mi) => {
        const tId = `${gid}-t-${mi}`;
        const bId = `${gid}-b-${mi}`;
        html += `<div class="model-tab-panel${mi === 0 ? " active" : ""}" data-panel-index="${mi}">`;

        if (step.showModelInfo) {
          const hookEntry = hookByName[normalizeName(m.name)];
          if (hookEntry) {
            html += `<div class="model-detail-card"><div class="model-detail-info"><h3>${hookEntry.model}</h3><p>${hookEntry.summary}</p></div>`;
            const figRef = hookEntry.cite && hookEntry.figureCredit
              ? `<figcaption class="model-arch-caption">Figure adapted from <a href="#${hookEntry.cite}">${hookEntry.figureCredit}</a>.</figcaption>`
              : "";
            html += `<figure class="model-arch-figure"><div class="model-arch-placeholder"><img src="${hookEntry.archImage || ''}" alt="${hookEntry.model} architecture" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="arch-placeholder-text" style="display:${hookEntry.archImage ? 'none' : 'block'}">Architecture diagram</span></div>${figRef}</figure></div>`;
          }
        }

        html += `<div class="command-columns">`;
        html += `<div class="command-col"><div class="card-header"><h4>Tactile + Vision</h4><button class="copy-button" type="button" data-copy-target="${tId}">Copy</button></div><pre class="code-block"><code id="${tId}"></code></pre></div>`;
        html += `<div class="command-col"><div class="card-header"><h4>Vision only</h4><button class="copy-button" type="button" data-copy-target="${bId}">Copy</button></div><pre class="code-block"><code id="${bId}"></code></pre></div>`;
        html += `</div></div>`;
      });
      html += `</div>`;
    }

    if (step.video?.src) {
      const header = step.video.title
        ? `<div class="card-header"><span>${step.video.title}</span></div>`
        : "";
      const caption = step.video.caption
        ? `<p class="step-video-caption">${step.video.caption}</p>`
        : "";
      html += `<div class="step-video">${header}<video class="step-video-el" controls muted playsinline loop preload="metadata" data-lazy-src="${step.video.src}"></video>${caption}</div>`;
    }

    card.innerHTML = html;
    reproSteps.append(card);

    if (step.command) {
      loadCommandInto(`step-cmd-${index}`, step.command);
    }
    if (step.models) {
      step.models.forEach((m, mi) => {
        loadCommandInto(`model-tabs-${index}-t-${mi}`, m.tactile);
        loadCommandInto(`model-tabs-${index}-b-${mi}`, m.baseline);
      });
    }
  });

  document.querySelectorAll(".model-tab-group").forEach((group) => {
    group.querySelectorAll(".model-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const idx = tab.dataset.tabIndex;
        group.querySelectorAll(".model-tab").forEach((t) => t.classList.remove("active"));
        group.querySelectorAll(".model-tab-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        group.querySelector(`.model-tab-panel[data-panel-index="${idx}"]`).classList.add("active");
      });
    });
  });

  siteData.tips.forEach((tip) => {
    const card = create("article", "tip-card");
    card.innerHTML = `<h3>${tip.title}</h3><p>${tip.body}</p>`;
    tipsGrid.append(card);
  });

  siteData.references.forEach((reference) => {
    const li = create("li");
    if (reference.id) li.id = reference.id;
    li.innerHTML = `<a href="${reference.url}" target="_blank" rel="noreferrer"><strong>${reference.label}</strong><span>${reference.note}</span></a>`;
    referenceList.append(li);
  });
}

function wireCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      const text = target.textContent ?? "";
      const previous = button.textContent;
      const flash = (msg) => {
        button.textContent = msg;
        window.setTimeout(() => {
          button.textContent = previous;
        }, 1400);
      };
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          flash("Copied");
          return;
        }
      } catch {}
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
      flash(ok ? "Copied" : "Failed");
    });
  });
}

renderLanding();
renderDocs();
wireCopyButtons();
setReadTime();
setupDocsScrollSpy();
setupLazyVideos();
setupChartAnimation();

function setupDocsScrollSpy() {
  const nav = document.querySelector(".docs-nav");
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll("a[href^='#']"));
  if (!links.length) return;

  const sectionsById = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) sectionsById.set(id, el);
  });

  const visible = new Set();
  const setActive = () => {
    let topId = null;
    let topY = Infinity;
    visible.forEach((id) => {
      const rect = sectionsById.get(id).getBoundingClientRect();
      if (rect.top < topY) {
        topY = rect.top;
        topId = id;
      }
    });
    links.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", id === topId);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) visible.add(id);
        else visible.delete(id);
      });
      setActive();
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );

  sectionsById.forEach((el) => observer.observe(el));
}

function setReadTime() {
  const target = document.getElementById("read-time");
  if (!target) return;

  const sections = document.querySelectorAll(".landing-page main .prose, .landing-page main .masthead-summary, .landing-page main .section-heading p");
  let words = 0;
  sections.forEach((el) => {
    words += (el.textContent || "").trim().split(/\s+/).filter(Boolean).length;
  });

  const videoCount = document.querySelectorAll(".landing-page main video").length;
  const totalSeconds = (words / 220) * 60 + videoCount * 30;
  const minutes = Math.max(1, Math.round(totalSeconds / 60));
  target.textContent = `${minutes} min read`;
}
