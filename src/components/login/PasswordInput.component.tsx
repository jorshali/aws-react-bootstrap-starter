import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useUtility } from '../../hooks/useUtility';

type Props = {
  placeholder: string;
  value: string;
  onEnter?: () => void;
  setValue: (value: string) => void;
};

const PasswordInput: React.FC<Props> = observer(({ placeholder, value, onEnter, setValue }) => {
  const { onEnterKey } = useUtility();

  return (
    <Form.Group className="login-input">
      <Form.Control 
        type="password" 
        placeholder={placeholder}
        value={value}
        onKeyUp={onEnter ? (e) => onEnterKey(e, onEnter) : undefined}
        onChange={(e) => setValue(e.target.value)}
      />
    </Form.Group>
  );
});

export { PasswordInput };