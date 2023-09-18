/* eslint-disable no-unused-vars */

import { Card, Button, CardHeader, Typography } from "@material-tailwind/react";
import { useGetSRGrossProfitQuery } from "../../../../redux/services/salesreportApi";
import { useState } from "react";
import * as XLSX from "xlsx";
import Datepicker from "react-tailwindcss-datepicker";
import moment from 'moment';

const GrossProfit = () => {
  const [params, setParams] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const grossProfitQuery = useGetSRGrossProfitQuery({
    start_date : params?.startDate,
    end_date : params?.endDate,
  });
  const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setParams(newValue);
  };

  const  data = grossProfitQuery?.data?.data?.rows || [];
  const rows = [
    { name: "Gross Sales", isi: data[0]?.gross_sales ? data[0]?.gross_sales : 0 },
    { name: "Discount", isi : data[0]?.discount ?  data[0]?.discount : 0 },
    { name: "Modal", isi : data[0]?.modal ?  data[0]?.modal : 0 },
    { name: "Profit", isi: data[0]?.profit ?  data[0]?.profit : 0 },
  ]

  const start_date = moment(params?.startDate).format('D MMM YYYY')
  const end_date = moment(params?.endDate).format('D MMM YYYY')
  // Ubah rows menjadi array dengan nama kolom di indeks pertama
  const transformedRows = [["Laporan Pertanggal : " + start_date +" - "+ end_date],[rows[0].name,rows[0].isi],[rows[1].name,rows[1].isi],[rows[2].name,rows[2].isi],[rows[3].name,rows[3].isi]];
  const createExcelFile = () => {
    // Data yang ingin Anda tambahkan ke file Excel
    const data =  transformedRows;

    // Buat objek workbook dan worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Tambahkan worksheet ke workbook dengan nama "Data"
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Simpan workbook sebagai file Excel
    XLSX.writeFile(wb, `Gross Profit Report ${start_date} - ${end_date} _ ${moment().format("DDHHmmss")}.xlsx`);
  };
  return (
    <>
      <Card className="border border-gray-500 p-2 rounded h-full w-full">
      <div className="flex gap-2">
        <Datepicker value={params} onChange={handleValueChange} />
        <Button className=" bg-green-900" onClick={createExcelFile}>Export </Button>
      </div>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="h5" color="blue-gray">
              Gross Profit
            </Typography>
          </div>
          <hr className="pt-[1px] bg-gray-700"/>
          <table className="w-full min-w-max table-auto text-left">
            <tbody>
              {rows.map(({ name,isi }, index) => {
                const classes = index === rows.length - 2 ? "p-2 border-b border-gray-700" : "p-2 border-b";
                const textClasses = index === rows.length - 1 ? "font-bold border-b-none" : "font-normal";
      
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={textClasses}
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className={`${textClasses} text-right`}>
                        Rp. {isi.toLocaleString('id-ID')} ,-
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardHeader>
      </Card>
    </>
  );
};

export default GrossProfit;
