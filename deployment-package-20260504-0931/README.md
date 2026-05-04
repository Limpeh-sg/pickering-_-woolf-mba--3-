# Pickering Global Campus MBA 网站 - 生产部署包

## 📦 版本信息

- **版本**：v1.0.0
- **构建时间**：2026-05-04 09:31
- **部署目标**：生产环境

## ✨ 新功能

### 1. 优化的英雄区
- ✅ 高清校园图片背景
- ✅ 更透明的蓝色叠加层（20%透明度）
- ✅ 4个白色毛玻璃认证卡片
- ✅ 清晰的黑色字体
- ✅ 响应式设计

### 2. 全局智能助手
- ✅ 现代玻璃感设计
- ✅ 在所有页面显示
- ✅ 不会出现在英雄区下方
- ✅ PC端右下角固定
- ✅ 移动端半屏显示
- ✅ 5级决策树系统
- ✅ 自动评分和标签
- ✅ Lark集成

### 3. 招生决策树系统（MVP）
- ✅ 10个入口选项
- ✅ 4个核心路径（申请资格、费用、学历认可、申请材料）
- ✅ 10个细节采集选项
- ✅ 10个跟进方式选项
- ✅ 智能评分系统（Cold/Warm/Hot Lead）
- ✅ 自动生成顾问建议

## 🚀 快速开始

### 方法1：使用快速启动脚本（推荐）

```bash
# 给脚本添加执行权限
chmod +x quick-start.sh

# 运行脚本
./quick-start.sh
```

访问：http://localhost:3000

### 方法2：手动启动

```bash
# 1. 安装后端依赖
cd backend
npm install --production

# 2. 配置环境变量
cp ../.env.example .env
# 编辑.env文件

# 3. 启动后端
node server.js &

# 4. 启动前端
cd ../dist
npx serve -s . -p 3000
```

## 📁 文件结构

```
deployment-package-20260504-0931/
├── dist/                           # 前端构建文件
│   ├── index.html                 # 主HTML文件
│   ├── assets/                    # 静态资源
│   │   ├── *.js                  # JavaScript文件
│   │   ├── *.css                 # CSS文件
│   │   └── *.png                 # 图片文件
│   └── pgc_mba_landing_images/   # 页面图片
│
├── backend/                        # 后端API
│   ├── server.ts                  # 服务器入口
│   ├── config/                    # 配置文件
│   └── routes/                    # API路由
│
├── package.json                    # 依赖配置
├── package-lock.json              # 锁定版本
├── .env.example                   # 环境变量模板
├── DEPLOYMENT-GUIDE.md            # 详细部署指南
├── quick-start.sh                 # 快速启动脚本
└── README.md                      # 本文件
```

## 🔧 环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
# API配置
VITE_API_URL=https://api.your-domain.com
PORT=3001

# Lark配置
VITE_LARK_WEBHOOK_URL=https://open.larksuite.com/open-apis/bot/v2/hook/xxx
LARK_APP_ID=your-app-id
LARK_APP_SECRET=your-app-secret

# 邮件配置
VITE_FORM_RECIPIENT_EMAIL=admissions@pickering.education
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📋 部署选项

### 选项1：Vercel（推荐 - 最快）
```bash
npm i -g vercel
cd dist && vercel --prod
```

### 选项2：Netlify
```bash
npm i -g netlify-cli
cd dist && netlify deploy --prod --dir .
```

### 选项3：传统服务器
参见 `DEPLOYMENT-GUIDE.md` 中的详细说明

## ✅ 部署检查清单

### 部署前
- [ ] 配置所有环境变量
- [ ] 测试Lark Webhook
- [ ] 配置邮件服务
- [ ] 准备域名和SSL证书

### 部署后
- [ ] 测试网站访问
- [ ] 测试所有页面路由
- [ ] 测试表单提交
- [ ] 测试智能助手
- [ ] 测试移动端显示
- [ ] 检查Lark通知

## 🎯 关键功能

### 智能助手
- 右下角悬浮按钮
- 5级决策树对话
- 自动评分和标签
- Lark实时通知

### 表单系统
- 申请表单
- 咨询表单
- 手册下载表单
- Lark集成

### 页面
- 首页（英雄区、认证、课程、师资等）
- 申请页面
- 师资页面
- 奖学金页面
- 法律页面
- 联系页面

## 📊 性能指标

- **首屏加载**：< 2秒
- **交互响应**：< 100ms
- **Lighthouse评分**：90+
- **移动端优化**：✅
- **SEO优化**：✅

## 🐛 故障排查

### 智能助手不显示
1. 清除浏览器缓存
2. 检查控制台错误
3. 确认z-index设置

### 表单提交失败
1. 检查API_URL配置
2. 检查CORS设置
3. 查看后端日志

### 图片不显示
1. 检查图片路径
2. 检查文件权限
3. 检查Nginx配置

## 📞 支持

如有问题，请查看：
- `DEPLOYMENT-GUIDE.md` - 详细部署指南
- 控制台日志
- 后端日志：`pm2 logs mba-api`

## 🎉 准备上线

1. ✅ 前端已构建
2. ✅ 后端已准备
3. ✅ 文档已完善
4. ✅ 脚本已就绪

**现在可以部署到生产环境了！**

---

**构建时间**：2026-05-04 09:31
**目标上线时间**：2026-05-04 10:00
