import { AuthStatusRequest, ErrorCodes, GlobalError, TokenManagerRequest } from "olive-data-contracts";
import { KeyValuePair, Pred } from "..";

type PredErrMap = Map<Pred, KeyValuePair<ErrorCodes, string> | [ErrorCodes]>
type PredArr = [KeyValuePair<Pred, [ErrorCodes, string]> | KeyValuePair<Pred, [ErrorCodes]>]


export interface Creds {
  user: string
  password: string
}

export interface Validation {
  loginRequest<T = Creds>(req: T): GlobalError[]
  authRequest<T = TokenManagerRequest<AuthStatusRequest>>(req: T): GlobalError[]
  patientRequest(req: AuthStatusRequest, rules: PredErrMap | PredArr): GlobalError | null
}
