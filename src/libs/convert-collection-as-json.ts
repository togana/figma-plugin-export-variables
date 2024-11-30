import { DTCGCollection } from "../types";
import { convertSafeNameParts } from "./convert-safe-name-parts";
import { convertValueToJSON } from "./convert-value-to-json";
import { createNestedVariable } from "./create-nested-variable";
import { getType } from "./get-type";
import { getVariableById } from "./get-variable-by-id";
import { uniqueKeyIdMaps, type ReturnUniqueKeyIdMaps } from "./unique-key-id-maps";
import { merge } from "es-toolkit";

export function convertCollectionAsJSON(
  collectionIdToKeyMap: ReturnUniqueKeyIdMaps['idToKey'],
  { modes, variableIds, id: figmaId }: VariableCollection,
  namespace = "example.com",
) {
  const { idToKey, keyToId } = uniqueKeyIdMaps(modes, "modeId");
  const modeKeys = Object.values(idToKey);

  const collection: DTCGCollection = variableIds.map((variableId) => {
    const variable = getVariableById(variableId);
    const { name, resolvedType, valuesByMode, description, scopes } = variable;

    // BOOLEAN は無視
    if (resolvedType === "BOOLEAN") {
      return undefined;
    }

    const type = getType(resolvedType, scopes);
    const value = valuesByMode[keyToId[modeKeys[0]]];

    return createNestedVariable(convertSafeNameParts(name), {
      $type: type,
      $value: convertValueToJSON(value, collectionIdToKeyMap),
      $description: description,
      $extensions: {
        [namespace]: {
          figmaId: variableId,
          modes: modeKeys.reduce<Record<string, string | number>>((into, modeKey) => {
            into[modeKey] = convertValueToJSON(
              valuesByMode[keyToId[modeKey]],
              collectionIdToKeyMap,
            );
            return into;
          }, {}),
        },
      },
    });
  })
  .filter((variable) => variable !== undefined)
  .reduce((acc, variable) => merge(acc, variable), {
    $extensions: {
      [namespace]: { figmaId, modes: modeKeys },
    }
  });

  return collection;
}
