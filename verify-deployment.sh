#!/bin/bash

# 部署验证脚本
# 用于验证所有修复是否成功

echo "🔍 开始验证部署准备状态..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 计数器
PASS=0
FAIL=0

# 检查函数
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1${NC}"
        ((FAIL++))
    fi
}

# 1. 检查 Node 和 NPM
echo "📦 检查环境..."
node --version > /dev/null 2>&1
check "Node.js 已安装"

npm --version > /dev/null 2>&1
check "NPM 已安装"

# 2. 检查依赖
echo ""
echo "📚 检查依赖..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules 存在${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ node_modules 不存在${NC}"
    echo "   运行: npm install"
    ((FAIL++))
fi

# 检查 React 类型
if [ -d "node_modules/@types/react" ]; then
    echo -e "${GREEN}✅ @types/react 已安装${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ @types/react 未安装${NC}"
    ((FAIL++))
fi

# 3. 检查 SmartGuide 是否已删除
echo ""
echo "🗑️  检查 SmartGuide 清理..."
if [ ! -f "pgc_mba_landing_images/mba-application-navigator/src/components/SmartGuide.tsx" ]; then
    echo -e "${GREEN}✅ SmartGuide.tsx 已删除${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ SmartGuide.tsx 仍然存在${NC}"
    ((FAIL++))
fi

# 检查 App.tsx 是否还引用 SmartGuide
if ! grep -q "SmartGuide" "pgc_mba_landing_images/mba-application-navigator/src/App.tsx" 2>/dev/null; then
    echo -e "${GREEN}✅ App.tsx 已移除 SmartGuide 引用${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ App.tsx 仍然引用 SmartGuide${NC}"
    ((FAIL++))
fi

# 4. 检查 ChatAssistant
echo ""
echo "💬 检查 ChatAssistant..."
if [ -f "src/components/ChatAssistant.tsx" ]; then
    echo -e "${GREEN}✅ ChatAssistant.tsx 存在${NC}"
    ((PASS++))
    
    # 检查是否使用正确的 API 端点
    if grep -q "chat-assistant" "src/components/ChatAssistant.tsx"; then
        echo -e "${GREEN}✅ ChatAssistant 使用正确的 API 端点${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ ChatAssistant API 端点不正确${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}❌ ChatAssistant.tsx 不存在${NC}"
    ((FAIL++))
fi

# 5. 检查后端配置
echo ""
echo "⚙️  检查后端配置..."

# 检查 forms.ts
if grep -q "chat-assistant" "backend/routes/forms.ts"; then
    echo -e "${GREEN}✅ backend/routes/forms.ts 已更新${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ backend/routes/forms.ts 未更新${NC}"
    ((FAIL++))
fi

# 检查 database.ts
if grep -q "chat-assistant" "backend/config/database.ts"; then
    echo -e "${GREEN}✅ backend/config/database.ts 已更新${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ backend/config/database.ts 未更新${NC}"
    ((FAIL++))
fi

# 检查 lark.ts
if grep -q "chat-assistant" "backend/config/lark.ts"; then
    echo -e "${GREEN}✅ backend/config/lark.ts 已更新${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ backend/config/lark.ts 未更新${NC}"
    ((FAIL++))
fi

# 6. TypeScript 检查
echo ""
echo "🔧 运行 TypeScript 检查..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ TypeScript 检查通过 (0 错误)${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ TypeScript 检查失败${NC}"
    echo "   运行: npm run lint 查看详情"
    ((FAIL++))
fi

# 7. 构建测试
echo ""
echo "🏗️  运行构建测试..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 构建成功${NC}"
    ((PASS++))
    
    # 检查 dist 目录
    if [ -d "dist" ]; then
        echo -e "${GREEN}✅ dist 目录已生成${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ dist 目录未生成${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}❌ 构建失败${NC}"
    echo "   运行: npm run build 查看详情"
    ((FAIL++))
fi

# 8. 检查关键文件
echo ""
echo "📄 检查关键文件..."
FILES=(
    "src/components/ChatAssistant.tsx"
    "backend/routes/forms.ts"
    "backend/config/database.ts"
    "backend/config/lark.ts"
    "backend/config/email.ts"
    "package.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $file 不存在${NC}"
        ((FAIL++))
    fi
done

# 总结
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 验证结果："
echo ""
echo -e "   ${GREEN}通过: $PASS${NC}"
echo -e "   ${RED}失败: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！项目已准备好部署！${NC}"
    echo ""
    echo "下一步："
    echo "  1. git add ."
    echo "  2. git commit -m 'Fix: Remove SmartGuide, update ChatAssistant'"
    echo "  3. git push origin main"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  发现 $FAIL 个问题，请修复后再部署${NC}"
    echo ""
    echo "查看详细信息："
    echo "  - npm run lint (TypeScript 错误)"
    echo "  - npm run build (构建错误)"
    echo ""
    exit 1
fi
