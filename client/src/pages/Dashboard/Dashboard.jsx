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

import Datepicker from "react-tailwindcss-datepicker";
import moment from 'moment';


const Dashboard = () => {
  const [params, setParams] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });
  const handleValueChange = selectedDate => {
    setParams({
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
    });
  };
  
  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <HeaderComponent />
          <Datepicker value={params} onChange={handleValueChange} />
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
