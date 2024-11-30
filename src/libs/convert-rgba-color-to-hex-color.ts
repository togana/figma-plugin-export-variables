type RgbaColor = Omit<RGBA, 'a'> & Partial<Pick<RGBA, 'a'>>;

export function convertRgbaColorToHexColor({ r, g, b, a }: RgbaColor): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.padStart(2, '0');
  };

  const hex = ['#', toHex(r), toHex(g), toHex(b)];
  if (a) {
    hex.push(toHex(a));
  }
  return hex.join('');
}
