#!/bin/bash

# 构建项目
echo "Building the project..."
npm run build

# 进入构建输出目录
cd docs

# 添加 .nojekyll 文件（重要：防止 GitHub Pages 忽略下划线开头的文件）
touch .nojekyll

echo "Build complete! Files are in the 'docs' directory."
echo ""
echo "Next steps:"
echo "1. Commit all changes: git add . && git commit -m 'Deploy to GitHub Pages'"
echo "2. Push to GitHub: git push origin main"
echo "3. Go to GitHub repository Settings > Pages"
echo "4. Set source to 'Deploy from a branch'"
echo "5. Select branch 'main' and folder '/docs'"
echo "6. Click 'Save'"
echo ""
echo "Your site will be available at: https://pkuaiweb.github.io/"
