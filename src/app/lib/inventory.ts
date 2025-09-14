// src/app/lib/inventory.ts
type RecordMap = Map<string, any>;

const soldOriginals: Set<string> = new Set();     // ids of originals that are sold
const orders: RecordMap = new Map();              // session_id -> summary

export function markOriginalsSold(ids: string[]) {
  ids.forEach((id) => soldOriginals.add(id));
}

export function isOriginalSold(id: string) {
  return soldOriginals.has(id);
}

export function saveOrder(sessionId: string, data: any) {
  orders.set(sessionId, data);
}

export function getOrder(sessionId: string) {
  return orders.get(sessionId);
}

// Helpers for UI/debug
export function getAllSoldOriginals() {
  return Array.from(soldOriginals);
}
