/* eslint-disable no-unused-vars */

import { Card, Button, CardHeader, Typography } from "@material-tailwind/react";
import { useGetSRDiscountSalesQuery } from "../../../../redux/services/salesreportApi";
import { useState } from "react";
import * as XLSX from "xlsx";
import Datepicker from "react-tailwindcss-datepicker";
import moment from 'moment';

const ItemSales = () => {
  const [params, setParams] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const discountSalesQuery = useGetSRDiscountSalesQuery({
    start_date : params?.startDate,
    end_date : params?.endDate,
  });
  const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setParams(newValue);
  };
  const head = [
    {
      name: "Discount Name",
      cell: (row) => <div className="w-64 break-words">{row.discount_names}</div>,
    },
    {
      name: "Jumlah Produk",
      cell: (row) => row.jumlah,
    },
    {
      name: "Gross Sales",
      cell: (row) => <div className="text-right">Rp. {row.gross_sales.toLocaleString('id-ID')},-</div>
    }
  ];
  
  const start_date = moment(params?.startDate).format('D MMM YYYY')
  const end_date = moment(params?.endDate).format('D MMM YYYY')
  
  const rows = discountSalesQuery?.data?.data?.rows.length > 0 ? discountSalesQuery?.data?.data?.rows : [{discount_names : "-", jumlah : "0", gross_sales : "0"}];


  // Ubah rows menjadi array dengan nama kolom di indeks pertama
  const transformedRows = [["Laporan Pertanggal : " + start_date +" - "+ end_date],["Discount Name", "Jumlah", "Gross Sales"], ...rows.map(item => [item.discount_names, item.jumlah, item.gross_sales])];
  const createExcelFile = () => {
    // Data yang ingin Anda tambahkan ke file Excel
    const data =  transformedRows;

    // Buat objek workbook dan worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Tambahkan worksheet ke workbook dengan nama "Data"
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Simpan workbook sebagai file Excel
    XLSX.writeFile(wb, `Discount Sales Report ${start_date} - ${end_date} _ ${moment().format("DDHHmmss")}.xlsx`);
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
              Discount Sales
            </Typography>
          </div>
          <hr className="pt-[1px] bg-gray-700"/>
          <div className="overflow-y-scroll w-full h-[50vh]">
          <table id="table" className=" mt-4 w-64 min-w-max table-auto text-center">
            {/* HEADER TABLE */}
            <thead className="border-blue-gray-500">
              <tr className="text-center">
                {head.map((col, index_col) => (
                  <th
                    key={index_col}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      {col.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {/* BODY TABLE */}
            <tbody>
              {rows?.map((row, index) => {
                const isLast = index === rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index} className="text-center">
                    {head.map((col, index_col) => (
                      <td className={classes} key={index_col}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {col.cell(row) || "-"}
                          </Typography>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ItemSales;
