import { Suspense } from 'react';

// project import
import Loader, { LoaderProps } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: any) => (props: LoaderProps) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
