import { OmitType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";

export class UserDataDto extends OmitType(User, ['id'] as const) {}
