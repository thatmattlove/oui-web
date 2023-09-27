export function formatMacAddress(macAddress: string): string {
    // Remove any non-hexadecimal characters
    const cleanedMac = macAddress.replace(/[^0-9a-fA-F]/g, "");

    // Ensure the cleaned MAC address has at least 12 characters
    const paddedMac = cleanedMac.padEnd(12, "0");

    // Split the MAC address into pairs of two characters
    const pairs = [];
    for (let i = 0; i < 12; i += 2) {
        pairs.push(paddedMac.slice(i, i + 2));
    }

    // Join the pairs with colons to format the MAC address
    return pairs.join(":");
}
