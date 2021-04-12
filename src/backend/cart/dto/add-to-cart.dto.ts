import { CartEntity } from "../entities/cart.entity";

export type AddToCartDto = Pick<CartEntity, "idName" | "size">;
