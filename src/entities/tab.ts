export const TAB_IDS = {
  CHEAP: 0,
  FAST: 1,
  OPTIMAL: 2,
};

export type TabIdsKeys = keyof typeof TAB_IDS;
export type TabIds = typeof TAB_IDS[TabIdsKeys];

export type Tab = {
  id: TabIds,
  title: string,
}
