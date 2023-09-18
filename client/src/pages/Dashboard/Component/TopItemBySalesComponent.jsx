import { Card, Image } from "@material-tailwind/react";
import { useGetTopItemBySalesDashboardQuery } from "../../../redux/services/dashboardApi";
import Table from "./TableComponent";

const TopItemBySalesComponent = ({params}) => {
    const topItemBySalesQuery = useGetTopItemBySalesDashboardQuery({
        id_outlet: params.id_outlet,
        start_date:  params?.startDate,
        end_date: params?.endDate,
    });
    const TABLE_HEAD = [
        {
          name: "Nama Produk",
          cell: (row) => <div className="w-16">{row.produk_name}</div>,
        },
        {
          name: "Jumlah Penjualan",
          cell: (row) => 'Rp. ' + row.jumlah.toLocaleString('id-ID') + ',-',
        },
        {
          name: "Gambar Produk",
          cell: (row) => <img
          className="h-[15vh] w-[15vh] object-cover object-center"
          src={row.gambar_produk}
          alt=""
        />,
        }
      ];
    const rows = topItemBySalesQuery?.data?.data.length ? topItemBySalesQuery?.data?.data : [{produk_name : "-", jumlah : "0"}]
    return (
        <>
        <Card className="border border-gray-500 rounded p-5">
            <div className="mb-2">
                <div className="text-gray-700  text-md mb-2">CATEGORY BY SALES</div>
                <p className="text-gray-900 font-bold text-xl leading-none">
                <Table head={TABLE_HEAD} rows={rows} />
                </p>
            </div>
        </Card>
        </>
    );
};

export default TopItemBySalesComponent;
