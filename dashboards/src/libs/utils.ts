export const urlPath = (uniqueText: string) => {
  const basePath = "/dashboard/";
  uniqueText = uniqueText.replace(/\s/g, "-").toLowerCase();

  if (uniqueText === "dashboard") return basePath;

  return basePath + uniqueText;
};


export const isPathActive = (location:string, urlPath:string) => {
    return location === urlPath
}

export const hasFormChanged = (json:string, obj:any) => {
  return !(json === JSON.stringify(obj))
}

export const baseColor = "rgba(103, 99, 59)"
export const secColor = "rgba(199, 184, 45, 0.35)"