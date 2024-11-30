import { convertRgbaColorToHexColor } from "./convert-rgba-color-to-hex-color";
import { getVariableById } from "./get-variable-by-id";
import { type ReturnUniqueKeyIdMaps } from "./unique-key-id-maps";

export function convertValueToJSON(value: VariableValue, collectionIdToKeyMap: ReturnUniqueKeyIdMaps['idToKey']): string | number {
  const isVariableAlias = (v: VariableValue): v is VariableAlias => typeof v === 'object' && 'type' in v && v.type === 'VARIABLE_ALIAS';
  const isRGBorRGBA = (v: VariableValue): v is RGB | RGBA => typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v;

  if (typeof value === 'boolean') {
    throw new Error('Boolean value is not supported');
  }

  if (isVariableAlias(value)) {
    const variable = getVariableById(value.id);
    const prefix = collectionIdToKeyMap[variable.variableCollectionId];
    return `{${prefix}.${variable.name.replace(/\//g, ".")}}`;
  }

  return isRGBorRGBA(value) ? convertRgbaColorToHexColor(value) : value;
}
