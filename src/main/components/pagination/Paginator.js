import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';
import classNames from 'classnames';

import { ActionButton, IconButton } from 'office-ui-fabric-react';

import PaginationUtils from './internal/PaginationUtils';

import './Paginator.scss';

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
        7),

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
      <div style={{ display: 'inline-block', margin: '0 8px'}}>
      {paginationInfo}
      </div>
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
    <div style={{ whiteSpace: 'nowrap' }}>
      {firstPageButton }
      {previousPageButton }
      <div style={{ display: 'inline-block', margin: '0 10px' }}>
      {
      /*
      Page <Input size="default" className="aw-paginator__input-page" style={{ width: '60px', margin: '2px'}}/> of {facts.pageCount}
      */
      }
      </div>
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

    ret =
      isActivePage
        ? <ActionButton disabled>
            <div style={{ color: 'white', backgroundColor: 'rgb(0, 120, 212)', padding: '3px 6px' }}>
              {pageIndex + 1}
            </div>
          </ActionButton>
        : <ActionButton>{pageIndex + 1}</ActionButton>;
  
  return ret;
}

function createFirstPageButton() {
  return (
    <button shape="circle" size="small" className="aw-paginator__button-first" style={{border: 'none' }}>
      <i type="double-left"/>
    </button>
  );
}

function createPreviousPageButton() {
  return (
      <IconButton
        iconProps={{ iconName: 'ChevronLeft' }}
      />
  );
}

function createEllipsisButton() {
  return (
    <ActionButton>
      &hellip;
    </ActionButton>
  );
}

function createNextPageButton() {
  return (
      <IconButton
        iconProps={{ iconName: 'ChevronRight' }}
      />
  );
}

function createLastPageButton() {
  return (
     <button shape="circle" size="small" className="aw-paginator__button-last" style={{border: 'none'}}>
       <icon type="double-right"/>
     </button>
  );
}
