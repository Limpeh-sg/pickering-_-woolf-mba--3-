# Pickering Global Campus MBA 网站部署指南

## 📦 部署包内容

```
deployment-package-20260504-0931/
├── dist/                    # 前端构建文件（静态网站）
├── backend/                 # 后端API服务器
├── package.json            # 依赖配置
├── package-lock.json       # 锁定依赖版本
├── .env.example            # 环境变量模板
└── DEPLOYMENT-GUIDE.md     # 本文档
```

## 🚀 快速部署（10分钟上线）

### 方案A：Vercel部署（推荐 - 最快）

1. **前端部署**
   ```bash
   # 安装Vercel CLI
   npm i -g vercel
   
   # 进入dist目录
   cd dist
   
   # 部署
   vercel --prod
   ```

2. **后端部署**
   ```bash
   # 返回根目录
   cd ..
   
   # 部署后端
   cd backend
   vercel --prod
   ```

3. **配置环境变量**
   - 在Vercel Dashboard中设置：
     - `VITE_API_URL`: 后端API地址
     - `VITE_LARK_WEBHOOK_URL`: Lark Webhook地址
     - `VITE_FORM_RECIPIENT_EMAIL`: 表单接收邮箱

### 方案B：Netlify部署

1. **前端部署**
   ```bash
   # 安装Netlify CLI
   npm i -g netlify-cli
   
   # 部署
   cd dist
   netlify deploy --prod --dir .
   ```

2. **后端部署**
   - 使用Netlify Functions或部署到其他服务器

### 方案C：传统服务器部署

#### 前端部署（Nginx）

1. **上传文件**
   ```bash
   # 将dist目录上传到服务器
   scp -r dist/* user@server:/var/www/html/
   ```

2. **Nginx配置**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       # SPA路由支持
       location / {
           try_files $uri $uri/ /index.html;
       }

       # 静态资源缓存
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Gzip压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

3. **重启Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### 后端部署（Node.js + PM2）

1. **安装依赖**
   ```bash
   cd backend
   npm install --production
   ```

2. **配置环境变量**
   ```bash
   cp ../.env.example .env
   # 编辑.env文件，填入实际配置
   nano .env
   ```

3. **使用PM2启动**
   ```bash
   # 安装PM2
   npm i -g pm2
   
   # 启动服务
   pm2 start server.ts --name mba-api
   
   # 设置开机自启
   pm2 startup
   pm2 save
   ```

## 🔧 环境变量配置

创建 `.env` 文件（基于 `.env.example`）：

```env
# API配置
VITE_API_URL=https://api.your-domain.com
PORT=3001

# Lark配置
VITE_LARK_WEBHOOK_URL=https://open.larksuite.com/open-apis/bot/v2/hook/your-webhook-id
LARK_APP_ID=your-app-id
LARK_APP_SECRET=your-app-secret

# 邮件配置
VITE_FORM_RECIPIENT_EMAIL=admissions@pickering.education
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 数据库配置（如需要）
DATABASE_URL=postgresql://user:password@localhost:5432/mba_leads
```

## ✅ 部署检查清单

### 部署前检查

- [ ] 所有环境变量已配置
- [ ] Lark Webhook已测试
- [ ] 邮件服务已配置
- [ ] 域名DNS已解析
- [ ] SSL证书已配置

### 部署后检查

- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 图片资源加载正常
- [ ] 表单提交功能正常
- [ ] 智能助手功能正常
- [ ] Lark通知正常接收
- [ ] 移动端显示正常
- [ ] 英雄区图片高清显示
- [ ] 认证卡片显示正常

## 🎯 关键功能测试

### 1. 智能助手测试
- [ ] 点击右下角悬浮按钮
- [ ] 选择选项1-10
- [ ] 完成5级对话流程
- [ ] 提交表单
- [ ] 检查Lark是否收到通知

### 2. 表单提交测试
- [ ] 填写申请表单
- [ ] 填写咨询表单
- [ ] 填写手册下载表单
- [ ] 检查邮件通知
- [ ] 检查Lark通知

### 3. 页面导航测试
- [ ] 首页
- [ ] 申请页面
- [ ] 师资页面
- [ ] 奖学金页面
- [ ] 法律页面
- [ ] 联系页面

## 📊 性能优化建议

### 已实现的优化

✅ 图片懒加载
✅ 代码分割
✅ Gzip压缩
✅ 静态资源缓存
✅ WebP图片格式
✅ 关键资源预加载

### 可选优化

- [ ] 配置CDN（Cloudflare/AWS CloudFront）
- [ ] 启用HTTP/2
- [ ] 配置Service Worker（PWA）
- [ ] 图片进一步压缩
- [ ] 启用Brotli压缩

## 🔒 安全配置

### 必须配置

1. **HTTPS**
   ```bash
   # 使用Let's Encrypt免费证书
   sudo certbot --nginx -d your-domain.com
   ```

2. **安全头部**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header Referrer-Policy "no-referrer-when-downgrade" always;
   ```

3. **CORS配置**
   - 后端API需要配置正确的CORS策略
   - 只允许前端域名访问

## 📱 移动端优化

### 已实现

✅ 响应式设计
✅ 触摸优化
✅ 移动端半屏智能助手
✅ 移动端表单优化
✅ 移动端英雄区背景

### 测试设备

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] 各种屏幕尺寸

## 🐛 常见问题排查

### 问题1：智能助手不显示
**解决方案**：
- 检查z-index设置
- 清除浏览器缓存
- 检查控制台错误

### 问题2：表单提交失败
**解决方案**：
- 检查API_URL配置
- 检查CORS设置
- 检查Lark Webhook配置
- 查看后端日志

### 问题3：图片不显示
**解决方案**：
- 检查图片路径
- 检查Nginx配置
- 检查文件权限

### 问题4：路由404错误
**解决方案**：
- 检查Nginx try_files配置
- 确保SPA路由支持已启用

## 📞 技术支持

### 日志位置

- **前端日志**：浏览器控制台
- **后端日志**：`pm2 logs mba-api`
- **Nginx日志**：`/var/log/nginx/error.log`

### 监控命令

```bash
# 查看后端状态
pm2 status

# 查看后端日志
pm2 logs mba-api

# 重启后端
pm2 restart mba-api

# 查看Nginx状态
sudo systemctl status nginx

# 测试Nginx配置
sudo nginx -t
```

## 🎉 部署完成

部署完成后，访问您的域名：
- 前端：https://your-domain.com
- 后端API：https://api.your-domain.com

祝您部署顺利！🚀

---

**部署时间**：2026-05-04 09:31
**版本**：v1.0.0
**构建日期**：2026-05-04
