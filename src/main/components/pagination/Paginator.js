import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';
import { Seq } from 'js-seq';

import Css from '../styling/Css';

import IconFirstPage from 'svg-react-loader?name=FirstPageIcon!../../../../node_modules/material-design-icons/navigation/svg/production/ic_first_page_24px.svg';
import IconPreviousPage from 'svg-react-loader?name=PreviousPageIcon!../../../../node_modules/material-design-icons/navigation/svg/production/ic_chevron_left_24px.svg';
import IconNextPage from 'svg-react-loader?name=NextPageIcon!../../../../node_modules/material-design-icons/navigation/svg/production/ic_chevron_right_24px.svg';
import IconLastPage from 'svg-react-loader?name=LastPageIcon!../../../../node_modules/material-design-icons/navigation/svg/production/ic_last_page_24px.svg';

import { TextField } from 'office-ui-fabric-react';
 
import PaginationUtils from './internal/PaginationUtils';

function getStyles({ theme }) {
  return {
    paginator: {
      display: 'table',
      fontSize: '1rem',
    },

    firstPage: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    previousPage: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    nextPage: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    lastPage: {
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    activePage: {
      display: 'table-cell',
      backgroundColor: theme.palette.themePrimary,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    inactivePage: {
      display: 'table-cell',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    
    page: {
      display: 'table-cell',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    ellipsis: {
      display: 'table-cell',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    pageTextFieldContainer: {
      display: 'inline-block',
      margin: '0 0.5rem'
    },

    pageTextField: {
      width: '4rem',
    },

    button: {
      border: 'none',
      background: 'none'
    },

    icon: {
      transform: 'scale(0.75,0.75) translate(5px, 5px)'
    }
  };
}


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
    const paginationFacts = PaginationUtils.preparePaginationFacts(
      props.pageIndex, props.pageSize, props.totalItemCount);

    return (
      <Css getStyles={getStyles}>
        {
          classes => {
            let ret = null;

            switch (props.type) {
              case 'simple':
                ret = createSimplePaginator(props, paginationFacts, classes);
                break;

              case 'advanced':
                ret = createAdvancedPaginator(props, paginationFacts, classes);
                break;
            
              default:
                ret = createDefaultPaginator(props, paginationFacts, classes);
            }
            
            return ret;
          }
        }
        </Css>
    );
  }
});

// --- locals ---------------------------------------------

function createDefaultPaginator(props, facts, classes) {
  const
    paginationInfo =
      PaginationUtils.determineVisiblePageButtons(
        facts.pageIndex,
        facts.pageCount,
        7),

    onClick = createClickHandler(props.onChange),
    
    firstPageButton =
      <div className={classes.firstPage}>
        {createPageButton(0, facts, classes)}
      </div>,
    
    previousPage =
      <div className={classes.previousPage}>
        {createPreviousPageButton(facts, classes)}
      </div>,
    
    precedingEllipsis =
      paginationInfo.firstButtonIndex === 1
        ? null
        : <div className={classes.ellipsis}>
            {
              createEllipsisButton(
                Math.max(0, paginationInfo.firstButtonIndex
                  - Math.floor(paginationInfo.maxPageButtonCount / 2)),
                  facts, classes, onClick)
            }
          </div>,
            
    otherPages =
      Seq.range(
        paginationInfo.firstButtonIndex ,
        paginationInfo.lastButtonIndex + 1)
        .map(index =>
          <div key={index} className={classes.page}>
            {createPageButton(index, facts, classes)}
          </div>),
                
    succeedingEllipsis =
      paginationInfo.lastButtonIndex === facts.pageCount - 2
        ? null
        : <div className={classes.ellipsis}> 
            {
              createEllipsisButton(
                Math.min(facts.pageCount - 1,
                 paginationInfo.lastButtonIndex
                   + Math.floor(paginationInfo.maxPageButtonCount / 2) - 1),
                  facts, classes, onClick)
            }
          </div>,

    lastPageButton =
      <div className={classes.lastPage}>
        {createPageButton(facts.pageCount - 1, facts, classes)}
      </div>,

    nextPage =
      <div className={classes.nextPage}> 
        {createNextPageButton(facts, classes)}
      </div>;

  return (
    <div>{[
      previousPage,
      firstPageButton,
      precedingEllipsis,
      otherPages, 
      succeedingEllipsis,
      lastPageButton,
      nextPage
    ]}</div>
  );
}

function createSimplePaginator(props, facts, classes) {
  const
    previousPageButton = createPreviousPageButton(props, facts, classes),
    nextPageButton = createNextPageButton(facts, classes),
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

function createAdvancedPaginator(props, facts, classes) {
  const
    firstPageButton = createFirstPageButton(facts, classes),
    previousPageButton = createPreviousPageButton(facts, classes),
    nextPageButton = createNextPageButton(facts, classes),
    lastPageButton = createLastPageButton(facts, classes);

  return (
    <div className={classes.paginator}>
      <div className={classes.firstPage}>
        {firstPageButton}
      </div>
      {previousPageButton}
      <div className={classes.page}>
        Page
        <div className={classes.pageTextFieldContainer}>
          <TextField className={classes.pageTextField}/>
        </div>
        of {facts.pageCount}
      </div>
      <div className={classes.nextPage}>
        {nextPageButton}
      </div>
      <div className={classes.lastPage}>
        {lastPageButton}
      </div>
    </div>
  );
}


function createClickHandler() {
  return () => {};
}

function createPageButton(pageIndex, facts, classes) {
  const
    isActivePage = pageIndex === facts.pageIndex,

    ret =
      isActivePage
        ? <div style={{ color: 'white', backgroundColor: 'rgb(0, 120, 212)', padding: '3px 6px' }}>
            {pageIndex + 1}
          </div>
        : <button className={classes.button}>{pageIndex + 1}</button>;
  
  return ret;
}

function createFirstPageButton(facts, classes) {
  return (
    <button className={classes.button}>
      <div className={classes.icon}>
        <IconFirstPage/>
      </div>
    </button>
  );
}

function createPreviousPageButton(facts, classes) {
  return (
    <button className={classes.button}>
      <div className={classes.icon}>
        <IconPreviousPage/>
      </div>
    </button>
  );
}

function createEllipsisButton(pageIndex, facts, classes) {
  return (
    <button className={classes.button}>
      &hellip;
    </button>
  );
}

function createNextPageButton(facts, classes) {
  return (
    <button className={classes.button}>
      <div className={classes.icon}>
        <IconNextPage/>
      </div>
    </button>
  );
}

function createLastPageButton(facts, classes) {
  return (
    <button className={classes.button}>
      <div className={classes.icon}>
        <IconLastPage/>
      </div>
    </button>
  );
}
