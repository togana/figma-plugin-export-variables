import { cleanUpName } from './clean-up-name';

type NodeWithId = { id: string; name: string };
type NodeWithModeId = { modeId: string; name: string };
type nodesWithNames<T extends 'id' | 'modeId'> = T extends 'id' ? NodeWithId[] : NodeWithModeId[];
export type ReturnUniqueKeyIdMaps = {
  idToKey: {
    [key: string]: string;
  };
  keyToId: {
    [key: string]: string;
  };
};

export function uniqueKeyIdMaps<T extends 'id' | 'modeId'>(
  nodesWithNames: nodesWithNames<T>,
  idKey: T,
): ReturnUniqueKeyIdMaps {
  return nodesWithNames.reduce<ReturnUniqueKeyIdMaps>(
    (acc, node) => {
      const key = cleanUpName(node.name);
      let int = 2;
      let uniqueKey: string = key;
      while (acc.keyToId[uniqueKey]) {
        uniqueKey = `${key}_${int}`;
        int++;
      }

      if (idKey === 'id' && 'id' in node) {
        acc.keyToId[uniqueKey] = node.id;
        acc.idToKey[node.id] = uniqueKey;
      } else if (idKey === 'modeId' && 'modeId' in node) {
        acc.keyToId[uniqueKey] = node.modeId;
        acc.idToKey[node.modeId] = uniqueKey;
      }

      return acc;
    },
    { idToKey: {}, keyToId: {} },
  );
}
