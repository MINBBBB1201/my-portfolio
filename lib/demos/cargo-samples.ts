import type { CargoBoxInput } from "./container-planner/types";

export const cargoScenarios: { name: string; description: string; boxes: CargoBoxInput[] }[] = [
  { name: "Mixed cargo", description: "Three invented cargo types with different sizes and weights.", boxes: [
    { id: "a", name: "Large crates", lengthCm: 120, widthCm: 100, heightCm: 100, weightKg: 300, quantity: 12 },
    { id: "b", name: "Medium cartons", lengthCm: 80, widthCm: 60, heightCm: 60, weightKg: 70, quantity: 12 },
    { id: "c", name: "Small cartons", lengthCm: 50, widthCm: 40, heightCm: 40, weightKg: 20, quantity: 12 },
  ] },
  { name: "Payload limit", description: "Heavy crates fit geometrically, but the full request exceeds the configured payload.", boxes: [
    { id: "a", name: "Heavy crates", lengthCm: 100, widthCm: 100, heightCm: 100, weightKg: 7000, quantity: 6 },
  ] },
  { name: "Oversized cargo", description: "An invented crate that is too large in every allowed orientation.", boxes: [
    { id: "a", name: "Oversized crate", lengthCm: 1400, widthCm: 300, heightCm: 300, weightKg: 400, quantity: 1 },
    { id: "b", name: "Small cartons", lengthCm: 80, widthCm: 60, heightCm: 60, weightKg: 30, quantity: 8 },
  ] },
];

export function validateDemoCargo(boxes: CargoBoxInput[]): string | null {
  if (!boxes.length || boxes.length > 3) return "Use one to three cargo types.";
  if (boxes.some((box) => ![box.lengthCm, box.widthCm, box.heightCm].every((v) => Number.isFinite(v) && v >= 1 && v <= 2000))) return "Dimensions must be between 1 and 2,000 cm.";
  if (boxes.some((box) => !Number.isFinite(box.weightKg) || box.weightKg < 0 || box.weightKg > 30000)) return "Weight must be between 0 and 30,000 kg per box.";
  if (boxes.some((box) => !Number.isInteger(box.quantity) || box.quantity < 0 || box.quantity > 60) || boxes.reduce((n, b) => n + b.quantity, 0) > 60) return "Use whole-number quantities with no more than 60 boxes in total.";
  return null;
}
