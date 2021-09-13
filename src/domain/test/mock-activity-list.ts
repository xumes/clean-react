import faker from 'faker'
import { LoadActivityList } from '../usecases/load-activity-list'

export const mockActivityModel = (): LoadActivityList.Model => ({
  id: faker.datatype.number(),
  userId: faker.datatype.number(),
  createdDateTime: faker.datatype.datetime(),
  activityEventId: faker.datatype.number(),
  personId: faker.datatype.number(),
  proposalId: faker.datatype.number(),
  name: faker.random.word(),
  description: faker.random.words(7),
  category: faker.random.word(),
  proposalName: faker.random.words(3),
  paymentAmount: faker.datatype.number(),
  clientName: faker.name.findName(),
  companyName: faker.company.companyName(),
  activityUserName: faker.name.findName(),
  avatar: faker.internet.avatar(),
  message: faker.random.words(5),
  duration: faker.datatype.number(),
  formattedDateTime: faker.datatype.string()
})

export const mockActivityListModel = (): LoadActivityList.Model[] => ([
  mockActivityModel(),
  mockActivityModel(),
  mockActivityModel()
])
