import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateGoalDTO {

    @IsNotEmpty()
    name : string;

    @IsNumber()
    importance : number;

    about : string;

    @IsNumber()
    goal_value : number;

    @IsNumber()
    current_value : number;
    
    @IsDateString()
    limit_time : Date;

    @IsNumber()
    key_stranger_user : number;
}