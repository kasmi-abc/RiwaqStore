"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Banknote,
  BookOpen,
  CircleHelp,
  Gift,
  Heart,
  LayoutDashboard,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsappIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.271-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export default function Footer() {
  const { t, locale } = useI18n();
  const { phone, phoneDisplay, whatsapp, instagram } = useSettings();
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="print-hidden mt-16 bg-primary-950 text-cream-100">
      {/* trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
          {[
            { icon: Truck, ar: "توصيل لجميع جهات المغرب", fr: "Livraison dans tout le Maroc", en: "Delivery across Morocco" },
            { icon: Banknote, ar: "الدفع عند الاستلام", fr: "Paiement à la livraison", en: "Cash on delivery" },
            { icon: PackageCheck, ar: "تغليف آمن فاخر", fr: "Emballage soigné", en: "Safe premium packing" },
            { icon: ShieldCheck, ar: "طبعات أصلية محققة", fr: "Éditions authentiques", en: "Authentic editions" },
          ].map((f, i) => (
            <TrustItem key={i} {...f} />
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="رواق السلف"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border-2 border-gold-500 bg-white object-cover"
            />
            <div>
              <p className="font-display text-2xl font-bold">رواق السلف</p>
              <p className="text-xs text-gold-300">للكتب الشرعية</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/80">{t("footerAbout")}</p>
          <div className="mt-4 flex gap-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full bg-white/10 p-2.5 text-cream-100 transition hover:bg-gold-500 hover:text-primary-950"
            >
              <WhatsappIcon />
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2.5 text-cream-100 transition hover:bg-gold-500 hover:text-primary-950"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gold-300">{t("footerShop")}</h4>
          <ul className="space-y-2.5 text-sm text-cream-100/80">
            <li><Link href="/books" className="hover:text-gold-300">{t("navBooks")}</Link></li>
            <li><Link href="/bundles" className="hover:text-gold-300">{t("navBundles")}</Link></li>
            <li><Link href="/authors" className="hover:text-gold-300">{t("navAuthors")}</Link></li>
            <li><Link href="/wishlist" className="flex items-center gap-1.5 hover:text-gold-300"><Heart size={13} />{t("wishlist")}</Link></li>
            <li><Link href="/tracking" className="hover:text-gold-300">{t("navTracking")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gold-300">{t("footerHelp")}</h4>
          <ul className="space-y-2.5 text-sm text-cream-100/80">
            <li><Link href="/about" className="flex items-center gap-1.5 hover:text-gold-300"><BookOpen size={13} />{t("linkAbout")}</Link></li>
            <li><Link href="/faq" className="flex items-center gap-1.5 hover:text-gold-300"><CircleHelp size={13} />{t("navFaq")}</Link></li>
            <li><Link href="/terms" className="hover:text-gold-300">{t("linkTerms")}</Link></li>
            <li><Link href="/delivery" className="flex items-center gap-1.5 hover:text-gold-300"><Truck size={13} />{t("linkDelivery")}</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-300">{t("linkPrivacy")}</Link></li>
            <li><Link href="/bundles" className="flex items-center gap-1.5 hover:text-gold-300"><Gift size={13} />{t("bundleTitle")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gold-300">{t("footerContact")}</h4>
          <ul className="space-y-2.5 text-sm text-cream-100/80">
            <li>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold-300">
                <Phone size={14} className="text-gold-400" /> <bdi>{phoneDisplay}</bdi>
              </a>
            </li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold-400" /> contact@riwaqstore.ma</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold-400" /> المغرب — توصيل لجميع الجهات</li>
            <li>
              <Link href="/admin" className="flex items-center gap-2 text-gold-300/80 hover:text-gold-300">
                <LayoutDashboard size={14} /> {t("adminLogin")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-[13px] text-cream-100/70 md:flex-row">
          <p>© {year} رواق السلف — {t("rights")}</p>
          <p>
            Designed by{" "}
            <a
              href="https://www.instagram.com/abdelkader_haith/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 hover:text-gold-200"
            >
              K.Haithem
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function TrustItem({
  icon: Icon,
  ar,
  fr,
  en,
}: {
  icon: typeof Truck;
  ar: string;
  fr: string;
  en: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-xl bg-gold-500/15 p-2.5 text-gold-300">
        <Icon size={20} />
      </span>
      <TrustLabel ar={ar} fr={fr} en={en} />
    </div>
  );
}

function TrustLabel({ ar, fr, en }: { ar: string; fr: string; en: string }) {
  const { locale } = useI18n();
  return (
    <span className="text-sm font-bold">
      {locale === "ar" ? ar : locale === "fr" ? fr : en}
    </span>
  );
}
