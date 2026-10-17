import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb, orders } from "@/lib/db";

const item = z.object({
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  qty: z.number().int().min(1).max(99),
  price: z.number().int().min(0),
});

const orderSchema = z.object({
  number: z.string().regex(/^RWS-\d{8}$/),
  name: z.string().trim().min(3).max(120),
  phone: z.string().regex(/^(06|07)\d{8}$/),
  phone2: z.string().regex(/^((06|07)\d{8})?$/).optional(),
  wilaya: z.number().int().min(1).max(75),
  commune: z.string().trim().max(120),
  deliveryType: z.enum(["home", "office"]),
  carrier: z.string().trim().max(60).optional(),
  items: z.array(item).min(1).max(50),
  subtotal: z.number().int().min(0),
  discount: z.number().int().min(0),
  deliveryFee: z.number().int().min(0),
  gift: z.boolean().optional(),
  giftNote: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(500).optional(),
  otp: z.string().regex(/^\d{4}$/),
});

/** Stores a checkout order when DATABASE_URL is set. */
export async function POST(req: NextRequest) {
  try {
    const parsed = orderSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

    const db = await getDb();
    if (!db) return NextResponse.json({ ok: true, stored: "local" });

    const b = parsed.data;
    await db.insert(orders).values({
      number: b.number,
      name: b.name,
      phone: b.phone,
      phone2: b.phone2 || null,
      wilaya: b.wilaya,
      commune: b.commune,
      deliveryType: b.deliveryType,
      carrier: b.carrier || null,
      items: JSON.stringify(b.items),
      subtotal: b.subtotal,
      discount: b.discount,
      deliveryFee: b.deliveryFee,
      gift: b.gift ?? false,
      giftNote: b.giftNote || null,
      notes: b.notes || null,
      status: "pending",
      otp: b.otp,
      verified: false,
    });
    return NextResponse.json({ ok: true, stored: "neon" });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
