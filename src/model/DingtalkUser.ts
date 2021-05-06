import {BaseModel} from "@/model/Model";

export default class DingtalkUser extends BaseModel<DingtalkUser> {
    name!: string
    rawId!: string
}
