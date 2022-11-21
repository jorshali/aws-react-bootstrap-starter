import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  title: string;
  onClick: () => void;
};

const LoginLinkButton: React.FC<Props> = observer(({ title, onClick }) => {
  return (
    <div className="d-grid gap-2 login-link-button-container">
      <Button variant="link" className="login-link-button" onClick={onClick}>
        {title}
      </Button>
    </div>
  );
});

export { LoginLinkButton };