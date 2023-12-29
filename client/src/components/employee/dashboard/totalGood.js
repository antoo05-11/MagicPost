"use client";
import React from "react";
import Card from "@/components/employee/dashboard/card";
import Chart from "react-apexcharts";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";

const defaultOptions = {
  chart: {
    width: 380,
    height: 205,
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  states: {
    hover: {
      filter: { type: 'none' }
    },
    active: {
      filter: { type: 'none' }
    }
  },
  colors: ['#ff6178', '#26e7a6'],
  legend: { show: false },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    tickPlacement: 'on',
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false }
  },
  yaxis: {
    show: true,
    tickAmount: 4,
    labels: {
      offsetX: -17,
      formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
    }
  }

};

const extendOptions = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    toolbar: { show: true }
  },
  dataLabels: { enabled: true },
  legend: { show: true },
  xaxis: {
    ...defaultOptions.xaxis,
    labels: { show: true },
    axisTicks: { show: true },
    axisBorder: { show: true }
  }
};

export default function TotalGood() {
  const data = {
    series: [
      {
        name: "Tổng hàng hóa",
        data: [505, 705, 202, 350, 500, 650, 900],
      },
    ],
  };
  const [extend, isExtend] = useState();
  const chartHeight = extend ? 440 : 205;
  const options = extend ? extendOptions : defaultOptions;

  options.responsive = [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
        },

        xaxis: {
          labels: { show: true },
        },

      },
    },
  ];
  return (

    <motion.div>
      <Card title={"Tổng hàng hóa"} extend={extend}>
        <Chart
          type="area"
          options={options}
          height={chartHeight}
          series={data.series}
        />
      </Card>
    </motion.div>
  );
}
