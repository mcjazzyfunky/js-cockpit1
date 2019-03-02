// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ActionButton, Callout, CommandBar, ITheme, SearchBox } from 'office-ui-fabric-react'
import { MdClose, MdFilterList, MdCheck, MdUndo } from 'react-icons/md'

// internal imports
import DataExplorerSearch from '../types/DataExplorerSearch'
import DataExplorerStore from '../types/DataExplorerStore'
import defineStyle from '../../../../styling/defineStyle'

// derived imports

const { useRef, useState } = React

// --- styleSearchBar -----------------------------------------------

const styleSearchBar = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  searchBox: {
    width: '220px',
    height: '30px',
    paddingRight: '2px',
  },

  advancedFilter: {
    margin: '0 16px',

    selectors: {
      '& *': {
        color: theme.palette.black,
        backgroundColor: 'transparent !important',
      },

      '&:hover': {
        backgroundColor: theme.palette.neutralLight
      },
      
      '&:active': {
        backgroundColor: theme.palette.neutralQuaternary
      }
     }
  },

  filterButton: {
    height: '30px',
    marginLeft: '8px',

    selectors: {
      ':hover': {
        color: theme.palette.white,
        backgroundColor: theme.palette.neutralLight,
      },
      
      ':active': {
        color: theme.palette.white + ' !important',
        backgroundColor: theme.palette.neutralQuaternary,
      }
    }
  },

  filterButtonActive: {
    color: theme.palette.white + ' !important',
    backgroundColor: theme.palette.neutralQuaternary,
  },

  icon: {
    color: theme.palette.themePrimary + ' !important' // TODO
  },

  filterContainer: {
    width: '400px',
    minHeight: '200px'
  }
}))

// --- SearchBar ----------------------------------------------------

type SearchBarProps = {
  search: DataExplorerSearch,
  store: DataExplorerStore
}

const SearchBar = defineComponent<SearchBarProps>({
  displayName: 'SearchBar',

  render({ search, store }) { 
    const
      [state, setState] = useState({
        calloutVisible: false,
        advancedFilterActive: false
      }),

      advancedFilterRef = useRef(null)

    return styleSearchBar(classes => {
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
                  <FilterPanel/> 
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

// --- FilterPanel --------------------------------------------------

const FilterPanel = defineComponent({
  displayName: 'FilterPanel',

  render: function View() {
    return 'Filters'
  }
})

// --- exports ------------------------------------------------------

export default SearchBar
