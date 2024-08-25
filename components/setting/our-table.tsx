import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  GoodTag,
  WarningTag,
  StopTag,
  NewTag,
  RecommendTag,
  HotTag,
  PrivateTag,
  PublicTag,
} from "../our-status-tag";
import { SocialTag } from "../our-social-tag";

const invoices = [
  {
    media: (
      <SocialTag
        size="default"
        logo="/social-media/icon-youtube.png"
        social="youtube"
      />
    ),
    account: "velroylee669",
    scrap: "2,182",
    status: <GoodTag />,
  },
  {
    media: (
      <SocialTag
        size="default"
        logo="/social-media/icon-linkedin.png"
        social="linkedin"
      />
    ),
    account: "539639259",
    scrap: "2,182",
    status: <GoodTag />,
  },
  {
    media: (
      <SocialTag
        size="default"
        logo="/social-media/icon-instagram.png"
        social="instagram"
      />
    ),
    account: "vel_030_roy",
    scrap: "2,182",
    status: <StopTag />,
  },
  {
    media: (
      <SocialTag
        size="default"
        logo="/social-media/icon-instagram.png"
        social="instagram"
      />
    ),
    account: "mileque_contact",
    scrap: "2,182",
    status: <GoodTag />,
  },
  {
    media: (
      <SocialTag
        size="default"
        logo="/social-media/icon-messenger.png"
        social="messenger"
      />
    ),
    account: "100004859553991",
    scrap: "31",
    status: <WarningTag />,
  },
];

interface SocialTableProps {
  tableheader_1: string;
  tableheader_2: string;
  tableheader_3: string;
  tableheader_4: string;
  arrowupdown_1?: boolean;
  arrowupdown_2?: boolean;
  arrowupdown_3?: boolean;
  arrowupdown_4?: boolean;
}

export function AccountTable({
  tableheader_1,
  tableheader_2,
  tableheader_3,
  tableheader_4,
  arrowupdown_1,
  arrowupdown_2,
  arrowupdown_3,
  arrowupdown_4,
}: SocialTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-12 border-t bg-[#f8fafc]">
          <TableHead className="items-center justify-start">
            <div className="flex items-center justify-start gap-2">
              {tableheader_1}
              <button className="items-center justify-center">
                {arrowupdown_1 ? (
                  <ArrowUpDown className="relative h-4 w-4" />
                ) : null}
              </button>
            </div>
          </TableHead>
          <TableHead className="items-center justify-start">
            <div className="flex items-center justify-start gap-2">
              {tableheader_2}
              <button className="items-center justify-center"></button>
            </div>
          </TableHead>
          <TableHead className="items-center justify-start">
            <div className="flex items-center justify-start gap-2">
              {tableheader_3}
              <button className="items-center justify-center">
                {arrowupdown_3 ? (
                  <ArrowUpDown className="relative h-4 w-4" />
                ) : null}
              </button>
            </div>
          </TableHead>
          <TableHead className="items-center justify-start">
            <div className="flex items-center justify-start gap-2">
              {tableheader_4}
              <button className="items-center justify-center">
                {arrowupdown_4 ? (
                  <ArrowUpDown className="relative h-4 w-4" />
                ) : null}
              </button>
            </div>
          </TableHead>
          <TableHead className="text-right"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.media}>
            <TableCell className="font-medium">{invoice.media}</TableCell>
            <TableCell>{invoice.account}</TableCell>
            <TableCell>{invoice.scrap}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right">
              <button className="justify-end">
                <MoreHorizontal />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
