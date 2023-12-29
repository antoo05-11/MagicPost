import React from 'react';
import Card from "@/components/employee/dashboard/card";
import Chart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fetchTransactionPointsStatistic, formatDate } from '@/api/data';
import { monthlyOptions, yearlyOptions } from './overview';

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

    const [intervalType, setIntervalType] = useState('year');

    let chartOptions = defaultOptions;
    switch (intervalType) {
        case 'year':
            chartOptions = yearlyOptions;
            break;
        case 'month':
            chartOptions = monthlyOptions;
            break;
        case 'week':
            chartOptions = defaultOptions;
            break;
    }

    const options = extend ? extendOptions : chartOptions;

    const handleIntervalChange = (newIntervalType) => {
        setIntervalType(newIntervalType);
        console.log(`Interval changed to: ${newIntervalType}`);
    };

    let maxDate = new Date();
    let minDate = new Date(maxDate);
    let daysDiff = 7;

    if (intervalType == 'month') daysDiff = 31;
    if (intervalType == 'year') daysDiff = 365;

    minDate.setDate(maxDate.getDate() - daysDiff + 1);
    minDate = formatDate(minDate);
    maxDate = formatDate(maxDate);

    let data = fetchTransactionPointsStatistic({ minDate: minDate, maxDate: maxDate });
    if (data) {
        if (intervalType == 'month') {
            const arrivingQuantityWeeks = [];
            for (let i = 0; i < 30; i++) {
                let index = Math.floor(i / 7);
                if (index == 4) break;
                if (!arrivingQuantityWeeks[index]) arrivingQuantityWeeks[index] = 0;
                arrivingQuantityWeeks[index] += data.arrivingQuantity[i];
            }

            const onStockQuantityWeeks = [];
            for (let i = 0; i < 30; i++) {
                let index = Math.floor(i / 7);
                if (index == 4) break;
                if (!onStockQuantityWeeks[index]) onStockQuantityWeeks[index] = 0;
                onStockQuantityWeeks[index] += data.onStockQuantity[i];
            }

            const forwardedQuantityWeeks = [];
            for (let i = 0; i < 30; i++) {
                let index = Math.floor(i / 7);
                if (index == 4) break;
                if (!forwardedQuantityWeeks[index]) forwardedQuantityWeeks[index] = 0;
                forwardedQuantityWeeks[index] += data.forwardedQuantity[i];
            }

            data = [
                { name: "Hàng đang đến", data: arrivingQuantityWeeks },
                { name: "Hàng trong kho", data: onStockQuantityWeeks },
                { name: "Hàng đã chuyển", data: forwardedQuantityWeeks },
            ]
        }
        else if (intervalType == 'year') {
            const arrivingQuantityMonths = [];
            for (let i = 0; i < 365; i++) {
                let index = Math.floor(i / 30);
                if (index == 12) break;
                if (!arrivingQuantityMonths[index]) arrivingQuantityMonths[index] = 0;
                arrivingQuantityMonths[index] += data.arrivingQuantity[i];
            }

            const onStockQuantityMonths = [];
            for (let i = 0; i < 365; i++) {
                let index = Math.floor(i / 30);
                if (index == 12) break;
                if (!onStockQuantityMonths[index]) onStockQuantityMonths[index] = 0;
                onStockQuantityMonths[index] += data.onStockQuantity[i];
            }

            const forwardedQuantityMonths = [];
            for (let i = 0; i < 365; i++) {
                let index = Math.floor(i / 30);
                if (index == 12) break;
                if (!forwardedQuantityMonths[index]) forwardedQuantityMonths[index] = 0;
                forwardedQuantityMonths[index] += data.forwardedQuantity[i];
            }

            data = [
                { name: "Hàng đang đến", data: arrivingQuantityMonths },
                { name: "Hàng trong kho", data: onStockQuantityMonths },
                { name: "Hàng đã chuyển", data: forwardedQuantityMonths },
            ]
        }
        else {
            data = [
                { name: "Hàng đang đến", data: data.arrivingQuantity },
                { name: "Hàng trong kho", data: data.onStockQuantity },
                { name: "Hàng đã chuyển", data: data.forwardedQuantity },
            ]
        }
    } else {
        data = [{
            name: 'Hàng đang đến',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Hàng trong kho',
            data: [11, 32, 45, 32, 34, 52, 41]
        }, {
            name: 'Hàng đã chuyển',
            data: [15, 33, 49, 35, 33, 49, 90]
        }]
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
            <Card title={"Điểm giao dịch"} extend={extend} intervalType={intervalType} onChange={handleIntervalChange}>
                <Chart type='area' options={options} series={data} height={chartHeight} />
                <Button onClick={() => { isExtend(!extend); console.log(extend) }} className='bg-warning'>
                    {extend ? 'Đóng' : 'Chi tiết'}
                </Button>
            </Card>
        </motion.div>
    );
}
