
export default (to, from, next) => {

  if (from.path === '/' && from.name ==='ChatRequest' && localStorage.getItem('client')) {
    next();
  } else {
  	localStorage.removeItem('client');
    next('/');
  }
}
