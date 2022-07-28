import { IUser } from './../../types/types';
import { ITokenRequest } from './../../types/config/typeConfig';
export { }

declare global {
    namespace Express {
        interface Request {
            Itoken?: ITokenRequest,
            IUser?: IUser
        }
    }
}