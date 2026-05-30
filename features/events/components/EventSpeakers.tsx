"use client";

import { Avatar } from "@/shared/components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import type { Speaker } from "../types";

export function EventSpeakers({ speakers }: { speakers: Speaker[] }) {
  if (speakers.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Speakers</SectionLabel>
      </CardHeader>
      <CardContent className="space-y-4">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex gap-3">
            <Avatar name={speaker.name} size="md" />
            <div>
              <p className="text-sm font-semibold text-ink">{speaker.name}</p>
              <p className="text-xs text-muted">{speaker.title} · {speaker.company}</p>
              {speaker.bio && (
                <p className="text-xs text-ink2 mt-1 line-clamp-2">{speaker.bio}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
