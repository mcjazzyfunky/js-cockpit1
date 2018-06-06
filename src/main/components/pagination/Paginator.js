import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';
import classNames from 'classnames';

import { Icon } from 'antd';

import PaginationUtils from './internal/PaginationUtils';

import './Paginator.less';

export default defineComponent({
  displayName: 'Paginator',

  properties: {
    pageIndex: {
      type: Number,
      constraint: Spec.nonnegativeInteger,
      nullable: true,
      defaultValue: null
    },

    pageSize: {
      type: Number,
      constraint: Spec.nonnegativeInteger, 
      nullable: true,
      defaultValue: null
    },
    
    totalItemCount: {
      type: Number,
      constraint: Spec.nonnegativeInteger,
      nullable: true,
      defaultValue: null
    },

    type: {
      type: String,
      constraint: Spec.oneOf('default', 'simple', 'advanced'),
      defaultValue: 'default'
    },
    
    className: {
      type: String,
      nullable: true,
      defaultValue: null
    },

    disabled: {
      type: Boolean,
      defaultValue: false
    },

    onChange: {
      type: Function,
      nullable: true,
      defaultValue: null
    }
  },

  main: (props) => {
    const { pageIndex, pageSize, totalItemCount, type,
      className, disabled, onChange } = props;

    const paginationFacts = PaginationUtils.preparePaginationFacts(
      pageIndex, pageSize, totalItemCount);

    let ret = null;

    switch (type) {
    case 'simple':
      ret = createSimplePaginator(props, paginationFacts);
      break;

    case 'advanced':
      ret = createAdvancedPaginator(props, paginationFacts);
      break;
  
    default:
      ret = createDefaultPaginator(props, paginationFacts); 
    }

    console.log(paginationFacts);
    return ret;
  }
});

// --- locals ---------------------------------------------

function createDefaultPaginator(props, facts) {
  const
    paginationInfo =
      PaginationUtils.determineVisiblePageButtons(
        facts.pageIndex,
        facts.pageCount,
        6),

    onClick = createClickHandler(props.onChange),

    firstPageButton = createPageButton(0, facts, onClick),
    
    previousPageButton = createPreviousPageButton(facts, onClick),
    
    precedingEllipsisLink =
      paginationInfo.firstButtonIndex === 1
        ? null
        : createEllipsisButton(
          Math.max(0, paginationInfo.firstButtonIndex
            - Math.floor(paginationInfo.maxPageButtonCount / 2)),
            facts, onClick),
            
    otherPageButtons =
      Seq.range(
        paginationInfo.firstButtonIndex ,
        paginationInfo.lastButtonIndex + 1)
        .map(
          index => createPageButton(index, facts, onClick)),
                
    succeedingEllipsisLink =
      paginationInfo.lastButtonIndex === facts.pageCount - 2
        ? null
        : createEllipsisButton(
          Math.min(facts.pageCount - 1,
            paginationInfo.lastButtonIndex
              + Math.floor(paginationInfo.maxPageButtonCount / 2) - 1),
            facts, onClick),

    nextPageButton = createNextPageButton(facts, onClick),

    lastPageButton = createPageButton(facts.pageCount - 1, facts, onClick);

  return (
    <div>{[
      previousPageButton,
      firstPageButton,
      precedingEllipsisLink,
      ...otherPageButtons, 
      succeedingEllipsisLink,
      lastPageButton,
      nextPageButton
    ]}</div>
  );
}

function createSimplePaginator(props, facts) {
  const
    previousPageButton = createPreviousPageButton(props, facts),
    nextPageButton = createNextPageButton(props, facts),
    paginationInfo =
      facts.totalPageCount !== null
        ? (facts.pageIndex + 1) + ' / ' + facts.pageCount
        : null;
  
  return (
    <div>
      {previousPageButton}
      {paginationInfo}
      {nextPageButton}
    </div>
  );
}

function createAdvancedPaginator(props, facts) {
  const
    firstPageButton = createFirstPageButton(props, facts),
    previousPageButton = createPreviousPageButton(props, facts),
    nextPageButton = createNextPageButton(props, facts),
    lastPageButton = createLastPageButton(props, facts);

  return (
    <div>
      {firstPageButton }
      {previousPageButton }
      Page <input className="aw-paginator__input-page"/> of {facts.pageCount}
      {nextPageButton}
      {lastPageButton}
    </div>
  );
}


function createClickHandler() {
  return () => {};
}

function createPageButton(pageIndex, facts, onClick) {
  const
    isActivePage = pageIndex === facts.pageIndex,

    className =
      isActivePage
        ? 'aw-paginator__button-page--active'
        : 'aw-paginator__button-page';

  return (
    <button className={className}>
      {pageIndex + 1}
    </button>
  );
}

function createFirstPageButton() {
  return (
    <button className="aw-paginator__button-first">
      <Icon type="double-left"/>
    </button>
  );
}

function createPreviousPageButton() {
  return (
    <button className="aw-paginator__button-previous">
      <Icon type="left"/>
    </button>
  );
}

function createEllipsisButton() {
  return (
    <button className="aw-paginator__button-ellipsis">
      &hellip;
    </button>
  );
}

function createNextPageButton() {
  return (
     <button className="aw-paginator__button-next">
       <Icon type="right"/>
     </button>
  );
}

function createLastPageButton() {
  return (
     <button className="aw-paginator__button-last">
       <Icon type="double-right"/>
     </button>
  );
}
