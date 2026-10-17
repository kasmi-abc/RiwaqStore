import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getDb, orders } from "@/lib/db";
import { ORDER_STATUSES, Order, OrderStatus } from "@/lib/data";

interface OrderRow {
  number: string;
  name: string;
  phone: string;
  phone2: string | null;
  wilaya: number;
  commune: string;
  deliveryType: string;
  carrier: string | null;
  items: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  gift: boolean;
  giftNote: string | null;
  notes: string | null;
  status: string;
  otp: string;
  verified: boolean;
  createdAt: Date;
}

function toOrder(r: OrderRow): Order {
  let items: Order["items"] = [];
  try {
    const parsed = JSON.parse(r.items);
    if (Array.isArray(parsed)) items = parsed;
  } catch {}
  return {
    number: r.number,
    name: r.name,
    phone: r.phone,
    phone2: r.phone2 ?? undefined,
    wilaya: r.wilaya,
    commune: r.commune,
    deliveryType: r.deliveryType === "office" ? "office" : "home",
    carrier: r.carrier ?? undefined,
    items,
    subtotal: r.subtotal,
    discount: r.discount,
    deliveryFee: r.deliveryFee,
    gift: r.gift,
    giftNote: r.giftNote ?? undefined,
    notes: r.notes ?? undefined,
    status: (ORDER_STATUSES as string[]).includes(r.status)
      ? (r.status as OrderStatus)
      : "pending",
    otp: r.otp,
    verified: r.verified,
    createdAt: new Date(r.createdAt).toISOString(),
  };
}

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return ((session?.user as { role?: string } | undefined)?.role ?? "") === "admin";
}

const patchSchema = z.object({
  number: z.string().regex(/^RWS-\d{8}$/),
  patch: z.object({
    status: z.enum(ORDER_STATUSES).optional(),
    verified: z.boolean().optional(),
    carrier: z.string().trim().max(60).optional(),
    notes: z.string().trim().max(500).optional(),
  }),
});

/** Reads stored orders for the signed-in admin. */
export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false }, { status: 401 });
  const db = await getDb();
  if (!db) return NextResponse.json({ ok: true, orders: [], source: "local" });
  const rows = (await db.select().from(orders)) as unknown as OrderRow[];
  return NextResponse.json({
    ok: true,
    orders: rows.map(toOrder).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    source: "neon",
  });
}

/** Applies an admin edit to a stored order. */
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false }, { status: 401 });
  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json({ ok: false }, { status: 400 });
  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false }, { status: 400 });

  const { number, patch } = parsed.data;
  const set: Record<string, unknown> = {};
  if (patch.status !== undefined) set.status = patch.status;
  if (patch.verified !== undefined) set.verified = patch.verified;
  if (patch.carrier !== undefined) set.carrier = patch.carrier;
  if (patch.notes !== undefined) set.notes = patch.notes;
  if (Object.keys(set).length === 0)
    return NextResponse.json({ ok: false }, { status: 400 });

  const updated = (await db
    .update(orders)
    .set(set)
    .where(eq(orders.number, number))
    .returning()) as unknown as OrderRow[];
  if (!updated.length)
    return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, order: toOrder(updated[0]) });
}
