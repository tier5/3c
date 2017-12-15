
export default (to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);
  console.log(localStorage.getItem('client'));
  if (from.path === '/' && from.name ==='ChatRequest' && localStorage.getItem('client')) {
    next();
  } else {
  	localStorage.removeItem('client');
    next('/');
  }
}
