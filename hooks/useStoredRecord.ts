"use client";

import type { RecordMap } from "@/app/[locale]/tools/char-count/timer/TimerClient";
import { defaultRecord } from "@/utils/defaultRecord";
import { useMemo, useSyncExternalStore } from "react";

const KEY = 'record';
const CHANGE_EVENT = 'exzachly:record';

function subscribe(onChange: () => void) {
    window.addEventListener('storage', onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener('storage', onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

function readRaw() {
    try {
        return localStorage.getItem(KEY);
    } catch {
        return null;
    }
}

function parse(raw: string | null): RecordMap {
    if (!raw) return defaultRecord;
    try {
        return { ...defaultRecord, ...(JSON.parse(raw) as Partial<RecordMap>) };
    } catch (e) {
        console.error('Could not load data from localStorage', e);
        return defaultRecord;
    }
}

// Merges into whatever is stored now, so callers never write back a stale copy.
export function saveRecord(patch: Partial<RecordMap>) {
    try {
        localStorage.setItem(KEY, JSON.stringify({ ...parse(readRaw()), ...patch }));
    } catch (e) {
        console.error(e);
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Speech-pace record kept in localStorage, shared by the timer and every text area.
export default function useStoredRecord(): RecordMap {
    const raw = useSyncExternalStore(subscribe, readRaw, () => null);
    return useMemo(() => parse(raw), [raw]);
}
