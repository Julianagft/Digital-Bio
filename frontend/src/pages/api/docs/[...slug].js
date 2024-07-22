import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../../public/swagger.json';

const swaggerHandler = swaggerUi.setup(swaggerDocument);

export default function handler(req, res) {
  swaggerUi.serve(req, res);
  return swaggerHandler(req, res);
}
