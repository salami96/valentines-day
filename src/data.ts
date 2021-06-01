import { Request, Response, NextFunction } from 'express';

export class Data {
    
    static async getClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const clients = [
            {
                id: 'default',
                name: 'O nome do seu amado(a) aqui',
                text: [
                    'Seu texto 1 vai ficar aqui',
                    'Seu texto 2 vai ficar aqui',
                    'Seu texto 3 vai ficar aqui',
                    'e assim por diante'
                ],
                images: [
                    'imgs/sua-foto.png',
                    'imgs/sua-foto.png',
                    'imgs/sua-foto.png',
                ]
            }
        ];


        try {
            const { id } = req.params;
            const resp = clients.find(c => c.id === id);
            if (resp){
                return res.json(resp)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}