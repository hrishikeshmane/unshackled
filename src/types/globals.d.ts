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
  stripeConnectedId: string;
  status: "approved" | "pending" | "denied";
};

export type StoreTable = {
  id: string;
  name: string;
  isLive: boolean | null;
  description: string | null;
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
  // discounts: Record<string, unknown>;
  commission: string;
  commissionType: "percentage" | "flat";
  domainRank: string;
  isFeatured: boolean;
  isArchived: boolean;
  isApproved: "approved" | "pending" | "denied";
  pricingPlans: {
    label: string;
    description: string;
    price: string;
  }[];
  hasPricingPlans: boolean;
  hasVariablePrice: boolean;
  showPricing: boolean;
  requiresVendorApproval: boolean;
  isExtRequiredFormApprovalLink: boolean;
  ExtRequiredFormApprovalLink: string;
  hasDownPayment: boolean;
  downPayment: string;
  orderCommunicationEmail: string;
  additionalOrderEmailText: string;
  hasAdditionalLink: boolean,
  additionalLinkLabel: string,
  additionalLinkUrl: string,
  tagId: string;
  requiresRefNumber: boolean;
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
  pricingPlans: {
    label: string;
    description: string;
    price: string;
}[];
hasPricingPlans: boolean;
hasVariablePrice: boolean;
  // discounts: Record<string, unknown>;
  showPricing: boolean;
  commission: string;
  commissionType: "percentage" | "flat";
  domainRank: string;
  isFeatured: boolean;
  isArchived: boolean;
  isApproved: "approved" | "pending" | "denied";
  requiresVendorApproval: boolean;
  hasDownPayment: boolean;
  downPayment: string;
  orderCommunicationEmail: string;
  additionalOrderEmailText: string;
  hasAdditionalLink: boolean,
  additionalLinkLabel: string,
  additionalLinkUrl: string,
  requiresRefNumber: boolean;
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
  paymentIntentId: string | null,
  sessionId: string | null,
  receipt: string | null,
  paymentStatus: string,
  customerId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type OrderItemTable = {
  id: string;
  isFulfilled: boolean;
  vendorPayout: boolean;
  refNumber: string;
  orderId: string;
  productId: string;
  approval: "requested" | "approved" | "denied";
  isDownPayment: boolean;
  quantity: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type formQuestions = {
  id: string;
  productId: string;
  vendorId: string;
  question: string;
  type: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type formResponses = {
  id: string;
  productId: string;
  vendorId: string;
  customerId: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type requestApprovals = {
  id: string;
  productId: string;
  vendorId: string;
  customerId: string;
  status: "pending" | "approved" | "denied";
  createdAt: Date;
  updatedAt: Date | null;
}