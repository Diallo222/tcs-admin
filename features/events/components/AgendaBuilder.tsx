"use client";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Plus, Trash2 } from "lucide-react";
import type { AgendaItem } from "../types";

interface AgendaBuilderProps {
  items: AgendaItem[];
  onChange: (items: AgendaItem[]) => void;
}

function newAgendaItem(): AgendaItem {
  return {
    id: `agenda_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    time: "09:00",
    title: "",
  };
}

export function AgendaBuilder({ items, onChange }: AgendaBuilderProps) {
  const updateItem = (id: string, patch: Partial<AgendaItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      <SectionLabel>Agenda</SectionLabel>
      {items.length === 0 && (
        <p className="text-sm text-muted">No agenda items yet. Add sessions below.</p>
      )}
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-2 items-start">
          <Input
            label={index === 0 ? "Time" : undefined}
            type="time"
            value={item.time}
            onChange={(e) => updateItem(item.id, { time: e.target.value })}
            className="w-28 shrink-0"
          />
          <Input
            label={index === 0 ? "Session title" : undefined}
            placeholder="Opening keynote"
            value={item.title}
            onChange={(e) => updateItem(item.id, { title: e.target.value })}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-6 shrink-0 text-muted hover:text-red"
            onClick={() => removeItem(item.id)}
            aria-label="Remove agenda item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, newAgendaItem()])}>
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add session
      </Button>
    </div>
  );
}
