import { Card } from "@material-tailwind/react";
import { useGetCountTransactionDashboardQuery } from "../../../redux/services/dashboardApi";

const CountTransactionComponent = ({params}) => {
    const countTransactionQuery = useGetCountTransactionDashboardQuery({
        id_outlet: params.id_outlet,
        start_date: params.start_date,
        end_date: params.end_date,
    });
    let countTransaction = countTransactionQuery?.data?.data?.count_transaction ? countTransactionQuery?.data?.data?.count_transaction : 0;
    return (
        <>
        <Card className="border border-gray-500 rounded p-5">
            <div className="mb-8">
                <div className="text-gray-700  text-md mb-2">Transaction</div>
                <p className="text-gray-900 font-bold text-xl leading-none">
                    {countTransaction}
                </p>
            </div>
        </Card>
        </>
    );
};

export default CountTransactionComponent;
