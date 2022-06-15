import { Link } from 'react-router-dom';
import type { BreadcrumbProps } from 'antd';

const useBreadcrumbProps: (
  routes: BreadcrumbProps['routes'],
) => BreadcrumbProps = routes => ({
  routes,
  itemRender: (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  },
});

export { useBreadcrumbProps };
