import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    get() {
        return "get"
    }

    post(){
        return "post"
    }

    patch(){
        return "patch"
    }

    put(){
        return "put"
    }

    delete(){
        return "delete"
    }
}