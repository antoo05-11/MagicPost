import Chart from "react-apexcharts";
import style from "@/css/components/chart.module.css"
const data = [
    {
        series: [{
            name: 'Hàng gửi',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Hàng nhận',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            title: {
                text: 'Điểm giao dịch',
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 10,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            chart: {
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },

            },
            legend: {
                show: false,
            },
        },
    },
    {
        series: [{
            name: 'Hàng gửi',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Hàng nhận',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            title: {
                text: 'Điểm tập kết',
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 10,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            chart: {
                type: 'area',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },

            },
            legend: {
                show: false,
            },
        },
    },
];

export default function DemoChart() {
    return (
        <div className={style.container}>
            {data.map((chartData, index) => (
                <Chart
                    key={index}
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height="250"
                />
            ))}
        </div>
    )
}