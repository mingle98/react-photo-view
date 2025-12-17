import React, { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import type { DataType, PhotoProviderBase } from './types';
import useMethods from './hooks/useMethods';
import useSetState from './hooks/useSetState';
import PhotoContext from './photo-context';
import PhotoSlider from './PhotoSlider';

export interface PhotoProviderProps extends PhotoProviderBase {
  children: React.ReactNode;
  /**
   * 受控模式：是否显示预览
   */
  visible?: boolean;
  /**
   * 受控模式：当前索引
   */
  defaultIndex?: number;
  onIndexChange?: (index: number, state: PhotoProviderState) => void;
  onVisibleChange?: (visible: boolean, index: number, state: PhotoProviderState) => void;
}

export interface PhotoProviderRef {
  /**
   * 显示指定索引的图片
   */
  show: (index?: number) => void;
  /**
   * 关闭预览
   */
  close: () => void;
}

type PhotoProviderState = {
  images: DataType[];
  visible: boolean;
  index: number;
};

const initialState: PhotoProviderState = {
  images: [],
  visible: false,
  index: 0,
};

const PhotoProviderInner = forwardRef<PhotoProviderRef, PhotoProviderProps>(function PhotoProvider(
  { children, visible: controlledVisible, defaultIndex = 0, onIndexChange, onVisibleChange, ...restProps },
  ref,
) {
  const [state, updateState] = useSetState(initialState);
  const uniqueIdRef = useRef(0);
  const { images, visible: innerVisible, index } = state;

  // 判断是否为受控模式
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : innerVisible;

  const methods = useMethods({
    nextId() {
      return (uniqueIdRef.current += 1);
    },
    update(imageItem: DataType) {
      const currentIndex = images.findIndex((n) => n.key === imageItem.key);
      if (currentIndex > -1) {
        const nextImages = images.slice();
        nextImages.splice(currentIndex, 1, imageItem);
        updateState({
          images: nextImages,
        });
        return;
      }
      updateState((prev) => ({
        images: prev.images.concat(imageItem),
      }));
    },
    remove(key: number) {
      updateState((prev) => {
        const nextImages = prev.images.filter((item) => item.key !== key);
        const nextEndIndex = nextImages.length - 1;
        return {
          images: nextImages,
          index: Math.min(nextEndIndex, index),
        };
      });
    },
    show(key: number) {
      const currentIndex = images.findIndex((item) => item.key === key);
      // 更新索引（无论是否受控）
      updateState({
        index: currentIndex,
      });
      // 如果是非受控模式，更新 visible
      if (!isControlled) {
        updateState({
          visible: true,
        });
      }
      // 触发回调
      if (onVisibleChange) {
        onVisibleChange(true, currentIndex, { ...state, index: currentIndex });
      }
    },
  });

  const fn = useMethods({
    close() {
      if (!isControlled) {
        updateState({
          visible: false,
        });
      }

      if (onVisibleChange) {
        onVisibleChange(false, index, state);
      }
    },
    changeIndex(nextIndex: number) {
      updateState({
        index: nextIndex,
      });

      if (onIndexChange) {
        onIndexChange(nextIndex, state);
      }
    },
  });

  // 暴露给 ref 的方法
  useImperativeHandle(ref, () => ({
    show: (showIndex?: number) => {
      const targetIndex = showIndex !== undefined ? showIndex : defaultIndex;
      // 更新索引（无论是否受控）
      updateState({
        index: targetIndex,
      });
      // 如果是非受控模式，更新 visible
      if (!isControlled) {
        updateState({
          visible: true,
        });
      }
      // 触发回调
      if (onVisibleChange) {
        onVisibleChange(true, targetIndex, { ...state, index: targetIndex });
      }
    },
    close: fn.close,
  }));

  const value = useMemo(() => ({ ...state, ...methods }), [state, methods]);

  return (
    <PhotoContext.Provider value={value}>
      {children}
      <PhotoSlider
        images={images}
        visible={visible}
        index={index}
        onIndexChange={fn.changeIndex}
        onClose={fn.close}
        {...restProps}
      />
    </PhotoContext.Provider>
  );
});

export default PhotoProviderInner;
