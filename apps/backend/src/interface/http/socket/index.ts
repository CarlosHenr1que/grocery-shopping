import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export interface ISocketServer {
  initialize(server: HTTPServer): void;
  getIO(): SocketIOServer;
}

export class SocketServer implements ISocketServer {
  private static instance: SocketServer;
  private io: SocketIOServer | undefined;

  public static getInstance(): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer();
    }
    return SocketServer.instance;
  }

  public initialize(server: HTTPServer): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.setupEventHandlers();
  }

  public getIO(): SocketIOServer {
    if (!this.io) {
      throw new Error('Socket server not initialized');
    }
    return this.io;
  }

  private setupEventHandlers(): void {
    this.getIO().on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
}

export const socketServer = SocketServer.getInstance();
