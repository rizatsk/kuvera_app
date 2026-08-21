import { v4 } from "uuid";

const uuidGen = ():string => {
    return v4();
}

export default uuidGen;
