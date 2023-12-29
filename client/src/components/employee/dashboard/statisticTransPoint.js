import React from 'react';
import Card from "@/components/employee/dashboard/card";
import Chart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
const data = {
    series: [{
        name: 'Hàng gửi',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'Hàng nhận',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
}

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

export default function StatisticTransPoint() {
    const [extend, isExtend] = useState(false);
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
            <Card title={"Điểm giao dịch"} extend={extend}>
                <Chart type='area' options={options} series={data.series} height={chartHeight} />
                <Button onClick={() => { isExtend(!extend); console.log(extend) }} className='bg-warning'>
                    {extend ? 'Đóng' : 'Chi tiết'}
                </Button>
            </Card>
        </motion.div>
    );
}
