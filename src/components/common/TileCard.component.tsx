import React from 'react';

import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';

type Props = {
  iconComponent?: React.ReactNode;
  imageSrc?: string;
  title?: string;
  customClassName?: string;
  onClick: () => void;
};

const TileCard: React.FC<Props> = observer(({ imageSrc, iconComponent, title, customClassName, onClick }) => {
  return (
    <Card className={`tile-card ${customClassName}-tile-card`} onClick={onClick}>
      <Card.Body>
        <Card.Title>
          { 
            imageSrc ?
              <img src={imageSrc} alt={title} className={`tile-image ${customClassName}-tile-image`} /> :
              <div className="tile-icon-container">
                {iconComponent}
              </div>
          }
        </Card.Title>
        {
          title ?
            <Card.Text>
              {title}
            </Card.Text> : null
        }
      </Card.Body>
    </Card>
  );
});

export { TileCard };