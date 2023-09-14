import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { useGetHourlyGrossSalesAmountDashboardQuery } from '../../../redux/services/dashboardApi';
import { Card } from '@material-tailwind/react';

const HourlyGrossSalesAmountComponent = () => {
    ChartJs.register(CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

    const x = useGetHourlyGrossSalesAmountDashboardQuery()?.data?.data;
    const grossSales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Mengisi nilai grossSales sesuai dengan jam yang sesuai
    for (const key in x) {
        const index = parseInt(key) - 1;
        if (index >= 0 && index < grossSales.length) {
            grossSales[index] = x[key];
        }
    }

    const data = {
        labels: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
            "20", "21", "22", "23"
        ],
        datasets: [
            {
                label: 'Gross Sales',
                data: grossSales,
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    // Atur padding dengan options pada chart
    const options = {
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        },
    };

    return (
        <Card className="grid grid-col mt-5 sm:ml-5 sm:mb-5 sm:mr-5  md:ml-20 md:mb-20 md:mr-20  lg:ml-50 lg:mb-50 lg:mr-50">
            <center className='mb-2'><h2>Hourly Gross Sales Amount</h2></center>
            <hr />
            <Line data={data} options={options} />
        </Card>
    );
};

export default HourlyGrossSalesAmountComponent;
