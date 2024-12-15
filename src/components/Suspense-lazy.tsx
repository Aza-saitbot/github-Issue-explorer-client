import { FC, LazyExoticComponent, Suspense } from 'react';
import {LoaderPage} from '@src/components/loader-page/loader-page';

interface ISuspenseLazyProps {
  LazyComponent: LazyExoticComponent<FC<{}>>;
};

const SuspenseLazy: FC<ISuspenseLazyProps> = ({ LazyComponent }) => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <LazyComponent />
    </Suspense>
  );
};

export { SuspenseLazy };
