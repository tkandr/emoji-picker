import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';

import CategoryIcon from './CategoryIcon';
import { CategoryListWrapper, CategoryWrapper, MainWrapper } from './Styles';
import Category from './Category';
import StoreContext from '../../store/StoreContext';
import { EmojiPickerStore } from '../../store';
import FilterInput from './FilterInput';
import Emoji from './Emoji';
import { Emoji as EmojiType } from '../../types/emojiData';

interface Props {
  onEmojiClick: Function;
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

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: number | null,
  ): void {
    if (snapshot !== this.recentlyUsedHeight) {
      this.calculateScrollTops();
    }
  }

  getSnapshotBeforeUpdate(): number | null {
    return this.recentlyUsedHeight;
  }

  get recentlyUsedHeight(): number | null {
    const recentlyUsedContainer = this.categoryRefs['category-0'];
    if (!recentlyUsedContainer || this.store.isFilterMode) {
      return null;
    }

    return recentlyUsedContainer.getBoundingClientRect().height;
  }

  componentWillUnmount(): void {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.removeEventListener('scroll', this.handleScroll);
    }
  }

  calculateScrollTops(): void {
    const tops = [];
    for (let i = 0; i < this.store.categories.length; i++) {
      tops.push(this.calculateCategoryScrollTop(i));
    }
    this.categoryScrollTops = tops;
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
  };

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
      if (top > scrollTop + containerHeight * 0.1) {
        activeCategoryIndex = i - 1;
        break;
      }
    }

    if (this.state.activeCategoryIndex !== activeCategoryIndex) {
      this.setState({ activeCategoryIndex });
    }
  };

  setCategoryRef(name: string, c: HTMLDivElement): void {
    this.categoryRefs[name] = c;
  }

  handleCategoryIconClick = (i: number): void => {
    // Don't forget to reset filter
    this.store.setFilterValue('');
    this.scrollToCategoryView(i);
  };

  scrollToCategoryView = (i: number): void => {
    window.requestAnimationFrame(() => {
      if (!this.scrollContainerRef.current) {
        return;
      }
      this.scrollContainerRef.current.scrollTop = this.categoryScrollTops[i];
    });
  };

  handleEmojiClick = (emoji: EmojiType): void => {
    this.store.addRecentlyUsed(emoji.id);
    this.props.onEmojiClick(emoji.char);
    this.calculateScrollTops();
  };

  renderEmojis(): JSX.Element | JSX.Element[] {
    const { isFilterMode, categories, getCategoriesEmojis } = this.store;
    if (isFilterMode) {
      return (
        // @todo fix lagging on search
        <CategoryWrapper>
          <div className="category-emojis">
            {this.store.filteredEmojis.map(emoji => (
              <Emoji key={emoji.id} onClick={this.handleEmojiClick} {...emoji} />
            ))}
          </div>
        </CategoryWrapper>
      );
    }
    return categories.map((category, i) => (
      <Category
        ref={this.setCategoryRef.bind(this, `category-${i}`)}
        key={category.id}
        name={category.name}
        emojis={getCategoriesEmojis(i)}
        onEmojiClick={this.handleEmojiClick}
      />
    ));
  }

  render(): JSX.Element | null {
    const { activeCategoryIndex } = this.state;
    const { store } = this;
    if (!store.isOpen) {
      return null;
    }

    return (
      <MainWrapper>
        <FilterInput />
        <CategoryListWrapper ref={this.scrollContainerRef}>
          {this.renderEmojis()}
        </CategoryListWrapper>
        <div className="categories-anchors">
          {store.categories.map((category, i) => (
            <CategoryIcon
              key={category.id}
              onClick={() => this.handleCategoryIconClick(i)}
              isActive={!store.isFilterMode && activeCategoryIndex === i}
              {...category}
            />
          ))}
        </div>
      </MainWrapper>
    );
  }
}

export default observer(EmojiPicker);
