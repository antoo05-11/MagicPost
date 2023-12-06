import React from 'react';
import Card from "@/components/demoCard/card";
import Chart from 'react-apexcharts';
import { Button } from 'react-bootstrap';

const data = {
    series: [{
        name: 'Hàng gửi',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'Hàng nhận',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
}

const options = {
    chart: {
        width: 380,
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
            formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
        }
    }

};

export default function StatisticTransPoint() {
    return (
        <Card title={"Điểm giao dịch"}>
            <Chart type='area' options={options} height={205} series={data.series} />
            <p>
                Your sales performance is 45% 😎 better compared to last month
            </p>
            <Button>Chi tiết</Button>
        </Card>
    );
}
