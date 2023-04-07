import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/Dashboard";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

type Props = {};

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const { data: productData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery();

  const operationExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operation Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  return (
    <>
      <DashboardBox gridArea={"d"}>
        <BoxHeader
          title="Profut and revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText={"+4%"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"left"}
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"right"}
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId={"left"}
              type={"monotone"}
              dataKey={"Non Operation Expenses"}
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey={"Operational Expenses"}
              stroke={palette.primary.main[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea={"e"}></DashboardBox>
      <DashboardBox gridArea={"f"}></DashboardBox>
    </>
  );
};

export default Row2;
