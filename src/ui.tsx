import {
  Button,
  Container,
  render,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { ExportButtonHandler } from './types'

function Plugin() {
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<ExportButtonHandler>('ON_CLICK', "text")
    },
    []
  )

  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <div>
        テキスト
      </div>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        export
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
