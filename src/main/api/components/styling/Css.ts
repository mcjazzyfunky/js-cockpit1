import { ReactNode } from 'react'
import { classNamesFunction, customizable } from 'office-ui-fabric-react';

const CssConsumer = (
    { props, getStyles, theme, children }: { props: any, getStyles: any, theme: any, children: any } // TODO
  ) => {
  
  if (typeof getStyles !== 'function') {
    throw new TypeError('[Css] Illegal argument for getStyles');
  }
  
  if (typeof children !== 'function') {
    throw new TypeError('[Css] Illegal argument for children');
  }

  const
    mergedProps = props ? { ...props, theme } : { theme },
    getClassNames = classNamesFunction(),
    classes = getClassNames(getStyles, mergedProps);

  return children(classes);
};

(CssConsumer as any).displayName = 'CssConsumer';

export default customizable('Classes', ['theme'])(CssConsumer);
