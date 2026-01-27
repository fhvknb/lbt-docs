
# Transformers notes


1. 默认缓存目录 `~/.cache/huggingface/transformers`

```python
from transformers import cached_file
print(cached_file("model_name"))


# 可配置环境变量修改默认目录
import os

os.environ['HF_HOME'] = '/mnt/new_volume/hf'
os.environ['HF_HUB_CACHE'] = '/mnt/new_volume/hf/hub'
```