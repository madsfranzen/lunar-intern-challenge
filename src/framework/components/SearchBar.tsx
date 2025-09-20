import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Button';

interface SearchBarProps {
	value: string;
	onChange: (newValue: string) => void;
	placeholder: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
	<SearchBarWrapper>
		<StyledSearchBar
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e.target.value)}
		/>
		{value && <ClearButton onClick={() => onChange('')}>x</ClearButton>}
	</SearchBarWrapper>
);

const StyledSearchBar = styled.input`
  padding: 8px 32px 8px 12px; /* extra right padding to not overlap clear button */
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

const SearchBarWrapper = styled.div`
  align-items: center;
  gap: 8px;
`;
 
const ClearButton = styled(Button)(
	({ theme }) => css`
    background-color: transparent;
    color: ${theme.fade6};
    transform: translateX(-110%);
    transition:
      background-color 150ms linear,
      color 150ms linear,
      transform 150ms linear;

    &:hover, &:focus-visible {
	  color: ${theme.text};
    }
`);
