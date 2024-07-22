import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerDocument from '../../public/swagger.json';

const Docs = () => {
  return <SwaggerUI spec={swaggerDocument} />;
};

export default Docs;
