# react-photo-view

**English** | [中文](./README.zh-CN.md)

<div align="center">

**An exquisite React photo preview component**

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Minified size][min-size-image]][bundlephobia-url]
[![Gzip size][gzip-size-image]][bundlephobia-url]

![example](./example.gif)

[Documentation](https://react-photo-view.vercel.app) | [Change Log](https://react-photo-view.vercel.app/docs/change-log) | [中文文档](./README.zh-CN.md)

</div>

---

## ✨ Features

- 🖼️ **Perfect Interaction** - Support touch gestures, drag/pan with physics effects, pinch to zoom
- 🎬 **Smooth Animations** - Seamless transitions for open/close/rebound/edge interactions
- 📱 **Responsive Design** - Automatically calculates the best initial size, adapts to all screens
- 🎮 **Keyboard Navigation** - Arrow keys for switching, ESC to close, perfect for desktop
- 🎨 **Highly Customizable** - Support custom `<video />`, `<iframe />` or any HTML element preview
- 🔧 **Powerful API** - Imperative control, controlled mode, custom scale range and more
- 🌐 **SSR Support** - Works with server-side rendering
- 📦 **Lightweight** - Only 7KB Gzipped, built with TypeScript
- 💡 **Easy to Use** - Simple API, get started in 5 minutes

---

## 📦 Installation

### Using npm

```bash
npm install react-photo-view
```

### Using yarn

```bash
yarn add react-photo-view
```

### Using pnpm

```bash
pnpm add react-photo-view
```

---

## 🚀 Quick Start

### 1. Basic Usage

The simplest way to use, just 3 steps:

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

**Explanation:**
- `PhotoProvider` - Photo preview container, wraps images that need preview
- `PhotoView` - Single image preview component, clicking its children triggers preview
- Must import CSS file for proper display

### 2. Multiple Images

Display multiple images with automatic left/right navigation:

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

### 3. Custom Scale Range

Control the minimum and maximum zoom levels:

```jsx
function CustomScale() {
  return (
    <PhotoProvider 
      minScale={0.5}  // Minimum zoom 0.5x
      maxScale={10}   // Maximum zoom 10x
    >
      <PhotoView src="/image.jpg">
        <img src="/thumbnail.jpg" alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
```

**Use Cases:**
- Set `minScale < 1` to allow zooming out smaller than screen size
- Increase `maxScale` to view more details

### 4. Imperative Control

Use Ref API to programmatically open or close preview:

```jsx
import { useRef } from 'react';
import { PhotoProvider, PhotoView, PhotoProviderRef } from 'react-photo-view';

function ControlledGallery() {
  const photoRef = useRef<PhotoProviderRef>(null);

  return (
    <>
      <button onClick={() => photoRef.current?.show(0)}>
        Open First Image
      </button>
      <button onClick={() => photoRef.current?.close()}>
        Close Preview
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

### 5. Controlled Mode

Fully control the preview visibility state:

```jsx
import { useState } from 'react';

function ControlledMode() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <button onClick={() => { setIndex(0); setVisible(true); }}>
        View Image
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

## 📖 Common Configuration

### PhotoProvider Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| `minScale` | Minimum scale value | `number` | `1` |
| `maxScale` | Maximum scale value | `number` | `6` |
| `loop` | Enable loop preview | `boolean \| number` | `3` |
| `maskClosable` | Close on backdrop click | `boolean` | `true` |
| `photoClosable` | Close on photo click | `boolean` | `false` |
| `pullClosable` | Close on pull down | `boolean` | `true` |
| `bannerVisible` | Show navigation banner | `boolean` | `true` |
| `visible` | Controlled mode: visibility | `boolean` | - |
| `onVisibleChange` | Visibility change callback | `(visible: boolean, index: number) => void` | - |
| `onIndexChange` | Index change callback | `(index: number) => void` | - |

### PhotoProviderRef Methods

Available methods via `ref`:

```typescript
interface PhotoProviderRef {
  show: (index?: number) => void;  // Show photo at index
  close: () => void;                // Close preview
}
```

### PhotoView Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| `src` | Image source | `string` | - |
| `overlay` | Custom overlay content | `ReactNode` | - |
| `width` | Custom width | `number` | - |
| `height` | Custom height | `number` | - |

---

## 💡 Usage Tips

### 1. Different Thumbnail and Preview

```jsx
<PhotoView src="/high-quality.jpg">
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 2. Custom Trigger

```jsx
<PhotoView src="/image.jpg" triggers={['onClick', 'onDoubleClick']}>
  <img src="/image.jpg" alt="" />
</PhotoView>
```

### 3. Preview Video

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

### 4. Add Image Description

```jsx
<PhotoView
  src="/image.jpg"
  overlay={
    <div style={{ padding: 20, color: 'white' }}>
      Image description goes here
    </div>
  }
>
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 5. Disable Interactions

```jsx
<PhotoProvider
  maskClosable={false}    // Disable backdrop click
  pullClosable={false}    // Disable pull to close
  photoClosable={true}    // Enable photo click to close
>
  {/* ... */}
</PhotoProvider>
```

---

## 🎯 Use Cases

### E-commerce Website

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

### Social Media

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

### Photo Album

```jsx
function Album({ photos }) {
  const photoRef = useRef<PhotoProviderRef>(null);

  return (
    <div>
      <button onClick={() => photoRef.current?.show(0)}>
        Start Slideshow
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

## 🔧 Advanced Usage

### Custom Toolbar

```jsx
<PhotoProvider
  toolbarRender={({ onScale, scale, rotate, onRotate }) => (
    <div className="custom-toolbar">
      <button onClick={() => onScale(scale + 1)}>Zoom In</button>
      <button onClick={() => onScale(scale - 1)}>Zoom Out</button>
      <button onClick={() => onRotate(rotate + 90)}>Rotate</button>
    </div>
  )}
>
  {/* ... */}
</PhotoProvider>
```

### Custom Loading

```jsx
<PhotoProvider
  loadingElement={<div className="custom-loading">Loading...</div>}
>
  {/* ... */}
</PhotoProvider>
```

### Handle Load Error

```jsx
<PhotoProvider
  brokenElement={
    <div className="custom-broken">
      Failed to load image
    </div>
  }
>
  {/* ... */}
</PhotoProvider>
```

---

## ⚙️ TypeScript Support

Full TypeScript type definitions:

```typescript
import type { 
  PhotoProviderRef,
  PhotoProviderProps,
  PhotoProviderBase,
  DataType,
  OverlayRenderProps 
} from 'react-photo-view';

// Using ref
const photoRef = useRef<PhotoProviderRef>(null);

// Custom render function
const overlayRender = (props: OverlayRenderProps) => {
  return <div>{/* Custom content */}</div>;
};
```

---

## ❓ FAQ

### 1. Images not showing?

Make sure you've imported the CSS file:

```js
import 'react-photo-view/dist/react-photo-view.css';
```

### 2. How to use high-quality images in preview?

Use different `src`:

```jsx
<PhotoView src="/high-quality.jpg">
  <img src="/thumbnail.jpg" alt="" />
</PhotoView>
```

### 3. How to disable preview for certain images?

Simply don't wrap them with `PhotoView`:

```jsx
<PhotoProvider>
  <PhotoView src="/image1.jpg">
    <img src="/image1.jpg" alt="" />
  </PhotoView>
  
  {/* This image won't be previewable */}
  <img src="/image2.jpg" alt="" />
</PhotoProvider>
```

### 4. How to use in Next.js?

```jsx
// app/page.tsx or pages/index.tsx
'use client'; // If using App Router

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

### 5. Zoom too slow or fast?

Customize animation speed:

```jsx
<PhotoProvider speed={(type) => (type === 1 ? 300 : 200)}>
  {/* ... */}
</PhotoProvider>
```

---

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 📚 Resources

- [Documentation](https://react-photo-view.vercel.app)
- [API Reference](https://react-photo-view.vercel.app/docs/api)
- [Examples](https://react-photo-view.vercel.app/docs/getting-started)
- [Change Log](https://react-photo-view.vercel.app/docs/change-log)
- [GitHub Repository](https://github.com/MinJieLiu/react-photo-view)

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

## 📄 License

Apache-2.0 © [MinJieLiu](https://github.com/MinJieLiu)

---

## 🙏 Acknowledgments

Thanks to all contributors who have helped make this project better!

---

[npm-image]: https://img.shields.io/npm/v/react-photo-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-photo-view
[downloads-image]: http://img.shields.io/npm/dm/react-photo-view.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-photo-view
[min-size-image]: https://badgen.net/bundlephobia/min/react-photo-view?label=minified
[gzip-size-image]: https://badgen.net/bundlephobia/minzip/react-photo-view?label=gzip
[bundlephobia-url]: https://bundlephobia.com/result?p=react-photo-view
