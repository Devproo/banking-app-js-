import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from '@/lib/utils';
import { date } from 'zod';
import { transactionCategoryStyles } from '@/constants';

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('rounded-full size-2', backgroundColor)} />
      <p className={cn('text-[12] font-medium', textColor)}>Category</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className='px-2'>Tarnsactions</TableHead>
          <TableHead className='px-2'>Amount</TableHead>
          <TableHead className='px-2'>Status</TableHead>
          <TableHead className='px-2'>date</TableHead>
          <TableHead className='px-2 max-md:hidden'>Channel</TableHead>
          <TableHead className='px-2 max-md:hidden'>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const ammount = formatAmount(t.amount);
          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit';
          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || ammount[0] === '-' ? 'bg-[#fffbfa]' : 'bg-[#f6fef9]'
              } !over:bg-none !border-b-default`}
            >
              <TableCell className='max-w-[250px] pl-2 pr-10'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-14 truncate  font-semibold  text-[#344054]'>
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || ammount[0] === '-'
                    ? 'text-[#f04438]'
                    : 'text-[#039855]'
                }`}
              >
                {isDebit ? `-${ammount}` : isCredit ? ammount : ammount}
              </TableCell>
              <TableCell className='pl-2 pr-10'>
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className='min-w-32 pl-2 pr-10'>
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className='capitalize min-w-32 pl-2 pr-10'>
                {t.paymentChannel}
              </TableCell>
              <TableCell className='pl-2 pr-10 max-md:hidden'>
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
