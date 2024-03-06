import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateGoalDTO } from "./dtos/create.goal.DTO";

@Injectable()
export class GoalsService {

    constructor(private readonly prisma: PrismaService) { }

    async getManyGoals(userId: number) {
        return this.prisma.metas.findMany({
            where: { key_stranger_user: userId }
        })
    }


    async getUniqueGoal() {
        return ""
    }


    async createGoal(data : CreateGoalDTO) {
        return this.prisma.metas.create({data})
    }


    async updateGoal() {
        return ""
    }


    async updatePartialGoal() {
        return ""
    }

}