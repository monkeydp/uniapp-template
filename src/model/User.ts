import {BaseModel} from "@/model/Model";
import DingtalkUser from "@/model/DingtalkUser";
import GetLocationSuccess = UniApp.GetLocationSuccess;

export default class User extends BaseModel<User> {
    name!: string
    dingtalkUser: DingtalkUser | null = null
}
