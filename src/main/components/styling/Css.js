import { classNamesFunction, customizable } from 'office-ui-fabric-react';

const CssConsumer = (
    { props, getStyles, theme, children }
  ) => {
  
  if (typeof getStyles !== 'function') {
    throw new TypeError('[Classes] Illegal argument for getStyles');
  }
  
  if (typeof children !== 'function') {
    throw new TypeError('[Classes] Illegal argument for children');
  }

  const
    mergedProps = props ? { ...props, theme } : { theme },
    getClassNames = classNamesFunction(),
    classes = getClassNames(getStyles, mergedProps);

  return children(classes);
};

CssConsumer.displayName = 'CssConsumer';

export default customizable('Classes', ['theme'])(CssConsumer);
