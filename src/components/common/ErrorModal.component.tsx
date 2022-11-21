import { observer } from 'mobx-react-lite';
import React from 'react';

import { Button, Modal } from "react-bootstrap";
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useStores } from "../../hooks/useStores";

const ErrorModal: React.FC<{}> = observer(() => {
  const { errorStore } = useStores();

  const errorDetail = errorStore.errorDetail;

  return (
    <Modal show={errorStore.hasError} onHide={errorStore.clearError}>
      <div className="error-modal-icon-container">
        <IoCloseCircleOutline className="error-modal-icon" />
      </div>
      <Modal.Body className="error-modal-body">
        <h3>{errorDetail?.title}</h3>

        <p className="margin-bottom">
          {errorDetail?.description}
          {errorStore.isNetworkError() ? 'Check your Wifi connection.' : ''}{' '}
          You can try your request again or <a href={`mailto:${errorStore.getHelpEmail()}`}>contact us</a> for more help.
        </p>

        <Button variant="danger" onClick={() => errorStore.clearError()}>
          Try Again
        </Button>
      </Modal.Body>
    </Modal>
  );
});

export { ErrorModal };
