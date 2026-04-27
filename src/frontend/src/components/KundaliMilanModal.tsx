import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActor } from "@caffeineai/core-infrastructure";
import { AlertCircle, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { KundaliResult as BackendKundaliResult } from "../backend";
import { createActor } from "../backend";
import { useUserStore } from "../store";

export const NAKSHATRAS = [
  "अश्विनी",
  "भरणी",
  "कृत्तिका",
  "रोहिणी",
  "मृगशिरा",
  "आर्द्रा",
  "पुनर्वसु",
  "पुष्य",
  "आश्लेषा",
  "मघा",
  "पूर्वाफाल्गुनी",
  "उत्तराफाल्गुनी",
  "हस्त",
  "चित्रा",
  "स्वाति",
  "विशाखा",
  "अनुराधा",
  "ज्येष्ठा",
  "मूल",
  "पूर्वाषाढा",
  "उत्तराषाढा",
  "श्रवण",
  "धनिष्ठा",
  "शतभिषा",
  "पूर्वाभाद्रपदा",
  "उत्तराभाद्रपदा",
  "रेवती",
];

const RASHIS = [
  "मेष",
  "वृष",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
];

/** Frontend-only fallback computation (used when backend is unavailable) */
function computeFallbackKundali(
  dob1: string,
  dob2: string,
  birthTime1?: string,
  birthTime2?: string,
): BackendKundaliResult {
  const computeNakshatra = (
    dob: string,
    time?: string,
  ): { nakshatra: number; rashi: number; charan: number } => {
    const d = new Date(dob);
    if (time) {
      const [h, m] = time.split(":").map(Number);
      if (!Number.isNaN(h) && !Number.isNaN(m)) d.setHours(h, m, 0, 0);
    }
    const EPOCH = new Date("2000-01-01T00:00:00Z").getTime();
    const LUNAR_MS = 27.321661 * 24 * 60 * 60 * 1000;
    const elapsed = d.getTime() - EPOCH;
    const moonPos = ((elapsed % LUNAR_MS) + LUNAR_MS) % LUNAR_MS;
    const nakFloat = moonPos / (LUNAR_MS / 27);
    const nakshatra = Math.floor(nakFloat) % 27;
    const charan = Math.floor((nakFloat % 1) * 4) + 1;
    const rashi = Math.floor((nakshatra * 4 + (charan - 1)) / 9) % 12;
    return { nakshatra, rashi, charan };
  };

  const p1 = computeNakshatra(dob1, birthTime1);
  const p2 = computeNakshatra(dob2, birthTime2);
  const n1 = p1.nakshatra;
  const n2 = p2.nakshatra;

  const varna = BigInt(Math.abs((n1 % 4) - (n2 % 4)) < 2 ? 1 : 0);
  const vashya = BigInt(
    [0, 4, 8, 12, 16, 20, 24].includes(Math.abs(n1 - n2)) ? 2 : 1,
  );
  const taraDiff = Math.abs(n1 - n2) % 9;
  const tara = BigInt(
    taraDiff === 0 || taraDiff === 2 || taraDiff === 4
      ? 3
      : taraDiff === 6 || taraDiff === 8
        ? 2
        : 1,
  );
  const yoni = BigInt(
    n1 % 7 === n2 % 7 ? 4 : Math.abs((n1 % 7) - (n2 % 7)) <= 2 ? 2 : 1,
  );
  const grahaMaitri = BigInt(
    n1 % 3 === n2 % 3 ? 5 : Math.abs((n1 % 3) - (n2 % 3)) === 1 ? 3 : 1,
  );
  const gana = BigInt(
    n1 % 3 === n2 % 3 ? 6 : Math.abs((n1 % 3) - (n2 % 3)) === 1 ? 4 : 0,
  );
  const bhakootDiff = Math.abs((n1 % 12) - (n2 % 12));
  const bhakoot = BigInt([0, 2, 6].includes(bhakootDiff % 12) ? 7 : 0);
  const nadi = BigInt(n1 % 3 === n2 % 3 ? 0 : 8);
  const total =
    varna + vashya + tara + yoni + grahaMaitri + gana + bhakoot + nadi;

  const totalNum = Number(total);
  const verdict =
    totalNum >= 25 ? "Uttam" : totalNum >= 18 ? "Madhyam" : "Ashubh";

  return {
    score: {
      total,
      varna,
      vashya,
      tara,
      yoni,
      grahaMaitri,
      gana,
      bhakoot,
      nadi,
    },
    nakshatra1: BigInt(n1),
    nakshatra2: BigInt(n2),
    nakshatra1Name: NAKSHATRAS[n1],
    nakshatra2Name: NAKSHATRAS[n2],
    rashi1: BigInt(p1.rashi),
    rashi2: BigInt(p2.rashi),
    charan1: BigInt(p1.charan),
    charan2: BigInt(p2.charan),
    verdict,
  };
}

const GUNA_LABELS: Record<string, Record<string, string>> = {
  marathi: {
    varna: "वर्ण",
    vashya: "वश्य",
    tara: "तारा",
    yoni: "योनी",
    grahaMaitri: "ग्रह मैत्री",
    gana: "गण",
    bhakoot: "भकूट",
    nadi: "नाडी",
    title: "🔮 कुंडली मिलन परिणाम",
    nakshatra: "नक्षत्र",
    rashi: "राशी",
    charan: "चरण",
    total: "एकूण गुण",
    uttam: "उत्तम 💚",
    madhyam: "मध्यम 🟡",
    ashubh: "अशुभ 🔴",
    uttamDesc: "हे विवाह अत्यंत शुभ आहे.",
    madhyamDesc: "हे विवाह मध्यम आहे.",
    ashubhDesc: "हे विवाह अशुभ असू शकते.",
    share: "शेअर करा",
    close: "बंद करा",
    loading: "गणना होत आहे...",
    error: "गणना अयशस्वी. पुन्हा प्रयत्न करा.",
    retry: "पुन्हा प्रयत्न करा",
    preciseNote: "जन्म वेळेसह अचूक गणना",
    approxNote: "अंदाजे गणना (जन्म वेळ नाही)",
  },
  hindi: {
    varna: "वर्ण",
    vashya: "वश्य",
    tara: "तारा",
    yoni: "योनी",
    grahaMaitri: "ग्रह मैत्री",
    gana: "गण",
    bhakoot: "भकूट",
    nadi: "नाड़ी",
    title: "🔮 कुंडली मिलन परिणाम",
    nakshatra: "नक्षत्र",
    rashi: "राशि",
    charan: "चरण",
    total: "कुल गुण",
    uttam: "उत्तम 💚",
    madhyam: "मध्यम 🟡",
    ashubh: "अशुभ 🔴",
    uttamDesc: "यह विवाह अत्यंत शुभ है।",
    madhyamDesc: "यह विवाह मध्यम है।",
    ashubhDesc: "यह विवाह अशुभ हो सकता है।",
    share: "शेयर करें",
    close: "बंद करें",
    loading: "गणना हो रही है...",
    error: "गणना विफल। पुनः प्रयास करें।",
    retry: "पुनः प्रयास करें",
    preciseNote: "जन्म समय सहित सटीक गणना",
    approxNote: "अनुमानित गणना (जन्म समय नहीं)",
  },
  kannada: {
    varna: "ವರ್ಣ",
    vashya: "ವಶ್ಯ",
    tara: "ತಾರಾ",
    yoni: "ಯೋನಿ",
    grahaMaitri: "ಗ್ರಹ ಮೈತ್ರಿ",
    gana: "ಗಣ",
    bhakoot: "ಭಕೂಟ",
    nadi: "ನಾಡಿ",
    title: "🔮 ಕುಂಡಲಿ ಮಿಲನ ಫಲಿತಾಂಶ",
    nakshatra: "ನಕ್ಷತ್ರ",
    rashi: "ರಾಶಿ",
    charan: "ಚರಣ",
    total: "ಒಟ್ಟು ಗುಣ",
    uttam: "ಉತ್ತಮ 💚",
    madhyam: "ಮಧ್ಯಮ 🟡",
    ashubh: "ಅಶುಭ 🔴",
    uttamDesc: "ಈ ವಿವಾಹ ಅತ್ಯಂತ ಶುಭಕರ.",
    madhyamDesc: "ಈ ವಿವಾಹ ಮಧ್ಯಮ.",
    ashubhDesc: "ಈ ವಿವಾಹ ಅಶುಭ ಆಗಬಹುದು.",
    share: "ಹಂಚಿಕೊಳ್ಳಿ",
    close: "ಮುಚ್ಚಿ",
    loading: "ಗಣನೆ ನಡೆಯುತ್ತಿದೆ...",
    error: "ಗಣನೆ ವಿಫಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    preciseNote: "ಜನ್ಮ ಸಮಯ ಸಹಿತ ನಿಖರ ಗಣನೆ",
    approxNote: "ಅಂದಾಜು ಗಣನೆ (ಜನ್ಮ ಸಮಯ ಇಲ್ಲ)",
  },
  english: {
    varna: "Varna",
    vashya: "Vashya",
    tara: "Tara",
    yoni: "Yoni",
    grahaMaitri: "Graha Maitri",
    gana: "Gana",
    bhakoot: "Bhakoot",
    nadi: "Nadi",
    title: "🔮 Kundali Milan Result",
    nakshatra: "Nakshatra",
    rashi: "Rashi",
    charan: "Charan",
    total: "Total Score",
    uttam: "Excellent 💚",
    madhyam: "Average 🟡",
    ashubh: "Inauspicious 🔴",
    uttamDesc: "This marriage is highly auspicious.",
    madhyamDesc: "This marriage is average.",
    ashubhDesc: "This marriage may be inauspicious.",
    share: "Share",
    close: "Close",
    loading: "Calculating...",
    error: "Calculation failed. Please try again.",
    retry: "Try Again",
    preciseNote: "Precise calculation with birth time",
    approxNote: "Approximate calculation (no birth time)",
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  name1: string;
  name2: string;
  dob1: string;
  dob2: string;
  birthTime1?: string;
  birthTime2?: string;
}

export function KundaliMilanModal({
  open,
  onClose,
  name1,
  name2,
  dob1,
  dob2,
  birthTime1,
  birthTime2,
}: Props) {
  const { currentLanguage } = useUserStore();
  const lbl = GUNA_LABELS[currentLanguage] ?? GUNA_LABELS.english;
  const { actor } = useActor(createActor);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BackendKundaliResult | null>(null);

  const hasPreciseData = !!(birthTime1 || birthTime2);

  useEffect(() => {
    if (!open) {
      setResult(null);
      return;
    }
    let cancelled = false;
    setLoading(true);

    const doCompute = async () => {
      try {
        let r: BackendKundaliResult | null = null;
        if (actor) {
          r = await actor.computeKundaliScore(
            dob1,
            dob2,
            birthTime1 ?? null,
            birthTime2 ?? null,
            null,
            null,
            null,
            null,
          );
        }
        if (!cancelled) {
          setResult(
            r ?? computeFallbackKundali(dob1, dob2, birthTime1, birthTime2),
          );
        }
      } catch {
        if (!cancelled) {
          setResult(computeFallbackKundali(dob1, dob2, birthTime1, birthTime2));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void doCompute();
    return () => {
      cancelled = true;
    };
  }, [open, actor, dob1, dob2, birthTime1, birthTime2]);

  const total = result ? Number(result.score.total) : 0;
  const grade = result
    ? total >= 25
      ? "uttam"
      : total >= 18
        ? "madhyam"
        : "ashubh"
    : null;

  const gradeColor =
    grade === "uttam"
      ? "bg-emerald-500/15 text-emerald-700 border-emerald-400"
      : grade === "madhyam"
        ? "bg-yellow-400/15 text-yellow-700 border-yellow-400"
        : "bg-destructive/15 text-destructive border-destructive";

  type GunaKey =
    | "varna"
    | "vashya"
    | "tara"
    | "yoni"
    | "grahaMaitri"
    | "gana"
    | "bhakoot"
    | "nadi";
  const gunas: Array<{ key: GunaKey; label: string; max: number }> = [
    { key: "varna", label: lbl.varna, max: 1 },
    { key: "vashya", label: lbl.vashya, max: 2 },
    { key: "tara", label: lbl.tara, max: 3 },
    { key: "yoni", label: lbl.yoni, max: 4 },
    { key: "grahaMaitri", label: lbl.grahaMaitri, max: 5 },
    { key: "gana", label: lbl.gana, max: 6 },
    { key: "bhakoot", label: lbl.bhakoot, max: 7 },
    { key: "nadi", label: lbl.nadi, max: 8 },
  ];

  function handleShare() {
    if (!result) return;
    const gradeLabel = grade
      ? (lbl[grade as "uttam" | "madhyam" | "ashubh"] ?? "")
      : "";
    const text = `🔮 ${name1} × ${name2} कुंडली मिलन: ${total}/36 - ${gradeLabel}`;
    navigator.clipboard.writeText(text).then(() => toast.success("Copied!"));
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto"
        data-ocid="kundali.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-secondary font-display text-lg">
            {lbl.title}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3"
            data-ocid="kundali.loading_state"
          >
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">{lbl.loading}</p>
          </div>
        )}

        {!result && !loading && (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3"
            data-ocid="kundali.error_state"
          >
            <AlertCircle className="w-12 h-12 text-destructive" />
            <p className="text-sm text-destructive text-center">{lbl.error}</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4">
            {/* Precision note */}
            <div
              className={`flex items-start gap-2 text-xs rounded-lg px-3 py-2 ${hasPreciseData ? "bg-primary/8 text-primary border border-primary/20" : "bg-muted/60 text-muted-foreground border border-border"}`}
              data-ocid="kundali.precision_note"
            >
              <span className="text-sm shrink-0">
                {hasPreciseData ? "✓" : "📌"}
              </span>
              <span>{hasPreciseData ? lbl.preciseNote : lbl.approxNote}</span>
            </div>

            {/* Names + Nakshatras */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-primary/5 rounded-xl p-3 border border-primary/20">
                <p className="font-semibold text-foreground text-sm truncate">
                  {name1}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lbl.nakshatra}
                </p>
                <p className="text-primary font-bold text-sm mt-0.5">
                  {result.nakshatra1Name}
                </p>
                <div className="mt-1 flex justify-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {lbl.rashi}:{" "}
                    <span className="text-foreground font-medium">
                      {RASHIS[Number(result.rashi1)] ?? "-"}
                    </span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {lbl.charan}:{" "}
                    <span className="text-foreground font-medium">
                      {String(result.charan1)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="bg-secondary/5 rounded-xl p-3 border border-secondary/20">
                <p className="font-semibold text-foreground text-sm truncate">
                  {name2}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lbl.nakshatra}
                </p>
                <p className="text-secondary font-bold text-sm mt-0.5">
                  {result.nakshatra2Name}
                </p>
                <div className="mt-1 flex justify-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {lbl.rashi}:{" "}
                    <span className="text-foreground font-medium">
                      {RASHIS[Number(result.rashi2)] ?? "-"}
                    </span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {lbl.charan}:{" "}
                    <span className="text-foreground font-medium">
                      {String(result.charan2)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="text-center py-4 bg-muted/30 rounded-xl">
              <p className="text-5xl font-display font-bold text-foreground">
                {total}
                <span className="text-2xl text-muted-foreground">/36</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">{lbl.total}</p>
              {grade && (
                <Badge
                  className={`mt-2 border ${gradeColor} text-sm px-3 py-0.5`}
                  data-ocid="kundali.grade_badge"
                >
                  {lbl[grade as "uttam" | "madhyam" | "ashubh"]}
                </Badge>
              )}
            </div>

            {/* Guna bars */}
            <div className="space-y-2" data-ocid="kundali.gunas_section">
              {gunas.map((g) => {
                const score = Number(result.score[g.key]);
                const pct = Math.round((score / g.max) * 100);
                return (
                  <div key={g.key} className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground w-28 shrink-0 text-xs">
                      {g.label}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-semibold text-foreground w-10 text-right text-xs">
                      {score}/{g.max}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Verdict description */}
            {grade && (
              <div className={`rounded-xl p-3 border text-sm ${gradeColor}`}>
                {lbl[`${grade}Desc` as keyof typeof lbl]}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleShare}
                className="flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/5"
                data-ocid="kundali.share_button"
              >
                <Copy className="w-4 h-4" />
                {lbl.share}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="kundali.close_button"
              >
                {lbl.close}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Exported alias — used by Profile.tsx to compute nakshatra display */
export const computeKundaliMilan = computeFallbackKundali;
