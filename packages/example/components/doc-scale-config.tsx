import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import photo1 from '../images/1.jpg';
import photo2 from '../images/2.jpg';
import photo3 from '../images/3.jpg';

/**
 * 自定义缩放范围示例
 */
export default function DocScaleConfig() {
  const [minScale, setMinScale] = useState(0.5);
  const [maxScale, setMaxScale] = useState(10);

  return (
    <div>
      <h2>自定义缩放范围</h2>
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 20 }}>
          最小缩放倍数:
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="1"
            value={minScale}
            onChange={(e) => setMinScale(Number(e.target.value))}
            style={{ marginLeft: 10, width: 80 }}
          />
        </label>
        <label>
          最大缩放倍数:
          <input
            type="number"
            step="1"
            min="2"
            max="20"
            value={maxScale}
            onChange={(e) => setMaxScale(Number(e.target.value))}
            style={{ marginLeft: 10, width: 80 }}
          />
        </label>
      </div>
      <PhotoProvider minScale={minScale} maxScale={maxScale}>
        <div style={{ display: 'flex', gap: 10 }}>
          <PhotoView src={photo1.src}>
            <img src={photo1.src} alt="" style={{ width: 200, cursor: 'pointer' }} />
          </PhotoView>
          <PhotoView src={photo2.src}>
            <img src={photo2.src} alt="" style={{ width: 200, cursor: 'pointer' }} />
          </PhotoView>
          <PhotoView src={photo3.src}>
            <img src={photo3.src} alt="" style={{ width: 200, cursor: 'pointer' }} />
          </PhotoView>
        </div>
      </PhotoProvider>
      <p style={{ marginTop: 20, color: '#666' }}>
        当前配置：最小缩放 {minScale}x，最大缩放 {maxScale}x。使用鼠标滚轮或双指缩放来测试效果。
      </p>
    </div>
  );
}

