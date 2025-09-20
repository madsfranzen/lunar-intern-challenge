import * as React from 'react';
import styled from 'styled-components';
import { useTransactionsQuery } from './get_transactions';
import { DeleteTransactionButton } from '../../framework/components/DeleteTransactionButton';

type TransactionsProps = {
	userId: string;
};

export const Transactions = ({ userId }: TransactionsProps) => {

	const { data, loading, error } = useTransactionsQuery({
		variables: {
			userId,
		},
	});

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
	let transactions = (data?.transactions || []).filter(tx => !tx.deleted);

	if (sortOrder === 'newest') {
		transactions.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
	} else if (sortOrder === 'oldest') {
		transactions.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	}

	return (
		<StyledCard>
			<StyledTable>
				<StyledTableHeader>
					<tr>
						<th>Icon</th>
						<th>Type</th>
						<th>Title</th>
						<th>Amount</th>
						<SortableHeader onClick={toggleSort}>
							Time {sortOrder === 'newest' ? '⬇️' : sortOrder === 'oldest' ? '⬆️' : '↕️'}
						</SortableHeader>
						<th>Status</th>
						<th>Category</th>
						<th>Action</th>
						<th></th>
					</tr>
				</StyledTableHeader>
				<tbody>
					{transactions
						.map(transaction => (
							<StyledTransaction key={transaction.id}>
								<td>
									<img src={transaction.iconURL} alt="" />
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

  td,
  th {
    padding: 8px;
  }
`;

const StyledTableHeader = styled.thead`
  color: ${({ theme }) => theme.secondaryText};

  th {
    text-align: left;
  }
`;

const SortableHeader = styled.th`
  cursor: pointer;
`;

const StyledTransaction = styled.tr`
  img {
    height: 30px;
  }
`;

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 16px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 16px;
`;

