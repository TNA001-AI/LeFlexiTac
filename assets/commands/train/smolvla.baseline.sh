lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/tactile_pen_bag \
  --rename_map='{"observation.images.top": "observation.images.camera1"}' \
  --policy.empty_cameras=2 \
  --policy.use_tactile=false \
  --policy.frame_stride=3 \
  --policy.repo_id=${HF_USER}/smolvla_baseline_pen_bag \
  --output_dir=outputs/train/smolvla_baseline_pen_bag \
  --batch_size=64 \
  --steps=40000 \
  --policy.device=cuda \
  --wandb.enable=true \

