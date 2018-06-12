import React from 'react';
import { defineComponent } from 'js-widgets';
import { Spec } from 'js-spec';

import PaginationUtils from './internal/PaginationUtils';

const styles = {
  paginationInfo: {
    fontSize: '1rem',
    whiteSpace: 'nowrap',
  }
};

export default defineComponent({
  displayName: 'PaginationInfo',

  properties: {
    type: {
      type: String,
      constraint: Spec.oneOf('info-about-page', 'info-about-items')
    },

    pageIndex: {
      type: Number,
      constraint: Spec.nonnegativeInteger,
      nullable: true
    },

    pageSize: {
      type: Number,
      constraint: Spec.nonnegativeInteger, 
      nullable: true
    },
    
    totalItemCount: {
      type: Number,
      constraint: Spec.nonnegativeInteger,
      nullable: true
    }
  },

  main: (props) => {
    const
      facts =
        PaginationUtils.preparePaginationFacts(
          props.pageIndex,
          props.pageSize,
          props.totalItemCount),

      infoText =
        props.type === 'info-about-page'
          ? buildInfoTextAboutPage(facts)
          : buildInfoTextAboutItems(facts);
      
    return <div style={styles.paginationInfo}>{infoText}</div>;
  }
});

function buildInfoTextAboutPage({ pageIndex, pageCount, valid }) {
  return valid
    ? `Page ${pageIndex + 1} of ${pageCount}`
    : null;
}

function buildInfoTextAboutItems({ pageIndex, pageSize, totalItemCount, valid }) {
  let infoText = null;
  
  if (valid) {
    const
      firstItemNo = pageIndex * pageSize + 1,
      lastItemNo = Math.min(firstItemNo + pageSize - 1, totalItemCount);

    infoText =
      `${firstItemNo} - ${lastItemNo} of ${totalItemCount} items`;
  }

  return infoText;
}