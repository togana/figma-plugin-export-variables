import { DTCGVariable } from "../types";

export const createNestedVariable = (parts: string[], value: DTCGVariable): DTCGVariable => {
  return parts.reduceRight((acc, key) => ({ [key]: acc }), value);
}
