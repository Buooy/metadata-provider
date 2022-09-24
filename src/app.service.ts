import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): Record<string, string|boolean|number> {
    return {
      status: 'ok',
    }
  }
}
