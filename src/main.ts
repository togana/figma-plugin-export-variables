import { on, showUI } from '@create-figma-plugin/utilities'
import { uniqueKeyIdMaps } from './libs/unique-key-id-maps';
import { convertCollectionAsJSON } from './libs/convert-collection-as-json';
import { CopyEventHandler } from './types';

export default function () {
  const variableCollections = figma.variables.getLocalVariableCollections();
  const { idToKey } = uniqueKeyIdMaps(variableCollections, "id");  
  const collections = variableCollections.map(collection => {
    return {
      [idToKey[collection.id]]: convertCollectionAsJSON(idToKey, collection) 
    }
  })

  on<CopyEventHandler>("COPY_TO_CLIPBOARD", (type) => {
    figma.notify(type === "success" ? "コピーしました" : "コピーに失敗しました", {
      timeout: 3000,
      error: type === "error",
    });
  })

  showUI({ height: 240, width: 320 }, { collections })
}
