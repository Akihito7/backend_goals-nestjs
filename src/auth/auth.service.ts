import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthSignupDTO } from "./dtos/auth.signup.DTO";
import { PrismaService } from "nestjs-prisma";
import { hash, compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { AuthSignlnDTO } from "./dtos/auth.signln.DTO";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async login(data: AuthSignlnDTO) {
        const user = await this.prisma.user.findFirst({
            where: { email: data.email }
        });

        if (!user) throw new NotFoundException("Email e/ou senhas errados");

        const passwordMatched = await compare(data.password, user.password);

        if (!passwordMatched) throw new NotFoundException("Email e/ou senhas errados");

        const token = this.jwtService.sign({}, {
            expiresIn: "1 day",
            issuer: "login",
            audience: "users",
            subject: String(user.id),
        })

        return { user, token }


    }


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