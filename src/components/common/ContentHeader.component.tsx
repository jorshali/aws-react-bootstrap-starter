import React from 'react';
import { observer } from 'mobx-react-lite';

type Props = {
  title: string;
};

const ContentHeader: React.FC<Props> = observer(({ title }) => {
  return (
    <>
      <h5>{title}</h5>
      <hr />
    </>
  );
});

export { ContentHeader };