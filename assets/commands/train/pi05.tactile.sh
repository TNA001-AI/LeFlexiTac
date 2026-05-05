#!/bin/bash
#SBATCH --job-name=pi05_tactile_pen_bag
#SBATCH --output=%x_%j.out
#SBATCH --error=%x_%j.err
#SBATCH --partition=gpuH200x8
#SBATCH --mem=180G
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=16
#SBATCH --gpus=1
#SBATCH --gpus-per-node=1
#SBATCH --gpu-bind=closest
#SBATCH --account=YOUR_SLURM_ACCOUNT
#SBATCH --no-requeue
#SBATCH -t 15:00:00

module load pytorch-conda/2.8
conda activate lerobot

export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True

lerobot-train \
  --dataset.repo_id=${HF_USER}/tactile_pen_bag \
  --policy.pretrained_path=lerobot/pi05_base \
  --policy.type=pi05 \
  --policy.use_tactile=true \
  --policy.tactile_features=["observation.tactile.primary"] \
  --policy.n_tactile_tokens=32 \
  --policy.tactile_feature_dim=256 \
  --policy.gradient_checkpointing=false \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --policy.optimizer_lr=2.5e-5 \
  --policy.scheduler_warmup_steps=1000 \
  --policy.scheduler_decay_steps=30000 \
  --policy.compile_model=false \
  --policy.frame_stride=3 \
  --policy.repo_id=${HF_USER}/pi05_tactile_pen_bag \
  --output_dir=outputs/train/pi05_tactile_pen_bag \
  --job_name=pi05_tactile_pen_bag \
  --steps=150000 \
  --batch_size=32 \
  --num_workers=16 \
  --save_freq=20000 \
  --wandb.enable=true

