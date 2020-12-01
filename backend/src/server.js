import express, {json} from 'express';
var cors = require('cors')

const app = express();

// Routes
import IndexRoutes from './routes/index.routes';
import AutosRoutes from './routes/autos.routes';

// Settings
app.set('port', process.env.PORT || 5000);

app.use(cors())

// Middlewares
app.use(json());

// Routes
app.use(IndexRoutes);
app.use( '/conductores', AutosRoutes);


export default app;