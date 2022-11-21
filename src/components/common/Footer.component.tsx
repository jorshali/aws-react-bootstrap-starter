
import React from 'react';

import { observer } from 'mobx-react-lite';

const packageConfig = require('../../../package.json');

const Footer: React.FC<{}> = observer(() => {
  return (
    <div className="footer-version">
      Version: {packageConfig.version}
    </div>
  );
});

export { Footer };