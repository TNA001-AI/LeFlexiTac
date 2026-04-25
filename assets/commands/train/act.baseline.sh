lerobot-train \
  --dataset.repo_id=${HF_USER}/tactile_pen_bag \
  --policy.type=act \
  --policy.use_tactile=false \
  --policy.repo_id=${HF_USER}/act_baseline_pen_bag \
  --output_dir=outputs/train/act_baseline_pen_bag \
  --batch_size=32 \
  --num_workers=8 \
  --policy.device=cuda:0 \
  --wandb.enable=true

