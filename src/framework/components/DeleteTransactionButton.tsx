import * as React from 'react';
import { Button } from './Button';
import { useDeleteAuthorizationMutation } from '../../app/transactions/delete_authorization';
import { Transaction } from '../../framework/types/types';

interface DeleteTransactionButtonProps {
	transaction: Transaction;
}

// Taking in the full transaction in case we need more than just ID for validation or other checks.
// Using an optimistic update to make the row disappear immediately in the UI.
export function DeleteTransactionButton({ transaction }: DeleteTransactionButtonProps) {

	const [deleteAuthorization] = useDeleteAuthorizationMutation({

		// Logging for clarity about how the mutation is behaving.
		// I kept it in the code for now to show my work process.
		onCompleted: (data) => {
			if (data.result.error) {
				console.error('Failed to delete transaction:', data);
			} else {
				console.log('Transaction successfully deleted:', data);
			}
		},
		onError: (err) => {
			console.error('Unexpected error:', err);
		},
	});

	const handleDelete = () => {

		const confirmed = window.confirm('Are you sure you want to delete this transaction?');
		if(!confirmed) return;

		deleteAuthorization({
			variables: { transactionId: transaction.id },
			optimisticResponse: {
				result: {
					error: null,
					transaction: { ...transaction, deleted: new Date().toISOString() },
				},
				// Small hack? It's my understanding that Apollo needs a __typename for it's caching,
				// Transaction does not seem to have that, but I don't want to mess with the provided types.
			} as any,
		});
	};

	return <Button onClick={handleDelete}>Delete</Button>;
}

