"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => { };

// false on the server and during hydration, true afterwards: lets client-only state
// (like localStorage) be read without a hydration mismatch.
export default function useHydrated() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}
