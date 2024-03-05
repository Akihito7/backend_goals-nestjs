import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignlnDTO } from "./dtos/auth.signln.DTO";
import { AuthSignupDTO } from "./dtos/auth.signup.DTO";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post("signln")
    async signln(@Body() body : AuthSignlnDTO){
        return body
    }

    @Post("signup")
    async signup(@Body() body : AuthSignupDTO){
        return this.authService.register(body)
    }
}