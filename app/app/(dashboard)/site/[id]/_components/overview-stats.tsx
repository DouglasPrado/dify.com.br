"use client";

import { random } from "@/lib/utils";
import { AreaChart, BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react";
import { useMemo } from "react";

export default function OverviewStats() {
  const data = useMemo(() => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    return [
      ...months.map((month) => ({
        Month: `${month} 23`,
        "Total visitantes": random(20000, 170418),
      })),
      {
        Month: "Jul 23",
        "Total visitantes": 170418,
      },
    ];
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="dark:!bg-stone-900">
        <Text>Total visitantes</Text>
        <Flex
          className="space-x-3 truncate"
          justifyContent="start"
          alignItems="baseline"
        >
          <Metric className="font-title">170,418</Metric>
          <BadgeDelta
            deltaType="moderateIncrease"
            className="dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400"
          >
            34.3%
          </BadgeDelta>
        </Flex>
        <AreaChart
          className="mt-6 h-28"
          data={data}
          index="Month"
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat("us").format(number).toString()}`
          }
          categories={["Total visitantes"]}
          colors={["blue"]}
          showXAxis={true}
          showGridLines={false}
          startEndOnly={true}
          showYAxis={false}
          showLegend={false}
        />
      </Card>
    </div>
  );
}
