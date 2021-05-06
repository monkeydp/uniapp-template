export default interface Model<T extends Model<T>> {
    id: string;
}

export abstract class BaseModel<T extends BaseModel<T>> implements Model<T> {
    id!: string
}
