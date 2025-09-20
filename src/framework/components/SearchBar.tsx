import * as React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
	value: string;
	onChange: (newValue: string) => void;
	placeholder: string;
}

const StyledSearchBar = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  width: 100%;
  max-width: 300px;
  font-size: 14px;
  margin-bottom: 12px;

  &::placeholder {
    color: ${({ theme }) => theme.secondaryText};
  }
`;

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
	<StyledSearchBar
		type="text"
		placeholder={placeholder}
		value={value}
		onChange={e => onChange(e.target.value)}
	/>
);
