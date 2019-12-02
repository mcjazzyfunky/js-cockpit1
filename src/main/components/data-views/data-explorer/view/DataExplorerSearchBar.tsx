// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { css, ActionButton, Callout, CommandBar, ITheme, SearchBox } from 'office-ui-fabric-react'
import { MdClose, MdFilterList, MdCheck, MdUndo } from 'react-icons/md'

// internal imports
import getDataExplorerSearchBarClasses from './getDataExplorerSearchBarClasses'
import DataExplorerProps from '../types/DataExplorerProps'
import DataExplorerState from '../types/DataExplorerState'
import DataExplorerActions from '../types/DataExplorerActions'
import DataExplorerFilter from '../types/DataExplorerFilter'
import DataExplorerFilterPanel from './DataExplorerFilterPanel'

// derived imports
const { useCallback, useRef, useState } = React

// --- SearchBar -----------------------------------------------------

type SearchBarProps = {
  dataExplorerProps: DataExplorerProps,
  dataExplorerActions: DataExplorerActions
}

const SearchBar = component<SearchBarProps>('SearchBar',
  ({ dataExplorerProps: props, dataExplorerActions: actions }) => { 
    const
      classes = getDataExplorerSearchBarClasses(),

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

        actions.loadFilter(filter, props.loadData, () => {}) // TODO
      }, [])

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
                <DataExplorerFilterPanel filters={(props as any).search.advanced.filters} /> 
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

    function closeCallout() {
      setState({
        advancedFilterActive: false,
        calloutVisible: false
      })
    }
  }
)

// --- exports -------------------------------------------------------

export default SearchBar
