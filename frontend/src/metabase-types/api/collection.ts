import type { IconName } from "metabase/core/components/Icon";
import type { UserId } from "./user";
import type { CardDisplayType } from "./card";
import type { DatabaseId } from "./database";

export type RegularCollectionId = number;

export type CollectionId = RegularCollectionId | "root" | "personal";

export type CollectionContentModel = "card" | "dataset";

export type CollectionAuthorityLevel = "official" | null;

export type CollectionType = "instance-analytics" | null;

export type CollectionAuthorityLevelConfig = {
  type: CollectionAuthorityLevel;
  name: string;
  icon: IconName;
  color?: string;
  tooltips?: Record<string, string>;
};

export type CollectionInstanceAnaltyicsConfig = {
  type: CollectionType;
  name: string;
  icon: IconName;
  color?: string;
  tooltips?: Record<string, string>;
};

export interface Collection {
  id: CollectionId;
  name: string;
  slug?: string;
  entity_id?: string;
  description: string | null;
  can_write: boolean;
  archived: boolean;
  children?: Collection[];
  authority_level?: "official" | null;
  type?: "instance-analytics" | null;

  parent_id?: CollectionId;
  personal_owner_id?: UserId;
  is_personal?: boolean;

  location?: string;
  effective_ancestors?: Collection[];

  here?: CollectionContentModel[];
  below?: CollectionContentModel[];

  // Assigned on FE
  originalName?: string;
  path?: CollectionId[];
}

export type CollectionItemModel =
  | "card"
  | "dataset"
  | "dashboard"
  | "pulse"
  | "snippet"
  | "collection"
  | "indexed-entity";

export type CollectionItemId = number;

export interface CollectionItem {
  id: CollectionItemId;
  model: CollectionItemModel;
  name: string;
  description: string | null;
  copy?: boolean;
  collection_position?: number | null;
  collection_preview?: boolean | null;
  fully_parametrized?: boolean | null;
  collection?: Collection | null;
  display?: CardDisplayType;
  personal_owner_id?: UserId;
  database_id?: DatabaseId;
  moderated_status?: string;
  type?: string;
  getIcon: () => { name: IconName };
  getUrl: (opts?: Record<string, unknown>) => string;
  setArchived?: (isArchived: boolean) => void;
  setPinned?: (isPinned: boolean) => void;
  setCollection?: (collection: Collection) => void;
  setCollectionPreview?: (isEnabled: boolean) => void;
}

export interface CollectionListQuery {
  archived?: boolean;
  "exclude-other-user-collections"?: boolean;
  namespace?: string;
}
