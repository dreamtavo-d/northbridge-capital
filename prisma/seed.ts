import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.investmentPlan.createMany({
    data: [
      {
        name: "Core Capital Preservation",
        description:
          "A conservative allocation strategy focused on capital preservation with modest growth. (Demo data — not a real offering.)",
        minInvestment: 5000,
        maxInvestment: 100000,
        durationDays: 180,
        riskCategory: "LOW",
        strategy: "Fixed-income and diversified low-volatility instruments",
        targetReturnLabel: "Target range: 3-5% annually (not guaranteed)",
        status: "ACTIVE",
      },
      {
        name: "Balanced Growth Strategy",
        description:
          "A blended approach combining equity and alternative assets for moderate growth. (Demo data — not a real offering.)",
        minInvestment: 10000,
        maxInvestment: 250000,
        durationDays: 365,
        riskCategory: "MEDIUM",
        strategy: "Diversified equity and alternative asset blend",
        targetReturnLabel: "Target range: 6-9% annually (not guaranteed)",
        status: "ACTIVE",
      },
      {
        name: "Strategic Opportunities Fund",
        description:
          "An opportunistic strategy targeting higher-growth alternative investments. (Demo data — not a real offering.)",
        minInvestment: 25000,
        maxInvestment: null,
        durationDays: 730,
        riskCategory: "HIGH",
        strategy: "Private equity and alternative growth opportunities",
        targetReturnLabel: "Target range: 10-15% annually (not guaranteed)",
        status: "ACTIVE",
      },
    ],
  });

  console.log("Seeded 3 demo investment plans.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });