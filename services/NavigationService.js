import { NavigationActions, SwitchActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function getTopLevelNavigator() {
    return _navigator;
}

function navigate(routeName, params) {
    _navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

function goBack(key) {
    if (key && typeof key === 'string') {
        _navigator.dispatch(NavigationActions.back({ key }));
    } else {
        _navigator.dispatch(NavigationActions.back());
    }
}

function popToTop() {
    _navigator.dispatch(StackActions.popToTop());
}

function reset(routeName, params) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })]
    });
    _navigator.dispatch(resetAction);
}

function replaceTop(route, routeName, params) {
    if (!_navigator.state.nav) {
        return;
    }

    let key = '';
    for (let i = 0; i < _navigator.state.nav.routes.length; i++) {
        if (_navigator.state.nav.routes[i].routeName === route) {
            key = _navigator.state.nav.routes[i].key;
        }
    }
    if (!key) {
        return;
    }
    const replaceAction = StackActions.replace({
        key,
        routeName,
        params
    });
    _navigator.dispatch(replaceAction);
}

function jumpTo(routeName) {
    _navigator.dispatch(SwitchActions.jumpTo({ routeName }));
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
    getTopLevelNavigator
};
