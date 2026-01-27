# Torch & CUDA　notes

**torch 要和CUDA有版本匹配要求**

CUDA 12.8 == torch 2.7.1


如果你已经安装了 PyTorch 并希望升级到最新版本，可以按照以下步骤进行操作。升级的方式取决于你使用的包管理工具（如 `pip` 或 `conda`）。

### 使用 pip 升级 PyTorch

1. **打开终端或命令提示符**。
2. **运行以下命令**以升级 PyTorch：

   ```bash
   pip install --upgrade torch torchvision torchaudio
   ```

3. **如果你需要特定的 CUDA 版本**，可以指定版本，例如：

   ```bash
   pip install --upgrade torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116

 　pip install torch torchvision torchaudio -i https://pypi.mirrors.aliyun.com/simple --index-url https://download.pytorch.org/whl/cu128
 
 　pip install --no-cache-dir torch==1.13.0 torchvision==0.14.0 torchaudio==0.13.0


   ```

   这里的 `cu116` 表示 CUDA 11.6，确保根据你的 CUDA 版本进行调整。

### 使用 conda 升级 PyTorch

1. **打开 Anaconda Prompt**。
2. **运行以下命令**以升级 PyTorch：

   ```bash
   conda update pytorch torchvision torchaudio -c pytorch
   ```

3. **如果你需要特定的 CUDA 版本**，可以运行：

   ```bash
   conda install pytorch torchvision torchaudio cudatoolkit=11.6 -c pytorch
   ```

   将 `11.6` 替换为你所需的 CUDA 版本。

### 验证升级

无论你使用哪种方法，升级完成后，可以通过以下代码验证 PyTorch 的版本：

```python
import torch
print(torch.__version__)
print(torch.cuda.is_available()) # 应显示 True
print(torch.version.cuda) # 应显示 12.8

```

### 注意事项

- **环境管理**：建议在虚拟环境中进行操作，以避免版本冲突。
- **备份项目**：在升级之前，可以考虑备份你的项目，以防新版本引入不兼容的更改。
- **检查依赖**：确保其他依赖库（如 torchvision 和 torchaudio）也与新版本兼容。

