import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Header } from './common/Header.component';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TileCard } from './common/TileCard.component';
import { useStores } from '../hooks/useStores';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Home: React.FC<{}> = observer(() => {
  let navigate = useNavigate();
  
  const { 
    blogPostStore,
    asyncStore
  } = useStores();

  const { loadPosts } = useBlogPosts();

  useEffect(() => {
    asyncStore.showLoading(async () => {
      await loadPosts();
    });
  }, []);

  return (
    <>
      <Header />

      <Container fluid className="margin-top">
        <div className="tile-container">
          <div className="tile-card-container">
            <TileCard
              imageSrc=''
              onClick={() => navigate('/')}
              customClassName=""
            />
          </div>

          <div className="tile-card-container">
            <TileCard
              imageSrc=''
              onClick={() => navigate('/')}
              customClassName=""
            />
          </div>
        </div>
      </Container>
    </>
  );
});

export { Home };