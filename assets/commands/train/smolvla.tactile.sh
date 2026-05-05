lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/tactile_pen_bag \
  --rename_map='{"observation.images.top": "observation.images.camera1"}' \
  --policy.empty_cameras=2 \
  --policy.use_tactile=true \
  --policy.tactile_features='["observation.tactile.primary"]' \
  --policy.n_tactile_tokens=4 \
  --policy.tactile_feature_dim=256 \
  --policy.frame_stride=3 \
  --policy.repo_id=${HF_USER}/smolvla_tactile_pen_bag \
  --output_dir=outputs/train/smolvla_tactile_pen_bag \
  --batch_size=64 \
  --steps=40000 \
  --policy.device=cuda \
  --wandb.enable=true

