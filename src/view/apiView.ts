import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ApiPresenter, CreateUserDTO } from '../presenter/apiPresenter';

export class ApiView {
  private app: Application;

  constructor(
    private presenter: ApiPresenter,
    private port: number = 3001
  ) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.get('/api/users', async (_req: Request, res: Response) => {
      const result = await this.presenter.getUsers();
      if (result.success) {
        res.json(result.data);
      } else {
        res.status(500).json({ error: result.error });
      }
    });

    this.app.post('/api/users', async (req: Request, res: Response) => {
      const dto: CreateUserDTO = req.body;
      const result = await this.presenter.createUser(dto);
      if (result.success) {
        res.status(201).json(result.data);
      } else {
        res.status(400).json({ error: result.error });
      }
    });
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`API server running on http://localhost:${this.port}`);
    });
  }
}
