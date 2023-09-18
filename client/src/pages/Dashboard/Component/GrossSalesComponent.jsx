import { Card } from "@material-tailwind/react";
import { useGetGrossSalesDashboardQuery } from "../../../redux/services/dashboardApi";

const GrossSalesComponent = ({params}) => {
    const grossSalesQuery = useGetGrossSalesDashboardQuery({
        start_date:  params?.startDate,
        end_date: params?.endDate,
    });
    let grossSales = grossSalesQuery?.data?.data?.gross_sales ? grossSalesQuery?.data?.data?.gross_sales.toLocaleString('id-ID') : 0;
    return (
        <>
        <Card className="border border-gray-500 rounded p-5">
            <div className="mb-8">
                <div className="text-gray-700  text-md mb-2">Gross Sales</div>
                <p className="text-gray-900 font-bold text-xl leading-none">
                Rp. {grossSales},-
                </p>
            </div>
        </Card>
        </>
    );
};

export default GrossSalesComponent;
