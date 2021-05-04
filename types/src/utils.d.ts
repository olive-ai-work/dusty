import { GlobalError, ProcedureCode } from 'olive-data-contracts'

interface PortalCode {
  modifier?: string
  serviceUnits?: string
  approvedUnits: string
  code: string
  description?: string
}

export interface Utils {
  compareQty(procs: ProcedureCode[], cpt: PortalCode): GlobalError[]
  toCamelCase(str: string): string
}
