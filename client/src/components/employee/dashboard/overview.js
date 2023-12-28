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
};

const monthlyOptions = {
    chart: {
        parentHeightOffset: 0,
        toolbar: { show: false }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    states: {
        hover: {
            filter: { type: 'none' }
        },
        active: {
            filter: { type: 'none' }
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

const yearlyOptions = {
    chart: {
        parentHeightOffset: 0,
        toolbar: { show: false }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    states: {
        hover: {
            filter: { type: 'none' }
        },
        active: {
            filter: { type: 'none' }
        }
    },
    xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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

const defaultChartData = [37, 57, 45, 75, 57, 40, 65];
const yearlyChartData = [30, 20, 190];
const monthlyChartData = [30, 203, 30];

export default function Overview() {
    const [type, setType] = useState('Tuần');
    let chartData;
    let chartOptions = defaultOptions;
    switch (type) {
        case 'Năm':
            chartData = yearlyChartData;
            chartOptions = yearlyOptions;
            break;
        case 'Tháng':
            chartData = monthlyChartData;
            chartOptions = monthlyOptions;
            break;
        case 'Tuần':
            chartData = defaultChartData;
            chartOptions = defaultOptions;
            break;
    }

    const extendOptions = {
        chart: {
            toolbar: { show: true }
        },
        dataLabels: { enabled: true },
        xaxis: {
            categories: chartOptions.xaxis.categories,
            labels: { show: true },
            axisTicks: { show: true },
            axisBorder: { show: true }
        },
    }

    const [extend, isExtend] = useState(false);
    const chartHeight = extend ? 440 : 205;
    const options = extend ? extendOptions : chartOptions;
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
            <Card title={"Lợi nhuận"} extend={extend} setType={setType}>
                <Chart type='bar' height={chartHeight} options={options} series={[{ data: chartData }]} />
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