import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, B as Badge, b as Button } from "./index-CkCNqozh.js";
import { C as CircleCheck } from "./circle-check-DyfLjrSe.js";
import { M as MapPin, S as Share2 } from "./share-2-CqQsbMng.js";
import { G as GraduationCap } from "./graduation-cap-Ck9csJB0.js";
import { H as Heart } from "./sampleData-Bygj8EpR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode);
function getPhotoSrc(photoUrl, photoAssetId) {
  if (photoAssetId) return `/api/assets/${photoAssetId}`;
  if (photoUrl) return photoUrl;
  return null;
}
function MemberPhoto({
  name,
  photoUrl,
  photoAssetId,
  className = "w-full h-full object-cover",
  fallbackClassName = "w-full h-full flex items-center justify-center bg-muted"
}) {
  const [errored, setErrored] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const src = getPhotoSrc(photoUrl, photoAssetId);
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (!src || errored) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: fallbackClassName, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-primary opacity-60", children: initials }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: name,
        className,
        onLoad: () => setLoading(false),
        onError: () => {
          setLoading(false);
          setErrored(true);
        }
      }
    )
  ] });
}
function ProfileCard({
  member,
  index = 0,
  onInterest
}) {
  const isPremium = member.membershipTier === "Premium";
  const isVerified = member.isVerified === true;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card rounded-xl overflow-hidden border border-border shadow-premium hover:shadow-lg transition-smooth group relative",
      "data-ocid": `profile.item.${index + 1}`,
      children: [
        isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm", children: "★ Premium" }) }),
        isVerified && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
          "✓"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$id", params: { id: member.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] bg-muted overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MemberPhoto,
            {
              name: member.name,
              photoUrl: member.photoUrl,
              photoAssetId: member.photoAssetId,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              fallbackClassName: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$id", params: { id: member.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight hover:text-primary transition-colors truncate", children: member.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
              member.age,
              " वर्ष · ",
              member.height
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              member.city,
              ", ",
              member.state
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: member.education })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: member.occupation })
          ] }),
          member.upjati && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0", children: member.upjati }),
            isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-1.5 py-0 border-primary/40 text-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 mr-0.5" }),
                  "Verified"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "flex-1 h-8 text-xs",
                onClick: () => onInterest == null ? void 0 : onInterest(member.id),
                "data-ocid": `profile.interest_button.${index + 1}`,
                "aria-label": `${member.name} को रुचि भेजें`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 mr-1" }),
                  "रुचि"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 w-8 p-0",
                "aria-label": "शेयर करें",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3 h-3" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Briefcase as B,
  MemberPhoto as M,
  ProfileCard as P
};
