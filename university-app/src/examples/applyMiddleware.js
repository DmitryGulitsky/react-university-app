function applyMiddleware(...middlewares) {
  middlewares.forEach(middleware => store.dispatch = middleware(store)(store.dispatch));
}