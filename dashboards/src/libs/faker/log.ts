import { faker } from "@faker-js/faker";
import { ucfirst, humanReadableRelativeTime } from "../utils";


export type RecentActivity = {
  id: string;
  activity_type: string;
  activity_details: string;
  user: string;
  timestamp: string;
};
const createRandomActivities: () => RecentActivity = () => ({
  id: faker.string.uuid(),
  activity_type: ucfirst(faker.helpers.arrayElement(["create", "update", "delete", "login", "logout"])),
  activity_details: faker.string.sample(10),
  user: faker.internet.userName(),
  timestamp: humanReadableRelativeTime(faker.date.anytime().toISOString()),
});

export const ACTIVITIES: RecentActivity[] = faker.helpers.multiple(
  createRandomActivities,
  { count: 15 }
);
