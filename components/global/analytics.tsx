"use client";

import {
  AreaChart,
  BarList,
  Bold,
  Card,
  Flex,
  Grid,
  Text,
  Title,
} from "@tremor/react";
import Image from "next/image";

const chartdata = [
  {
    date: "Jan 23",
    Visitantes: 2890,
  },
  {
    date: "Fev 23",
    Visitantes: 2756,
  },
  {
    date: "Mar 23",
    Visitantes: 3322,
  },
  {
    date: "Abr 23",
    Visitantes: 3470,
  },
  {
    date: "Mai 23",
    Visitantes: 3475,
  },
  {
    date: "Jun 23",
    Visitantes: 3129,
  },
];

const pages = [
  { name: "/resumo-startup-enxuta", value: "1,230" },
  { name: "/a-procura-da-felicidade", value: 751 },
  { name: "/ingressos-bitcoin-trader", value: 471 },
  { name: "/receita-previsivel", value: 280 },
  { name: "/sobre", value: 78 },
];

const referrers = [
  { name: "google.com", value: 351 },
  { name: "instagram.com", value: 271 },
  { name: "tiktok.com", value: 191 },
  { name: "facebook.com", value: 55 },
];

const countries = [
  { name: "Brasil", value: 789, code: "BR" },
  { name: "Estados Unidos", value: 676, code: "US" },
  { name: "Portugal", value: 564, code: "PT" },
  { name: "Angola", value: 234, code: "AG" },
  { name: "Espanha", value: 191, code: "ES" },
];

const categories = [
  {
    title: "Top Acessos",
    subtitle: "Acessos",
    data: pages,
  },
  {
    title: "Top Origens",
    subtitle: "Origem",
    data: referrers,
  },
  {
    title: "Países",
    subtitle: "País",
    data: countries,
  },
];

export default function AnalyticsMockup() {
  return (
    <div className="grid gap-6">
      <Card>
        <Title>Visitantes</Title>
        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
          index="date"
          categories={["Visitantes"]}
          colors={["slate"]}
          valueFormatter={(number: number) =>
            Intl.NumberFormat("us").format(number).toString()
          }
        />
      </Card>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {categories.map(({ title, subtitle, data }) => (
          <Card key={title} className="max-w-lg">
            <Title>{title}</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>{subtitle}</Bold>
              </Text>
              <Text>
                <Bold>Visitantes</Bold>
              </Text>
            </Flex>
            <BarList
              // @ts-ignore
              data={data.map(({ name, value, code }) => ({
                name,
                value,
                color: "slate",
                icon: () => {
                  if (title === "Top Origens") {
                    return (
                      <Image
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${name}`}
                        alt={name}
                        className="mr-2.5"
                        width={20}
                        height={20}
                      />
                    );
                  } else if (title === "Países") {
                    return (
                      <Image
                        src={`https://flag.vercel.app/m/${code}.svg`}
                        className="mr-2.5"
                        alt={code}
                        width={24}
                        height={16}
                      />
                    );
                  } else {
                    return null;
                  }
                },
              }))}
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
    </div>
  );
}
