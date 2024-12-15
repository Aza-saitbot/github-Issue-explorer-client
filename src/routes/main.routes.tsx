import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ERoutePaths} from '@src/routes/models';
import {SuspenseLazy} from '@src/components/Suspense-lazy';
import {IssueCard} from '@src/modules/issues';


const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path={ERoutePaths.ISSUES}
        element={<SuspenseLazy LazyComponent={lazy(() => import('../pages/issues/issues.page'))}/>}
      />
      <Route
        path={ERoutePaths.ISSUE_ID}
        element={<SuspenseLazy LazyComponent={lazy(() => import('../pages/issues/issues.page'))}/>}

      />
      <Route path={'/*'} element={<>Not Page</>}>
      </Route>
    </Routes>
  );
};

export default MainRoutes;