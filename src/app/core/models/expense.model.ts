export interface Expenses {
  totalAmount: number
  expenses: Expense[]
}

export interface Expense {
  _id: string
  user: string
  month: string
  overallMaintenance: number
  securitySalary: number
  securityAdvance: number
  commonEB: number
  cleaningAccessories: number
  garbageMan: number
  dieselGenset: number
  cctvRecharge: number
  comments: string
  createdDate: string
  __v: number
}
