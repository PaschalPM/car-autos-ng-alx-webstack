import _ from "lodash"

export const urlPath = (uniqueText: string) => {
  const basePath = "/dashboard/";
  uniqueText = uniqueText.replace(/\s/g, "-").toLowerCase();
  if (uniqueText.includes(':')) uniqueText = uniqueText.replace(":", "/")
  if (uniqueText === "home") return "/"
  if (uniqueText === "dashboard") return basePath;
  if (uniqueText === "logout") return ""

  return basePath + uniqueText;
};


export const isPathActive = (location: string, urlPath: string) => {
  const locationPaths = location.split('/')
  const lastPath = locationPaths[locationPaths.length - 1]
  if (lastPath === "new" || lastPath === "edit") {
    locationPaths.pop()
    location = locationPaths.join('/')
  }
  return location === urlPath
}

export const hasFormChanged = <T>(initialObj: T, newObj: T) => {
  return !(_.isEqual(initialObj, newObj))
}

export const ucfirst = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()

export const supportColor = "rgba(199, 184, 45, 0.10)"
export const lightColor = "rgb(205, 198, 121)"