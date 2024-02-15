import { FileSchema } from "./root";
import { UserItemSchema } from "./userManagement";

type StatusContractStep =
  | "not_completed"
  | "landlord_completed"
  | "tenant_completed"
  | "completed";

interface IUserProfile {
  id: number;
  name: string;
  firstName?: string;
  address?: any;
}

export type ContractStatus =
  | "in_progress"
  | "pending_deposit"
  | "completed"
  | "canceled"
  | "expired"
  | "require_settlement"
  | "request_settlement"
  | "accept_settlement"
  | "archived";
export interface Contract {
  id: number;
  property: any;
  agent: IUserProfile;
  tenant: IUserProfile;
  landlord: IUserProfile;
  paymentAgreementStatus: StatusContractStep;
  verificationsStatus: StatusContractStep;
  imagesStatus: StatusContractStep;
  bankInfoStatus: StatusContractStep;
  contractTextAgreementStatus: StatusContractStep;
  certificatesStatus: StatusContractStep;
  agencyStatus: StatusContractStep;
  signsStatus: StatusContractStep;
  description: string;
  deposit: string;
  protectDepositScheme: string;
  monthlyRent: string;
  status: ContractStatus;
  tenantIncomeCheck: "need_check" | "can_pay" | "not_enough";
  startedAt: string;
  rentDurationDays: number | string;
  rentDuration: number | string;
  currency: string;
  agencyInfo: {
    manager: string;
    name: string;
    address: string;
  };
  defects: string[];
  images: {
    id: number;
    file: File;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  certificates: {
    id: number;
    file: File;
    description: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    meta: string[];
  }[];
  signs: ContractSign[];
  createdAt: string;
  updatedAt: string;
  tenantVerification: ContractKey;
  landlordVerification: ContractKey;
  landlordBankAccountInfo: BankAccountInfo;
  tenantBankAccountInfo: BankAccountInfo;
  depositCertificateFile: File;
}
export interface BankAccountInfo {
  accountId?: string;
  bacs: { account: string; sort_code: string };
  iban: string;
  name: string;
}
interface ContractSign {
  id: number;
  user: IUserProfile;
  file: File;
  type: string;
  meta: {
    name: string;
    address: string;
    job: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ContractKey {
  status: "in_progress" | "verified" | "not_verified";
  verifiedAt: string;
}

export interface ContractListResponse {
  status: boolean;
  message: string;
  data: Contract;
}

interface File {
  id: string;
  downloadUrl: string;
  thumbnails: any;
}

export interface Payment {
  amount?: string;
  currency?: string;
  id?: number;
  isPayed?: boolean;
  payedAt?: string | null;
  scheduledPayDate?: string;
  type?: string;
}

export interface ContractText {
  id: number;
  title: string;
  template: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  acceptedByTenant: boolean;
  analyzeRequest: AnalyzeRequestText;
}

export interface AnalyzeRequestText {
  id: number;
  status: "pending_payment" | "pending_analyze" | "analyzed";
  analyzedFile?: FileSchema;
  result: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  contractId: number;
}

export interface PayedByAdmin {
  active: boolean;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  updatedAt: string;
  username: string;
}
