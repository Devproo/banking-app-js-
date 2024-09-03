import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react';

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });
  if (!accounts) return;
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
          title='Transactions History'
          subtext='Bank details & transactions'
        />
      </div>
      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-18 text-white'>
              {account?.data.name}
            </h2>
            <p className='text-blue-25 text-14'>{account?.data.officialName}</p>
            <p className='text-14 font-semibold text-white tracking=[1.1px]'>
              ●●●● ●●●● ●●●●{' '}
              <span className='text-16'>{account?.data.mask}</span>
            </p>
          </div>
        </div>
        <section className='flex flex-col w-full gap-6'>
          <TransactionsTable transactions={account?.currentTransactions} />
          {totalPages > 1 && (
            <div className='my-4 w-full'>
              <Pagination page={currentPage} totalPages={totalPages} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
