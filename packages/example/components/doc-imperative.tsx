import React, { useRef } from 'react';
import { PhotoProvider, PhotoView, PhotoProviderRef } from 'react-photo-view';
import photo1 from '../images/1.jpg';
import photo2 from '../images/2.jpg';
import photo3 from '../images/3.jpg';

/**
 * 命令式控制示例 - 使用 Ref API
 */
export function DocImperativeRef() {
  const photoProviderRef = useRef<PhotoProviderRef>(null);

  return (
    <div>
      <h2>命令式控制 - Ref API</h2>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => photoProviderRef.current?.show(0)} style={{ marginRight: 10 }}>
          打开第1张图片
        </button>
        <button onClick={() => photoProviderRef.current?.show(1)} style={{ marginRight: 10 }}>
          打开第2张图片
        </button>
        <button onClick={() => photoProviderRef.current?.show(2)} style={{ marginRight: 10 }}>
          打开第3张图片
        </button>
        <button onClick={() => photoProviderRef.current?.close()}>关闭预览</button>
      </div>
      <PhotoProvider ref={photoProviderRef}>
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
        使用 ref API 可以在外部主动控制图片预览的打开和关闭。
      </p>
    </div>
  );
}

/**
 * 受控模式示例
 */
export function DocImperativeControlled() {
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <div>
      <h2>受控模式</h2>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => {
            setIndex(0);
            setVisible(true);
          }}
          style={{ marginRight: 10 }}
        >
          打开第1张图片
        </button>
        <button
          onClick={() => {
            setIndex(1);
            setVisible(true);
          }}
          style={{ marginRight: 10 }}
        >
          打开第2张图片
        </button>
        <button
          onClick={() => {
            setIndex(2);
            setVisible(true);
          }}
          style={{ marginRight: 10 }}
        >
          打开第3张图片
        </button>
        <button onClick={() => setVisible(false)}>关闭预览</button>
      </div>
      <PhotoProvider
        visible={visible}
        onVisibleChange={(vis) => setVisible(vis)}
        onIndexChange={(idx) => setIndex(idx)}
      >
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
        当前状态：{visible ? `打开 (第 ${index + 1} 张)` : '关闭'}
      </p>
      <p style={{ marginTop: 10, color: '#666' }}>
        使用受控模式可以完全控制预览的显示状态和当前索引。
      </p>
    </div>
  );
}

export default function DocImperative() {
  return (
    <div>
      <DocImperativeRef />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <DocImperativeControlled />
    </div>
  );
}

