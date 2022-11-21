import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Header } from './common/Header.component';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TileCard } from './common/TileCard.component';
import { useStores } from '../hooks/useStores';
import { usePosts } from '../hooks/usePosts';

const Home: React.FC<{}> = observer(() => {
  let navigate = useNavigate();
  
  const { 
    postStore,
    asyncStore
  } = useStores();

  const { loadPosts } = usePosts();

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