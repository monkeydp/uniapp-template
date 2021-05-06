import {Container} from "typescript-ioc";
import {UniStorageWrapper} from "@/storage/UniStorage";

const storageWrappers = [Container.get(UniStorageWrapper)]
export default storageWrappers
