import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import cookieParser from "cookie-parser";
import weatherRoutes from './routes/weatherRoutes.js';
import sportsRoutes from './routes/footballRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import sessionsRoutes from './routes/sessionsRoutes.js';
import { SECRET } from './utils/utilsLogin.js';
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
import connectDB from './config/database.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
connectDB()

// Midd
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET))

initPassport()
app.use(passport.initialize())

app.engine('handlebars', engine({
    defaultLayout: 'main',
    handlebars: Handlebars,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/", viewsRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/sports', sportsRoutes);
app.use("/api/sessions", sessionsRoutes);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export { app, httpServer };
