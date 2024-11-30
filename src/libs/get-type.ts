import type { DTCGType } from '../types';

// NOTE: resolvedType は 'BOOLEAN' | 'COLOR' | 'FLOAT' | 'STRING' の4種類だが figma の型定義だと string になっているので string で受け取る
export function getType(resolvedType: string, scopes: string[]): DTCGType {
  switch (resolvedType) {
    case 'BOOLEAN':
      throw new Error('Boolean is not supported');
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      if (scopes.includes('ALL_SCOPES') || scopes.length > 2) {
        return 'number';
      }
      // NOTE: fontWeight のみの scope を設定すると FONT_WEIGHT と FONT_VARIATIONS が設定される
      return scopes.includes('FONT_WEIGHT') && scopes.includes('FONT_VARIATIONS')
        ? 'fontWeight'
        : 'number';
    case 'STRING':
      if (scopes.includes('ALL_SCOPES') || scopes.length > 1) {
        return 'unknown';
      }
      // NOTE: fontFamily のみの scope を設定すると FONT_FAMILY が設定される
      return scopes.includes('FONT_FAMILY') ? 'fontFamily' : 'unknown';
    default:
      throw new Error(`unknown resolvedType: ${resolvedType} is not supported`);
  }
}
