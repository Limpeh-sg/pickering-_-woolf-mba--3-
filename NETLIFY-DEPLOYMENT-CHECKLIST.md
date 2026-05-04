# Netlify Deployment Checklist

## ✅ 已完成的配置

1. **netlify.toml** - 配置正确
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20
   - Redirects: SPA routing configured

2. **_redirects 文件** - 已添加到 public/
   - 确保所有路由重定向到 index.html

3. **构建测试** - 本地构建成功
   - ✅ dist/index.html 存在
   - ✅ dist/assets/ 包含所有资源
   - ✅ 所有图片和静态文件正确

## 🔧 Netlify 环境变量设置

访问: https://app.netlify.com/sites/testmba111/settings/deploys#environment

### 可选但推荐的环境变量：

```
VITE_APP_NAME=Pickering Global Campus MBA
VITE_FORM_RECIPIENT_EMAIL=admissions@pickering.education
```

### 如果使用后端API：
```
VITE_API_URL=https://your-backend-url.com
```

## 📋 部署步骤

1. **触发部署**
   - 推送代码到 main 分支（自动触发）
   - 或在 Netlify 面板手动触发

2. **检查部署日志**
   - 访问: https://app.netlify.com/sites/testmba111/deploys
   - 查看最新部署的构建日志
   - 确认没有错误

3. **清除缓存重新部署**（如果需要）
   - 在 Netlify 面板点击 "Trigger deploy"
   - 选择 "Clear cache and deploy site"

## 🌐 访问链接

- **主站点**: https://testmba111.netlify.app
- **管理面板**: https://app.netlify.com/sites/testmba111

## 🐛 常见问题排查

### 404 错误
- ✅ 已添加 `_redirects` 文件
- ✅ netlify.toml 中配置了 redirects

### 构建失败
- 检查 Node 版本是否匹配
- 检查依赖是否正确安装
- 查看构建日志中的错误信息

### 白屏或空白页面
- 检查浏览器控制台错误
- 确认所有资源路径正确
- 检查是否有 JavaScript 错误

## 📝 最近更改

- ✅ 删除了 Jekyll workflow（不适用于 React 应用）
- ✅ 移除了 Google AI Studio 依赖
- ✅ 添加了文件上传功能
- ✅ 添加了 _redirects 文件用于 SPA 路由
