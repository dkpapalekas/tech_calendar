import './Calendar.css';
import { seq } from 'fpts/maths';
import { map as imap, filter } from 'fpts/iter';
import { pipe } from 'fpts/function';
import { groupByN } from 'fpts/map';

type Data = {
   date: Date,
   duration: 1 | 2 | 3 | 4 | 5,
};

export default {
   props: {
      data: {
         required: true,
         type: Array,
      },
      as: {
         required: false,
         type: String,
         default: 'figure',
      },
      cellWidth: {
         required: 0,
         type: Number,
         default: 3,
      },
      cellHeight: {
         required: 0,
         type: Number,
         default: 3,
      },
      contentHeight: {
         required: false,
         type: String,
         default: '50vh',
      }
   },

   data() {
      return {
         current_year: new Date().getFullYear(),
      };
   },

   computed: {
      months() {
         return pipe(
            seq(0, 11),
            imap(x => new Date(2020, x, 1).toLocaleString('default', { month: 'long' })),
            Array.from,
         ) as [string, string, string, string, string, string, string, string, string, string, string, string];
      },

      monthdays() {
         return this.months.map((month_name: string, month: number) => ({
            name: month_name,
            days: pipe(
               seq(1, this.getDaysInMonth(month)),
               imap((day: number) => new Date(this.current_year, month, day).toLocaleString('default', { weekday: 'short' })),
               Array.from,
            ),
         }));
      },

      grouped_data() {
         return pipe(
            this.data as Array<Data>,
            filter(x => x.date.getFullYear() === this.current_year),
            groupByN(x => x.date.getMonth(), x => x.date.getDate() - 1),
         );
      }
   },

   methods: {
      getDaysInMonth(month: number) {
         return new Date(this.current_year, month+1, 0).getDate();
      },
   },

   render(h) {
      return h(this.as, {
         class: 'calendar',
         style: {
            height: this.contentHeight,
         },
      }, [
         h('header',
            this.monthdays.map(m =>
               h('div', { class: 'month' }, [
                  h('div', { class: 'name' }, m.name),
                  h('div', { class: 'days' }, m.days.map((d, i) =>
                     h('div', {
                        class: 'day',
                        style: {
                           width: this.cellWidth + 'rem',
                        },
                     }, [
                        h('div', { class: 'name' }, d),
                        h('div', { class: 'number' }, (i+1).toString()),
                     ])
                  ))
               ]),
            ),
         ),
         h('div', { class: 'body' }, [
            this.monthdays.map(m =>
               h('div', { class: 'month' }, m.days.map(() =>
                  h('div', { class: 'day' }, [
                     h('div', { class: 'hours' }, Array.from(seq(0, 23)).map(hr =>
                        h('div', {
                           class: 'hour',
                           style: {
                              width: this.cellWidth + 'rem',
                              height: this.cellHeight + 'rem',
                           }
                        }, hr.toString())
                     ))
                  ])
               ))
            ),
         ])
      ]);
   },
}
