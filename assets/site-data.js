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
          src: "assets/media/tube/task1x10.mp4",
          hint: "assets/media/tube/task1x10.mp4",
          title: "Tactile, 10x rollout",
          note: "",
        },
        tactileShort: {
          src: "assets/media/tube/task1_short_x1.mp4",
          hint: "assets/media/tube/task1_short_x1.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/tube/task1_fail_x2.mp4",
          hint: "assets/media/tube/task1_fail_x2.mp4",
          title: "No tactile failure, 2x",
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
          { policy: "SmolVLA", tactile: "25/30 = 0.83", baseline: "14/30 = 0.47" },
          { policy: "Pi0.5", tactile: "21/30 = 0.70", baseline: "16/30 = 0.53" },
        ],
        note: "",
        tactileLong: {
          src: "assets/media/peg/task2x10.mp4",
          hint: "assets/media/peg/task2x10.mp4",
          title: "Tactile, 10x rollout",
          note: "",
        },
        tactileShort: {
          src: "assets/media/peg/task2_short_x1.mp4",
          hint: "assets/media/peg/task2_short_x1.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/peg/task2_fail_x2.mp4",
          hint: "assets/media/peg/task2_fail_x2.mp4",
          title: "No tactile failure, 2x",
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
          src: "assets/media/pen/task3x10.mp4",
          hint: "assets/media/pen/task3x10.mp4",
          title: "Tactile, 10x rollout",
          note: "",
        },
        tactileShort: {
          src: "assets/media/pen/task3_short_x1.mp4",
          hint: "assets/media/pen/task3_short_x1.mp4",
          title: "Tactile, 1x clip",
          note: "",
        },
        baselineFailure: {
          src: "assets/media/pen/task3_fail_x2.mp4",
          hint: "assets/media/pen/task3_fail_x2.mp4",
          title: "No tactile failure, 2x",
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
    },
    {
      model: "Diffusion Policy",
      hook: "`n_tactile_chunks`",
      summary:
        "Tactile maps become chunked feature vectors flattened into the global conditioning vector used by the U-Net.",
      archImage: "assets/architectures/dp.png",
    },
    {
      model: "Pi0.5",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are projected into the VLM path.",
      archImage: "assets/architectures/pi05.png",
    },
    {
      model: "SmolVLA",
      hook: "`n_tactile_tokens`",
      summary:
        "Tactile tokens are added to the VLM-backed policy while preserving language-conditioned action generation.",
      archImage: "assets/architectures/smolvla.png",
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
    },
    {
      title: "Mount the sensor",
      body:
        "Secure the FlexiTac sensor pad onto the 'Wrist Roll' of the custom gripper. Route the USB cable along the arm and verify the sensor appears as <code>/dev/ttyUSB0</code>.",
    },
    {
      title: "Test the tactile sensor",
      body:
        "Grant serial access and run the driver test script to confirm the sensor streams valid tactile frames at 2 000 000 baud.",
      link: { label: "test_tactile_driver.py", url: "https://github.com/TNA001-AI/lerobot_tactile/blob/new-sync/test_tactile_driver.py" },
      command: String.raw`sudo chmod 777 /dev/ttyUSB0

python test_tactile_driver.py`,
    },
    {
      title: "Collect data",
      body:
        "Record teleoperated demonstrations with the top camera and tactile sensor enabled. The tactile stream is registered as <code>observation.tactile.primary</code>.",
      video: {
        src: "assets/media/teleop/tele_demo.mp4",
        caption: "Leader-follower teleoperation during data collection.",
      },
      command: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --dataset.num_episodes=100 \
  --dataset.episode_time_s=50 \
  --dataset.reset_time_s=5 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10`,
    },
    {
      title: "Train models",
      body:
        "Train each policy with and without tactile input. Select a model below to see its architecture and both command variants.",
      showModelInfo: true,
      models: [
        {
          name: "ACT",
          tactile: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --policy.type=act \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_tokens=4 \
  --batch_size=32 \
  --num_workers=8 \
  --policy.device=cuda:0 \
  --wandb.enable=true \
  --policy.repo_id=${"${HF_USER}"}/act_tactile_tube`,
          baseline: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --policy.type=act \
  --policy.use_tactile=false \
  --batch_size=32 \
  --num_workers=8 \
  --policy.device=cuda:0 \
  --wandb.enable=true
  --policy.repo_id=${"${HF_USER}"}/act_tube`,
        },
        {
          name: "Diffusion",
          tactile: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --policy.type=diffusion \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_chunks=1 \
  --policy.tactile_feature_dim=64 \
  --policy.crop_is_random=true \
  --policy.resize_shape='[144,192]' \
  --policy.use_amp=true \
  --policy.repo_id=${"${HF_USER}"}/dp_tactile_tube \
  --batch_size=16 \
  --num_workers=8 \
  --steps=200000 \
  --save_freq=40000 \
  --wandb.enable=true`,
          baseline: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --policy.type=diffusion \
  --policy.use_tactile=false \
  --policy.crop_is_random=true \
  --policy.resize_shape='[144,192]' \
  --policy.use_amp=true \
  --policy.repo_id=${"${HF_USER}"}/dp_tube \
  --batch_size=16 \
  --num_workers=8 \
  --steps=200000 \
  --save_freq=40000 \
  --wandb.enable=true`,
        },
        {
          name: "Pi0.5",
          tactile: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube_new \
  --policy.pretrained_path=lerobot/pi05_base \
  --policy.type=pi05 \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_tokens=4 \
  --policy.tactile_feature_dim=256 \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.gradient_checkpointing=true \
  --policy.train_expert_only=true \
  --steps=50000 \
  --batch_size=16 \
  --num_workers=16 \
  --policy.device=cuda \
  --wandb.enable=true`,
          baseline: String.raw`lerobot-train \
  --dataset.repo_id=${"${HF_USER}"}/tactile_tube \
  --policy.pretrained_path=lerobot/pi05_base \
  --policy.type=pi05 \
  --policy.use_tactile=false \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=true \
  --steps=50000 \
  --batch_size=16 \
  --num_workers=16 \
  --policy.device=cuda \
  --wandb.enable=true`,
        },
        {
          name: "SmolVLA",
          tactile: String.raw`lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${"${HF_USER}"}/so101_tactile_peg \
  --rename_map='{"observation.images.top": "observation.images.camera1"}' \
  --policy.empty_cameras=2 \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_tokens=4 \
  --policy.tactile_feature_dim=256 \
  --policy.frame_stride=3 \
  --batch_size=64 \
  --steps=40000 \
  --policy.device=cuda \
  --wandb.enable=true`,
          baseline: String.raw`lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${"${HF_USER}"}/so101_tactile_peg \
  --rename_map='{"observation.images.top": "observation.images.camera1"}' \
  --policy.empty_cameras=2 \
  --policy.use_tactile=false \
  --policy.frame_stride=3 \
  --batch_size=64 \
  --steps=40000 \
  --policy.device=cuda \
  --wandb.enable=true`,
        },
      ],
    },
    {
      title: "Evaluate",
      body:
        "Run policy evaluation on the real robot. Select a model to see the tactile and baseline evaluation commands.",
      video: {
        src: "assets/media/pen/task3_short_x1.mp4",
        caption: "Example success rollout (in-bag pen retrieval, 1x).",
      },
      models: [
        {
          name: "ACT",
          tactile: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_tactile_act_tok4 \
  --dataset.num_episodes=50 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=10 \
  --policy.path=<act_tactile_checkpoint>`,
          baseline: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_act_baseline \
  --dataset.num_episodes=50 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=10 \
  --policy.path=<act_baseline_checkpoint>`,
        },
        {
          name: "Diffusion",
          tactile: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.reset_time_s=5 \
  --dataset.repo_id=${"${HF_USER}"}/eval_dp_vision_tactile_10hz \
  --dataset.fps=10 \
  --dataset.num_episodes=51 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Tube" \
  --policy.path=<diffusion_tactile_checkpoint> \
  --policy.noise_scheduler_type=DDIM \
  --policy.num_inference_steps=16`,
          baseline: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.reset_time_s=5 \
  --dataset.repo_id=${"${HF_USER}"}/eval_dp_vision_only_10hz \
  --dataset.fps=10 \
  --dataset.num_episodes=51 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Tube" \
  --policy.path=<diffusion_baseline_checkpoint> \
  --policy.noise_scheduler_type=DDIM \
  --policy.num_inference_steps=16`,
        },
        {
          name: "Pi0.5",
          tactile: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_pi05_tactile_expertonly_tube \
  --dataset.num_episodes=500 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=3 \
  --policy.path=<pi05_tactile_checkpoint> \
  --policy.device=cuda`,
          baseline: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_pi05_expertonly \
  --dataset.num_episodes=500 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=10 \
  --policy.path=<pi05_baseline_checkpoint> \
  --policy.device=cuda`,
        },
        {
          name: "SmolVLA",
          tactile: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --robot.tactile_sensors='{primary: {"port": "/dev/ttyUSB0", "baud_rate": 2000000}}' \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_smolvla_tactile \
  --dataset.num_episodes=50 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=10 \
  --policy.path=<smolvla_tactile_checkpoint> \
  --policy.device=cuda`,
          baseline: String.raw`lerobot-record \
  --robot.type=so100_tactile_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=follower_arm \
  --robot.cameras="{ top: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}" \
  --teleop.type=so100_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=leader_arm \
  --dataset.repo_id=${"${HF_USER}"}/eval_smolvla_baseline \
  --dataset.num_episodes=50 \
  --dataset.episode_time_s=30 \
  --dataset.single_task="Insert the test tube into the tube rack" \
  --dataset.fps=10 \
  --dataset.reset_time_s=10 \
  --policy.path=<smolvla_baseline_checkpoint> \
  --policy.device=cuda`,
        },
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
      body: "Always run a no-contact baseline read before recording. The tactile map drifts with temperature — recalibrate if the sensor has been powered on for more than 30 minutes.",
    },
    {
      title: "Camera placement",
      body: "Mount the top camera at a consistent height and angle across sessions. Even small shifts between recording and evaluation can degrade policy performance.",
    },
    {
      title: "Training hyperparameters",
      body: "Start with the default learning rate and batch size. For tactile-enabled runs, 4 tactile tokens is a good default — too few tokens lose spatial detail, while too many add noise without improving performance.",
    },
    {
      title: "Training Pi0.5",
      body: "<ul><li>A dataset of 100 episodes is sufficient for a single task.</li><li>Only full fine-tuning works reliably — action-expert-only and LoRA yield low success rates.</li><li>Less than 80 GB VRAM is insufficient for full fine-tuning.</li><li>FSDP (Fully Sharded Data Parallel) is not well supported in LeRobot (issues with dtype and model saving).</li><li>Only a smaller learning rate works: <code class=\"inline-code\">2.5e-5</code> succeeds, but <code class=\"inline-code\">5e-5</code> does not.</li></ul>",
    },
  ],
  references: [
    {
      label: "FlexiTac",
      url: "https://flexitac.github.io/",
      note: "The tactile sensor used in this project. See their site for fabrication instructions and hardware specs.",
    },
    {
      label: "VT-Refine",
      url: "https://binghao-huang.github.io/vt_refine/",
      note: "Related work on vision-tactile policy refinement for dexterous manipulation.",
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
      label: "ACT (Action Chunking Transformer)",
      url: "https://tonyzhaozh.github.io/aloha/",
      note: "Transformer policy from ALOHA. We add tactile tokens via the `n_tactile_tokens` hook on the encoder side.",
    },
    {
      label: "Diffusion Policy",
      url: "https://diffusion-policy.cs.columbia.edu/",
      note: "Diffusion-based visuomotor policy. We fold tactile features into the global conditioning vector via `n_tactile_chunks`.",
    },
    {
      label: "Physical Intelligence — Pi0.5",
      url: "https://www.pi.website/blog/pi05",
      note: "VLA foundation model behind our Pi0.5 tactile fine-tuning experiments; tactile tokens are projected into the VLM path.",
    },
    {
      label: "SmolVLA",
      url: "https://huggingface.co/blog/smolvla",
      note: "Compact VLA model from Hugging Face. Tactile tokens are added while preserving language-conditioned action generation.",
    },
  ],
};
