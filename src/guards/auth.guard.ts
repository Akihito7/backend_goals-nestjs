import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';




@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        const { sub: id } = this.authService.checkToken(authorization);

        request.user = {
            id: Number(id)
        }

        return true
    }
}
