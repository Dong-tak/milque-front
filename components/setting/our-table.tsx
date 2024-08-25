import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface SocialTableProps {
  tableheader: string[];
  arrowupdown?: boolean[];
  contentData: { content: string[] | Element }[];
}

const TableRowComponent = ({ content }: { content: string[] | Element }) => (
  <TableRow>
    {(Array.isArray(content) ? content : []).map((item, index) => (
      <TableCell key={index}>{item}</TableCell>
    ))}
  </TableRow>
);

export function AccountTable({
  tableheader = [],
  arrowupdown = [],
  contentData,
}: SocialTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-12 border-t bg-[#f8fafc]">
          {tableheader.map((header, index) => (
            <TableHead key={index} className="items-center justify-start">
              <div className="flex items-center justify-start gap-2">
                {header}
                <button className="items-center justify-center">
                  {arrowupdown[index] ? (
                    <ArrowUpDown className="relative h-4 w-4" />
                  ) : null}
                </button>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {contentData.map((data, index) => (
          <TableRowComponent key={index} content={data.content} />
        ))}
      </TableBody>
    </Table>
  );
}
