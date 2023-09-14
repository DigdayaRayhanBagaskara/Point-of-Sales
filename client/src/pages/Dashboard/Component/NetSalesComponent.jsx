import { Card } from "@material-tailwind/react";
import { useGetNetSalesDashboardQuery } from "../../../redux/services/dashboardApi";

const NetSalesComponent = ({params}) => {
    const netSalesQuery = useGetNetSalesDashboardQuery({
        id_outlet: params.id_outlet,
        start_date: params.start_date,
        end_date: params.end_date,
    });
    let netSales = netSalesQuery?.data?.data?.net_sales ? netSalesQuery?.data?.data?.net_sales?.toLocaleString('id-ID') : 0;
    return (
        <>
        <Card className="border border-gray-500 rounded p-5">
            <div className="mb-8">
                <div className="text-gray-700  text-md mb-2">Net Sales</div>
                <p className="text-gray-900 font-bold text-xl leading-none">
                Rp. {netSales},-
                </p>
            </div>
        </Card>
        </>
    );
};

export default NetSalesComponent;
