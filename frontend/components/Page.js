import PropTypes from 'prop-types';
import Header from './Header';

export default function Page ( {children, cool} ) {
  return (
    <div>
      <Header />
      <h2>I am the page component</h2>
      <h3>{cool}</h3>
      {children}  {/* Destructured. Otherwise would be props.children in this line and props in the argument */}
    </div>
  );
}

Page.propTypes = {
    cool: PropTypes.string,
    children: PropTypes.any
};