// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ActionButton, Callout, CommandBar, ITheme, SearchBox } from 'office-ui-fabric-react'
import { MdClose, MdFilterList, MdCheck, MdUndo } from 'react-icons/md'

// internal imports
import styleDataExplorerSearchBar from '../styleDataExplorerSearchBar'
import DataExplorerProps from '../../types/DataExplorerProps'
import DataExplorerStore from '../../types/DataExplorerStore'
import DataExplorerFilter from '../../types/DataExplorerFilter'
import DataExplorerFilterPanel from './DataExplorerFilterPanel'

// derived imports
const { useCallback, useRef, useState } = React

// --- SearchBar ----------------------------------------------------

type SearchBarProps = {
  dataExplorerProps: DataExplorerProps,
  dataExplorerStore: DataExplorerStore
}

const SearchBar = defineComponent<SearchBarProps>({
  displayName: 'SearchBar',

  render({ dataExplorerProps: props, dataExplorerStore: store }) { 
    const
      [state, setState] = useState({
        calloutVisible: false,
        advancedFilterActive: false
      }),

      advancedFilterRef = useRef(null),

      handleSearch = useCallback(value => {
        const
          searchText = value.trim(),

          filter: DataExplorerFilter | null = searchText.length === 0
            ? null
            : {
                operator: 'and',

                operands: [{
                  type: 'default',
                  name: 'fullText',
                  value: searchText
                }]
              }

        store.loadFilter(filter, props.loadData, () => {}) // TODO
      }, [])

    return styleDataExplorerSearchBar(classes => {
      const filterButtonClassName =
        state.advancedFilterActive || state.calloutVisible
          ? css(classes.filterButton, classes.filterButtonActive) 
          : classes.filterButton

      return (
        <div className={classes.container}>
          {
            !state.advancedFilterActive && 
              <SearchBox
                placeholder="Search..."
                className={classes.searchBox}
                disableAnimation={true}
                onSearch={handleSearch} 
              />
          }
          <div className={classes.advancedFilter} ref={ advancedFilterRef }>
            <ActionButton
              text="Advanced Filter"
              className={filterButtonClassName}
              iconProps={{ iconName: 'icon' }}
            
              onClick={
                () => setState(
                  state => ({
                    advancedFilterActive: !state.advancedFilterActive,
                    calloutVisible: !state.advancedFilterActive
                  }))
              }

              onRenderIcon={
                () =>
                  <div className={classes.icon}>
                    {
                      state.advancedFilterActive || state.calloutVisible
                        ? <MdCheck className={classes.icon}/>
                        : <MdFilterList className={classes.icon}/>
                    }
                  </div>
              }
            />
          </div>
          {
              <Callout
                hidden={!state.calloutVisible}
                target={advancedFilterRef.current}
                setInitialFocus={true}
                onDismiss={ () => closeCallout()}
              >
                <div className={classes.filterContainer}>
                  <DataExplorerFilterPanel dataExplorerProps={props} dataExplorerStore={store}/> 
                </div>
                <CommandBar
                  items={[
                    {
                      text: 'Apply filter',
                      key: '1',

                      iconProps: {
                        iconName: 'applyFilter'
                      },

                      onRenderIcon: () => <MdFilterList className={classes.icon}/>
                    },
                    {
                      text: 'Cancel',
                      key: '2',
                      
                      iconProps: {
                        iconName: 'cancel'
                      },

                      onRenderIcon: () => <MdClose className={classes.icon}/>,

                      onClick: () => closeCallout()
                    }
                  ]}

                  farItems={[
                    {
                      text: 'Reset',
                      key: '2',

                      iconProps: {
                        iconName: 'undo'
                      },

                      onRenderIcon: () => <MdUndo className={classes.icon}/>
                    }
                  ]}

                />
            </Callout>
          }
        </div>
      )
    })

    function closeCallout() {
      setState({
        advancedFilterActive: false,
        calloutVisible: false
      })
    }
  }
})

// --- exports ------------------------------------------------------

export default SearchBar
