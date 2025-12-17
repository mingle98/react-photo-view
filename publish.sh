#!/bin/bash

# React Photo View - NPM 发布脚本
# 使用方法: chmod +x publish.sh && ./publish.sh

set -e

echo "🚀 准备发布 react-photo-view-v2 v1.3.0"
echo ""

# 进入包目录
cd "$(dirname "$0")/packages/react-photo-view"

# 检查登录状态
echo "📝 检查 npm 登录状态..."
if npm whoami > /dev/null 2>&1; then
    NPM_USER=$(npm whoami)
    echo "✅ 已登录为: $NPM_USER"
else
    echo "❌ 未登录 npm"
    echo "请运行: npm login"
    exit 1
fi

# 确认发布
echo ""
echo "📦 即将发布:"
echo "   包名: react-photo-view-vs2"
echo "   版本: 1.3.0"
echo "   用户: $NPM_USER"
echo ""
read -p "确认发布? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消发布"
    exit 1
fi

# 重新构建
echo ""
echo "🔨 重新构建包..."
pnpm build

# 发布
echo ""
echo "📤 发布到 npm..."
npm publish

# 成功
echo ""
echo "✨ 发布成功!"
echo ""
echo "📝 接下来的步骤:"
echo "   1. 提交代码: git add . && git commit -m 'chore: release v1.3.0'"
echo "   2. 打标签: git tag v1.3.0"
echo "   3. 推送: git push origin main --tags"
echo "   4. 访问: https://www.npmjs.com/package/react-photo-view-v2"
echo ""

