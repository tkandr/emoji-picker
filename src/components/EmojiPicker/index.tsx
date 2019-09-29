import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';

import CategoryIcon from './CategoryIcon';
import { CategoryListWrapper, MainWrapper } from './Styles';
import Category from './Category';
import StoreContext from '../../store/StoreContext';
import { EmojiPickerStore } from '../../store';

interface Props {
  onIconSelect: Function;
}

class EmojiPicker extends PureComponent<Props> {
  static contextType = StoreContext;

  private categoryRefs: { [key: string]: HTMLDivElement } = {};
  private scrollContainerRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  private categoryScrollTops: number[] = [];
  private store: EmojiPickerStore = this.context;
  private waitingForPaint = false;

  state = {
    activeCategoryIndex: 0,
  };

  componentDidMount(): void {
    this.calculateScrollTops();
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount(): void {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.removeEventListener('scroll', this.handleScroll);
    }
  }

  calculateScrollTops(): void {
    for (let i = 0; i < this.store.categories.length; i++) {
      this.categoryScrollTops.push(this.calculateCategoryScrollTop(i));
    }
  }

  calculateCategoryScrollTop(i: number): number {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (i === 0) {
      return 0;
    }
    const component = this.categoryRefs[`category-${i}`];

    const elementTop = component.getBoundingClientRect().top;
    const containerElem = this.scrollContainerRef.current;
    const scrollContainerRefTop = containerElem!.getBoundingClientRect().top;
    const currentScrollTop = containerElem!.scrollTop;
    return elementTop - scrollContainerRefTop + currentScrollTop + 1;
  }

  handleScroll = (): void => {
    if (!this.waitingForPaint) {
      this.waitingForPaint = true;
      window.requestAnimationFrame(this.handleScrollPaint);
    }
  }

  handleScrollPaint = (): void => {
    this.waitingForPaint = false;

    if (!this.scrollContainerRef.current) {
      return;
    }

    const scrollContainer = this.scrollContainerRef.current;
    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.getBoundingClientRect().height;

    let activeCategoryIndex = this.categoryScrollTops.length - 1;
    for (let i = 1; i < this.categoryScrollTops.length; i++) {
      const top = this.categoryScrollTops[i];
      if (top > scrollTop + containerHeight / 2) {
        activeCategoryIndex = i - 1;
        break;
      }
    }

    if (this.state.activeCategoryIndex !== activeCategoryIndex) {
      this.setState({ activeCategoryIndex });
    }
  }

  setCategoryRef(name: string, c: HTMLDivElement): void {
    this.categoryRefs[name] = c;
  }

  scrollToCategoryView = (i: number): void => {
    window.requestAnimationFrame(() => {
      if (!this.scrollContainerRef.current) {
        return;
      }
      this.scrollContainerRef.current.scrollTop = this.categoryScrollTops[i];
    });
  };

  render(): JSX.Element | null {
    const { activeCategoryIndex } = this.state;
    const { store } = this;
    if (!store.isOpen) {
      return null;
    }

    return (
      <MainWrapper>
        <CategoryListWrapper ref={this.scrollContainerRef}>
          {store.categories.map((category, i) => (
            <Category
              ref={this.setCategoryRef.bind(this, `category-${i}`)}
              key={category.id}
              index={i}
              {...category}
            />
          ))}
        </CategoryListWrapper>
        <div className="categories-anchors">
          {store.categories.map((category, i) => (
            <CategoryIcon
              key={category.id}
              onClick={() => this.scrollToCategoryView(i)}
              isActive={activeCategoryIndex === i}
              {...category}
            />
          ))}
        </div>
      </MainWrapper>
    );
  }
}

export default observer(EmojiPicker);
