import React, { useRef, useState } from 'react';
import { PhotoProvider, PhotoView, PhotoProviderRef } from 'react-photo-view';
import photo1 from '../images/1.jpg';
import photo2 from '../images/2.jpg';
import photo3 from '../images/3.jpg';
import photo4 from '../images/4.jpg';

/**
 * 高级功能综合示例
 * 同时展示自定义缩放范围和命令式控制
 */
export default function DocAdvanced() {
  const photoProviderRef = useRef<PhotoProviderRef>(null);
  const [minScale, setMinScale] = useState(0.3);
  const [maxScale, setMaxScale] = useState(8);

  const images = [
    { src: photo1.src, name: '图片 1' },
    { src: photo2.src, name: '图片 2' },
    { src: photo3.src, name: '图片 3' },
    { src: photo4.src, name: '图片 4' },
  ];

  return (
    <div>
      <h2>高级功能综合示例</h2>

      <div style={{ marginBottom: 20, padding: 15, background: '#f5f5f5', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>缩放配置</h3>
        <div style={{ display: 'flex', gap: 20 }}>
          <label>
            最小缩放:
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="1"
              value={minScale}
              onChange={(e) => setMinScale(Number(e.target.value))}
              style={{ marginLeft: 10, width: 80 }}
            />
            x
          </label>
          <label>
            最大缩放:
            <input
              type="number"
              step="1"
              min="2"
              max="20"
              value={maxScale}
              onChange={(e) => setMaxScale(Number(e.target.value))}
              style={{ marginLeft: 10, width: 80 }}
            />
            x
          </label>
        </div>
      </div>

      <div style={{ marginBottom: 20, padding: 15, background: '#f0f7ff', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>命令式控制</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => photoProviderRef.current?.show(idx)}
              style={{
                padding: '8px 16px',
                background: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              打开 {img.name}
            </button>
          ))}
          <button
            onClick={() => photoProviderRef.current?.close()}
            style={{
              padding: '8px 16px',
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            关闭预览
          </button>
        </div>
      </div>

      <PhotoProvider ref={photoProviderRef} minScale={minScale} maxScale={maxScale}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 15 }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <PhotoView src={img.src}>
                <img
                  src={img.src}
                  alt={img.name}
                  style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: 8,
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </PhotoView>
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  right: 8,
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {img.name}
              </div>
            </div>
          ))}
        </div>
      </PhotoProvider>

      <div style={{ marginTop: 20, padding: 15, background: '#fff7e6', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>使用说明</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>可以通过滑块调整缩放范围（最小 {minScale}x ~ 最大 {maxScale}x）</li>
          <li>使用鼠标滚轮或双指缩放来测试缩放效果</li>
          <li>点击按钮可以直接打开指定的图片</li>
          <li>也可以直接点击图片缩略图来查看</li>
        </ul>
      </div>
    </div>
  );
}

