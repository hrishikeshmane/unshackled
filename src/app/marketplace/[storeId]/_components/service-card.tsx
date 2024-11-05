import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ServiceCardTitle } from "./service-card-title";
import { Briefcase, Clock, Globe2, Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { type ModifiedProduct } from "./columns";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "~/lib/utils";

const AccessButton = ({
  storeId,
  productId,
}: {
  storeId: string;
  productId: string;
}) => (
  <Button
    variant="default"
    className="flex gap-2"
    // onClick={redirect(`/marketplace/${storeId}/products/${productId}`)}
  >
    <LockClosedIcon className="shrink-0" />
    <p>Access</p>
    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 200 200" role="presentation" className="fill-white dark:fill-white">
      <path d="M 115.231 75.457 C 91.876 71.115 73.612 52.702 69.271 29.498 C 69.12 28.299 67.46 28.299 67.324 29.498 C 62.982 52.851 44.569 71.115 21.366 75.352 C 20.167 75.608 20.167 77.253 21.366 77.404 C 44.718 81.745 62.982 100.159 67.324 123.363 C 67.475 124.56 69.12 124.56 69.271 123.363 C 73.612 100.009 92.026 81.745 115.231 77.404 C 116.428 77.253 116.428 75.756 115.231 75.457 Z">
        <animate attributeName="opacity" values="1;0.2;1" keyTimes="0;0.5;1" dur="2s" begin="0.8s" repeatCount="indefinite" repeatDur="indefinite"></animate>
      </path>
      <path d="M 131.81 148.07 C 120.11 145.87 110.91 136.67 108.71 124.97 C 108.61 124.37 107.81 124.37 107.71 124.97 C 105.51 136.67 96.31 145.87 84.61 148.07 C 84.01 148.17 84.01 148.97 84.61 149.07 C 96.31 151.26 105.51 160.47 107.71 172.17 C 107.81 172.77 108.61 172.77 108.71 172.17 C 110.91 160.47 120.11 151.27 131.81 149.07 C 132.31 148.97 132.31 148.17 131.81 148.07 Z">
        <animate attributeName="opacity" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.8s" begin="0s" repeatCount="indefinite" repeatDur="indefinite"></animate>
      </path>
      <path d="M 179.61 91.87 C 164.01 88.97 151.81 76.67 148.91 61.17 C 148.81 60.37 147.7 60.37 147.61 61.17 C 144.71 76.77 132.41 88.97 116.91 91.8 C 116.11 91.97 116.11 93.07 116.91 93.17 C 132.51 96.07 144.71 108.37 147.61 123.87 C 147.71 124.67 148.81 124.67 148.91 123.87 C 151.81 108.27 164.11 96.07 179.61 93.17 C 180.41 93.07 180.41 92.07 179.61 91.87 Z">
        <animate attributeName="opacity" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.4s" begin="0.5s" repeatCount="indefinite" repeatDur="indefinite"></animate>
      </path>
    </svg> */}
  </Button>
);

const TagBadge = ({ Tag }: { Tag: string }) => (
  <p
    className={`hidden md:flex gap-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`}
  >
    {Tag}
  </p>
);

const ServiceInfo = ({
  service,
  domainRanking,
  estTurnaroundTime,
}: {
  service: string;
  domainRanking: number;
  estTurnaroundTime: number;
}) => (
  <>
    <div className="flex items-center gap-1.5">
      <Briefcase size={16} className="shrink-0" />
      <span className="capitalize">{service}</span>
    </div>
    {/* <p className="flex items-center gap-1">
      <Globe2 size={16} className="shrink-0" />
      <span>
        Domain Ranking:{" "}
        <span className="font-semibold">
          {domainRanking || "No Domain Ranking"}
        </span>
      </span>
      <HoverCard>
        <HoverCardTrigger>
          <Info size={12} className="text-primary" />
        </HoverCardTrigger>
        <HoverCardContent>Blah blah .....</HoverCardContent>
      </HoverCard>
    </p> */}
    {/* <p className="flex items-center gap-1.5 sm:hidden">
      <Clock size={16} className="shrink-0" />
      {estTurnaroundTime ?? "Contact for Turnaround Time"}
    </p> */}
  </>
);

const ServiceCard = ({ serviceRecord }: { serviceRecord: ModifiedProduct }) => {
  const {
    id,
    name,
    store,
    tag,
    tagline,
    logo,
    price,
    hasAdditionalLink,
    additionalLinkLabel,
    additionalLinkUrl,
    hasDownPayment,
    hasPricingPlans,
    showPricing,
    downPayment,
    type,
    domainRank,
    isFeatured,
    createdAt,
    estTurnAroundTime,
  } = serviceRecord;

  const placeholderUrl = "/placeholder.png";
  const params = useParams();

  return (
    <Link
      href={`/marketplace/${String(params.storeId)}/products/${id}`}
      className="text-left font-medium"
    >
      <article className="flex gap-3 rounded-xl border bg-card p-5 text-card-foreground shadow hover:bg-muted">
        <Image
          src={logo ? logo : placeholderUrl}
          alt={`${name} logo`}
          width={100}
          height={100}
          className="self-center rounded-lg object-contain"
        />
        <div className="max-w-xs flex-grow space-y-3 break-all text-left">
          <div>
            <ServiceCardTitle
              name={name}
              productId={id}
              featured={isFeatured}
            />
            <p className="text-muted-foreground">{tagline}</p>
          </div>
          <div className="text-muted-foreground">
            <ServiceInfo
              service={type}
              domainRanking={domainRank}
              estTurnaroundTime={estTurnAroundTime}
            />
            <p className="underline">
              {additionalLinkLabel}
            </p>
            <div className="flex items-end justify-between gap-1.5 sm:hidden">
              <TagBadge Tag={tag} />
              <span className="flex items-center gap-1.5">
                {/* {price ? `${formatPrice(price)}` : "Contact for Price"} */}
                {showPricing ? hasDownPayment ? `Starting at ${formatPrice(downPayment)}` : hasPricingPlans ? `Starting at ${formatPrice(price)}` : formatPrice(price) : `Contact for Pricing`}
              </span>
              {/* <AccessButton storeId={String(params.storeId)} productId={id} /> */}
            </div>
          </div>
        </div>
        <div className="ml-auto hidden shrink-0 flex-col items-end justify-between sm:flex">
          <span className="flex items-center gap-1.5">
            {/* {price ? `${formatPrice(price)}` : "Contact for Price"} */}
            {showPricing ? hasDownPayment ? `Starting at ${formatPrice(downPayment)}` : hasPricingPlans ? `Starting at ${formatPrice(price)}` : formatPrice(price) : `Contact for Pricing`}
          </span>
          {/* <AccessButton storeId={String(params.storeId)} productId={id} /> */}
          <div className="flex flex-col items-end">
            <TagBadge Tag={tag} />
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock size={16} className="shrink-0" />
              <span>Est. Turnaround Time:</span>
              <span className="font-semibold">
                {estTurnAroundTime ? `${estTurnAroundTime} day${estTurnAroundTime > 1 ? 's' : ''}` : "Contact for Turnaround Time"}
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ServiceCard;
