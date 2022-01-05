import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

class ValidationError extends TypeError {
  constructor(message: string, public errors: object) {
    super(message);
  }
}

export async function validator<T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
): Promise<any> {
  const realTodo = plainToClass(dto, obj);
  const errors = await validate(realTodo);
  // errors is an array of validation errors
  if (errors.length > 0) {
    throw new ValidationError("Validation failed", errors);
  }
}
