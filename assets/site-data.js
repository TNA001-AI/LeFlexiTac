export const siteData = {
  project: {
    status:
      "Current pass: selectable featured results on the landing page, full validation media on a separate page, and docs kept separate. Accuracy values and final clips still need to be replaced with real results.",
  },
  featured: {
    defaultPolicyId: "pi05",
    policies: [
      {
        id: "pi05",
        name: "Pi0.5",
        label: "Policy",
        summary:
          "Tactile-conditioned VLA policy with a headline comparison between tactile and no-tactile evaluation.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        note: "",
        tasks: ["Tube insertion", "Pipette handling", "Peg and hole"],
        mediaLink: "media.html#pi05",
        shortVideo: {
          src: "",
          hint: "assets/media/featured/pi05_short_1x.mp4",
          title: "1x episodes",
          note: "",
        },
        longVideo: {
          src: "",
          hint: "assets/media/featured/pi05_long_spedup.mp4",
          title: "Long rollout",
          note: "",
        },
      },
      {
        id: "act",
        name: "ACT",
        label: "Policy",
        summary:
          "Transformer policy with tactile tokens inserted into the encoder-side token set.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        note: "",
        tasks: ["Tube insertion", "Peg and hole"],
        mediaLink: "media.html#act",
        shortVideo: {
          src: "",
          hint: "assets/media/featured/act_short_1x.mp4",
          title: "1x episodes",
          note: "",
        },
        longVideo: {
          src: "",
          hint: "assets/media/featured/act_long_spedup.mp4",
          title: "Long rollout",
          note: "",
        },
      },
      {
        id: "diffusion",
        name: "Diffusion Policy",
        label: "Policy",
        summary:
          "Diffusion Policy with tactile chunks concatenated into the global conditioning vector.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        note: "",
        tasks: ["Tube insertion", "Peg and hole"],
        mediaLink: "media.html#diffusion",
        shortVideo: {
          src: "",
          hint: "assets/media/featured/diffusion_short_1x.mp4",
          title: "1x episodes",
          note: "",
        },
        longVideo: {
          src: "",
          hint: "assets/media/featured/diffusion_long_spedup.mp4",
          title: "Long rollout",
          note: "",
        },
      },
      {
        id: "smolvla",
        name: "SmolVLA",
        label: "Policy",
        summary:
          "SmolVLA with tactile prefix tokens.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        note: "",
        tasks: ["Tube insertion", "Peg and hole"],
        mediaLink: "media.html#smolvla",
        shortVideo: {
          src: "",
          hint: "assets/media/featured/smolvla_short_1x.mp4",
          title: "1x episodes",
          note: "",
        },
        longVideo: {
          src: "",
          hint: "assets/media/featured/smolvla_long_spedup.mp4",
          title: "Long rollout",
          note: "",
        },
      },
    ],
  },
  tasks: [
    {
      id: "tube",
      name: "Tube insertion",
      subtitle: "Insert the test tube into the tube rack",
      summary:
        "Insertion task centered on contact confirmation and fine alignment near the rack.",
    },
    {
      id: "pipette",
      name: "Pipette handling",
      subtitle: "Fine contact manipulation",
      summary:
        "A smaller-scale manipulation task where contact cues matter during grasp and handoff.",
    },
    {
      id: "peg",
      name: "Peg and hole",
      subtitle: "Contact-rich alignment and insertion",
      summary:
        "Alignment-heavy insertion task emphasizing the final stage where contact resolves ambiguity.",
    },
  ],
  media: {
    defaultPolicyId: "pi05",
    policies: [
      {
        id: "pi05",
        name: "Pi0.5",
        label: "Policy",
        summary:
          "Validation media for Pi0.5 across the current task set.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        tasks: [
          {
            id: "tube",
            name: "Tube insertion",
            tactileDemo: { src: "", hint: "assets/media/tube/pi05_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/tube/pi05_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/tube/pi05_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/tube/pi05_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "pipette",
            name: "Pipette handling",
            tactileDemo: { src: "", hint: "assets/media/pipette/pi05_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/pipette/pi05_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/pipette/pi05_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/pipette/pi05_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "peg",
            name: "Peg and hole",
            tactileDemo: { src: "", hint: "assets/media/peg/pi05_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/peg/pi05_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/peg/pi05_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/peg/pi05_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
        ],
      },
      {
        id: "act",
        name: "ACT",
        label: "Policy",
        summary: "Validation media for ACT across the current task set.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        tasks: [
          {
            id: "tube",
            name: "Tube insertion",
            tactileDemo: { src: "", hint: "assets/media/tube/act_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/tube/act_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/tube/act_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/tube/act_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "pipette",
            name: "Pipette handling",
            tactileDemo: { src: "", hint: "assets/media/pipette/act_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/pipette/act_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/pipette/act_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/pipette/act_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "peg",
            name: "Peg and hole",
            tactileDemo: { src: "", hint: "assets/media/peg/act_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/peg/act_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/peg/act_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/peg/act_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
        ],
      },
      {
        id: "diffusion",
        name: "Diffusion Policy",
        label: "Policy",
        summary: "Validation media for Diffusion Policy across the current task set.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        tasks: [
          {
            id: "tube",
            name: "Tube insertion",
            tactileDemo: { src: "", hint: "assets/media/tube/diffusion_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/tube/diffusion_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/tube/diffusion_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/tube/diffusion_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "pipette",
            name: "Pipette handling",
            tactileDemo: { src: "", hint: "assets/media/pipette/diffusion_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/pipette/diffusion_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/pipette/diffusion_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/pipette/diffusion_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "peg",
            name: "Peg and hole",
            tactileDemo: { src: "", hint: "assets/media/peg/diffusion_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/peg/diffusion_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/peg/diffusion_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/peg/diffusion_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
        ],
      },
      {
        id: "smolvla",
        name: "SmolVLA",
        label: "Policy",
        summary: "Validation media for SmolVLA across the current task set.",
        tactileAccuracy: "x%",
        baselineAccuracy: "y%",
        delta: "+z pts",
        tasks: [
          {
            id: "tube",
            name: "Tube insertion",
            tactileDemo: { src: "", hint: "assets/media/tube/smolvla_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/tube/smolvla_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/tube/smolvla_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/tube/smolvla_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "pipette",
            name: "Pipette handling",
            tactileDemo: { src: "", hint: "assets/media/pipette/smolvla_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/pipette/smolvla_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/pipette/smolvla_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/pipette/smolvla_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
          {
            id: "peg",
            name: "Peg and hole",
            tactileDemo: { src: "", hint: "assets/media/peg/smolvla_tactile_demo_1x.mp4", title: "Tactile, 1x" },
            tactileLong: { src: "", hint: "assets/media/peg/smolvla_tactile_long_spedup.mp4", title: "Tactile, long rollout" },
            baselineDemo: { src: "", hint: "assets/media/peg/smolvla_baseline_demo_1x.mp4", title: "No tactile, 1x" },
            baselineLong: { src: "", hint: "assets/media/peg/smolvla_baseline_long_spedup.mp4", title: "No tactile, long rollout" },
          },
        ],
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
  repoMap: [
    {
      path: "src/lerobot/sensors/tactile_sensor.py",
      note: "USB serial tactile driver, calibration logic, and visualization.",
    },
    {
      path: "src/lerobot/sensors/configuration_tactile_sensor.py",
      note: "Port, baud rate, shape, and visualization configuration.",
    },
    {
      path: "src/lerobot/robots/so100_tactile_follower/",
      note: "Tactile-capable SO100 follower config and implementation.",
    },
    {
      path: "src/lerobot/policies/tactile/encoder.py",
      note: "Shared tactile CNN and token encoder implementations.",
    },
    {
      path: "src/lerobot/policies/act/",
      note: "ACT tactile config and token insertion path.",
    },
    {
      path: "src/lerobot/policies/diffusion/",
      note: "Diffusion tactile conditioning path.",
    },
    {
      path: "src/lerobot/policies/pi05/",
      note: "Pi0.5 tactile token projection path and fine-tuning flags.",
    },
    {
      path: "src/lerobot/policies/smolvla/",
      note: "SmolVLA tactile prefix token integration.",
    },
    {
      path: "src/lerobot/processor/tactile_processor.py",
      note: "Validation and temporal filtering utilities.",
    },
    {
      path: "tactile_cmd.txt",
      note: "Task collection, training, and evaluation command log.",
    },
  ],
  modelHooks: [
    {
      model: "ACT",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile maps are encoded into transformer tokens and appended to the encoder-side token set.",
    },
    {
      model: "Diffusion Policy",
      hook: "`n_tactile_chunks`",
      summary:
        "Tactile maps become chunked feature vectors flattened into the global conditioning vector used by the U-Net.",
    },
    {
      model: "Pi0.5",
      hook: "`n_tactile_tokens`, `train_expert_only`",
      summary:
        "Tactile tokens are projected into the VLM path, with optional memory-saving fine-tuning modes.",
    },
    {
      model: "SmolVLA",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are added to the VLM-backed policy while preserving language-conditioned action generation.",
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
        "Export short, consistent clips per task and per model pair. Use the landing page for a single highlighted comparison and the media page for everything else.",
    },
    {
      title: "Update the static site",
      body:
        "Drop media into `assets/media/`, update copy in `assets/site-data.js`, and publish directly without a separate build step.",
    },
  ],
  assetChecklist: [
    "Replace `x%`, `y%`, and `+z pts` with real success rates for each policy.",
    "Add the default featured policy clips at `assets/media/featured/`.",
    "Populate the per-task media slots under `assets/media/tube/`, `assets/media/pipette/`, and `assets/media/peg/`.",
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
