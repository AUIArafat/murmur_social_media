import {UserController} from "./controller/UserController";
import {MurmurController} from "./controller/MurmurController";
import { RelationshipController } from "./controller/RelationshipController";
import {LoginController} from "./controller/LoginController";

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
    method: "post",
    route: "/api/login",
    controller: LoginController,
    action: "login" 
},
{
    method: "get",
    route: "/api/me",
    controller: LoginController,
    action: "me" 
},
{
    method: "get",
    route: "/api/murmurs",
    controller: MurmurController,
    action: "all"
}, {
    method: "get",
    route: "/api/me/murmurs/:id",
    controller: MurmurController,
    action: "one"
}, {
    method: "post",
    route: "/api/me/murmurs",
    controller: MurmurController,
    action: "save"
}, {
    method: "delete",
    route: "/api/me/murmurs/:id",
    controller: MurmurController,
    action: "remove"
},
{
    method: "get",
    route: "/api/relationship",
    controller: RelationshipController,
    action: "all"
}, {
    method: "get",
    route: "/api/relationship/:id",
    controller: RelationshipController,
    action: "one"
}, {
    method: "post",
    route: "/api/relationship",
    controller: RelationshipController,
    action: "save"
}, {
    method: "delete",
    route: "/api/relationship/:id",
    controller: RelationshipController,
    action: "remove"
}];