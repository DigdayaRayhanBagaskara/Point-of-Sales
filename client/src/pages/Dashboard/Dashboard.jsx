import {
  Card, Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import GrossSalesComponent from "./Component/GrossSalesComponent";
import NetSalesComponent from "./Component/NetSalesComponent";
import CountTransactionComponent from "./Component/CountTransactionComponent";
import HeaderComponent from "./Component/HeaderComponent";
import HourlyGrossSalesAmountComponent from "./Component/HourlyGrossSalesAmountComponent";
import TopItemComponent from "./Component/TopItemComponent";
import TopItemByVolumeComponent from "./Component/TopItemByVolumeComponent";
import TopItemBySalesComponent from "./Component/TopItemBySalesComponent";

const Dashboard = () => {
  // Get Data
  const [params, setParams] = useState({
    id_outlet: 1,
    start_date: "2023-09-01 00:00:00",
    end_date: "2023-09-30 00:00:00",
  });

  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <HeaderComponent />
          <div className="ml-4">
              <Typography variant="h6" color="gray">
              SALES SUMMARY
              </Typography>
          </div>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
              <GrossSalesComponent params = {params} />
              <NetSalesComponent params = {params}  />
              <CountTransactionComponent params = {params} />
          </div>
          <HourlyGrossSalesAmountComponent  params = {params} />
          <div className="ml-4">
              <Typography variant="h6" color="gray">
              TOP ITEM
              </Typography>
          </div>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 m-5">
              <TopItemByVolumeComponent params = {params} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 m-5">
              <TopItemComponent params = {params} />
              <TopItemBySalesComponent params = {params} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
