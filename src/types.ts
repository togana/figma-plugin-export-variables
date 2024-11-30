import { EventHandler } from '@create-figma-plugin/utilities'

export type Extensions = {
  [namespace: string]: {
    figmaId?: string;
    modes?: string[] | Record<string, string | number>;
  };
}
// figma で表現できる範囲で DTCG の定義に合わせる
// NOTE: dimension は unit の登録が figma でできないので含めないが scope によって px, %, rem などを決めるもの良いかもしれない
export type DTCGType = "color" | "number" | "fontFamily" | "fontWeight" | "unknown";
export type DTCGVariable = {
  [key: string]: DTCGVariable | string | number | boolean | undefined | Extensions;
  $value?: string | number;
  $type?: DTCGType;
  $description?: string;
  $deprecated?: boolean | string;
  $extensions?: Extensions;
}
export type DTCGCollection = {
  [key: string]: DTCGVariable | string | number | boolean | undefined | Extensions;
  $extensions?: Extensions;
}

export interface CopyEventHandler extends EventHandler {
  name: "COPY_TO_CLIPBOARD";
  handler: (type: 'success' | 'error') => void
}
