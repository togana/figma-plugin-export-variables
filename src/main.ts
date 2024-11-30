import { showUI } from '@create-figma-plugin/utilities'
import { uniqueKeyIdMaps } from './libs/unique-key-id-maps';
import { convertCollectionAsJSON } from './libs/convert-collection-as-json';

export default function () {
  const variableCollections = figma.variables.getLocalVariableCollections();
  const { idToKey } = uniqueKeyIdMaps(variableCollections, "id");  
  const collections = variableCollections.map(collection => {
    return {
      [idToKey[collection.id]]: convertCollectionAsJSON(idToKey, collection) 
    }
  })

  showUI({ height: 240, width: 320 }, { collections })
}
