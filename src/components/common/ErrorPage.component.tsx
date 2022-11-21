import React from 'react';

import { observer } from 'mobx-react-lite';
import { Button, Container } from 'react-bootstrap';
import { Header } from './Header.component';
import { IoThunderstormOutline } from 'react-icons/io5';
import { useStores } from '../../hooks/useStores';

const ErrorPage: React.FC<{}> = observer(() => {
  const { errorStore } = useStores();

  return (
    <>
      <Header />

      <Container fluid className="margin-top">
        <div className="error-page-container">
          <IoThunderstormOutline className="error-page-icon" />
          <h1>Something went wrong.</h1>

          <p>You can try your request again or <a href={`mailto:${errorStore.getHelpEmail()}`}>contact us</a> for more help.</p>
          
          <Button variant="danger" href="/">
            Try Again
          </Button>
        </div>
      </Container>
    </>
  );
});

export { ErrorPage };