import Image from "next/image";
import type { MockupKey } from "@/lib/products";
import { ScaleToFit } from "./primitives";
import { PosMock, InventoryMock, AccountingMock, GstMock, PayrollMock, CrmMock, PurchaseMock, AnalyticsMock, SchoolMock, CollegeMock } from "./ModuleMocks";
import { DashboardMock } from "./DashboardMock";

const coded: Record<Exclude<MockupKey, "restoconnect">, () => React.JSX.Element> = {
  pos: PosMock, inventory: InventoryMock, accounting: AccountingMock, gst: GstMock,
  payroll: PayrollMock, crm: CrmMock, purchase: PurchaseMock, analytics: AnalyticsMock, school: SchoolMock, college: CollegeMock,
};

/** 16:10 screen content for a module. RestoConnect uses real product screenshots. */
export function ModuleScreen({ mockup, priority }: { mockup: MockupKey | "dashboard"; priority?: boolean }) {
  if (mockup === "restoconnect") {
    return (
      <div className="relative aspect-[1280/800] w-full overflow-hidden bg-white">
        <Image src="/products/restoconnect/desktop-kitchen.webp" alt="RestoConnect kitchen screen showing live table orders" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-top" priority={priority} />
      </div>
    );
  }
  const C = mockup === "dashboard" ? DashboardMock : coded[mockup];
  return (
    <ScaleToFit>
      <C />
    </ScaleToFit>
  );
}

export const isRealScreenshot = (m: MockupKey | "dashboard") => m === "restoconnect";
