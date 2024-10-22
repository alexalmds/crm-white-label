/**
 * [COMPONENTE DA TABELA DO NEXTUI]
 * Componentizado seguindo modelo da documentação.
 * Não alterar nenhuma funcionalidade, a menos que necessário
 * 
 * (item) => {
 *  neste caso é os dados recebidos do uso da tabela. Note que todos os dados devem ser genéricos, como nome, id, status, data, entre outros
 * }
 */



import React from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { capitalize } from "@/utils";

interface ActionItem {
  label: string;
  onClick: () => void;
}

interface DynamicTableProps {
  columns: Array<{ uid: string; name: string; sortable?: boolean }>;
  data: Array<any>; // Replace 'any' with a more specific type if you have one
  statusColorMap?: Record<string, ChipProps["color"]>;
  initialVisibleColumns?: string[];
  rowsPerPageOptions?: number[];
  actionItems?: (item: any) => ActionItem[];
  onAddNew?: () => void;
}



const INITIAL_VISIBLE_COLUMNS = ["actions"];

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  statusColorMap = {
    ativo: "success",
    inativo: "danger",
    pendente: "warning",
  },
  initialVisibleColumns = INITIAL_VISIBLE_COLUMNS,
  rowsPerPageOptions = [5, 10, 15],
  actionItems,
  onAddNew
}) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(initialVisibleColumns));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0] || 5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: columns[0]?.uid || 'id',
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  


  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);


  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];
  
    // Filtro de pesquisa
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return Object.values(item).some((value) =>
          typeof value === 'string' && value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    }
  
    // Filtro de status, garantindo que o status seja único
    if (statusFilter !== "all" && Array.from(statusFilter).length) {
      const uniqueStatuses = new Set(); // Armazena os status únicos
  
      filteredData = filteredData.filter((item) => {
        const { status } = item;
        if (!uniqueStatuses.has(status) && Array.from(statusFilter).includes(status)) {
          uniqueStatuses.add(status); // Adiciona status ao Set se ele ainda não estiver presente
          return true; // Mantém este item na filtragem
        }
        return false; // Ignora este item se o status já estiver no Set
      });
    }
  
    return filteredData;
  }, [data, filterValue, statusFilter]);
  

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const column = sortDescriptor?.column as keyof typeof a; // Garantindo que a coluna exista

      if (!column) {
        return 0; // Se a coluna não for válida, retorna 0 (não altera a ordem)
      }

      const first = a[column];
      const second = b[column];

      // Caso a ou b sejam undefined ou nulos, trata-os como 0 ou valor padrão
      const firstValue = first ?? "";
      const secondValue = second ?? "";

      const cmp = firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
      case "usuario":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.avatar }}
            description={item.email}
            name={cellValue}
          >
            {item.email}
          </User>
        );
      case "status":
        const normalizedStatus = item.status.toLowerCase(); // Normalizando o valor de status
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.status]} // Utilizando o status normalizado
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        const actions = actionItems ? actionItems(item) : []; // Obtém as ações para o item
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {actions.map((action: any, index: any) => (
                  <DropdownItem key={index} onClick={action.onClick}>
                    {action.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procurar pelo nome..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {data.map((status, index) => (
                  <DropdownItem key={index} className="capitalize">
                    {status.status} {/* Mostra o status diretamente no dropdown */}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onClick={onAddNew}>
              Adicionar novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {data.length} items</span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por pág.
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Próxima
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Nenhum item encontrado!"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;

