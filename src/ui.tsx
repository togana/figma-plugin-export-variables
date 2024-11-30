import {
  Button,
  Container,
  TextboxMultiline,
  VerticalSpace,
  render,
} from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import copy from 'copy-to-clipboard';
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import type { CopyEventHandler, DTCGCollection } from './types';

function Plugin({ collections }: { collections: DTCGCollection }) {
  const text = JSON.stringify(collections, null, 2);

  const handleClipboardWriteText = useCallback(() => {
    try {
      copy(text);
      emit<CopyEventHandler>('COPY_TO_CLIPBOARD', 'success');
    } catch (error) {
      console.error(error);
      emit<CopyEventHandler>('COPY_TO_CLIPBOARD', 'error');
    }
  }, [text]);

  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <TextboxMultiline
        // @ts-ignore props に readOnly がないが設定できる
        // useRef と useEffect で設定することもできるが、読みにくいのでやめた
        readOnly
        rows={10}
        variant={'border'}
        value={text}
      />
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleClipboardWriteText}>
        コピー
      </Button>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
