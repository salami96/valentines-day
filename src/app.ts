import express from 'express';
import cors from 'cors';
import path from 'path';
import { Data } from './data';

export class App {
    private express: express.Application;
    port = 9000 || process.env.PORT;

    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
        this.listen();
        this.middlewares();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(this.forceSSL);
    }

    private listen(): void {
        this.express.use('/get-data/:id', Data.getClient);
        this.express.get('/', function(req, res){
            res.sendFile(path.resolve(__dirname, '..') + '/index.html');
        });
        this.express.use(express.static(path.resolve(__dirname, '..')));
        this.express.listen(this.port, () => {
            console.log('Server running in port: ' + this.port);
        })
    }

    forceSSL = function() {
        return function (req: express.Request, res: express.Response, next: express.NextFunction): void {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                return res.redirect(
                    ['https://', req.get('Host'), req.url].join('')
                );
            }
            next();
        }
    }

}
