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

function renderMetricCards(target, policy) {
  clear(target);
  const metrics = [
    { label: "With tactile", value: policy.tactileAccuracy },
    { label: "Without tactile", value: policy.baselineAccuracy },
    { label: "Gain", value: policy.delta },
  ];

  metrics.forEach((metric) => {
    const card = create("article", "metric-card");
    card.append(create("span", "metric-label", metric.label));
    card.append(create("strong", "metric-value", metric.value));
    target.append(card);
  });
}

function renderTags(target, items) {
  clear(target);
  items.forEach((item) => {
    target.append(create("span", "tag", item));
  });
}

function makeTabs(target, items, activeId, onSelect) {
  clear(target);
  items.forEach((item) => {
    const button = create("button", "policy-tab");
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(item.id === activeId));
    button.textContent = item.name;
    if (item.id === activeId) button.classList.add("is-active");
    button.addEventListener("click", () => onSelect(item.id));
    target.append(button);
  });
}

function renderLanding() {
  const featuredTabs = document.getElementById("featured-policy-tabs");
  if (!featuredTabs) return;

  const featuredLabel = document.getElementById("featured-policy-label");
  const featuredName = document.getElementById("featured-policy-name");
  const featuredSummary = document.getElementById("featured-policy-summary");
  const featuredMetrics = document.getElementById("featured-metrics");
  const featuredNote = document.getElementById("featured-policy-note");
  const featuredTasks = document.getElementById("featured-policy-tasks");
  const featuredMediaLink = document.getElementById("featured-media-link");
  const featuredShort = document.getElementById("featured-short-video");
  const featuredLong = document.getElementById("featured-long-video");
  const taskStrip = document.getElementById("task-strip");

  let activePolicyId = siteData.featured.defaultPolicyId;

  function renderFeaturedPolicy(policyId) {
    const policy = siteData.featured.policies.find((item) => item.id === policyId);
    if (!policy) return;
    activePolicyId = policyId;

    makeTabs(featuredTabs, siteData.featured.policies, activePolicyId, renderFeaturedPolicy);

    featuredLabel.textContent = policy.label;
    featuredName.textContent = policy.name;
    featuredSummary.textContent = policy.summary;
    featuredNote.textContent = policy.note;
    featuredNote.hidden = !policy.note;
    featuredMediaLink.href = policy.mediaLink;
    renderMetricCards(featuredMetrics, policy);
    renderTags(featuredTasks, policy.tasks);

    clear(featuredShort);
    clear(featuredLong);
    featuredShort.append(renderMediaSlot(policy.shortVideo, policy.shortVideo.title || "1x clip"));
    featuredLong.append(renderMediaSlot(policy.longVideo, policy.longVideo.title || "Long rollout"));
  }

  renderFeaturedPolicy(activePolicyId);

  siteData.tasks.forEach((task) => {
    const card = create("article", "task-card compact");
    card.innerHTML = `
      <strong>${task.name}</strong>
      <p class="task-card-subtitle">${task.subtitle}</p>
      <p class="task-card-summary">${task.summary}</p>
    `;
    taskStrip.append(card);
  });
}

function renderMediaPage() {
  const mediaTabs = document.getElementById("media-policy-tabs");
  if (!mediaTabs) return;

  const mediaLabel = document.getElementById("media-policy-label");
  const mediaName = document.getElementById("media-policy-name");
  const mediaSummary = document.getElementById("media-policy-summary");
  const mediaMetrics = document.getElementById("media-policy-metrics");
  const mediaTaskList = document.getElementById("media-task-list");

  const hashId = window.location.hash ? window.location.hash.slice(1) : "";
  let activePolicyId =
    siteData.media.policies.find((item) => item.id === hashId)?.id ?? siteData.media.defaultPolicyId;

  function renderMediaPolicy(policyId) {
    const policy = siteData.media.policies.find((item) => item.id === policyId);
    if (!policy) return;
    activePolicyId = policyId;
    if (window.location.hash.slice(1) !== policy.id) {
      history.replaceState(null, "", `#${policy.id}`);
    }

    makeTabs(mediaTabs, siteData.media.policies, activePolicyId, renderMediaPolicy);
    mediaLabel.textContent = policy.label;
    mediaName.textContent = policy.name;
    mediaSummary.textContent = policy.summary;
    renderMetricCards(mediaMetrics, policy);
    clear(mediaTaskList);

    policy.tasks.forEach((task) => {
      const article = create("article", "media-task-card");
      article.innerHTML = `
        <div class="media-task-head">
          <div>
            <p class="featured-label">${task.name}</p>
            <h3>${task.name}</h3>
          </div>
        </div>
      `;

      const comparison = create("div", "media-comparison");

      const tactileColumn = create("div", "comparison-column");
      tactileColumn.append(create("h4", "", "With tactile"));
      tactileColumn.append(renderMediaSlot(task.tactileDemo, task.tactileDemo.title));
      tactileColumn.append(renderMediaSlot(task.tactileLong, task.tactileLong.title));

      const baselineColumn = create("div", "comparison-column");
      baselineColumn.append(create("h4", "", "Without tactile"));
      baselineColumn.append(renderMediaSlot(task.baselineDemo, task.baselineDemo.title));
      baselineColumn.append(renderMediaSlot(task.baselineLong, task.baselineLong.title));

      comparison.append(tactileColumn);
      comparison.append(baselineColumn);
      article.append(comparison);
      mediaTaskList.append(article);
    });
  }

  renderMediaPolicy(activePolicyId);
  window.addEventListener("hashchange", () => {
    const id = window.location.hash.slice(1);
    if (siteData.media.policies.some((item) => item.id === id)) {
      renderMediaPolicy(id);
    }
  });
}

function renderDocs() {
  const hardwareFacts = document.getElementById("hardware-facts");
  if (!hardwareFacts) return;

  const softwareHighlights = document.getElementById("software-highlights");
  const repoMap = document.getElementById("repo-map");
  const modelGrid = document.getElementById("model-grid");
  const reproSteps = document.getElementById("repro-steps");
  const assetChecklist = document.getElementById("asset-checklist");
  const referenceList = document.getElementById("docs-reference-list");

  siteData.hardwareFacts.forEach((item) => {
    const card = create("article", "docs-card");
    card.append(create("h3", "", item.title));
    card.append(create("p", "", item.body));
    hardwareFacts.append(card);
  });

  siteData.softwareHighlights.forEach((item) => {
    const card = create("article", "docs-card");
    card.append(create("h3", "", item.title));
    card.append(create("p", "", item.body));
    softwareHighlights.append(card);
  });

  siteData.repoMap.forEach((entry) => {
    const item = create("article", "repo-item");
    item.innerHTML = `<code>${entry.path}</code><p>${entry.note}</p>`;
    repoMap.append(item);
  });

  siteData.modelHooks.forEach((entry) => {
    const card = create("article", "docs-card");
    card.innerHTML = `<span class="model-hook">${entry.hook}</span><h3>${entry.model}</h3><p>${entry.summary}</p>`;
    modelGrid.append(card);
  });

  siteData.reproductionSteps.forEach((step, index) => {
    const card = create("article", "step-card");
    card.innerHTML = `<span class="step-index">0${index + 1}</span><h3>${step.title}</h3><p>${step.body}</p>`;
    reproSteps.append(card);
  });

  siteData.assetChecklist.forEach((item) => {
    assetChecklist.append(create("li", "", item));
  });

  siteData.references.forEach((reference) => {
    const li = create("li");
    li.innerHTML = `<a href="${reference.url}" target="_blank" rel="noreferrer">${reference.label}</a><span>${reference.note}</span>`;
    referenceList.append(li);
  });

  setText("bringup-command", siteData.commands.bringup);
  setText("record-command", siteData.commands.record);
  setText("train-command", siteData.commands.train);
  setText("eval-command", siteData.commands.eval);
}

function wireCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent ?? "");
        const previous = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = previous;
        }, 1400);
      } catch {
        button.textContent = "Failed";
      }
    });
  });
}

renderLanding();
renderMediaPage();
renderDocs();
wireCopyButtons();
