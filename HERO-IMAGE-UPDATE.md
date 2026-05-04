# 英雄区图片更新说明

## ✅ 已完成的修改

### 1. 图片位置
- **PC端**：右侧面板使用校园广告牌图片
- **移动端**：全背景使用校园广告牌图片

### 2. 视觉效果
- 添加了**主题蓝色毛玻璃效果**（70% 透明度）
- 使用 `backdrop-blur-sm` 实现毛玻璃模糊效果
- 颜色：`bg-primary/70`（主题蓝色，70% 不透明度）

### 3. 图片优化
- 格式：WebP（高压缩比，优秀画质）
- 路径：`/pgc_mba_landing_images/hero-campus-billboard.webp`
- 当前使用：临时使用 `hero-overview.jpg` 转换的版本
- 文件大小：约 111 KB（已优化）

## 📝 如何替换为校园广告牌图片

### 方法 1：使用提供的脚本（推荐）

```bash
# 将您上传的校园图片保存到本地，然后运行：
./convert-hero-image.sh /path/to/campus-billboard.jpg
```

### 方法 2：手动转换

```bash
# 使用 cwebp 命令
cwebp -q 85 -resize 1920 0 -m 6 campus-billboard.jpg -o public/pgc_mba_landing_images/hero-campus-billboard.webp
```

参数说明：
- `-q 85`: 质量 85%（平衡文件大小和画质）
- `-resize 1920 0`: 宽度调整为 1920px，高度自动
- `-m 6`: 最大压缩努力（更小的文件）

### 方法 3：在线转换

1. 访问 https://squoosh.app/ 或 https://cloudconvert.com/
2. 上传校园广告牌图片
3. 选择 WebP 格式，质量设置为 85%
4. 下载并保存到 `public/pgc_mba_landing_images/hero-campus-billboard.webp`

## 🎨 代码修改详情

### 移动端（全背景）
```tsx
<div className="absolute inset-0 lg:hidden pointer-events-none">
  <img src="/pgc_mba_landing_images/hero-campus-billboard.webp" alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
</div>
```

### PC端（右侧面板）
```tsx
<div className="relative hidden lg:block overflow-hidden">
  <img
    src="/pgc_mba_landing_images/hero-campus-billboard.webp"
    alt="Pickering Global Campus"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm pointer-events-none" />
  {/* 统计数据轮播仍然显示在上方 */}
</div>
```

## 🔍 视觉效果说明

- **毛玻璃效果**：`backdrop-blur-sm` 创建轻微模糊
- **蓝色叠加**：`bg-primary/70` 使用主题蓝色，70% 不透明度
- **图片清晰度**：透过毛玻璃仍能看到校园建筑细节
- **文字可读性**：蓝色叠加确保白色文字清晰可读

## 📱 响应式设计

- **移动端**：全屏背景，文字在上方，毛玻璃效果确保可读性
- **PC端**：左右分栏，左侧文字，右侧图片+毛玻璃效果
- **统计数据**：PC端右侧仍显示轮播统计数据

## ✨ 优化建议

如果您觉得毛玻璃效果太强或太弱，可以调整：

- **更强模糊**：`backdrop-blur-md` 或 `backdrop-blur-lg`
- **更弱模糊**：`backdrop-blur-[2px]`
- **调整透明度**：`bg-primary/60`（更透明）或 `bg-primary/80`（更不透明）

修改位置：`src/pages/Home.tsx` 第 95 行和第 108 行
