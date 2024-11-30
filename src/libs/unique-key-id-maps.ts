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

export function uniqueKeyIdMaps<T extends 'id' | 'modeId'>(nodesWithNames: nodesWithNames<T>, idKey: T): ReturnUniqueKeyIdMaps {
  const idToKey: { [key: string]: string } = {};
  const keyToId: { [key: string]: string } = {};

  nodesWithNames.forEach((node) => {
    const key = cleanUpName(node.name);
    let int = 2;
    let uniqueKey: string = key;
    while (keyToId[uniqueKey]) {
      uniqueKey = `${key}_${int}`;
      int++;
    }

    if (idKey === 'id' && 'id' in node) {
      keyToId[uniqueKey] = node.id;
      idToKey[node.id] = uniqueKey;
    } else if (idKey === 'modeId' && 'modeId' in node) {
      keyToId[uniqueKey] = node.modeId;
      idToKey[node.modeId] = uniqueKey;
    }
  });

  return { idToKey, keyToId };
}
