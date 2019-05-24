import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerdocs from './swagger.json';
import loan from './routes/loan';
import user from './routes/user';
import repayment from './routes/repayment';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', user);
app.use('/api/v1/loans', loan);
app.use('/api/v1/loans', repayment);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdocs));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Quick Credit apps!',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Quick Credit apps is running on port ${port} ...`));
export default app;
