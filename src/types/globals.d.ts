export {};

export type Roles = "admin" | "moderator" | "customer" | "vendor";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
      member: boolean;
    };
  }
}

export type WaitlistTable = {
  id: number;
  email: string;
};

export type UsersTable = {
  userId: string;
  role: "admin" | "moderator" | "customer" | "vendor";
  member: boolean;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VendorTable = {
  id: string;
  userId: string;
  stripeConnected: boolean;
  status: "approved" | "pending" | "denied";
};

export type StoreTable = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type BillboardTable = {
  id: string;
  storeId: string;
  label: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type TypeTable = {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type TagTable = {
  id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type ProductTable = {
  id: string;
  storeId: string;
  typeId: string;
  creatorId: string;
  estTurnAroundTime: string;
  name: string;
  tagline: string;
  stripeId: string;
  imageUrl: string;
  description: string;
  price: string;
  commission: string;
  domainRank: string;
  isFeatured: boolean;
  isArchived: boolean;
  isApproved: "approved" | "pending" | "denied";
  tagId: string;
  createdAt: Date;
  updatedAt: Date | null;
};


export type ProductWithRelations = {
  id: string;
  storeId: string;
  typeId: string;
  creatorId: string;
  estTurnAroundTime: string;
  name: string;
  stripeId: string;
  imageUrl: string;
  tagline: string;
  description: string;
  price: string;
  commission: string;
  domainRank: string;
  isFeatured: boolean;
  isArchived: boolean;
  isApproved: "approved" | "pending" | "denied";
  tagId: string;
  createdAt: Date;
  updatedAt: Date | null;
  tag: TagTable | undefined;
  type: TypeTable | undefined;
  store: StoreTable | undefined;
};

export type ImageTable = {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type OrderTable = {
  id: string;
  orderTotal: string;
  isPaid: boolean;
  customerId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type OrderItemTable = {
  id: string;
  isFulfilled: boolean;
  vendorPayout: boolean;
  orderId: string;
  productId: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date | null;
};