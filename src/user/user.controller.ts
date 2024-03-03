import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    get() {
        return this.userService.get()
    }

    @Post()
    post() {
        return this.userService.post()
    }

    @Patch()
    patch() {
        return this.userService.patch()
    }

    @Put()
    put() {
        return this.userService.put()
    }

    @Delete()
    delete() {
        return this.userService.delete()
    }
}