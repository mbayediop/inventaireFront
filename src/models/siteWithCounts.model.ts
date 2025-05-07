import { EquipementCounts } from "./equipementCounts.model";
import { Site } from "./site.model";

export interface SiteWithCounts extends Site {
  equipementCounts: EquipementCounts;
}
