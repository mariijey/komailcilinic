export interface dashboardData {
    completedContracts?: number
    contactUsMessages?: number
    todayUsers?: number
    totalDepositsAmount?: string
    totalDepositsAmountCurrency?: string
    totalListedProperties?: number
    totalPropertyRequests?: number
    totalUsers?: number
}

export type AT = 'completedContracts' | 'contactUsMessages' | 'todayUsers' | 'totalDepositsAmount'
    | 'totalDepositsAmountCurrency' | 'totalListedProperties' | 'totalPropertyRequests' | 'totalUsers'
