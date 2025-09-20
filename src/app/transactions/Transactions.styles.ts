import styled from 'styled-components';

export const StyledTable = styled.table`
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

export const StyledTableHeader = styled.thead`
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

export const SortableHeader = styled.th`
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

export const StyledTransaction = styled.tr`
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

export const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 16px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 16px;
`;

