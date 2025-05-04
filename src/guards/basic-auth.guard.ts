import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Basic Authentication header.');
    }

    const credentials = Buffer.from(
      authHeader.replace('Basic ', ''),
      'base64',
    ).toString();
    const [username, password] = credentials.split(':');

    if (!username || !password) {
      throw new UnauthorizedException(
        'Malformed Basic Authentication credentials.',
      );
    }

    if (
      username !== process.env.BASIC_AUTH_USER ||
      password !== process.env.BASIC_AUTH_PASS
    ) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    return true;
  }
}
