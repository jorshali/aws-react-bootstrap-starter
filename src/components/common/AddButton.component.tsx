import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';

type Props = {
  onClick: () => void;
};

const AddButton: React.FC<Props> = observer(({ onClick }) => {
  return (
    <Button variant="outline-primary" onClick={onClick}><IoAdd /> Add</Button>
  );
});

export { AddButton };