import { Module } from "@nestjs/common";
import { GoalsService } from "./goals.service";
import { GoalsController } from "./goals.controller";
import { AuthService } from "src/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "nestjs-prisma";

@Module({
    imports: [JwtModule.register({
        secret: "l3^6gigCc`$c^ge}LEB:<Is5D^(m)!wL"
    }),
        AuthModule,
        PrismaModule.forRoot()],
    controllers: [GoalsController],
    providers: [GoalsService]
})
export class GoalsModule { }