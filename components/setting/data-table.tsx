"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { ArrowUpDown, Settings2, PlusCircle } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  NewTag,
  PublicTag,
  PrivateTag,
  GoodTag,
  HotTag,
  RecommendTag,
  StopTag,
  WarningTag,
} from "@/components/our-status-tag";
import { Column, Row } from "@tanstack/react-table";
import Image from "next/image";
import { SocialTag } from "../our-social-tag";
import { DropDownArrow } from "./dropdown-arrow";

interface DataTableProps {
  tableheader: { title: string; accessor: string; sort: boolean }[];
  contentData: {
    type?: { name: string; tag: boolean };
    contents?: {
      profile?: string;
      title?: string;
      content: string | object;
      button?: boolean;
      socials?: [];
      status?:
        | "New"
        | "Public"
        | "Private"
        | "Good"
        | "Hot"
        | "Recommend"
        | "Stop"
        | "Warning"
        | "Default";
      authority?: string;
      dropdownarrow?: { title: string; ridioitem: [] };
    };
    [key: string]: any;
  }[];
  header?: boolean;
  footer?: boolean;
  checkbox?: boolean;
  profileClassName?: string;
  menuItems: { label: string; onClick: () => void }[];
}

export function SettingDataTable({
  tableheader,
  contentData,
  header = true,
  footer = true,
  checkbox = false,
  profileClassName,
  menuItems = [],
}: DataTableProps) {
  // 상태 태그 컴포넌트 렌더링
  const renderStatusTag = (status: string) => {
    switch (status) {
      case "Good":
        return <GoodTag />;
      case "Warning":
        return <WarningTag />;
      case "Stop":
        return <StopTag />;
      case "New":
        return <NewTag logo={true} />;
      case "Recommend":
        return <RecommendTag />;
      case "Hot":
        return <HotTag />;
      case "Private":
        return <PrivateTag />;
      case "Public":
        return <PublicTag />;
      default:
        return null;
    }
  };

  //체크박스 컬럼
  const checkboxColumn: ColumnDef<any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  // 테이블 컬럼
  const columns: ColumnDef<any>[] = [
    ...tableheader.map((header) => ({
      accessorKey: header.accessor,
      header: header.sort
        ? ({ column }: { column: Column<any> }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {header.title}
              <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
            </Button>
          )
        : header.title,
      cell: ({ row }: { row: Row<any> }) => {
        let cellValue = row.original[header.accessor];
        console.log("cellValue:", cellValue);
        console.log("row.original:", row.original); // 알림 설정 {type: {…}, contents: {…}, date: '23.07.24 18:33'}
        console.log("header.accessor:", header.accessor); //contents

        // 'contents'라는 accessor에 대한 처리
        if (typeof cellValue === "object" && cellValue?.content) {
          const { title, content, button, profile } = cellValue;

          return (
            <div className="p-padding-py-4 font-othersmedium-button relative box-border flex w-full flex-1 grid-cols-3 flex-row items-center justify-between gap-2.5 text-left text-sm text-black">
              <div className="flex items-center gap-[10px]">
                {/* profile이 있을 경우 이미지 출력 */}
                {profile && (
                  <Image
                    src={profile || "/images/avatar.png"} // profile 속성 없을 경우 기본 이미지 사용
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className={`${profileClassName}h-9 w-9`}
                  />
                )}
                <div className="">
                  {title && <p className="m-0 font-extrabold">{title}</p>}
                  <p className="m-0">
                    {/* content가 문자열인지 객체인지 확인하고, 객체인 경우 JSON.stringify를 사용하여 출력 */}
                    {typeof content === "object"
                      ? JSON.stringify(content)
                      : content}
                  </p>
                </div>
              </div>
              {/* button이 true일 경우 버튼 출력 */}
              {button && (
                <Button variant="default" className="ml-2">
                  확인하기
                </Button>
              )}
            </div>
          );
        }
        //만약 props에 socials가 있을 경우 SocialTag 컴포넌트로 렌더링
        if (typeof cellValue === "object" && cellValue?.social) {
          const { size, social, logo } = cellValue;

          return (
            <div className="flex items-center gap-[10px]">
              <SocialTag size={size} social={social} logo={logo} />
            </div>
          );
        }
        //만약 props에 status가 있을 경우 상태 태그 컴포넌트로 렌더링

        // status 컬럼에 대한 처리
        if (header.accessor === "status" && cellValue) {
          return (
            <div className="status-class">{renderStatusTag(cellValue)}</div>
          );
        }
        //만약 props에 dropdownarrow가 있을 경우 DropDownArrow 컴포넌트로 렌더링
        if (header.accessor === "dropdownarrow" && cellValue) {
          const { title, ridioitem } = cellValue;
          return (
            <div>
              <DropDownArrow title={title} ridioitem={ridioitem} />
            </div>
          );
        }

        //만약 props에 type이 있을 경우 NewTag 컴포넌트로 렌더링
        return (
          <div className="flex gap-[10px]">
            {typeof cellValue === "object" && cellValue?.name ? (
              <>
                {cellValue.name}
                {cellValue.tag && <NewTag logo={false} />}
              </>
            ) : (
              row.getValue(header.accessor)
            )}
          </div>
        );
      },
    })),

    // 삭제 메뉴
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<any> }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-radius-md p-padding-py-2 relative box-border flex w-full flex-row items-center justify-end"
              >
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="relative h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {menuItems.map((item, index) => (
                <DropdownMenuItem key={index} onClick={item.onClick}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // 체크박스가 true일 경우 체크박스 컬럼을 추가
  if (checkbox) {
    columns.unshift(checkboxColumn);
  }

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: contentData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full min-w-[758px]">
      {/* 헤더가 true일 경우 보이게 */}
      {header && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-[6px]">
            <Input
              placeholder="Filter tasks..."
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("type")?.setFilterValue(event.target.value)
              }
              className="w-max-[] inline-flex h-full flex-col items-start justify-start gap-1.5"
            />
            <Button className="h-full gap-2 border-2 border-dotted bg-background font-['Inter'] text-xs font-medium leading-tight text-slate-950 hover:bg-slate-200">
              <PlusCircle className="h-4 w-4" /> 안읽은 알림
            </Button>
            <Button className="h-full gap-2 border-2 border-dotted bg-background font-['Inter'] text-xs font-medium leading-tight text-slate-950 hover:bg-slate-200">
              <PlusCircle className="h-4 w-4" />
              Priority
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings2 className="h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {/* 헤더 끝 */}

      {/* 테이블 */}
      <div className="flex border-y">
        <Table>
          <TableHeader className="bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* 테이블 끝 */}

      {/* 풋터가 true일 경우 보이게 */}
      {footer && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {/* 풋터 끝 */}
    </div>
  );
}
