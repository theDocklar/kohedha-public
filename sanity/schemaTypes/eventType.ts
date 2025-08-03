import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'eventDate',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventEndDate',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Venue Name',
        }),
        defineField({
          name: 'address',
          type: 'string',
          title: 'Address',
        }),
        defineField({
          name: 'city',
          type: 'string',
          title: 'City',
        }),
      ]
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: {type: 'eventCategory'},
    }),
    defineField({
      name: 'organizer',
      type: 'reference',
      to: {type: 'organizer'},
    }),
    defineField({
      name: 'ticketPrice',
      type: 'number',
      title: 'Ticket Price (LKR)',
    }),
    defineField({
      name: 'isFree',
      type: 'boolean',
      title: 'Free Event',
      initialValue: false,
    }),
    defineField({
      name: 'capacity',
      type: 'number',
      title: 'Event Capacity',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Event',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Event Details',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventDate: 'eventDate',
      location: 'location.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, eventDate, location} = selection
      return {
        ...selection,
        subtitle: eventDate && location ? `${new Date(eventDate).toLocaleDateString()} at ${location}` : '',
      }
    },
  },
}) 