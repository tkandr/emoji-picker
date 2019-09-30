import React from 'react';
import Styled from 'styled-components';
import { observer } from 'mobx-react';

import { useStore } from '../../store/hooks';
import { search } from '../../svgs';

const Styles = Styled.div<{ active: boolean }>`
  text-align: initial;
  position: relative;
  background-color: #F2F3F5;
  margin-bottom: 10px;
  .icon {
    position: absolute;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .search-icon {
    top: 4px;
    left: 10px;
  }
  input {
    display: block;
    background-color: #F2F3F5;
    border: none;
    font-size: 15px;
    line-height: 24px;
    height: 24px;
    padding: 8px 40px 8px 30px;
    outline: none;
  }
  .delete-icon {
    top: 0;
    right: 10px;
    cursor: pointer;
    ${props => !props.active && 'display: none'}
  }

`;

const FilterInput: React.FC = () => {
  const { setFilterValue, filterValue, isFilterMode } = useStore();
  return (
    <Styles active={isFilterMode}>
      <span className="search-icon icon">{search.search()}</span>
      <input
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
        placeholder={'Search'}
      />
      <span className="delete-icon icon" onClick={() => setFilterValue('')}>
        {search.delete()}
      </span>
    </Styles>
  );
};

export default observer(FilterInput);
