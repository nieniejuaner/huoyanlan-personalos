# 火焰兰 PersonalOS · GitHub 云同步教程

本教程教你在 GitHub 上创建一个**私有仓库**并生成**访问令牌（Token）**，把火焰兰的数据永久同步到你自己的云盘。全程免费，数据完全由你掌控。

---

## 第一步：注册 / 登录 GitHub

1. 打开 https://github.com
2. 如果没有账号，点右上角 **Sign up** 注册（用邮箱即可）；已有账号直接 **Sign in**。

---

## 第二步：新建一个空的私有仓库

1. 登录后，点右上角头像左侧的 **＋** → 选择 **New repository**。
2. 填写：
   - **Repository name（仓库名）**：随便起，例如 `PersonalOS`
   - **Description（描述）**：可留空
   - **Public / Private**：务必选 **Private（私有）** ✅
   - 不要勾选 "Add a README file"（保持空仓库，应用会自动创建文件）
3. 点 **Create repository** 创建。
4. 创建后，浏览器地址栏会显示类似：
   `https://github.com/你的用户名/PersonalOS`
   记下这里的 **`你的用户名/PersonalOS`**，这就是 App 里要填的「仓库」。

> 例：用户名叫 `huoyanlan`，仓库叫 `PersonalOS`，则填 `huoyanlan/PersonalOS`

---

## 第三步：生成 Personal Access Token（关键）

令牌相当于"密码"，App 用它来读写你的仓库文件。

1. 点右上角**头像** → **Settings**。
2. 左侧最底部，点 **Developer settings**。
3. 点 **Personal access tokens** → **Tokens (classic)**。
4. 点 **Generate new token** → **Generate new token (classic)**。
5. 填写：
   - **Note（备注）**：填 `PersonalOS`（方便以后辨认）
   - **Expiration（有效期）**：建议选 **No expiration（不过期）** 或 90/365 天（到期需重新生成）
   - **Select scopes（权限）**：勾选 **repo**（这一项包含所有仓库读写权限）✅
6. 拉到最底部点 **Generate token**。
7. 生成后会出现一串以 `ghp_` 开头的字符（例如 `ghp_xxxxxxxxxxxx`）。
   ⚠️ **只显示这一次**，立刻复制保存好。

---

## 第四步：在火焰兰 App 中连接

1. 打开火焰兰 PersonalOS（CloudStudio 分享链接）。
2. 进入「**我的**」页 → 点 **☁️ 云同步** 卡片。
3. 填写：
   - **GitHub Token**：粘贴刚才复制的 `ghp_xxx…`
   - **仓库（owner/name）**：填 `你的用户名/仓库名`，例如 `huoyanlan/PersonalOS`
   - **文件路径**：默认 `personalos.json`（直接回车）
   - **分支**：默认 `main`（直接回车）
4. 点 **「连接并上传本机数据」**。
5. 稍等几秒，提示「已把本机现有数据上传到仓库」即成功 ✅。

之后每次记账/改任务，数据会自动同步（0.7 秒防抖上传）；换手机或清缓存后，填同样的 Token + 仓库即可把数据拉回来。

---

## 常见问题

**Q：提示 401 / 令牌无效？**
A：Token 复制不完整，或生成时没勾选 `repo`。重新生成一个并粘贴完整。

**Q：提示 404 / 仓库不存在？**
A：仓库名拼写错了（必须是 `用户名/仓库名`，且仓库已存在）；或分支填错（默认 `main`，有的老仓库叫 `master`）。

**Q：上传失败 / 数据过大？**
A：GitHub 单文件上限 1MB（含图片附件）。去「我的」页点「🧹 清除缓存图片」后再试。

**Q：Token 安全吗？**
A：Token 只保存在你这台浏览器的本地存储里，不会上传到除 GitHub 以外的任何地方，且全程 HTTPS 加密传输。建议不要在有他人使用的公共电脑上登录；如担心，可随时在 GitHub → Settings → Developer settings 里 **revoke（撤销）** 该 Token。

**Q：想换设备 / 多人共享同一份数据？**
A：在另一台设备的「我的」页填**同样的 Token + 仓库 + 路径 + 分支**，点连接即可同步同一份数据。
