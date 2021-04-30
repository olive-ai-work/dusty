import { AuthStatusRequest, ErrorCodes, GlobalError, TokenManagerRequest } from "olive-data-contracts";
import { KeyValuePair, Pred } from "..";

type PredErrMap = Map<Pred, KeyValuePair<ErrorCodes, string> | ErrorCodes>
type PredArr = [ErrorCodes | KeyValuePair<ErrorCodes, string>]


export interface Creds {
  user: string
  password: string
}

export interface Validation {
  loginRequest(req: Creds): GlobalError[]
  authRequest(req: TokenManagerRequest<AuthStatusRequest>): GlobalError[]
  patientRequest(req: AuthStatusRequest, rules: PredErrMap | PredArr): GlobalError | null
}