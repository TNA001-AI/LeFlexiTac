export const siteData = {
  project: {
    status:
      "Current pass: selectable featured task on the landing page and docs kept separate. Accuracy values and final clips still need to be replaced with real results.",
  },
  featured: {
    defaultTaskId: "tube",
    tasks: [
      {
        id: "tube",
        name: "Insert the Tube",
        label: "Task",
        summary:
          "Insertion task centered on contact confirmation and fine alignment near the tube rack.",
        results: [
          { policy: "ACT", tactile: "26/30 = 0.86", baseline: "20/30 = 0.67" },
          { policy: "Diffusion Policy", tactile: "24/30 = 0.80", baseline: "17/30 = 0.57" },
          { policy: "SmolVLA", tactile: "28/30 = 0.93", baseline: "20/30 = 0.67" },
          { policy: "Pi0.5", tactile: "27/30 = 0.90", baseline: "20/30 = 0.67" },
        ],
        note: "",
        tactileLong: {
          src: "assets/media/tube/task1x10.mp4",
          hint: "assets/media/tube/task1x10.mp4",
          title: "Tactile + Vision rollout, 10× speed",
          note: "",
        },
        tactileShort: {
          src: "assets/media/tube/task1_short_x1.mp4",
          hint: "assets/media/tube/task1_short_x1.mp4",
          title: "Tactile + Vision clip, 1× speed",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/tube/task1_fail_x2.mp4",
          hint: "assets/media/tube/task1_fail_x2.mp4",
          title: "Vision-only failure, 2× speed",
          note: "",
        },
      },
      {
        id: "peg",
        name: "Peg in Hole",
        label: "Task",
        summary:
          "Contact-rich alignment and insertion task where tactile feedback resolves ambiguity in the final stage.",
        results: [
          { policy: "ACT", tactile: "23/30 = 0.77", baseline: "14/30 = 0.47" },
          { policy: "Diffusion Policy", tactile: "25/30 = 0.83", baseline: "17/30 = 0.57" },
          { policy: "SmolVLA", tactile: "25/30 = 0.83", baseline: "14/30 = 0.47" },
          { policy: "Pi0.5", tactile: "21/30 = 0.70", baseline: "16/30 = 0.53" },
        ],
        note: "",
        tactileLong: {
          src: "assets/media/peg/task2x10.mp4",
          hint: "assets/media/peg/task2x10.mp4",
          title: "Tactile + Vision rollout, 10× speed",
          note: "",
        },
        tactileShort: {
          src: "assets/media/peg/task2_short_x1.mp4",
          hint: "assets/media/peg/task2_short_x1.mp4",
          title: "Tactile + Vision clip, 1× speed",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/peg/task2_fail_x2.mp4",
          hint: "assets/media/peg/task2_fail_x2.mp4",
          title: "Vision-only failure, 2× speed",
          note: "",
        },
      },
      {
        id: "pen",
        name: "In-bag pen retrieval",
        label: "Task",
        summary:
          "Retrieval task where vision is obscured inside the bag and the policy must rely on tactile contact cues.",
        results: [
          { policy: "ACT", tactile: "23/30 = 0.77", baseline: "7/30 = 0.23" },
          { policy: "Diffusion Policy", tactile: "27/30 = 0.90", baseline: "20/30 = 0.67" },
          { policy: "SmolVLA", tactile: "28/30 = 0.93", baseline: "18/30 = 0.60" },
        ],
        note: "",
        tactileLong: {
          src: "assets/media/pen/task3_short_x1.mp4",
          hint: "assets/media/pen/task3_short_x1.mp4",
          title: "Tactile + Vision clip, 1× speed",
          note: "",
        },
        tactileShort: {
          src: "assets/media/pen/task3x10.mp4",
          hint: "assets/media/pen/task3x10.mp4",
          title: "Tactile + Vision rollout, 10× speed",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/pen/task3_fail_x2.mp4",
          hint: "assets/media/pen/task3_fail_x2.mp4",
          title: "Vision-only failure, 2× speed",
          note: "",
        },
      },
    ],
  },
  hardwareFacts: [
    {
      title: "Follower robot",
      body:
        "The tactile integration is built around `so100_tactile_follower`, extending the SO follower path with named tactile sensor streams in the observation dictionary.",
    },
    {
      title: "Leader teleop",
      body:
        "The adjacent commands use a `so100_leader` teleoperator on a separate serial port for demo collection and teleoperation.",
    },
    {
      title: "Tactile stream",
      body:
        "The current driver reads tactile frames from `/dev/ttyUSB0` at `2_000_000` baud and exposes a `16 x 32` tactile map in software.",
    },
    {
      title: "Vision stream",
      body:
        "The source commands use a single top RealSense stream at `640 x 480`, resized to policy-friendly resolutions such as `224 x 224`.",
    },
    {
      title: "Sensor reference",
      body:
        "The public page should link out to FlexiTac for fabrication and public context, while documenting your exact local mounting and wiring choices here.",
    },
    {
      title: "Custom gripper",
      body:
        "This remains the biggest missing public-facing hardware detail, since your setup differs from the stock LeRobot SO101 gripper configuration.",
    },
  ],
  softwareHighlights: [
    {
      title: "New tactile feature type",
      body:
        "The pipeline introduces `FeatureType.TACTILE` and `observation.tactile` keys so tactile maps move through the same data plumbing as vision and state.",
    },
    {
      title: "Shared tactile encoders",
      body:
        "A shared tactile encoder module exposes CNN and attention-backed variants, returning configurable token counts for downstream policy integration.",
    },
    {
      title: "Robot-side observation path",
      body:
        "The tactile-aware follower robot reads named sensor maps, falls back to zeros on errors, and publishes them alongside motor states and images.",
    },
    {
      title: "Policy-specific hooks",
      body:
        "ACT, Diffusion Policy, Pi0.5, and SmolVLA each expose their own tactile flags and dimensions, but all are wired to the same tactile observation naming scheme.",
    },
  ],
  repoMap: [],
  modelHooks: [
    {
      model: "ACT",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile maps are encoded into transformer tokens and appended to the encoder-side token set.",
      archImage: "assets/architectures/act.png",
      cite: "ref-act",
      figureCredit: "Zhao et al., 2023",
    },
    {
      model: "Diffusion Policy",
      hook: "`n_tactile_chunks`",
      summary:
        "Tactile maps become chunked feature vectors flattened into the global conditioning vector used by the U-Net.",
      archImage: "assets/architectures/dp.png",
      cite: "ref-dp",
      figureCredit: "Chi et al., 2023",
    },
    {
      model: "Pi0.5",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are projected into the VLM path.",
      archImage: "assets/architectures/pi05.png",
      cite: "ref-pi05",
      figureCredit: "Physical Intelligence, 2025",
    },
    {
      model: "SmolVLA",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are added to the VLM-backed policy while preserving language-conditioned action generation.",
      archImage: "assets/architectures/smolvla.png",
      cite: "ref-smolvla",
      figureCredit: "Shukor et al., 2025",
    },
  ],
  reproductionSteps: [
    {
      title: "Build the robot",
      body:
        'Assemble an SO-100 or SO-101 low-cost robotic arm following the official guide. Replace the stock gripper with our <a href="#hardware">custom tactile gripper</a> (Moving Jaw + Wrist Roll).',
      link: { label: "SO-ARM100 build guide", url: "https://github.com/TheRobotStudio/SO-ARM100" },
    },
    {
      title: "Reproduce the tactile sensor",
      body:
        "Fabricate or obtain a FlexiTac tactile sensor following the official documentation. After assembly, run a no-contact calibration pass to establish the zero-load baseline before mounting.",
      link: { label: "FlexiTac guide", url: "https://flexitac.github.io/" },
      image: {
        src: "assets/media/sensor/sensor.jpg",
        caption: "Assembled FlexiTac tactile sensor.",
      },
    },
    {
      title: "Mount the sensor",
      body:
        "Secure the FlexiTac sensor pad onto the 'Wrist Roll' of the custom gripper. Route the USB cable along the arm and verify the sensor (usually appears as <code>/dev/ttyUSB0</code> on Linux)",
      video: {
        src: "assets/media/leflexitac_assembly_light.mp4",
        caption: "Sensor attachment walkthrough.",
      },
    },
    {
      title: "Install lerobot_tactile (our LeRobot fork)",
      note: "This codebase is <strong>not</strong> available on PyPI — <code class=\"inline-code\">pip install lerobot</code> will install the upstream version without tactile support. You must install from source.",
      body:
        "Follow the official LeRobot installation guide for system prerequisites (ffmpeg, conda, etc.), then install this repo from source.",
      link: { label: "LeRobot installation guide", url: "https://huggingface.co/docs/lerobot/installation" },
      command: "assets/commands/install.sh",
    },
    {
      title: "Configure the robot",
      body:
        "Follow the LeRobot SO-100 / SO-101 walkthrough to identify serial ports, calibrate the follower and leader arms, set up the camera, and sanity-check teleoperation before adding the tactile sensor to the loop.",
      link: { label: "LeRobot robot setup walkthrough", url: "https://huggingface.co/docs/lerobot/il_robots" },
    },
    {
      title: "Install PyFlexiTac CLI",
      body:
        "Install PyFlexiTac with the examples extra so the visual heatmap checker is available via CLI entry points.",
      link: { label: "PyFlexiTac install and CLI docs", url: "https://github.com/WT-MM/PyFlexiTac" },
      command: "assets/commands/install-flexitac.sh",
    },
    {
      title: "Test the tactile sensor",
      body:
        "Run the PyFlexiTac CLI entry points to identify the sensor port, flash firmware, and visually confirm contact response with the heatmap before data collection.",
      link: { label: "PyFlexiTac: flexitac-flash guide", url: "https://github.com/WT-MM/PyFlexiTac#flexitac-flash" },
      command: "assets/commands/test.sh",
      video: {
        src: "",
        caption: "Visual tactile test demo will be added here.",
      },
    },
    {
      title: "Collect data",
      body:
        "Record teleoperated demonstrations with the top camera and tactile sensor enabled. The tactile stream is registered as <code>observation.tactile.primary</code>.",
      video: {
        src: "assets/media/teleop/tele_demo.mp4",
        caption: "Leader-follower teleoperation during data collection.",
      },
      command: "assets/commands/collect.sh",
    },
    {
      title: "Train models",
      body:
        "Train each policy with and without tactile input. Select a model below to see its architecture and tactile / vision-only training commands.",
      showModelInfo: true,
      models: [
        { name: "ACT", tactile: "assets/commands/train/act.tactile.sh", baseline: "assets/commands/train/act.baseline.sh" },
        { name: "Diffusion", tactile: "assets/commands/train/diffusion.tactile.sh", baseline: "assets/commands/train/diffusion.baseline.sh" },
        { name: "Pi0.5", tactile: "assets/commands/train/pi05.tactile.sh", baseline: "assets/commands/train/pi05.baseline.sh" },
        { name: "SmolVLA", tactile: "assets/commands/train/smolvla.tactile.sh", baseline: "assets/commands/train/smolvla.baseline.sh" },
      ],
    },
    {
      title: "Evaluate models",
      body:
        "Run each policy on the real robot and log the rollouts. Select a model to see its tactile and vision-only evaluation commands.",
      video: {
        src: "assets/media/pen/task3_short_x1.mp4",
        caption: "Example success rollout from SmolVLA on in-bag pen retrieval (1× speed).",
      },
      models: [
        { name: "ACT", tactile: "assets/commands/eval/act.tactile.sh", baseline: "assets/commands/eval/act.baseline.sh" },
        { name: "Diffusion", tactile: "assets/commands/eval/diffusion.tactile.sh", baseline: "assets/commands/eval/diffusion.baseline.sh" },
        { name: "Pi0.5", tactile: "assets/commands/eval/pi05.tactile.sh", baseline: "assets/commands/eval/pi05.baseline.sh" },
        { name: "SmolVLA", tactile: "assets/commands/eval/smolvla.tactile.sh", baseline: "assets/commands/eval/smolvla.baseline.sh" },
      ],
    },
  ],
  tips: [
    {
      title: "USB setup",
      body: "Linux may reassign /dev/ttyACM* and /dev/ttyUSB* on reboot. For the robot arms, follow the LeRobot tutorial to set up persistent udev rules. For the tactile sensor, run <code class=\"inline-code\">sudo chmod 777 /dev/ttyUSB0</code> before each session.",
    },
    {
      title: "Sensor calibration",
      body: "Always run a no-contact baseline read before recording. The tactile map drifts with temperature, so recalibrate if the sensor has been powered on for more than 30 minutes.",
    },
    {
      title: "Camera placement",
      body: "Mount the top camera at a consistent height and angle across sessions. Even small shifts between recording and evaluation can degrade policy performance.",
    },
    {
      title: "Training hyperparameters",
      body: "Start with the default learning rate and batch size. For tactile-enabled runs, 4 tactile tokens is a good default. Too few tokens lose spatial detail, and too many add noise without improving performance.",
    },
    {
      title: "Training Pi0.5",
      body: "<ul><li>A dataset of 100 episodes is sufficient for a single task.</li><li>Only full fine-tuning works reliably; action-expert-only and LoRA both yield low success rates.</li><li>Less than 80 GB VRAM is insufficient for full fine-tuning.</li><li>FSDP (Fully Sharded Data Parallel) is not well supported in LeRobot (issues with dtype and model saving).</li><li>Only a smaller learning rate works: <code class=\"inline-code\">2.5e-5</code> succeeds, but <code class=\"inline-code\">5e-5</code> does not.</li></ul>",
    },
  ],
  references: [
    {
      label: "FlexiTac",
      url: "https://flexitac.github.io/",
      note: "The tactile sensor used in this project. See their site for fabrication instructions and hardware specs.",
    },
    {
      label: "PyFlexiTac",
      url: "https://github.com/WT-MM/PyFlexiTac#flexitac-flash",
      note: "Reference flashing and sensor-stream workflow (`flexitac-find-port`, `flexitac-flash`, `flexitac-stream`) used in this guide.",
    },
    {
      label: "VT-Refine",
      url: "https://binghao-huang.github.io/vt_refine/",
      note: "Related work on vision-tactile policy refinement for dexterous manipulation.",
    },
    {
      label: "3D-ViTac",
      url: "https://binghao-huang.github.io/3D-ViTac/",
      note: "Related work on 3D vision-tactile representation learning for contact-rich manipulation.",
    },
    {
      label: "Touch in the Wild",
      url: "https://binghao-huang.github.io/touch_in_the_wild/",
      note: "Related work on collecting and learning from tactile data in unstructured real-world settings.",
    },
    {
      label: "LeRobot",
      url: "https://github.com/huggingface/lerobot",
      note: "Hugging Face's robotics framework. Our training and inference code extends LeRobot's policy and dataset interfaces.",
    },
    {
      label: "SO-ARM100 / SO-101",
      url: "https://github.com/TheRobotStudio/SO-ARM100",
      note: "Open-source low-cost robotic arm platform we build on, with a custom tactile gripper replacing the stock jaw.",
    },
    {
      id: "ref-act",
      label: "ACT (Action Chunking Transformer)",
      url: "https://tonyzhaozh.github.io/aloha/",
      note: "Transformer policy from ALOHA. We add tactile tokens via the `n_tactile_tokens` hook on the encoder side.",
    },
    {
      id: "ref-dp",
      label: "Diffusion Policy",
      url: "https://diffusion-policy.cs.columbia.edu/",
      note: "Diffusion-based visuomotor policy. We fold tactile features into the global conditioning vector via `n_tactile_chunks`.",
    },
    {
      id: "ref-pi05",
      label: "Physical Intelligence: Pi0.5",
      url: "https://www.pi.website/blog/pi05",
      note: "VLA foundation model behind our Pi0.5 tactile fine-tuning experiments; tactile tokens are projected into the VLM path.",
    },
    {
      id: "ref-smolvla",
      label: "SmolVLA",
      url: "https://huggingface.co/blog/smolvla",
      note: "Compact VLA model from Hugging Face. Tactile tokens are added while preserving language-conditioned action generation.",
    },
  ],
};
