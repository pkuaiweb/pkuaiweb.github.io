# GitHub Pages 部署指南

## 方法一：使用部署脚本（推荐）

### 步骤 1：构建并准备部署
```bash
# macOS/Linux
./deploy.sh

# Windows
deploy.bat
```

### 步骤 2：提交并推送到 GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 步骤 3：在 GitHub 配置 Pages
1. 打开仓库页面：https://github.com/pkuaiweb/pkuaiweb.github.io
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Source** 下选择：
   - **Branch**: `main`
   - **Folder**: `/docs`
5. 点击 **Save**（保存）

### 步骤 4：等待部署完成
- GitHub 会自动部署，通常需要 1-3 分钟
- 部署完成后，网站地址为：**https://pkuaiweb.github.io/**

---

## 方法二：手动构建部署

### 1. 构建项目
```bash
npm run build
```

### 2. 创建 .nojekyll 文件
```bash
cd docs
touch .nojekyll
cd ..
```

> **为什么需要 .nojekyll？**
> GitHub Pages 默认使用 Jekyll 处理文件，会忽略 `_` 开头的文件（如 `_plugin-vue_export-helper.js`）。添加 `.nojekyll` 可以禁用 Jekyll，让所有文件正常加载。

### 3. 提交并推送
```bash
git add .
git commit -m "Build for deployment"
git push origin main
```

### 4. 配置 GitHub Pages（同上）

---

## 验证部署

部署成功后，访问 https://pkuaiweb.github.io/ 应该能看到网站。

如果遇到问题：
1. 检查 GitHub Actions 是否成功（仓库 > Actions 标签）
2. 确认 `docs/.nojekyll` 文件存在
3. 检查浏览器控制台是否有 404 错误

---

## 后续更新流程

每次修改代码后：
```bash
./deploy.sh                           # 重新构建
git add .
git commit -m "Update content"
git push origin main                   # GitHub Pages 自动更新
```

---

## 项目配置说明

项目已配置：
- ✅ `vite.config.js` 中 `base: './'` - 支持相对路径
- ✅ `build.outDir: 'docs'` - 构建到 docs 目录
- ✅ `createWebHashHistory()` - 使用 hash 路由，无需服务器端配置
