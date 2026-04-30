# Create the conda env (Python 3.12, as recommended by LeRobot)
conda create -y -n lerobot python=3.12
conda activate lerobot

# Install ffmpeg via conda (see the LeRobot installation guide for details)
conda install -y -c conda-forge ffmpeg

# Clone and install this fork in editable mode
git clone https://github.com/TNA001-AI/lerobot_tactile.git
cd lerobot_tactile
pip install -e .

# Optional: extras for specific policies (only if you plan to train them)
pip install -e ".[smolvla]"   # for SmolVLA
pip install -e ".[pi]"        # for Pi0.5
