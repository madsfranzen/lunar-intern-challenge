import * as React from 'react';
import styled from 'styled-components';
import { useTransactionsQuery } from './get_transactions';
import { DeleteTransactionButton } from '../../framework/components/DeleteTransactionButton';
import { SearchBar } from '../../framework/components/SearchBar';

type TransactionsProps = {
	userId: string;
};

export const Transactions = ({ userId }: TransactionsProps) => {

	const { data, loading, error } = useTransactionsQuery({
		variables: {
			userId,
		},
	});

	const [searchQuery, setSearchQuery] = React.useState('');

	const [sortOrder, setSortOrder] = React.useState<'none' | 'newest' | 'oldest'>('none');

	const toggleSort = () => {
		setSortOrder(prev => {
			if (prev === 'none') return 'newest';
			if (prev === 'newest') return 'oldest';
			return 'none';
		});
	};

	if (loading && !data) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred 😭</div>;
	}

	// Always filtering out deleted transactions so that they:
	// 1. Don't show up in table
	// 2. Don't impact sorting even though they are "deleted"
	// 3. Don't impact search
	let transactions = (data?.transactions || []).filter(tx => !tx.deleted);

	// Filter transactions by searchQuery
	transactions = transactions.filter(tx => tx.localizableTitle.toLowerCase().includes(searchQuery.toLowerCase()));

	if (sortOrder === 'newest') {
		transactions.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
	} else if (sortOrder === 'oldest') {
		transactions.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	}

	return (
		<StyledCard>
			<SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search by title...' />
			<StyledTable>
				<StyledTableHeader>
					<tr>
						<th>Icon</th>
						<th>Type</th>
						<th>Title</th>
						<th>Amount</th>
						<SortableHeader onClick={toggleSort}>
							<span>Time
								<span>
									{sortOrder === 'newest' ? '⬇️' : sortOrder === 'oldest' ? '⬆️' : '↕️'}
								</span>
							</span>
						</SortableHeader>
						<th>Status</th>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</StyledTableHeader>
				<tbody>
					{transactions
						.map(transaction => (
							<StyledTransaction key={transaction.id}>
								<td>
									<img src={transaction.iconURL} alt=""
										onError={(e) => {
											e.currentTarget.src = 'https://www.svgrepo.com/show/451131/no-image.svg'
										}} />
								</td>
								<td>{transaction.type}</td>
								<td>{transaction.localizableTitle}</td>
								<td>
									{transaction.billingAmount.amount}
									{transaction.billingAmount.currency}
								</td>
								<td>{new Date(transaction.time).toLocaleString()}</td>
								<td>{transaction.status}</td>
								<td>
									<img src={transaction.categoryIconUrl} alt="" />
								</td>
								<td>
									{transaction.status === "authorization" &&
										<DeleteTransactionButton transaction={transaction} />}
								</td>
							</StyledTransaction>
						))}
				</tbody>
			</StyledTable>
		</StyledCard>
	);
};

const StyledTable = styled.table`
  width: 100%;
  position: relative;
  border-collapse: collapse;

  td {
	border-bottom: 1px solid ${({ theme }) => theme.surfaceStroke};
    padding: 8px;
  }

  th {
    padding: 8px;
  }
`;

const StyledTableHeader = styled.thead`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textInvert};

  th {
    text-align: left;
    padding: 12px 8px;
    border-right:  2px solid ${({ theme }) => theme.surfaceStroke};
    border-bottom: 2px solid ${({ theme }) => theme.surfaceStroke};
  }

    th:first-child {
    border-top-left-radius: 8px;
  }

  th:last-child {
    border-top-right-radius: 8px;
	border-right: none;
  }
`;

const SortableHeader = styled.th`
  cursor: pointer;

	&: hover{
	  padding-right: 20px;
	  transition: padding 150ms ease-in-out;
	}

    > span {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
   }
`;

const StyledTransaction = styled.tr`
  img {
	display: block;
    margin: 0 auto;
    height: 30px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.fade1};
    transition: background-color 150ms ease-in-out;
  }
`;

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 16px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 16px;
`;

