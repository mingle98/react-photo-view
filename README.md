# react-photo-view-v2

<div align="center">

**一款超精致的 React 图片预览组件**

![example](./example.gif)

[在线文档](https://react-photo-view.vercel.app) | [更新日志](https://react-photo-view.vercel.app/docs/change-log) | 

</div>

---

## ✨ 特性

- 🖼️ **完美的交互体验** - 支持触摸手势，拖动/平移/物理效果滑动，双指指定位置放大/缩小
- 🎬 **流畅的动画** - 全方面动画衔接，打开/关闭/回弹/触边，顺其自然的交互效果
- 📱 **响应式设计** - 图像自适应，自动计算合适的初始大小，完美适配各种屏幕
- 🎮 **键盘导航** - 支持方向键切换、ESC 关闭，完美适配桌面端
- 🎨 **高度可定制** - 支持自定义 `<video />`、`<iframe />` 或任意 HTML 元素的预览
- 🔧 **强大的 API** - 支持命令式控制、受控模式、自定义缩放范围等高级功能
- 🌐 **SSR 支持** - 支持服务端渲染
- 📦 **体积小巧** - 仅 7KB Gzipped，基于 TypeScript 开发
- 💡 **简单易用** - API 设计简洁，5 分钟快速上手

---

## 📦 安装

### 使用 npm

```bash
npm install react-photo-view
```

### 使用 yarn

```bash
yarn add react-photo-view
```

### 使用 pnpm

```bash
pnpm add react-photo-view
```

---

## 🚀 快速开始

### 1. 基本用法

最简单的使用方式，只需要 3 步：

```jsx
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  return (
    <PhotoProvider>
      <PhotoView src="/path/to/image.jpg">
        <img src="/path/to/thumbnail.jpg" alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
```

**说明：**
- `PhotoProvider` - 图片预览容器，包裹需要预览的图片
- `PhotoView` - 单个图片预览组件，点击其子元素会触发预览
- 必须引入 CSS 文件才能正常显示

### 2. 多图预览

展示多张图片，自动支持左右切换：

```jsx
function Gallery() {
  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
  ];

  return (
    <PhotoProvider>
      <div className="gallery">
        {images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <img src={item} alt="" />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
```

### 3. 自定义缩放范围

控制图片的最小和最大缩放倍数：

```jsx
function CustomScale() {
  return (
    <PhotoProvider 
      minScale={0.5}  // 最小可缩小到 0.5 倍
      maxScale={10}   // 最大可放大到 10 倍
    >
      <PhotoView src="/image.jpg">
        <img src="/thumbnail.jpg" alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
```

**使用场景：**
- 设置 `minScale < 1` 可以让图片缩小到比屏幕适应尺寸更小
- 增大 `maxScale` 可以查看更多细节

### 4. 命令式控制

使用 Ref API 主动打开或关闭预览：

```jsx
import { useRef } from 'react';
import { PhotoProvider, PhotoView, PhotoProviderRef } from 'react-photo-view';

function ControlledGallery() {
  const photoRef = useRef<PhotoProviderRef>(null);

  return (
    <>
      <button onClick={() => photoRef.current?.show(0)}>
        打开第一张图片
      </button>
      <button onClick={() => photoRef.current?.close()}>
        关闭预览
      </button>

      <PhotoProvider ref={photoRef}>
        <PhotoView src="/image1.jpg">
          <img src="/image1.jpg" alt="" />
        </PhotoView>
        <PhotoView src="/image2.jpg">
          <img src="/image2.jpg" alt="" />
        </PhotoView>
      </PhotoProvider>
    </>
  );
}
```

### 5. 受控模式

完全控制预览的显示状态：

```jsx
import { useState } from 'react';

function ControlledMode() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <button onClick={() => { setIndex(0); setVisible(true); }}>
        查看图片
      </button>

      <PhotoProvider
        visible={visible}
        onVisibleChange={setVisible}
        onIndexChange={setIndex}
      >
        <PhotoView src="/image.jpg">
          <img src="/thumbnail.jpg" alt="" />
        </PhotoView>
      </PhotoProvider>
    </>
  );
}
```

---

## 📖 常用配置

### PhotoProvider 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `minScale` | 最小缩放倍数 | `number` | `1` |
| `maxScale` | 最大缩放倍数 | `number` | `6` |
| `loop` | 是否循环预览 | `boolean \| number` | `3` |
| `maskClosable` | 点击背景是否关闭 | `boolean` | `true` |
| `photoClosable` | 点击图片是否关闭 | `boolean` | `false` |
| `pullClosable` | 下拉是否关闭 | `boolean` | `true` |
| `bannerVisible` | 是否显示导航栏 | `boolean` | `true` |
| `visible` | 受控模式：是否显示 | `boolean` | - |
| `onVisibleChange` | 显示状态改变回调 | `(visible: boolean, index: number) => void` | - |
| `onIndexChange` | 索引改变回调 | `(index: number) => void` | - |

### PhotoProviderRef 方法

通过 `ref` 可以调用以下方法：

```typescript
interface PhotoProviderRef {
  show: (index?: number) => void;  // 显示指定索引的图片
  close: () => void;                // 关闭预览
}
```

### PhotoView 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `src` | 图片地址 | `string` | - |
| `overlay` | 自定义覆盖层内容 | `ReactNode` | - |
| `width` | 自定义宽度 | `number` | - |
| `height` | 自定义高度 | `number` | - |

---

## 💡 使用技巧

### 1. 不同的缩略图和预览图

```jsx
<PhotoView src="/high-quality.jpg">
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 2. 自定义触发方式

```jsx
<PhotoView src="/image.jpg" triggers={['onClick', 'onDoubleClick']}>
  <img src="/image.jpg" alt="" />
</PhotoView>
```

### 3. 预览视频

```jsx
<PhotoView
  width={800}
  height={600}
  render={() => (
    <video src="/video.mp4" controls />
  )}
>
  <img src="/video-poster.jpg" alt="" />
</PhotoView>
```

### 4. 添加图片描述

```jsx
<PhotoView
  src="/image.jpg"
  overlay={
    <div style={{ padding: 20, color: 'white' }}>
      这是图片的描述信息
    </div>
  }
>
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 5. 禁用某些交互

```jsx
<PhotoProvider
  maskClosable={false}    // 禁用点击背景关闭
  pullClosable={false}    // 禁用下拉关闭
  photoClosable={true}    // 启用点击图片关闭
>
  {/* ... */}
</PhotoProvider>
```

---

## 🎯 使用场景

### 电商网站

```jsx
function ProductGallery({ product }) {
  return (
    <PhotoProvider>
      <div className="product-images">
        {product.images.map((img, index) => (
          <PhotoView key={index} src={img.original}>
            <img src={img.thumbnail} alt={product.name} />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
```

### 社交媒体

```jsx
function PostImages({ images }) {
  return (
    <PhotoProvider bannerVisible={true} loop={true}>
      <div className="post-images">
        {images.map((img, index) => (
          <PhotoView key={index} src={img}>
            <img src={img} alt="" style={{ width: 200, height: 200, objectFit: 'cover' }} />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
```

### 相册应用

```jsx
function Album({ photos }) {
  const photoRef = useRef<PhotoProviderRef>(null);

  return (
    <div>
      <button onClick={() => photoRef.current?.show(0)}>
        幻灯片播放
      </button>

      <PhotoProvider 
        ref={photoRef}
        loop={true}
        minScale={0.3}
        maxScale={8}
      >
        <div className="grid">
          {photos.map((photo, index) => (
            <PhotoView key={index} src={photo.url}>
              <img src={photo.thumbnail} alt={photo.title} />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
}
```

---

## 🔧 高级用法

### 自定义工具栏

```jsx
<PhotoProvider
  toolbarRender={({ onScale, scale, rotate, onRotate }) => (
    <div className="custom-toolbar">
      <button onClick={() => onScale(scale + 1)}>放大</button>
      <button onClick={() => onScale(scale - 1)}>缩小</button>
      <button onClick={() => onRotate(rotate + 90)}>旋转</button>
    </div>
  )}
>
  {/* ... */}
</PhotoProvider>
```

### 自定义加载效果

```jsx
<PhotoProvider
  loadingElement={<div className="custom-loading">加载中...</div>}
>
  {/* ... */}
</PhotoProvider>
```

### 处理加载失败

```jsx
<PhotoProvider
  brokenElement={
    <div className="custom-broken">
      图片加载失败
    </div>
  }
>
  {/* ... */}
</PhotoProvider>
```

---

## ⚙️ TypeScript 支持

完整的 TypeScript 类型定义：

```typescript
import type { 
  PhotoProviderRef,
  PhotoProviderProps,
  PhotoProviderBase,
  DataType,
  OverlayRenderProps 
} from 'react-photo-view';

// 使用 ref
const photoRef = useRef<PhotoProviderRef>(null);

// 自定义渲染函数
const overlayRender = (props: OverlayRenderProps) => {
  return <div>{/* 自定义内容 */}</div>;
};
```

---

## ❓ 常见问题

### 1. 图片不显示？

确保已经引入了 CSS 文件：

```js
import 'react-photo-view/dist/react-photo-view.css';
```

### 2. 如何在预览中使用高清图？

使用不同的 `src` 即可：

```jsx
<PhotoView src="/high-quality.jpg">
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 3. 如何禁用某些图片的预览？

不使用 `PhotoView` 包裹即可：

```jsx
<PhotoProvider>
  <PhotoView src="/image1.jpg">
    <img src="/image1.jpg" alt="" />
  </PhotoView>
  
  {/* 这张图片不会被预览 */}
  <img src="/image2.jpg" alt="" />
</PhotoProvider>
```

### 4. 如何在 Next.js 中使用？

```jsx
// app/page.tsx 或 pages/index.tsx
'use client'; // 如果使用 App Router

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function Page() {
  return (
    <PhotoProvider>
      {/* ... */}
    </PhotoProvider>
  );
}
```

### 5. 缩放太慢或太快？

可以自定义动画速度：

```jsx
<PhotoProvider speed={(type) => (type === 1 ? 300 : 200)}>
  {/* ... */}
</PhotoProvider>
```

---

## 🌐 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

---

## 📚 更多资源

- [完整文档](https://react-photo-view.vercel.app)
- [API 参考](https://react-photo-view.vercel.app/docs/api)
- [在线示例](https://react-photo-view.vercel.app/docs/getting-started)
- [更新日志](https://react-photo-view.vercel.app/docs/change-log)
- [GitHub 仓库](https://github.com/MinJieLiu/react-photo-view)

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
