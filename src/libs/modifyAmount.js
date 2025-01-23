const modifyAmount = (amount) => {
  // Check if amount is a valid number
  if (isNaN(amount) || amount === undefined || amount === null) {
    console.warn('Invalid amount:', amount);
    amount = 0; // Provide a default value if invalid
  }

  const modifiableAmount = String(Math.floor(amount)); // Convert to string for slicing
  const modifiedAmount =
    modifiableAmount?.length > 3
      ? `${modifiableAmount.slice(-100, -3)},${modifiableAmount.slice(-3)}`
      : Number(amount).toFixed(2); // Ensure it's a number before calling toFixed

  return modifiedAmount;
};

export default modifyAmount;
