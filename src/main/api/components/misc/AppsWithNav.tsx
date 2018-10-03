import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'
import ActionEvent from '../../events/ActionEvent'
import Model_AppsWithNavRenderer from '../../../renderers/AppsWithNav/AppsWithNavRenderer'

// --- AppsWithNav.App --------------------------------------------

type AppProps = {
  title: string,
  name: string,
  children?: ReactNode
}

const App = defineComponent<AppProps>({
  displayName: 'AppsWithNav.App',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    children: {
      nullable: true,
      validate: isNode
    }
  },

  render() {
    throw new Error('Components of type AppsWithNav.App must be children '
      + 'of AppsWithNav.Apps or AppsWithNav.AppGroup components')
  }
})

// --- AppsWithNav.AppGroup ----------------------------------------

type AppGroupProps = {
  title: string,
  name: string,
  children: ReactNode // TODO
}

const AppGroup: ComponentType<AppGroupProps> = defineComponent<AppGroupProps>({
  displayName: 'AppsWithNav.AppGroup',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([AppGroup, App]))))
    }
  },

  render() {
    throw new Error('Components of type AppsWithNav.Menu must be children '
      + 'of AppsWithNav.Menus or AppsWithNav.Menu components')
  }
})

// --- AppsWithNav.Apps --------------------------------------------

type AppsProps = {
  children: ReactNode // TODO
}

const Apps = defineComponent({
  displayName: 'AppsWithNav.Apps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([AppGroup, App])))
    }
  },

  render() {
    throw new Error('Components of type AppsWithNav.Apps must be children '
      + 'of AppsWithNav components')
  }
})

// --- AppsWithNav -------------------------------------------------

type AppsWithNavProps = {
  children: ReactNode // TODO
}

const AppsWithNav = defineComponent<AppsWithNavProps>({
  displayName: 'AppsWithNavProps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.singleOf(isElementOfType([Apps])))
    }
  },

  base: class Base extends React.Component<AppsWithNavProps> {
    private _model: Model_AppsWithNav = null
    private _modelSource: AppsWithNavProps = null
    
    render() {
      this._prepareModel_AppsWithNavModel()
      return Model_AppsWithNavRenderer.render(this._model)
    }

    private _prepareModel_AppsWithNavModel() {
      if (this.props !== this._modelSource) {
        this._model = Base._getAppsWithNavModel(this.props)
        this._modelSource = this.props
      }
    }

    static _getAppsWithNavModel(props: AppsWithNavProps): Model_AppsWithNav {
      const ret: Model_AppsWithNav = {
        kind: 'Model_AppsWithNav',
        menu: []
      }

      React.Children.forEach(props.children, (child: ReactElement<AppsProps>) => {
        if (child.type === Apps) {
          React.Children.forEach(child.props.children, (child2: ReactElement<AppGroupProps | AppProps>) => {
            ret.menu.push(
              child2.type === AppGroup
                ? Base._getAppGroupModel(child2.props as AppGroupProps)
                : Base._getAppModel(child2.props as AppProps))
          })
        } else {
          console.log(child)
          throw new Error('This should never happen')
        }
      })

      return ret
    }

    private static _getAppGroupModel(props: AppGroupProps): Model_AppsWithNav_AppGroup {
      const ret: Model_AppsWithNav_AppGroup = {
        kind: 'Model_AppsWithNav_AppGroup',
        title: props.title,
        name: props.name,
        items: []
      }

      React.Children.forEach(props.children, (child: ReactElement<AppGroupProps | AppProps>) => {
        ret.items.push(
          child.type === AppGroup
            ? Base._getAppGroupModel(child.props as AppGroupProps)
            : Base._getAppModel(child.props as AppProps))
      })

      return ret
    }

    private static _getAppModel(props: AppProps): Model_AppsWithNav_App {
      const ret: Model_AppsWithNav_App = {
        kind: 'Model_AppsWithNav_App',
        title: props.title,
        name: props.name,
        content: props.children || null
      }

      return ret
    }
  }
})

// --- models -------------------------------------------------------

type Model_AppsWithNav = {
  kind: 'Model_AppsWithNav',
  menu: (Model_AppsWithNav_AppGroup | Model_AppsWithNav_App)[]
}

type Model_AppsWithNav_AppGroup = {
  kind: 'Model_AppsWithNav_AppGroup',
  title: string,
  name: string,
  items: (Model_AppsWithNav_AppGroup | Model_AppsWithNav_App)[]
}

type Model_AppsWithNav_App = {
  kind: 'Model_AppsWithNav_App',
  title: string,
  name: string,
  content: ReactNode
}

// --- exports ------------------------------------------------------

export default Object.assign(AppsWithNav, {
  App,
  Apps,
  AppGroup,
})

export {
  Model_AppsWithNav,
  Model_AppsWithNav_AppGroup,
  Model_AppsWithNav_App,
}