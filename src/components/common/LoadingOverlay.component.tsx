import { observer } from 'mobx-react-lite';
import React from 'react';

import { Spinner } from "react-bootstrap";
import { useStores } from '../../hooks/useStores';

const LoadingOverlay: React.FC<{}> = observer(() => {
  const { asyncStore } = useStores();

  return (
    <div className="loading-overlay" style={{ display: (asyncStore.loading ? 'flex' : 'none' )}}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
});

export { LoadingOverlay };