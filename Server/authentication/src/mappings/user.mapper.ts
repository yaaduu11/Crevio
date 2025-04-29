import { createMap } from "@automapper/core";
import { mapper } from "../config";
import { UserDTO, UserEntity } from "../core";

export function createUserMappings() {
    createMap(mapper, UserDTO, UserEntity);
}