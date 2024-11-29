import { EventHandler } from '@create-figma-plugin/utilities'

export interface ExportButtonHandler extends EventHandler {
  name: 'ON_CLICK'
  handler: (text: string) => void
}
