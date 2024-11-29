import { on, showUI } from '@create-figma-plugin/utilities'

import { ExportButtonHandler } from './types'

export default function () {
  on<ExportButtonHandler>('ON_CLICK', async function (text: string) {
    console.log(text);
  })
  showUI({ height: 240, width: 320 })
}
