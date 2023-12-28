import Chart from "react-apexcharts";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from "@/components/employee/dashboard/card";

const defaultOptions = {
    chart: {
        parentHeightOffset: 0,
        toolbar: { show: false }
    },
    plotOptions: {
        bar: {
            borderRadius: 9,
            distributed: true,
            columnWidth: '40%',
            endingShape: 'rounded',
            startingShape: 'rounded'
        }
    },
    stroke: {
        width: 2,

    },
    legend: { show: false },
    grid: {
        strokeDashArray: 7,
        padding: {
            top: -1,
            right: 0,
            left: -12,
            bottom: 5
        }
    },
    dataLabels: { enabled: false },
    colors: [
        // "#f5f5fa",
        // "#f5f5fa",
        // "#f5f5fa",
        // "#3DB2FF",
        // "#f5f5fa",
        // "#f5f5fa"
    ],
    states: {
        hover: {
            filter: { type: 'none' }
        },
        active: {
            filter: { type: 'none' }
        }
    },
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
}

const extendOptions = {
    ...defaultOptions,
    chart: {
        ...defaultOptions.chart,
        toolbar: { show: true }
    },
    dataLabels: { enabled: true },
    xaxis: {
        ...defaultOptions.xaxis,
        labels: { show: true },
        axisTicks: { show: true },
        axisBorder: { show: true }
    },

}

export default function Overview() {
    const [extend, isExtend] = useState(false);
    const options = extend ? extendOptions : defaultOptions;
    const chartHeight = extend ? 440 : 205;
    return (
        <motion.div>
            <Card title={"Lợi nhuận tuần"} extend={extend}>
                <Chart type='bar' height={chartHeight} options={options} series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]} />
                <p>
                    Your sales performance is 45% 😎 better compared to last month
                </p>
                <Button onClick={() => { isExtend(!extend); console.log(extend) }} className='bg-warning'>
                    {extend ? 'Đóng' : 'Chi tiết'}
                </Button>
            </Card>
        </motion.div>
    );
}