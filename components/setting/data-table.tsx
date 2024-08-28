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
import { NewTag } from "@/components/our-status-tag";
import { any, string } from "zod";
import { Column, Row } from "@tanstack/react-table";

interface DataTableProps {
  tableheader: { title: string; accessor: string; sort: boolean }[];
  contentData: {
    type?: { name: string; tag: boolean };
    contents?: { title: string; content: string; button: boolean };
    [key: string]: any; // 추가 속성을 허용
  }[];
  header?: boolean;
  footer?: boolean;
  checkbox?: boolean;
}

export function TestDataTable({
  tableheader,
  contentData,
  header = true,
  footer = true,
  checkbox = false,
}: DataTableProps) {
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
        console.log("row.original:", row.original);
        console.log("header.accessor:", header.accessor);
        const cellValue = row.original[header.accessor];
        console.log(cellValue);
        // 'contents'라는 accessor에 대한 처리
        if (typeof cellValue === "object" && cellValue?.title) {
          const { title, content, button } = cellValue;
          console.log(cellValue);
          return (
            <div className="flex items-center justify-center">
              <div className="text-black">
                {cellValue.title && <div>{title}</div>}
                {cellValue.content && <div>{content}</div>}
              </div>
              {button && (
                <Button
                  variant="default" // 버튼 스타일은 필요에 따라 수정 가능ㅇ
                  className="ml-2"
                >
                  확인하기
                </Button>
              )}
            </div>
          );
        }

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

    //삭제 메뉴
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                삭제하기
              </DropdownMenuItem>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  //체크 박스가 true일 경우 체크박스 컬럼을 추가
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
    <div className="w-full">
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
          <TableHeader>
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
