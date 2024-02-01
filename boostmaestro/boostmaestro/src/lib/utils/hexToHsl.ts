function hexToRgb(color: string) {
    let hex = color[0] === '#' ? color.slice(1) : color
    let c

    // expand the short hex by doubling each character, fc0 -> ffcc00
    if (hex.length !== 6) {
        hex = ((() => {
        const result = []
        for (c of Array.from(hex)) {
            result.push(`${c}${c}`)
        }
        return result
        })()).join('')
    }
    const colorStr = hex.match(/#?(.{2})(.{2})(.{2})/)?.slice(1)
    const rgb = colorStr?.map(col => parseInt(col, 16))
    rgb?.push(1)
    return rgb
}

function rgbToHsl (rgb: number[]) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const add = max + min;
  
    const hue =
      min === max ?
        0
      : r === max ?
        (((60 * (g - b)) / diff) + 360) % 360
      : g === max ?
        ((60 * (b - r)) / diff) + 120
      :
        ((60 * (r - g)) / diff) + 240;
  
    const lum = 0.5 * add;
  
    const sat =
      lum === 0 ?
        0
      : lum === 1 ?
        1
      : lum <= 0.5 ?
        diff / add
      :
        diff / (2 - add);
  
    const h = Math.round(hue);
    const s = Math.round(sat * 100);
    const l = Math.round(lum * 100);
    const a = rgb[3] || 1;
  
    return [h, s, l, a];
}

export function hexToHsl(color: string) {
    return rgbToHsl(hexToRgb(color)!)
}

function hslToRgb(hsl: number[]) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const a = hsl[3] || 1;

  let r, g, b;

  if (s === 0) {
      r = g = b = l; // achromatic
  } else {
      const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
}

function rgbToHex(rgb: number[]) {
  const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}

export function hslToHex(hslString: string) {
  const hsl = hslString.replace(/%/g, '').split(' ').map(Number);
  const rgb = hslToRgb(hsl);
  return rgbToHex(rgb);
}
