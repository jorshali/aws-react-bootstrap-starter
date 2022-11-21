import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

const SaveFooter: React.FC<Props> = observer(({ onSave, onCancel }) => {
  return (
    <div className="fixed-bottom footer">
      <Button variant="primary" type="submit" onClick={onSave}>
        Save
      </Button>
      {' '}
      <Button variant="link" className="cancel-button" type="submit" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
});

export { SaveFooter };
