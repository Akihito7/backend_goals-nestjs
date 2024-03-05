import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthSignupDTO } from "./dtos/auth.signup.DTO";
import { PrismaService } from "nestjs-prisma";
import { hash } from "bcrypt"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }


    async register(data: AuthSignupDTO) {

        const emailExists = await this.prisma.user.count({
            where: { email: data.email }
        })

        if (emailExists) throw new ForbiddenException("E-mail já em uso.")

        data.password = await hash(data.password, 8);

        const user = await this.prisma.user.create({ data });

        const token = this.jwtService.sign({}, {
            expiresIn: "1 day",
            issuer: "login",
            audience: "users",
            subject: String(user.id),
        })



        return { user, token }
    }
}