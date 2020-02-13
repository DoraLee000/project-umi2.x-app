export const cloneBtn = ( element , handleClick = () => {} ) => {
  if (!element) return ;
  if (Object.prototype.toString.call(element) === '[object Object]'){
    return <element.type { ...element.props } onClick={ handleClick }/>
  }
  return <span onClick={ handleClick }>{element}</span>
}