import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthSignupDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
    password: string;


}