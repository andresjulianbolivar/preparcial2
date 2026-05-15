import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const userId = req.headers['x-user-id'] || 'ANONYMOUS';
    const route = req.path;
    const method = req.method;

    console.log(`[User: ${userId}] accedió a ${route} - ${method}`);

    next();
  }
}
