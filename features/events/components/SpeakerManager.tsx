"use client";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Speaker } from "../types";

interface SpeakerManagerProps {
  speakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
}

function newSpeaker(): Speaker {
  return {
    id: `spk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    title: "",
    company: "",
    bio: "",
  };
}

export function SpeakerManager({ speakers, onChange }: SpeakerManagerProps) {
  const updateSpeaker = (id: string, patch: Partial<Speaker>) => {
    onChange(speakers.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSpeaker = (id: string) => {
    onChange(speakers.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <SectionLabel>Speakers</SectionLabel>
      {speakers.length === 0 && (
        <p className="text-sm text-muted">No speakers added yet.</p>
      )}
      {speakers.map((speaker, index) => (
        <div key={speaker.id} className="rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink2 uppercase tracking-wide">
              Speaker {index + 1}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted hover:text-red"
              onClick={() => removeSpeaker(speaker.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Name"
              value={speaker.name}
              onChange={(e) => updateSpeaker(speaker.id, { name: e.target.value })}
            />
            <Input
              label="Title"
              value={speaker.title}
              onChange={(e) => updateSpeaker(speaker.id, { title: e.target.value })}
            />
            <Input
              label="Company"
              value={speaker.company}
              onChange={(e) => updateSpeaker(speaker.id, { company: e.target.value })}
              className="md:col-span-2"
            />
          </div>
          <Textarea
            label="Bio"
            value={speaker.bio}
            onChange={(e) => updateSpeaker(speaker.id, { bio: e.target.value })}
            rows={2}
          />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...speakers, newSpeaker()])}>
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add speaker
      </Button>
    </div>
  );
}
