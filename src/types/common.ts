import { ImageSchema } from "./userManagement";

export interface BaseData {
  propertyFeatures: {
    id: number;
    title: string;
    type: "feature" | "allowed_tenant_type";
    icon: ImageSchema;
  }[];
  propertyTypes: {
    id: number;
    title: string;
    description: string;
    image: ImageSchema;
    children: any;
  }[];
  vatPercentage: number;
  minAllowedDepositValue: number;
  maxAllowedDepositValue: number;
  minAllowedMonthlyRentValue: number;
  maxAllowedMonthlyRentValue: number;
  contractAnalyzeRequestPrice: number;
}

export interface BaseDataResponse {
  data: BaseData;
  status: boolean;
  message: string;
}
