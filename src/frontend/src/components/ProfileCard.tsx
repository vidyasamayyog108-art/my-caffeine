import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import type { Member } from "../types";
import { MemberPhoto } from "./MemberPhoto";

interface ProfileCardProps {
  member: Member;
  index?: number;
  onInterest?: (id: string) => void;
}

export function ProfileCard({
  member,
  index = 0,
  onInterest,
}: ProfileCardProps) {
  const isPremium = member.membershipTier === "Premium";
  const isVerified = member.isVerified === true;

  return (
    <article
      className="bg-card rounded-xl overflow-hidden border border-border shadow-premium hover:shadow-lg transition-smooth group relative"
      data-ocid={`profile.item.${index + 1}`}
    >
      {/* Premium badge */}
      {isPremium && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            ★ Premium
          </span>
        </div>
      )}

      {/* Verified badge */}
      {isVerified && (
        <div className="absolute top-2 left-2 z-10">
          <span className="flex items-center gap-0.5 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
            <CheckCircle2 className="w-2.5 h-2.5" />✓
          </span>
        </div>
      )}

      {/* Photo */}
      <Link to="/profile/$id" params={{ id: member.id }}>
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <MemberPhoto
            name={member.name}
            photoUrl={member.photoUrl}
            photoAssetId={member.photoAssetId}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            fallbackClassName="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div>
          <Link to="/profile/$id" params={{ id: member.id }}>
            <h3 className="font-display font-semibold text-foreground text-base leading-tight hover:text-primary transition-colors truncate">
              {member.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground font-body">
            {member.age} वर्ष · {member.height}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {member.city}, {member.state}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <GraduationCap className="w-3 h-3 shrink-0" />
          <span className="truncate">{member.education}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Briefcase className="w-3 h-3 shrink-0" />
          <span className="truncate">{member.occupation}</span>
        </div>

        {member.upjati && (
          <div className="flex items-center gap-1 flex-wrap">
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {member.upjati}
            </Badge>
            {isVerified && (
              <Badge
                variant="outline"
                className="text-xs px-1.5 py-0 border-primary/40 text-primary"
              >
                <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                Verified
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            onClick={() => onInterest?.(member.id)}
            data-ocid={`profile.interest_button.${index + 1}`}
            aria-label={`${member.name} को रुचि भेजें`}
          >
            <Heart className="w-3 h-3 mr-1" />
            रुचि
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            aria-label="शेयर करें"
          >
            <Share2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </article>
  );
}
