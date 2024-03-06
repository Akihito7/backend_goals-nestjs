import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule.forRoot(),
    JwtModule.register({
        secret: "l3^6gigCc`$c^ge}LEB:<Is5D^(m)!wL"
    })],
    controllers: [AuthController],
    providers: [AuthService],
    exports : [AuthService]
})
export class AuthModule { }