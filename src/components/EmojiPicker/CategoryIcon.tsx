import React from 'react';

import { Category } from '../../types';
import { categories } from '../../svgs';
import { CategoryIconWrapper } from './Styles';

interface Props extends Category {
  isActive: boolean;
  onClick: Function;
}

const CategoryIcon: React.FC<Props> = ({ id, isActive = false, onClick }: Props) => {
  const Icon = categories[id];

  return (
    <CategoryIconWrapper isActive={isActive} onClick={() => onClick()}>
      <Icon />
    </CategoryIconWrapper>
  );
};

export default CategoryIcon;
