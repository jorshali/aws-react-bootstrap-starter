import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react-lite';

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const tinyMceApiKey = 'txdyzvhozi0g647kri4chng3g5qr5su45zyr1updqd9vszr9';

const RichEditor: React.FC<Props> = observer(({ value, setValue }) => {
  return (
    <Editor
      value={value}
      onEditorChange={(value) => setValue(value)}
      init={{
        height: 420,
        menubar: false,
        plugins: [
          'lists', 'advlist'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'h1 h2 h3 | ' +
        'removeformat',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      apiKey={tinyMceApiKey}
    />
  );
});

export { RichEditor };