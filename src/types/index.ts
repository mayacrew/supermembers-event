type firstCategory = '매장' | '제품'

export type Category = Record<
  firstCategory,
  Record<string, Record<string, number>>
>
export interface YearEndInfo {
  totalUserCount: number
  totalCampaignCount: number
  totalDiscountAmount: number
  topCampaignUser: string
  topCampaignCount: number
  topDiscountUser: string
  topDiscountAmount: number
  yourUsername: string | null
  yourSignupAt: string | null
  yourDaysSinceSignup: number | null
  yourCategories: Category | null
  yourCampaignCount: number | null
  yourCampaignRank: number | null
  yourCampaignRankRatio: number | null
  yourTotalDiscountAmount: number | null
  yourDiscountRank: number | null
  yourDiscountRankRatio: number | null
}
