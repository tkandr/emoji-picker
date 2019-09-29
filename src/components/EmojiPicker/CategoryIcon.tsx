import React from 'react';
import Styled from 'styled-components';

import { Category } from '../../types';
import { useStore } from '../../store/hooks';
import { categories } from '../../svgs';

const Style = Styled.div<{ isActive: boolean }>`     
  padding: 5px;
  svg {
    fill: #70737A;
  }
  ${props =>
    props.isActive &&
    `
      box-shadow: 0 -2px 0 #248BF2;
      svg {
        fill: #248BF2;
      }
    }
  `}
`;

interface Props extends Category {
  isActive: boolean;
}

const CategoryIcon: React.FC<Props> = ({ id, isActive = false }: Props) => {
  const { setActiveCategory } = useStore();
  const Icon = categories[id];

  return (
    <Style isActive={isActive} onClick={() => setActiveCategory(id)}>
      <Icon />
    </Style>
  );
};

export default CategoryIcon;
