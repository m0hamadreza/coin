import Image from "next/image";
import { Coin } from "@/types/types";
interface ContentTableProps {
  data: Coin[];
}

const ContentTable = ({ data }: ContentTableProps) => {
  return (
    <table className="m-auto w-[90%] h-[70vh] border-collapse">
      <tr className="h-[48px]">
        <th>COINS</th>
        <th>PRICE</th>
        <th>24H</th>
        {/* <th>7D</th> */}
        <th>MARKET CAP</th>
        <th>TOTAL VOLUME</th>
        <th>CIRCULATING SUPPLY</th>
      </tr>
      {data.map((item: Coin) => {
        return (
          <tr
            key={item.id}
            className=" text-center h-[48px] border-b-[1px] border-solid border-b-gray-500"
          >
            <td className="flex justify-start h-[48px] items-center ">
              <Image
                className="mr-2"
                width={20}
                height={20}
                src={item.image}
                alt={item.id}
              />{" "}
              {item.id}
            </td>
            <td>
              {item.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td
              className={`${
                item.price_change_24h && item.price_change_24h > 0
                  ? " text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.price_change_24h &&
                item.price_change_24h.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </td>
            {/* <td>7D</td> */}
            <td>
              {item.market_cap.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td>
              {item.total_volume.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td>{item.circulating_supply}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default ContentTable;
