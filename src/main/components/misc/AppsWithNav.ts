import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'
import ActionEvent from '../../events/ActionEvent'
import AppsWithNavRenderer from './AppsWithNavRenderer'

// --- AppsWithNav.App --------------------------------------------

type AppProps = {
  title: string,
  id: string,
  children?: ReactNode
}

const App = defineComponent<AppProps>({
  displayName: 'AppsWithNav.App',

  properties: {
    title: {
      type: String,
      required: true
    },

    id: {
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
  groupId: string,
  children: ReactNode // TODO
}

const AppGroup: ComponentType<AppGroupProps> = defineComponent<AppGroupProps>({
  displayName: 'AppsWithNav.AppGroup',

  properties: {
    title: {
      type: String,
      required: true
    },

    groupId: {
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
  selectedId?: string,
  children: ReactNode // TODO
}

const AppsWithNav = defineComponent<AppsWithNavProps>({
  displayName: 'AppsWithNavProps',

  properties: {
    selectedId: {
      type: String
    },

    children: {
      validate:
        withChildren(
          Spec.singleOf(isElementOfType([Apps])))
    }
  },

  render: class Base extends React.Component<AppsWithNavProps> {
    private _model: AppsWithNavModel = null
    private _modelSource: AppsWithNavProps = null
    
    render() {
      this._prepareAppsWithNavModelModel()
      return AppsWithNavRenderer.render(this._model)
    }

    private _prepareAppsWithNavModelModel() {
      if (this.props !== this._modelSource) {
        this._model = Base._getAppsWithNavModel(this.props)
        this._modelSource = this.props
      }
    }

    static _getAppsWithNavModel(props: AppsWithNavProps): AppsWithNavModel {
      const ret: AppsWithNavModel = {
        $kind: 'AppsWithNavModel',
        selectedId: props.selectedId !== undefined ? props.selectedId : null, 
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

    private static _getAppGroupModel(props: AppGroupProps): AppsWithNavAppGroupModel {
      const ret: AppsWithNavAppGroupModel = {
        $kind: 'AppsWithNavAppGroupModel',
        title: props.title,
        groupId: props.groupId,
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

    private static _getAppModel(props: AppProps): AppsWithNavAppModel {
      const ret: AppsWithNavAppModel = {
        $kind: 'AppsWithNavAppModel',
        title: props.title,
        id: props.id,
        content: props.children || null
      }

      return ret
    }
  } as any // TODO
})

// --- models -------------------------------------------------------

type AppsWithNavModel = {
  $kind: 'AppsWithNavModel',
  selectedId: string | null,
  menu: (AppsWithNavAppGroupModel | AppsWithNavAppModel)[]
}

type AppsWithNavAppGroupModel = {
  $kind: 'AppsWithNavAppGroupModel',
  title: string,
  groupId: string,
  items: (AppsWithNavAppGroupModel | AppsWithNavAppModel)[]
}

type AppsWithNavAppModel = {
  $kind: 'AppsWithNavAppModel',
  title: string,
  id: string,
  content: ReactNode
}

// --- exports ------------------------------------------------------

export default Object.assign(AppsWithNav, {
  App,
  Apps,
  AppGroup,
})

export {
  AppsWithNavModel,
  AppsWithNavAppGroupModel,
  AppsWithNavAppModel,
}