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
          { policy: "ACT", tactile: "50/59 = 0.85", baseline: "21/32 = 0.66" },
          { policy: "Diffusion Policy", tactile: "36/44 = 0.82", baseline: "22/40 = 0.55" },
          { policy: "SmolVLA", tactile: "28/30 = 0.93", baseline: "20/30 = 0.67" },
          { policy: "Pi0.5", tactile: "27/30 = 0.90", baseline: "20/30 = 0.67" },
        ],
        note: "",
        tactileLong: {
          src: "assets/media/tube/tube_demox8.mp4",
          hint: "assets/media/tube/tactile_long_spedup.mp4",
          title: "Tactile, long rollout (sped up)",
          note: "",
        },
        tactileShort: {
          src: "assets/media/tube/tube_demox8.mp4",
          hint: "assets/media/tube/tactile_short_1x.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/tube/tube_demox8.mp4",
          hint: "assets/media/tube/baseline_failure.mp4",
          title: "No tactile, typical failure",
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
          { policy: "ACT", tactile: "30/38 = 0.79", baseline: "16/39 = 0.41" },
          { policy: "Diffusion Policy", tactile: "25/30 = 0.83", baseline: "17/30 = 0.57" },
        ],
        note: "",
        tactileLong: {
          src: "",
          hint: "assets/media/peg/tactile_long_spedup.mp4",
          title: "Tactile, long rollout (sped up)",
          note: "",
        },
        tactileShort: {
          src: "",
          hint: "assets/media/peg/tactile_short_1x.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "",
          hint: "assets/media/peg/baseline_failure.mp4",
          title: "No tactile, typical failure",
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
          src: "",
          hint: "assets/media/pen/tactile_long_spedup.mp4",
          title: "Tactile, long rollout (sped up)",
          note: "",
        },
        tactileShort: {
          src: "",
          hint: "assets/media/pen/tactile_short_1x.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "",
          hint: "assets/media/pen/baseline_failure.mp4",
          title: "No tactile, typical failure",
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
      archImage: "",
    },
    {
      model: "Diffusion Policy",
      hook: "`n_tactile_chunks`",
      summary:
        "Tactile maps become chunked feature vectors flattened into the global conditioning vector used by the U-Net.",
      archImage: "",
    },
    {
      model: "Pi0.5",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are projected into the VLM path.",
      archImage: "",
    },
    {
      model: "SmolVLA",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are added to the VLM-backed policy while preserving language-conditioned action generation.",
      archImage: "",
    },
  ],
  commands: {
    bringup: String.raw`lerobot-calibrate \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm

lerobot-calibrate \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm`,
    record: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras='{top: {"type": "intelrealsense", "serial_number_or_name":"239222300740", "width":640, "height":480, "target_width":224, "target_height":224, "fps":30}}' \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=Tna001/tactile_tube_new \
  --dataset.single_task="Tube"`,
    train: String.raw`lerobot-train \
  --dataset.repo_id=Tna001/tactile_tube_new \
  --policy.type=act \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_tokens=4

lerobot-train \
  --dataset.repo_id=Tna001/tactile_tube_100 \
  --policy.type=diffusion \
  --policy.use_tactile=true \
  --policy.n_tactile_chunks=1 \
  --policy.tactile_feature_dim=64

lerobot-train \
  --dataset.repo_id=Tna001/tactile_tube_new \
  --policy.type=pi05 \
  --policy.use_tactile=true \
  --policy.n_tactile_tokens=4 \
  --policy.train_expert_only=true

lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=Tna001/tactile_tube_new \
  --policy.use_tactile=true \
  --policy.n_tactile_tokens=4`,
    eval: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras='{top: {"type": "intelrealsense", "serial_number_or_name":"239222300740", "width":640, "height":480, "target_width":224, "target_height":224, "fps":30}}' \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --dataset.repo_id=Tna001/eval_tactile_pi05_expertonly \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --policy.path=/data/tao/train/pi05_tactile_expertonly/checkpoints/last/pretrained_model`,
  },
  reproductionSteps: [
    {
      title: "Bring the hardware online",
      body:
        "Connect follower arm, leader arm, tactile sensor, and top camera. Confirm serial devices, then calibrate follower and leader before recording.",
    },
    {
      title: "Record synchronized demos",
      body:
        "Use `lerobot-record` with the top camera and the named tactile stream `observation.tactile.primary` so the dataset schema stays consistent across models.",
    },
    {
      title: "Train tactile and baseline variants",
      body:
        "Run tactile-enabled and no-tactile baselines per model family and keep the public page aligned with the exact settings you actually use.",
    },
    {
      title: "Package evaluation media",
      body:
        "Export short, consistent clips per task: a sped-up long rollout with tactile, a 1x short clip with tactile, and a typical no-tactile failure.",
    },
    {
      title: "Update the static site",
      body:
        "Drop media into `assets/media/<task>/`, update copy in `assets/site-data.js`, and publish directly without a separate build step.",
    },
  ],
  assetChecklist: [
    "Replace `x%`, `y%`, and `+z pts` with real success rates for each task.",
    "Populate per-task clips under `assets/media/tube/`, `assets/media/peg/`, and `assets/media/pen/` (tactile long, tactile 1x, baseline failure).",
    "Replace the custom gripper placeholder with final hardware details.",
    "Add public code, paper, and dataset links once you know what should be exposed.",
  ],
  references: [
    {
      label: "FlexiTac official site",
      url: "https://flexitac.github.io/",
      note: "Sensor reference and public hardware context.",
    },
    {
      label: "Physical Intelligence Pi0.5 blog",
      url: "https://www.pi.website/blog/pi05",
      note: "Editorial reference for restrained project-page pacing.",
    },
    {
      label: "VT-Refine project page",
      url: "https://binghao-huang.github.io/vt_refine/",
      note: "Reference for robotics-style qualitative result presentation.",
    },
  ],
};
