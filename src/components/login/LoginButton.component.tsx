import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  title: string;
  enabled: boolean;
  onClick: () => void;
};

const LoginButton: React.FC<Props> = observer(({ title, enabled, onClick }) => {
  return (
    <div className="d-grid gap-2 login-button">
      <Button disabled={!enabled} onClick={onClick}>
        {title}
      </Button>
    </div>
  );
});

export { LoginButton };