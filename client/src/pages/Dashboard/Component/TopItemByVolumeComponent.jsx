import { Card } from "@material-tailwind/react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';
import { useGetTopItemByVolumeDashboardQuery } from "../../../redux/services/dashboardApi";

const TopItemByVolumeComponent = ({params}) => {
    const topItemByVolumeQuery = useGetTopItemByVolumeDashboardQuery({
        id_outlet: params.id_outlet,
        start_date:  params?.startDate,
        end_date: params?.endDate,
    });
    ChartJs.register( ArcElement, Tooltip, Legend); 
    const x = topItemByVolumeQuery?.data?.data || 0 ;
    let produk_name = [];
    let jumlah = [];
    if(x != 0){
      for(let i in x){
        produk_name.push(x[i].produk_name)
        jumlah.push(x[i].jumlah)
      }
    }else{
      produk_name.push("-")
      jumlah.push(1)
    }
    const data = {
      labels: produk_name,
      datasets: [{
        label: 'Jumlah Penjualan',
        data: jumlah,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
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
        <>
        <Card className="border border-gray-500 rounded p-5">
            <div className="text-gray-700 text-md mb-2">CATEGORY BY VOLUME</div>
          <div className="flex flex-col items-center justify-center">
            <div style={{ width: '95%', maxWidth: '500px' }}>
              <Pie data={data} options={options} />
            </div>
          </div>
        </Card>

        </>
    );
};

export default TopItemByVolumeComponent;
