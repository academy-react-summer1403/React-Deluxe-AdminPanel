import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

export function formatCost(cost) {
  if (typeof cost !== "number" && typeof cost !== "string") {
    throw new Error("Cost must be a number or a string.");
  }

  // Ensure the input is a string for formatting
  const costString = `${cost}`;
  const formattedCost = digitsEnToFa(addCommas(costString)).split(".")[0];
  return formattedCost;
}
