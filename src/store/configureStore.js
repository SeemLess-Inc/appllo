import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";
import rootReducer from "./reducers";

const configureStore = () => {
  // Create Store
  const persistedState = loadState();
  const enhancers = [];
  const middleware = [];

  if (process.env.NODE_ENV === "development") {
    // Enable Debugger in dev mode
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }

    // Add thunk to middleware
    middleware.push(thunk);

    // Enable Logger in dev mode
    const logger = createLogger({
      // ...options: see https://github.com/evgenyrodionov/redux-logger
    });
    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions.
    middleware.push(logger);
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  const store = createStore(rootReducer, persistedState, composedEnhancers);

  // Persist partial state to LocalStorage. Saving is throttled to once per second.
  store.subscribe(
    throttle(() => {
      saveState({
        name: store.getState().name // to persist partial state (name field)
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
