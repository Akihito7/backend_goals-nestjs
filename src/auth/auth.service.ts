import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthSignupDTO } from "./dtos/auth.signup.DTO";
import { PrismaService } from "nestjs-prisma";
import { hash, compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { AuthSignlnDTO } from "./dtos/auth.signln.DTO";
import { AuthTokenDTO } from "./dtos/auth.token.DTO";

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

        const token = this.generateToken("auth", String(user.id))

        return { user, token }


    }

    async register(data: AuthSignupDTO) {

        const emailExists = await this.prisma.user.count({
            where: { email: data.email }
        })

        if (emailExists) throw new ForbiddenException("E-mail já em uso.")

        data.password = await hash(data.password, 8);

        const user = await this.prisma.user.create({ data });

        const token = this.generateToken("auth", String(user.id))


        return { user, token }
    }

    generateToken(issuer: string, userId: string) {

        const audience = "users"
        const expiresIn = "7d"

        return this.jwtService.sign({}, {
            expiresIn,
            issuer,
            audience,
            subject: userId
        })
    }

    checkToken(token : AuthTokenDTO) {
        const verifyToken = String(token).split(" ")[1]

        try {
            const isValidToken = this.jwtService.verify(verifyToken, {
                issuer: "auth",
                audience: "users"
            })

            return isValidToken

        } catch (error) {
            throw new BadRequestException("Token inválido")
        }

    }


}