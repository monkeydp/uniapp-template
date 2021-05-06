import {BaseModel} from "@/model/Model";
import User from "@/model/User";

export default class Book extends BaseModel<Book> {
    title!: string
    author!: string
    isbn!: string
    summary!: string | null
    picture!: string | null
    publisher!: string | null
}
