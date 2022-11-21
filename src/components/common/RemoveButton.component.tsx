import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { IoTrashOutline } from 'react-icons/io5';

type Props = {
  onClick: () => void;
};

const RemoveButton: React.FC<Props> = observer(({ onClick }) => {
  return (
    <Button variant="outline-danger" title="Remove" onClick={onClick}><IoTrashOutline /></Button>
  );
});

export { RemoveButton };