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
    video.autoplay = true;
    const source = document.createElement("source");
    source.src = slot.src;
    video.append(source);
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

function renderResultsTable(results) {
  const table = create("table", "results-table");
  const thead = create("thead");
  const headRow = create("tr");
  headRow.append(create("th", "", "Policy"));
  headRow.append(create("th", "", "With tactile"));
  headRow.append(create("th", "", "Without tactile"));
  thead.append(headRow);
  table.append(thead);

  const tbody = create("tbody");
  results.forEach((row) => {
    const tr = create("tr");
    tr.append(create("th", "results-policy", row.policy));
    tr.append(create("td", "results-tactile", row.tactile || "—"));
    tr.append(create("td", "results-baseline", row.baseline || "—"));
    tbody.append(tr);
  });
  table.append(tbody);
  return table;
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
      copy.append(renderResultsTable(task.results));
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

function renderDocs() {
  const modelGrid = document.getElementById("model-grid");
  if (!modelGrid) return;

  const reproSteps = document.getElementById("repro-steps");
  const tipsGrid = document.getElementById("tips-grid");
  const referenceList = document.getElementById("docs-reference-list");

  siteData.modelHooks.forEach((entry) => {
    const card = create("article", "model-detail-card");
    const info = create("div", "model-detail-info");
    info.innerHTML = `<span class="model-hook">${entry.hook}</span><h3>${entry.model}</h3><p>${entry.summary}</p>`;
    const imgSlot = create("div", "model-arch-placeholder");
    imgSlot.innerHTML = `<img src="${entry.archImage || ''}" alt="${entry.model} architecture" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="arch-placeholder-text" style="display:${entry.archImage ? 'none' : 'block'}">Architecture diagram</span>`;
    card.append(info, imgSlot);
    modelGrid.append(card);
  });

  siteData.reproductionSteps.forEach((step, index) => {
    const card = create("article", "step-card");
    let html = `<span class="step-index">0${index + 1}</span><h3>${step.title}</h3><p>${step.body}</p>`;

    if (step.link) {
      html += `<a class="inline-link" href="${step.link.url}" target="_blank" rel="noreferrer">${step.link.label}</a>`;
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
        html += `<div class="model-tab-panel${mi === 0 ? " active" : ""}" data-panel-index="${mi}"><div class="command-columns">`;
        html += `<div class="command-col"><div class="card-header"><h4>With Tactile</h4><button class="copy-button" type="button" data-copy-target="${tId}">Copy</button></div><pre class="code-block"><code id="${tId}"></code></pre></div>`;
        html += `<div class="command-col"><div class="card-header"><h4>Baseline</h4><button class="copy-button" type="button" data-copy-target="${bId}">Copy</button></div><pre class="code-block"><code id="${bId}"></code></pre></div>`;
        html += `</div></div>`;
      });
      html += `</div>`;
    }

    card.innerHTML = html;
    reproSteps.append(card);

    if (step.command) {
      setText(`step-cmd-${index}`, step.command);
    }
    if (step.models) {
      step.models.forEach((m, mi) => {
        setText(`model-tabs-${index}-t-${mi}`, m.tactile);
        setText(`model-tabs-${index}-b-${mi}`, m.baseline);
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
    li.innerHTML = `<a href="${reference.url}" target="_blank" rel="noreferrer">${reference.label}</a><span>${reference.note}</span>`;
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
