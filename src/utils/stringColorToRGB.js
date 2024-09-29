import htmlColorLookup from '../assets/htmlColorLookup';

const rgbRegex = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
const rgbaRegex = /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d\.?\d*)\)$/;

const hexRegex = /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})$/;

export default function stringColorToRGB(str) {
  if (rgbRegex.test(str) || rgbaRegex.test(str)) {
    return;
  }

  let hex = htmlColorLookup[str] || str;

  if (!hexRegex.test(hex)) {
    return [0, 0, 0];
  }

  const raw = hex.replace('#', '');

  if (raw.length === 3 || raw.length === 4) {
    return raw.split('').map(c => parseInt(c, 16));
  }

  if (raw.length === 6) {
    return [
      raw.slice(0, 2),
      raw.slice(2, 4),
      raw.slice(4, 6),
    ].map(c => parseInt(c, 16));
  }

  return [
    raw.slice(0, 2),
    raw.slice(2, 4),
    raw.slice(4, 6),
    raw.slice(6, 8),
  ].map(c => parseInt(c, 16));
}
