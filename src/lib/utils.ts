import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

type CommissionType = 'flat' | 'percentage';

export function calculateCommissionAndVendorAmount(
  unitPrice: number,
  quantity: number,
  commission: number,
  commissionType: CommissionType
): [number, number] {
  const totalPrice = unitPrice * quantity;
  let commissionAmount: number;
  let vendorAmount: number;

  if (commissionType === 'flat') {
    commissionAmount = commission * quantity;
    vendorAmount = totalPrice - commissionAmount;
  } else { // percent
    commissionAmount = totalPrice * (commission / 100);
    vendorAmount = totalPrice - commissionAmount;
  }

  commissionAmount = Math.round(commissionAmount * 100) / 100;
  vendorAmount = Math.round(vendorAmount * 100) / 100;

  return [commissionAmount, vendorAmount];
}