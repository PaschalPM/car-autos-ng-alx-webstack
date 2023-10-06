type BreadCrumbMap = {
  currentPath: string;
  title: string;
};

const transformPath4Breadcrumbs = (subPath: string) =>{
  const pathname = location.pathname
  if (subPath.length >= 36 && pathname.match(/my-adverts/)) return 'Details'
  if (subPath.length >= 36 && pathname.match(/my-marketers/)) return 'Profile'
  return subPath.replace(/(^.|-.)/g, (m) => {
    if (m.startsWith("-")) return " " + m[1].toUpperCase();
    return m.toUpperCase();
  });
}

export const pathBreadcrumbMapper = (): BreadCrumbMap[] => {
  const { pathname } = location;
  const subPaths = pathname.split("/");
  const breadCrumbMaps = [] as BreadCrumbMap[];
  let currentPath = "";
  for (let i = 1; i < subPaths.length; i++) {
    currentPath += `/${subPaths[i]}${i === 1 ? "/" : ""}`;
    breadCrumbMaps.push({
      currentPath,
      title: transformPath4Breadcrumbs(subPaths[i]),
    });
    currentPath = currentPath.replace(/\/$/, "");
  }
  return breadCrumbMaps;
};
