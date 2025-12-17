import { maxScale, minScale } from '../variables';

export const limitNumber = (value: number, min: number, max: number) => {
  return Math.max(Math.min(value, max), min);
};

/**
 * 限制最大/最小缩放
 */
export const limitScale = (
  scale: number,
  max: number = 0,
  buffer: number = 0,
  customMinScale: number = minScale,
  customMaxScale: number = maxScale,
) => {
  return limitNumber(scale, customMinScale * (1 - buffer), Math.max(customMaxScale, max) * (1 + buffer));
};
