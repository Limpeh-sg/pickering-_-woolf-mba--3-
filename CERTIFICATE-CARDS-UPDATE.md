# 证书卡片样式更新

## 更新日期
2026年5月4日

## 更改内容

更新了英雄区（Hero Section）右侧的四个证书认证卡片的视觉样式。

### 修改的卡片
1. **Malta MFHEA** - 马耳他高等教育管理局
2. **Lisbon Convention** - 里斯本公约
3. **Europass · ECTS** - 欧洲学分转换系统
4. **AACSB** - 国际商学院协会联盟

### 样式变更

#### 之前的样式
- 圆角边框 (`rounded-2xl`)
- 较粗的白色边框 (`border-2 border-white/40`)
- 纯色背景 (`rgba(255, 255, 255, 0.98)`)
- 灰色文字 (`text-gray-900`)
- 中等模糊效果 (`backdrop-blur-md`)

#### 更新后的样式
- **直角边框** - 移除了圆角，使用直角设计
- **细边框** - 更精致的边框 (`border border-white/20`)
- **玻璃罩底效果** - 使用渐变背景和内阴影创造玻璃质感
  - 渐变背景：`linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)`
  - 外阴影：`0 8px 32px rgba(31, 38, 135, 0.15)`
  - 内阴影（高光）：`inset 0 1px 0 rgba(255, 255, 255, 0.5)`
- **纯黑色文字** - 更强的对比度 (`text-black`)
- **增强模糊效果** - 更强的背景模糊 (`backdrop-blur-xl`)

### 视觉效果

新的设计创造了一种现代的玻璃态（Glassmorphism）效果：
- 半透明的白色渐变背景
- 柔和的阴影增加深度感
- 顶部的内阴影模拟玻璃反光
- 直角边框呈现更专业、更正式的感觉
- 黑色文字提供清晰的可读性

### 技术实现

```tsx
<div 
  className="backdrop-blur-xl p-4 w-36 border border-white/20"
  style={{
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
  }}
>
  {/* 卡片内容 */}
</div>
```

### 修改的文件
- `src/pages/Home.tsx`
- `deployment-package-complete/src/pages/Home.tsx`

### 构建状态
✅ 构建成功 - 无错误

### 下一步
重新部署到 Netlify 以应用这些视觉更改。
