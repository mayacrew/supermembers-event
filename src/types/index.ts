export interface YearEndInfo {
  totalUserCount: number;
  totalCampaignCount: number;
  totalDiscountAmount: number;
  topCampaignUser: string;
  topCampaignCount: number;
  topDiscountUser: string;
  topDiscountAmount: number;
  yourUsername: string | null;
  yourSignupAt: string | null;
  yourDaysSinceSignup: number | null;
  yourMostUsedCategory: string | null;
  yourCampaignCount: number | null;
  yourCampaignRank: number | null;
  yourCampaignRankRatio: number | null;
  yourTotalDiscountAmount: number | null;
  yourDiscountRank: number | null;
  yourDiscountRankRatio: number | null;
}
