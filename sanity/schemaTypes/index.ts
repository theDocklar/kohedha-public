import {authorType} from './authorType'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {eventType} from './eventType'
import {eventCategoryType} from './eventCategoryType'
import {organizerType} from './organizerType'
import {postType} from './postType'

export const schema = {
  types: [postType, authorType, categoryType, eventType, eventCategoryType, organizerType, blockContentType],
}
