import {UserController} from "./controller/UserController";
import {MurmurController} from "./controller/MurmurController";

export const Routes = [{
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/api/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/api/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "get",
    route: "/api/murmurs",
    controller: MurmurController,
    action: "all"
}, {
    method: "get",
    route: "/api/murmurs/:id",
    controller: MurmurController,
    action: "one"
}, {
    method: "post",
    route: "/api/murmurs",
    controller: MurmurController,
    action: "save"
}, {
    method: "delete",
    route: "/api/murmurs/:id",
    controller: MurmurController,
    action: "remove"
}];