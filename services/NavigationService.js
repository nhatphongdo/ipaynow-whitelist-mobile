import { CommonActions, TabActions, StackActions } from '@react-navigation/native'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

function getTopLevelNavigator() {
  return _navigator
}

function navigate(routeName, params) {
  _navigator.dispatch(CommonActions.navigate(routeName, params))
}

function goBack(key) {
  if (key && typeof key === 'string') {
    _navigator.dispatch({ ...CommonActions.goBack(), source: key })
  } else {
    _navigator.dispatch(CommonActions.goBack())
  }
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop())
}

function reset(routeName, params) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: routeName,
        params,
      },
    ],
  })
  _navigator.dispatch(resetAction)
}

function replaceTop(route, routeName, params) {
  if (!_navigator.state.nav) {
    return
  }

  let key = ''
  for (let i = 0; i < _navigator.state.nav.routes.length; i++) {
    if (_navigator.state.nav.routes[i].routeName === route) {
      key = _navigator.state.nav.routes[i].key
    }
  }
  if (!key) {
    return
  }
  _navigator.dispatch({
    ...StackActions.replace(routeName, params),
    source: key,
  })
}

function jumpTo(routeName) {
  _navigator.dispatch(TabActions.jumpTo(routeName))
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  jumpTo,
  reset,
  popToTop,
  replaceTop,
  setTopLevelNavigator,
  getTopLevelNavigator,
}
