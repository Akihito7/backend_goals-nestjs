import { Body, Controller, Get, Patch, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { GoalsService } from "./goals.service";
import { CreateGoalDTO } from "./dtos/create.goal.DTO";

@Controller("goals")
@UseGuards(AuthGuard)
export class GoalsController {

    constructor(private readonly goalsService: GoalsService) { }

    @Get()
    async getManyGoals(@Request() req) {
        return this.goalsService.getManyGoals(req.user.id)
    }

    @Get()
    async getUniqueGoal() {
        return ""
    }

    @Post()
    async createGoal(@Body() body : CreateGoalDTO) {
        return this.goalsService.createGoal(body);
    }

    @Put()
    async updateGoal() {
        return ""
    }

    @Patch()
    async updatePartialGoal() {
        return ""
    }

}