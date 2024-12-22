import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ERoutePaths} from '@src/routes/models';
import {SuspenseLazy} from '@src/components/Suspense-lazy';
import MainLayout from '@src/layouts/main.layout';


const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/*'} element={<MainLayout/>}>
        <Route
          path={ERoutePaths.ISSUES}
          element={<SuspenseLazy LazyComponent={lazy(() => import('../pages/issues/issues.page'))}/>}
        />
        <Route
          path={ERoutePaths.ISSUE_ID}
          element={<SuspenseLazy LazyComponent={lazy(() => import('../pages/issue-card/issue-card.page'))}/>}
        />

        <Route
          path={ERoutePaths.STATISTICS}
          element={<SuspenseLazy LazyComponent={lazy(() => import('../pages/statistics/statistics.page'))}/>}
        />

        <Route path={'/*'} element={<>Not page 404</>}>
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;