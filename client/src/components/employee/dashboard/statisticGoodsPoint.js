import React from 'react';
import Card from "@/components/employee/dashboard/card";
import Chart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fetchGoodsPointsStatistic } from '@/api/data';
import moment from 'moment';


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
    colors: ['#F6D6D6', '#E26EE5', '#FFB830'],
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

export default function StatisticGoodsPoint() {
    const [extend, isExtend] = useState(false);
    const chartHeight = extend ? 440 : 205;
    const options = extend ? extendOptions : defaultOptions;

    let maxDate = new Date();
    let minDate = new Date(maxDate);
    minDate.setDate(maxDate.getDate() - 7 + 1);
    minDate = formatDate(minDate);
    maxDate = formatDate(maxDate);

    let data = fetchGoodsPointsStatistic({ minDate: minDate, maxDate: maxDate });
    if (data) {
        data = [
            { name: "Hang dang den", data: data.arrivingQuantity },
            { name: "Hang trong kho", data: data.onStockQuantity },
            { name: "Hang da chuyen", data: data.forwardedQuantity },
        ]
    }

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
            <Card title={"Điểm tập kết"} extend={extend}>
                <Chart type='area' options={options} series={data} height={chartHeight} />
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

export function formatDate(dateTime) {
    return moment(dateTime).format('YYYY-MM-DD').replace(/-/g, '');
}